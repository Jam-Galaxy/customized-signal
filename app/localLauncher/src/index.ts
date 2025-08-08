//@ts-ignore
import { start } from "customized-signal";
import Tone from "customized-tone";
import EventEmitter from "wavesurfer.js/dist/event-emitter.js";
import { ConnectorEventEmitter } from "./EventEmitter";
const toneAudioContext = Tone.getContext();
const audioContext = Tone.getContext().rawContext;
const eventEmitter: ConnectorEventEmitter = new EventEmitter();

function subscribeToEventsFromSignal() {
  eventEmitter.on("signal-api-ready", ({signalApi}) => {
    console.log("eventEmitter on signal-api-ready: signalApi=", signalApi);
  });
  eventEmitter.on("signal-track-addEvent-finished", ({event}) => {
    console.log("eventEmitter on signal-track-addEvent-finished: event=", event);
  })
  eventEmitter.on("signal-track-addEvents-finished", ({events}) => {
    console.log("eventEmitter on signal-track-addEvents-finished: events=", events);
  })
  eventEmitter.on("signal-track-removeEvent-finished", ({event}) => {
    console.log("eventEmitter on signal-track-removeEvent-finished: event=", event);
  })
  eventEmitter.on("signal-track-removeEvents-finished", ({events}) => {
    console.log("eventEmitter on signal-track-removeEvents-finished: events=", events);
  })
  eventEmitter.on("signal-track-removeRedundantEvents-finished", ({events}) => {
    console.log("eventEmitter on signal-track-removeRedundantEvents-finished: events=", events);
  })
  eventEmitter.on("signal-track-createOrUpdate-finished", ({event}) => {
    console.log("eventEmitter on signal-track-createOrUpdate-finished: event=", event);
  })
  eventEmitter.on("signal-track-updateEvent-finished", ({event}) => {
    console.log("eventEmitter on signal-track-updateEvent-finished: event=", event);
  })
  eventEmitter.on("signal-track-updateEvents-finished", ({events}) => {
    console.log("eventEmitter on signal-track-updateEvents-finished: events=", events);
  });
  eventEmitter.on("signal-song-setSong-finished", ({song}) => {
    console.log("eventEmitter on signal-song-setSong-finished: song=", song);
  });
}
subscribeToEventsFromSignal();

start("root", toneAudioContext, audioContext, eventEmitter);
