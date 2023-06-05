const proxy = require("http-proxy-middleware");

module.exports = function (app: any) {
  app.use(
    // 传入一个或多个代理proxy，以逗号隔开
    // 前缀、
    proxy("/api", {
      target: "http://192.168.0.137:9595",
      changeOrigin: true,
      pathRewrite: { "^/api": "/api" }, //以api前缀开头，替换为''空串
      bypass: function (req: any, res: any, proxyOptions: any) {
        if (req.url.startsWith('http://www.ylxteach.net:10001/api/')) {
          return req.url;
        }
        if (req.url.startsWith('https://web.ifzq.gtimg.cn/appstock/app/fqkline/')) {
          return req.url;
        }
      }
    })
  );
};
