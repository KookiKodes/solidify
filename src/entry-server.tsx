// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { getLocale } from "./server/context";

export default createHandler(() => {
  const locale = getLocale();
  return (
    <StartServer
      document={({ assets, children, scripts }) => (
        <html lang={locale.language.toLocaleLowerCase()}>
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      )}
    />
  );
});
