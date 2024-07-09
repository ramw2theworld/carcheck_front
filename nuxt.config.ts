// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  buildModules:[
    '@nuxt/postcss8',
  ],
  css: [
    '~/assets/css/fonts.css',
    '~/assets/css/input.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
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

  plugins: [
    '~/plugins/fontawesome.js',
  ],

  build:{
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },

  runtimeConfig: {
    public: {
      stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
    },
  },
})
