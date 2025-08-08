import * as Sentry from "@sentry/browser"
import { configure } from "mobx"
import { createRoot } from "react-dom/client"
import { App } from "./components/App/App"
import { EventEmitter } from "./studioConnector/EventEmitter"

export function start(rootElementId: string, toneAudioContext: any, audioContext: AudioContext, eventEmitter: EventEmitter) {
  console.log("eventEmitter=", eventEmitter);
  
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.VERCEL_ENV,
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: 1.0,
  });

  configure({
    enforceActions: "never",
  });

  const root = createRoot(document.getElementById(rootElementId)!);
  root.render(<App toneAudioContext={toneAudioContext} audioContext={audioContext} eventEmitter={eventEmitter} />);
}