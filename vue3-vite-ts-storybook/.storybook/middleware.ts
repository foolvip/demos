const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function expressMiddleware (router) {
  router.use('/insure-api', createProxyMiddleware({
    target: "https://test-insure-admin.meditrustbroker.com",
    changeOrigin: true
  }))
}