import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      //这个路径为http://192.168.1.182:3000/douyu/wgapi/vod/front/vodrank/getTagVideos
      '/music': {
        //target是代理的目标路径
        target: 'http://123.207.32.32:9002/',
        changeOrigin: true, //必须要开启跨域
        //pathRewrite重写请求的路径,实际请求的路径没有代理标识douyu,需要把重置为空字符串
        rewrite: (path) => path.replace(/\/music/, '') // 路径重写
      }
    },

    host: '0.0.0.0'
  }
})
