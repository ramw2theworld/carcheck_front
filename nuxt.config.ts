// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "~/assets/css/fonts.css",
    "~/assets/css/input.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
    // "~/assets/css/admin.css",
  ],

  modules: [
    // "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxt/ui",
  ],

  imports: {
    dirs: ["./stores"],
  },

  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },

  plugins: ["~/plugins/fontawesome.js", "~/plugins/eventBus.js"],

  build: {},

  runtimeConfig: {
    public: {
      stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
    },
  },

  compatibilityDate: "2024-09-05",
});
