import { useCallback } from "react"
import Track, { TrackId } from "../track"
import { TrackColor } from "../track/TrackColor"
import { TrackEvent } from "../track/TrackEvent"
import { useMobxSelector } from "./useMobxSelector"
import { useSong } from "./useSong"
import { useEventEmitter } from "../studioConnector/useEventEmitter"

export function useTrack(id: TrackId) {

  const song = useSong()
  const track = useMobxSelector(() => song.getTrack(id), [song, id])

  return {
    get isRhythmTrack() {
      return useMobxSelector(() => track?.isRhythmTrack ?? false, [track])
    },
    get isConductorTrack() {
      return useMobxSelector(() => track?.isConductorTrack ?? false, [track])
    },
    get programNumber() {
      return useMobxSelector(() => track?.programNumber ?? 0, [track])
    },
    get name() {
      return useMobxSelector(() => track?.name ?? "", [track])
    },
    get channel() {
      return useMobxSelector(() => track?.channel, [track])
    },
    get events() {
      return useMobxSelector(() => track?.events ?? [], [track])
    },
    getEvents() {
      return track?.events ?? []
    },
    get color() {
      return useMobxSelector(() => track?.color, [track])
    },
    setColor: useCallback(
      (color: TrackColor | null) => {
        track?.setColor(color)
      },
      [track],
    ),
    setName: useCallback(
      (name: string) => {
        track?.setName(name)
      },
      [track],
    ),
    setChannel: useCallback(
      (channel: number | undefined) => {
        if (track) {
          track.channel = channel
        }
      },
      [track],
    ),
    setPan: useCallback(
      (pan: number, tick: number) => {
        track?.setPan(pan, tick)
      },
      [track],
    ),
    setVolume: useCallback(
      (volume: number, tick: number) => {
        track?.setVolume(volume, tick)
      },
      [track],
    ),
    setProgramNumber: useCallback(
      (programNumber: number) => {
        track?.setProgramNumber(programNumber)
      },
      [track],
    ),
    ...useTrackEvents(track),
  }
}

export function useTrackEvents(track: Track | undefined) {
  const connectorEventEmitter = useEventEmitter();
  return {
    // addEvent: useCallback(
    addEvent:
      <T extends TrackEvent>(
        event: Omit<T, "id"> & { subtype?: string },
      ): T | undefined => {
        if (track) {
          const resultEvent = track.addEvent(event);
          connectorEventEmitter['emit']("signal-track-addEvent-finished", {event: resultEvent});
          return resultEvent;
        }
        return undefined
      },
      // [track],
    // ),
    addEvents: useCallback(
      <T extends TrackEvent>(events: Omit<T, "id">[]) => {
        if (track) {
          const resultEvents = track.addEvents(events)
          connectorEventEmitter['emit']("signal-track-addEvents-finished", {events: resultEvents});                              
          return resultEvents;
        }
      },
      [track],
    ),
    removeEvent: useCallback(
      (eventId: number) => {
        if (track) {
          const event = track.removeEvent(eventId);
          connectorEventEmitter['emit']("signal-track-removeEvent-finished", {event});                    
          return event;
        }
      },
      [track],
    ),
    removeEvents: useCallback(
      (eventIds: number[]) => {
        if (track) {
          const events = track.removeEvents(eventIds);
          connectorEventEmitter['emit']("signal-track-removeEvents-finished", {events});          
          return events;
        }
      },
      [track],
    ),
    removeRedundantEvents: useCallback(
      (event: TrackEvent) => {
        if (track) {
          const events = track.removeRedundantEvents(event);
          connectorEventEmitter['emit']("signal-track-removeRedundantEvents-finished", {events});
          return events;
        }
      },
      [track],
    ),
    createOrUpdate: useCallback(
      <T extends TrackEvent>(
        newEvent: Omit<T, "id"> & { subtype?: string; controllerType?: number },
      ) => {
        if (track) {
          const event = track.createOrUpdate(newEvent);
          connectorEventEmitter['emit']("signal-track-createOrUpdate-finished", {event});
          return event;
        }
      },
      [track],
    ),
    updateEvent: useCallback(
      <T extends TrackEvent>(id: number, obj: Partial<T>): T | null => {
        if (track) {
          const event = track.updateEvent(id, obj);
          connectorEventEmitter['emit']("signal-track-updateEvent-finished", {event});
          return event;
        }
        return null
      },
      [track],
    ),
    updateEvents: useCallback(
      (events: Partial<TrackEvent>[]) => {
        if (track) {
          const resultEvents = track.updateEvents(events);
          connectorEventEmitter['emit']("signal-track-updateEvents-finished", {events: resultEvents});
          return resultEvents;
        }
      },
      [track],
    ),
    getEventById: useCallback(
      (eventId: number) => {
        return track?.getEventById(eventId)
      },
      [track],
    ),
  }
}
