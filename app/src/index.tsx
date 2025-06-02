import * as Sentry from "@sentry/browser"
import { configure } from "mobx"
import { createRoot } from "react-dom/client"
import { App } from "./components/App/App"

export function start(rootElementId: string) {

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.VERCEL_ENV,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0,
})

configure({
  enforceActions: "never",
})

const root = createRoot(document.getElementById(rootElementId)!)
root.render(<App />)
console.log("App started");
}

export function testFunction() {
  console.log("testFunction started");
}