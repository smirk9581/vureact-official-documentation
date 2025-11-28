import commonConfig from '../../../vitepress-common-config';

export default {
  title: 'React Vue3 Hooks',

  description: 'A Vue 3 lifecycle and Hook API adaptation toolkit designed specifically for React, faithfully replicating its core functionality and usage patterns within technical feasibility to provide a flexible solution for cross-framework integration.',

  ...commonConfig,

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/',
      title: 'React Vue3 Hooks',
      description: '跨框架组件封装工具',
      themeConfig: {
        socialLinks: [
          {
            icon: 'github',
            link: 'https://github.com/smirk9581/react-vue3-hooks',
          },
          {
            icon: 'gitee',
            link: 'https://gitee.com/Ryan-Zhong/react-vue3-hooks',
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
                text: 'vureact',
                link: 'https://vureact.vercel.app/guide/introduction.html'
              },
            ]
          },
        ],

        sidebar: [
          { text: '介绍', link: '/guide/introduction' },
          { text: '安装', link: '/guide/install' },
          { text: '教程说明', link: '/guide/tutorial-instructions' },
          {
            text: '钩子',
            items: [
              { text: '', link: '' },
            ]
          },
        ],
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
            link: 'https://github.com/smirk9581/react-vue3-hooks',
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
                text: 'vureact',
                link: 'https://vureact.vercel.app/en/guide/introduction.html'
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
              { text: 'xx', link: '' },
            ]
          },
        ],
      }
    },
  },
};