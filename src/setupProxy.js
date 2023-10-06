// eslint-disable-next-line @typescript-eslint/no-var-requires
const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    proxy({
      target: "http://localhost:6001",
      changeOrigin: true,
    }),
  );

  app.use(
    "/admin",
    proxy({
      target: "http://localhost:6001",
      changeOrigin: true,
    }),
  );

  app.use(
    "/s",
    proxy({
      target: "http://localhost:6001",
      pathRewrite: {
        "^/s": "/api/s",
      },
    }),
  );
};
