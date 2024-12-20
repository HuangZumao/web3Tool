import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    // 已引入Material Design Icons https://icones.js.org/collection/mdi
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
  ],
  /**
   * 自定义快捷语句
   * @see https://github.com/unocss/unocss#shortcuts
   */
  shortcuts: {
    // 'bg-primary': 'bg-light-blue-500 dark:bg-light-blue-600'
  },
  transformers: [
    transformerDirectives(), // 启用 @apply 功能
    transformerVariantGroup(), // 启用 () 分组功能
  ],
  rules: [
    /* [
          'bg-primary',
          {
            background: 'var(--light-blue-500)',
            'dark:bg-primary': 'var(--light-blue-600)'
          }
        ] */
  ],
});
