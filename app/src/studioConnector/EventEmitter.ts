import { SignalApi } from "./SignalApi";
import WaveSurferEventEmitter from "./WaveSurferEventEmitter";

type Events = {
  "signal-api-ready": [{signalApi: SignalApi}];
  "signal-tempo-changed": [{tempo: number}];

  "event-3": [{ param1: string }];
};

// export type EventEmitter = WaveSurferEventEmitter<Events>;
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EventEmitter extends WaveSurferEventEmitter<Events> {}