export default {
  // 文档标题，会显示在浏览器标签页和站点导航栏左上角
  title: 'VuReact.js',
  // 网站描述，用于 SEO
  description: `A modern automatic compilation tool that quickly converts Vue3 code to React (Jsx/Tsx). It meets the daily business and component engineering needs of small and medium-sized projects, enabling lossless syntax conversion and precise logic migration. Leverage Vue's mental model advantages to write React code—ready to use right after conversion.`,

  head: [
    ['meta', { name: 'robots', content: 'noindex, nofollow' }]
  ],


  // 全局主题配置
  themeConfig: {
    logo: '/logo.svg',
  },

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/',
      title: 'React Vue3 Hooks',
      description: '跨框架组件封装工具',
      themeConfig: {
        logo: '/logo.svg',

        socialLinks: [
          {
            icon: 'github',
            link: 'https://github.com/smirk9581/vureact',
          },
          {
            icon: 'gitee',
            link: 'https://gitee.com/Ryan-Zhong/vureact',
          },
        ],

        nav: [
          {
            text: '指南',
            items: [
              {
                text: 'react vue3 components',
                link: 'https://react-vue3-components.vercel.app/guide/introduction.html'
              },
              {
                text: 'react vue3 router',
                link: 'https://react-vue3-components.vercel.app/router/guide.html'
              },
              {
                text: 'react vue3 hooks',
                link: 'https://react-vue3-hooks.vercel.app/guide/introduction.html'
              },
            ]
          },
        ],

        sidebar: [
          { text: '介绍', link: '/guide/introduction' },
          { text: '安装', link: '/guide/install' },
          { text: '教程说明', link: '/guide/tutorial-instructions' },
          {
            text: 'xxx',
            items: [
              { text: '', link: '' },
            ]
          },
        ],

        footer: {
          message: '基于 MIT 许可证发布。',
          copyright: 'Copyright © 2025-present Owen Dells',
        },
      }
    },

    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'React Vue3 Hooks',
      description: 'A modern automatic compilation tool...',

      themeConfig: {
        socialLinks: [
          {
            icon: 'github',
            link: 'https://github.com/smirk9581/vureact',
          },
        ],

        nav: [
          {
            text: 'Guides',
            items: [
              {
                text: 'react vue3 components',
                link: 'https://react-vue3-components.vercel.app/en/guide/introduction.html'
              },
              {
                text: 'react vue3 router',
                link: 'https://react-vue3-components.vercel.app/en/router/guide.html'
              },
              {
                text: 'react vue3 hooks',
                link: 'https://react-vue3-hooks.vercel.app/en/guide/introduction.html'
              },
            ]
          },
        ],

        sidebar: [
          { text: 'Introduction', link: '/en/guide/introduction' },
          { text: 'Install', link: '/en/guide/install' },
          { text: 'Tutorial Instructions', link: '/guide/tutorial-instructions' },
          {
            text: 'Hooks',
            items: [
              { text: '', link: '' },
            ]
          },
        ],

        footer: {
          message: 'Released under the MIT License.',
          copyright: 'Copyright © 2025-present Owen Dells',
        },
      }
    },
  },
};