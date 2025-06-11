//@ts-ignore
import { start } from "customized-signal";
import Tone from "customized-tone";
const toneAudioContext = Tone.getContext();
const audioContext = Tone.getContext().rawContext;
start("root", toneAudioContext, audioContext);