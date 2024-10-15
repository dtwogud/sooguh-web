const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ hostname: "localhost", dev, port });
const handle = app.getRequestHandler();

require("dotenv").config();

app.prepare().then(() => {
  const server = express();
  //
  // server.use(
  //   '/v1',
  //   createProxyMiddleware({
  //     target: 'https://openapi.naver.com',
  //     changeOrigin: true
  //   })
  // )

  server.use(
    "/api",
    createProxyMiddleware({
      target: process.env.NEXT_PUBLIC_API_URL,
      changeOrigin: true,
      pathRewrite: {
        "^/api/": "/",
      },
      logLevel: "error",
      cookieDomainRewrite: {
        "*": "localhost",
      },
    }),
  );

  server.all("*", (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
  });
});
