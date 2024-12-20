import path, { resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import UnoCSS from "unocss/vite";
export default defineConfig({
  root: process.cwd(),
  plugins: [
    vue(),
    UnoCSS(),
    vueJsx({
      include: [/\.js$/, /\.jsx$/, /\.tsx$/],
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false,
          resolveIcons: true,
        }),
      ],
      extensions: ["vue", "jsx"], // this line
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.tsx/, /\.jsx/, /\.js/],
    }),
  ],
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "../src"),
      },
      {
        find: "antd",
        replacement: "ant-design-vue",
      },
      // lodash
      { find: "lodash", replacement: "lodash-es" },
    ],
  },
  optimizeDeps: {
    esbuildOptions: {
      // 将ESBuild loader选项设置为'jsx'和'vue-jsx'
      // 以便解析JSX语法和Vue单文件组件中的JSX
      loader: {
        ".jsx": "jsx",
        ".js": "jsx",
      },
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000", // 后端 API 代理
    },
  },
});
