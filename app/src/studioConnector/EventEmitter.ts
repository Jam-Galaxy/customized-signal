import { SignalApi } from "./SignalApi";
import WaveSurferEventEmitter from "./WaveSurferEventEmitter";

type Events = {
  "signal-api-ready": [{signalApi: SignalApi}];
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

  "signal-song-setSong-finished": [{song: any}];

};

// export type EventEmitter = WaveSurferEventEmitter<Events>;
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EventEmitter extends WaveSurferEventEmitter<Events> {}