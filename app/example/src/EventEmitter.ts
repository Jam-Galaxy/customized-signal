import WaveSurferEventEmitter from "wavesurfer.js/dist/event-emitter.js";
// type SignalEvents = {
//   "signal-event-1": [{ arg1: number }];
// };
// type AudioEditorEvents = {
//   "audio-editor-event-1": [{ arg1: string }];
// };
// type Events = SignalEvents & AudioEditorEvents; //TODO:
type Events = {
  "signal-api-ready": [{signalApi: any}];
  "signal-tempo-changed": [{tempo: number}];

  "event-3": [{ param1: string }];
  
  "signal-track-addEvent-finished": [{event: any}]; //TODO: any TrackEvent  
  "signal-track-addEvents-finished": [{events: any}]; //Array<TrackEvent>
  "signal-track-removeEvent-finished": [{event: any}];
  "signal-track-removeEvents-finished": [{events: any}];
  "signal-track-removeRedundantEvents-finished": [{events: any}];
  "signal-track-createOrUpdate-finished": [{event: any}];
  "signal-track-updateEvent-finished": [{event: any}];
  "signal-track-updateEvents-finished": [{events: any}];
}
export type ConnectorEventEmitter = WaveSurferEventEmitter<Events>;
// const eventEmitter: EventEmitter<Events> = new EventEmitter();