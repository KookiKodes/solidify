// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import getServerContext from "./server/context";

export default createHandler((_) => {
  const context = getServerContext();
  return (
    <StartServer
      document={({ assets, children, scripts }) => (
        <html lang={context.locale.language.toLocaleLowerCase()}>
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
