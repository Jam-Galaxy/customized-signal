console.log("example: start");

import { start } from "customized-signal";
import Tone from "customized-tone";
console.log(start, Tone, "123");
const toneAudioContext = Tone.getContext();
const audioContext = Tone.getContext().rawContext;
start("root", toneAudioContext, audioContext);