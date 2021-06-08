module.exports = {
  lintOnSave: false,

  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    //以上的ip和端口是我们本机的;下面为需要跨域的
    // proxy: { //配置跨域
    //   '/api': {
    //     target: 'http://127.0.0.1:8081/api', //这里后台的地址模拟的;应该填写你们真实的后台接口
    //     ws: true,
    //     changeOrigin: true, //允许跨域
    //     pathRewrite: {
    //       '^/api': '' //请求的时候使用这个api就可以
    //     }
    //   }
    // }
  },

  transpileDependencies: [
    'vuetify'
  ]
}
