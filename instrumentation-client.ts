import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Capture a sample of performance traces
  tracesSampleRate: 0.1,

  // Don't send PII
  sendDefaultPii: false,
});

// Required by @sentry/nextjs for navigation instrumentation
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
