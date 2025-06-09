console.log("example: start");

//@ts-ignore
import { start } from "customized-signal";
import Tone from "customized-tone";
console.log(start, Tone, "1");
const toneAudioContext = Tone.getContext();
const audioContext = Tone.getContext().rawContext;
start("root", toneAudioContext, audioContext);