export default {
  head: [
    // ! robots 必须在正式发布项目后移除
    ['meta', { name: 'robots', content: 'noindex, nofollow' }],
    ['link', {
      rel: 'icon',
      href: '/favicon.ico'
    }],
    [
      'style',
      {},
      `
      :root {
        --vp-c-brand-1: #4DD9E0;
        --vp-c-brand-2: #3FB9C1;
        --vp-c-brand-3: #62E0E7;
        --vp-nav-logo-height: 38px;
      }
      `
    ]
  ],

  themeConfig: {
    logo: '/logo.png',
    footer: {
      message: 'Released under the MIT License',
      copyright: 'Copyright © 2025-present Owen Dells',
    },
  },
}