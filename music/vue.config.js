const px2rem = require('postcss-px2rem')

const postcss = px2rem({
  remUnit: 50 // 基准值
})
module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
  },

  configureWebpack: {
    // 配置路径别名
    resolve: {
      alias: {
        'components': '@/components',
        'components': '@/components',
        'common': '@/common',
        'assets': '@/assets',
        'network': '@/network',
        'views': '@/views',
        'utils': '@/utils',
        'store': '@/store',
        'router': '@/router'
      }
    },

  },
}