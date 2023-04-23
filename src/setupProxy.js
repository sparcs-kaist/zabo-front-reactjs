import proxy from "http-proxy-middleware";

export default (app) => {
  app.use(
    "/admin",
    proxy({
      target: "http://localhost:6001",
      changeOrigin: true,
    }),
  );

  app.use(
    "/api",
    proxy({
      target: "http://localhost:6001",
      changeOrigin: true,
    }),
  );
};
