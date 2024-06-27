// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  buildModules:[
    '@nuxt/postcss8',
  ],
  css: [
    '~/assets/css/fonts.css',
    '~/assets/css/input.css',
  ],

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',

  ],
  imports:{
    dirs: ['./stores']
  },
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },

  build:{
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  }
})
