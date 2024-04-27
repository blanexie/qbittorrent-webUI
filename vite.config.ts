import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({

    plugins: [
        vue(),
        VueDevTools(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        outDir: 'dist/public',
    },
    server: {
        //设置反向代理，跨域
        proxy: {
            '/api': {
                // 后台地址
                target: 'http://192.168.1.6:8080/',
                changeOrigin: true,
                rewrite: (path: any) => {
                    return path;
                }
            }
        }
    }
})

