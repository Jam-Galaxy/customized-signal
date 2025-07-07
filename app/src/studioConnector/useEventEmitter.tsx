import { createContext, useContext } from "react";
class EventEmitter {}

const EventEmitterContext = createContext<EventEmitter>(null!);
export function EventEmitterProvider({ children, value}: { children: React.ReactNode; value: EventEmitter}) {
  return (
    <EventEmitterContext.Provider value={value}>
      {children}
    </EventEmitterContext.Provider>
  )
}

export function useEventEmitter() {
  const eventEmitter = useContext(EventEmitterContext);
  return eventEmitter;
}