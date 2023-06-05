const proxy = require("http-proxy-middleware");

module.exports = function (app: any) {
  app.use(
    //传入一个或多个代理proxy，以逗号隔开
    // 前缀、
    proxy("/api", {
      target: "http://192.168.0.137:9595",
      changeOrigin: true,
      pathRewrite: { "^/api": "/api" }, //以api前缀开头，替换为''空串
    })
  );
};
