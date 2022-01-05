import path from 'path'
import { UserConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import { ElementPlusResolver, AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import visualizer from 'rollup-plugin-visualizer'
export default ({ command }) => {
  const config: UserConfig = {
    plugins: [
      vuePlugin(),
      vueJsxPlugin(),

      // AutoImport({
      // resolvers: [ElementPlusResolver()]
      // }),
      Components({
        dts: true,
        globalNamespaces: ['global'],
        // include: [/\.vue$/],
        include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
        resolvers: [ElementPlusResolver({ ssr: true, importStyle: 'css' })],
        directoryAsNamespace: true
      })
    ],
    server: {
      port: 8081,
      host: '0.0.0.0'
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        },
        scss: {
          // additionalData: '@import "src/assets/styles/global.scss";'
        }
      }
    }
  }

  if (command === 'build') {
    config.plugins.push(
      visualizer({
        // open: true,
        // gzipSize: true,
        // brotliSize: true
      })
    )
  }

  return config
}
