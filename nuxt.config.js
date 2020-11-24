import colors from 'vuetify/es5/util/colors'

export default {
  target: 'static',
  ssr: true,
  server: {
    host: '0.0.0.0'
  },
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  loading: {
    color: '#fff'
  },

  css: [],

  plugins: [],

  buildModules: [
    '@nuxtjs/vuetify',
    'nuxt-purgecss',
    // '@nuxtjs/google-fonts'

  ],
  // purgeCSS: {
  //   enabled: ({
  //     isDev,
  //     isClient
  //   }) => (!isDev && isClient), // or `false` when in dev/debug mode
  // },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/auth',
    ['nuxt-twa-module', {
      /* module options */
      // https://github.com/voorhoede/nuxt-twa-module#readme
      defaultUrl: 'https://nuxt-twa-netlify.netlify.app',
      hostName: 'nuxt-twa-netlify.netlify.app',
      sha256Fingerprints: ['/* your SHA-256 keys */'],
      applicationId: 'com.example.example',
      launcherName: 'Your app name',
      versionCode: 1,
      versionName: '1.0',
      statusBarColor: 'grey',
      iconPath: '/static/icon.png',
      distFolder: '.nuxt/dist/client',
    }],
  ],

  // pwa config
  pwa: {
    meta: {
      /* meta options */
    },
    // manifest: {
    //   display: 'standalone'
    // },
    workbox: {
      cleanupOutdatedCaches: true,
      runtimeCaching: [{
        urlPattern: 'https://fonts.googleapis.com/.*',
        // handler: 'cacheFirst',
        cacheableResponse: {
          statuses: [0, 200]
        }
      }, {
        urlPattern: 'https://cdn.jsdelivr.net/.*',
        // handler: 'cacheFirst',
        cacheableResponse: {
          statuses: [0, 200]
        }
      }]
    },
    manifest: {
      short_name: process.env.npm_package_title,
      name: process.env.npm_package_title,
      start_url: '/',
      background_color: 'grey',
      display: 'standalone',
      lang: 'en',
      theme_color: 'black',
      nativeUi: true
    },
  },

  //auth
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: false,
          logout: false,
          user: false
        },
        tokenRequired: true,
        tokenType: 'bearer',
        globalToken: true,
        autoFetchUser: false
      }
    }
  },
  axios: {},
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  purgeCSS: {
    mode: 'postcss',
    // enabled: ({
    //   isDev,
    //   isClient
    // }) => (!isDev && isClient),
    whitelist: [
      'container',
      'row',
      'spacer',
      'aos-animate',
      'col',
      '[type=button]',
      'v-application p'
    ],
    whitelistPatterns: [
      /^v-.*/,
      /^col-.*/,
      /^theme-.*/,
      /^rounded-.*/,
      /^data-aos-.*/,
      /^(red|grey)--text$/,
      /^text--darken-[1-4]$/,
      /^text--lighten-[1-4]$/
    ],
    whitelistPatternsChildren: [
      /^post-content/,
      /^v-input/,
      /^swiper-.*/,
      /^pswp.*/,
      /^v-text-field.*/,
      /^v-progress-linear/
    ]
  },
  build: {
    // extractCss: ({
    //   isDev,
    //   isClient
    // }) => (!isDev && isClient), // or `false` when in dev/debug mode

    extend(config, ctx) {}
  }
}
