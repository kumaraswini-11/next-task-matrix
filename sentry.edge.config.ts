import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://01459dd22cb29f5a98edca6c56c7976b@o4508478493425664.ingest.us.sentry.io/4508478742069248",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 1.0,

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
