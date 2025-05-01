// sentry.client.config.ts

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://844a9fa7501ef907170ad109b34e1e72@o4509233727143936.ingest.us.sentry.io/4509233731928064",
  tracesSampleRate: 1.0,  // 또는 0.1~0.2로 낮추는 것도 가능 (prod에서는)
  debug: false,
});
