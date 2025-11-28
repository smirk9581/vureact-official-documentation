export default {
  head: [
    // ! robots 必须在正式发布项目后移除
    ['meta', { name: 'robots', content: 'noindex, nofollow' }],
    ['link', {
      rel: 'icon',
      href: '/favicon.ico',
      sizes: 'any',
      type: 'image/webp'
    }],
    [
      'style',
      {},
      `
      :root {
        --vp-c-brand-1: #4DD9E0;
        --vp-c-brand-2: #3FB9C1;
        --vp-c-brand-3: #62E0E7;
        --vp-nav-logo-height: 40px;
      }
      `
    ]
  ],

  themeConfig: {
    logo: '/logo.webp',
    footer: {
      message: 'Released under the MIT License',
      copyright: 'Copyright © 2025-present Owen Dells',
    },
  },
}