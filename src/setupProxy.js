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
};
