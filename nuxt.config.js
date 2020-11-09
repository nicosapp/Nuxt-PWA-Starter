import colors from 'vuetify/es5/util/colors'
const env = require('dotenv').config()

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - MyVoc',
    title: 'MyVoc',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/styles/app.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/axiosRedirection',
    '~/plugins/notifier',
    '~/plugins/dialog',
    '~/plugins/alert',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
  ],

  // PWA module configuration
  pwa: {
    icon: {
      source: './static/icon.png',
    },
    manifest: {
      name: 'MyVoc',
      short_name: 'MyVoc',
      lang: 'en',
      display: 'fullscreen',
      background_color: '#03A678',
    },
  },
  // Auth module configuration
  auth: {
    redirect: {
      login: false,
      home: false,
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/login',
            method: 'post',
            // headers: {
            //   'X-Requested-With': 'XMLHttpRequest',
            //   'Content-Type': 'application/json',
            // },
          },
          logout: {
            url: '/logout',
            method: 'post',
            // headers: {
            //   'X-Requested-With': 'XMLHttpRequest',
            //   'Content-Type': 'application/json',
            // },
          },
          user: {
            url: '/user',
            method: 'get',
            propertyName: 'data',
            // headers: {
            //   'X-Requested-With': 'XMLHttpRequest',
            //   'Content-Type': 'application/json',
            // },
          },
        },
        tokenRequired: false,
        tokenType: false,
      },
    },
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    credentials: true,
    baseURL: env.parsed.API_URL,
  },

  env: env.parsed,

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: '#03A678',
          primaryText: '#ffffff',
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
