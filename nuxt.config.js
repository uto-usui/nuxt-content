import theme from '@nuxt/content-theme-docs'

const config = theme({
  docs: {
    primaryColor: '#FF6473',
  },

  loading: { color: '#00CD81' },

  i18n: {
    locales: () => [
      {
        code: 'ja',
        iso: 'ja_JP',
        file: 'ja_JP.js',
        name: '日本語',
      },
      {
        code: 'en',
        iso: 'en-US',
        file: 'en-US.js',
        name: 'English',
      },
    ],
    defaultLocale: 'ja',
  },

  buildModules: ['@nuxtjs/google-gtag'],

  'google-gtag': {
    id: 'xxx',
    config: {
      send_page_view: false, // might be necessary to avoid duplicated page track on page reload
    },
    debug: false, // use dev mode
  },

  workbox: {
    // ios safari video support
    cachingExtensions: '~~/plugins/workbox-range-request.js',
    runtimeCaching: [
      // google fonts
      {
        urlPattern: '^https://fonts.(?:googleapis|gstatic).com/(.*)',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      },
      {
        // cdn
        urlPattern: 'https://cdn.jsdelivr.net/.*',
        handler: 'cacheFirst',
      },
    ],
  },
})

export default config
