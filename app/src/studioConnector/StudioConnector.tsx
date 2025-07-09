import { FC, useEffect } from "react";
import { useCreateSignalApi } from "./SignalApi";
import { useEventEmitter } from "./useEventEmitter";

export const StudioConnector: FC = () => {
  const eventEmitter = useEventEmitter();
  const signalApi = useCreateSignalApi();

  useEffect(() => {
    console.log("StudioConnector: useEffect: eventEmitter=", eventEmitter, "signalApi=", signalApi);
    eventEmitter['emit']("signal-api-ready", {signalApi});
  }, []);
  return <></>
}