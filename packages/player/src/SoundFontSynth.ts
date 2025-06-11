import { SynthEvent, getSampleEventsFromSoundFont } from "@ryohey/wavelet"
import { SendableEvent, SynthOutput } from "./SynthOutput.js";

//INFO: This processor is loaded as a resource. See webpack.common.js for details.
//@ts-ignore
import audioWorkletProcessor from "@ryohey/wavelet/dist/processor.js";
import { createWorkletNode } from "./utils/utils.js";

export class SoundFontSynth implements SynthOutput {
  private synth: AudioWorkletNode | null = null

  private _loadedSoundFontData: ArrayBuffer | null = null
  get loadedSoundFontData(): ArrayBuffer | null {
    return this._loadedSoundFontData
  }

  get isLoaded(): boolean {
    return this._loadedSoundFontData !== null
  }

  private sequenceNumber = 0

  constructor(private readonly context: AudioContext, private readonly toneAudioContext: any) {}

  async setup() {
    // await this.context.audioWorklet.addModule(audioWorkletProcessor);
  }

  async loadSoundFontFromURL(url: string) {
    const response = await fetch(url)
    const data = await response.arrayBuffer()
    await this.loadSoundFont(data)
  }

  async loadSoundFont(data: ArrayBuffer) {
    if (this.synth !== null) {
      this.synth.disconnect()
    }

    const options = {
      numberOfInputs: 0,
      outputChannelCount: [2],
    }
    this.synth = await createWorkletNode(this.toneAudioContext, "synth-processor", audioWorkletProcessor, options) as AudioWorkletNode;
    this.synth.connect(this.context.destination)
    this.sequenceNumber = 0

    const sampleEvents = getSampleEventsFromSoundFont(new Uint8Array(data))
    this._loadedSoundFontData = data

    for (const e of sampleEvents) {
      this.postSynthMessage(
        e.event,
        e.transfer, // transfer instead of copy
      )
    }
  }

  private postSynthMessage(e: SynthEvent, transfer?: Transferable[]) {
    this.synth?.port.postMessage(
      { ...e, sequenceNumber: this.sequenceNumber++ },
      transfer ?? [],
    )
  }

  sendEvent(event: SendableEvent, delayTime: number = 0) {
    this.postSynthMessage({
      type: "midi",
      midi: event,
      delayTime: delayTime * this.context.sampleRate,
    })
  }

  activate() {
    this.context.resume()
  }
}
