import colors from 'vuetify/es5/util/colors'
const siteData = require('./assets/content/site/sitedata.json')

import getSiteMeta from "./utils/getSiteMeta"
const meta = getSiteMeta(null, siteData)

export default {
  target: 'static',
  ssr: true,
  server: {
    host: '0.0.0.0'
  },
  head: {
    htmlAttrs: {
      lang: "en-US",
    },
    title: siteData.name,
    meta: [
      ...meta,
      {
        charset: "utf-8"
      },
      {
        name: "HandheldFriendly",
        content: "True"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        property: "og:site_name",
        content: siteData.name
      },
      {
        hid: "description",
        name: "description",
        content: siteData.description,
      },
      // {
      //   property: "og:image:width",
      //   content: "740"
      // },
      // {
      //   property: "og:image:height",
      //   content: "300"
      // },
      {
        name: "twitter:site",
        content: "@" + siteData.networks.filter(network => network.name === "Twitter")[0].handle.replace('@@', '@')
      },
      // {
      //   name: "twitter:card",
      //   content: "summary"
      //   // content: siteData.description
      // },
    ],
    link: [{
        rel: "icon",
        type: "image/x-icon",
        href: siteData.favicon || '/favicon.ico'
      },
      {
        hid: "canonical",
        rel: "canonical",
        href: siteData.url // process.env.BASE_URL,
      },
    ]
  },
  // head: {
  //   titleTemplate: '%s - ' + siteData.name,
  //   title: process.env.npm_package_name || '',
  //   meta: [{
  //       charset: 'utf-8'
  //     },
  //     {
  //       name: 'viewport',
  //       content: 'width=device-width, initial-scale=1'
  //     },
  //     {
  //       hid: 'description',
  //       name: 'description',
  //       content: process.env.npm_package_description || ''
  //     }
  //   ],
  //   link: [{
  //     rel: 'icon',
  //     type: 'image/x-icon',
  //     href: '/favicon.ico'
  //   }]
  // },
  loading: {
    color: '#fff'
  },
  css: [],
  plugins: [],
  buildModules: ['@nuxtjs/vuetify', 'nuxt-purgecss'],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/auth',
    ['nuxt-twa-module', {
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
      // distFolder: '.nuxt/dist/client',
    }],
  ],
  pwa: {
    meta: {},
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
    extend(config, ctx) {}
  }
}
