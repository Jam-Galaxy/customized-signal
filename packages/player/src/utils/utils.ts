
//Tone.BaseContext
export async function createWorkletNode(toneAudioContext: any, name: string, url: string, options?: any) {
  try {
    return toneAudioContext.createAudioWorkletNode(name, options);
  //eslint-disable-next-line
  } catch (err) {
    try {
      await toneAudioContext.addAudioWorkletModule(url);
    } catch (error) {
      console.error(error);
    }
    return toneAudioContext.createAudioWorkletNode(name, options);
  }
}
