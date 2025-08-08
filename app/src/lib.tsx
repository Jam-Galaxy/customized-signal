import * as Sentry from "@sentry/browser"
import { configure } from "mobx"
import { createRoot } from "react-dom/client"
import { App } from "./components/App/App"
import { EventEmitter } from "./studioConnector/EventEmitter"
import { AnyAudioContext } from "./audiomodel/types"

export function start(rootElement: HTMLElement | string, toneAudioContext: any, audioContext: AnyAudioContext, eventEmitter: EventEmitter) {
  
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.VERCEL_ENV,
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: 1.0,
  });

  configure({
    enforceActions: "never",
  });

  if(typeof rootElement === "string") {
    const element = document.getElementById(rootElement);
    if(!element) {
      throw new Error("No element with this id found. Unable to mount Signal app");
    }
    rootElement = element;
  }

  const root = createRoot(rootElement);
  root.render(<App toneAudioContext={toneAudioContext} audioContext={audioContext} eventEmitter={eventEmitter} />);
}