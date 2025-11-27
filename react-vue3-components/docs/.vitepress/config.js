export default {
  // 文档标题，会显示在浏览器标签页和站点导航栏左上角
  title: 'VuReact.js',
  // 网站描述，用于 SEO
  description: `The tool fully simulates Vue 3's built-in components and usage patterns, covering nearly all core functions and APIs. It also includes a dedicated Vue 3 lifecycle & Hook API adaptation toolkit for React, faithfully replicating their core functionalities and usage paradigms within technical feasibility. A flexible, production-ready solution for cross-framework migration and integration.`,

  // 全局主题配置
  themeConfig: {
    logo: '/logo.svg',
  },

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/',
      title: 'React Vue3 Components',
      description: '跨框架组件封装工具',
      themeConfig: {
        logo: '/logo.svg',

        socialLinks: [
          {
            icon: 'github',
            link: 'https://github.com/smirk9581/react-vue3-components',
          },
          {
            icon: 'gitee',
            link: 'https://gitee.com/Ryan-Zhong/react-vue3-components',
          },
        ],

        nav: [
          {
            text: '指南',
            items: [
              {
                text: 'react vue3 router',
                link: 'https://react-vue3-components.vercel.app/router/guide.html'
              },
              {
                text: 'react vue3 hooks',
                link: 'https://react-vue3-hooks.vercel.app/guide/introduction.html'
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
          { text: '安装', link: '/guide/installation' },
          { text: '教程说明', link: '/guide/tutorial-instructions' },
          {
            text: '组件',
            items: [
              { text: 'Transition', link: '/components/transition' },
              { text: 'TransitionGroup', link: '/components/transition-group' },
              { text: 'KeepAlive', link: '/components/keep-alive' },
              { text: 'Teleport', link: '/components/teleport' },
              { text: 'Suspense', link: '/components/suspense' },
              { text: 'Component', link: '/components/dynamic-component' },
            ]
          },
          {
            text: '路由',
            items: [
              { text: '入门', link: '/router/guide' },
              { text: '动态路由匹配', link: '/router/dynamic-matching' },
              { text: '路由的匹配语法', link: '/router/route-matching-syntax' },
              { text: '命名路由', link: '/router/named-routes' },
              { text: '编程式导航', link: '/router/navigation' },
              { text: '不同的历史模式', link: '/router/history-mode' },
              { text: '导航守卫', link: '/router/navigation-guards' },
              { text: '路由元信息', link: '/router/meta' },
              { text: '拓展RouterView', link: '/router/router-view-custom' },
              { text: '过渡动效', link: '/router/transitions' },
              { text: '路由懒加载', link: '/router/lazy-loading' },
              { text: '拓展RouterLink', link: '/router/extending-router-link' },
            ]
          },
          {
            text: '其他',
            items: [
              { text: 'Transition 样式表', link: '/other/transition-css' },
            ],
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
      title: 'React Vue3 Components',
      description: 'A modern automatic compilation tool...',

      themeConfig: {
        socialLinks: [
          {
            icon: 'github',
            link: 'https://github.com/smirk9581/react-vue3-components',
          },
        ],

        nav: [
          {
            text: 'Guides',
            items: [
              {
                text: 'react vue3 router',
                link: 'https://react-vue3-components.vercel.app/en/router/guide.html'
              },
              {
                text: 'react vue3 hooks',
                link: 'https://react-vue3-hooks.vercel.app/en/guide/introduction.html'
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
          { text: 'Installation', link: '/en/guide/installation' },
          { text: 'Tutorial Instructions', link: '/en/guide/tutorial-instructions' },
          {
            text: 'Components',
            items: [
              { text: 'Transition', link: '/en/components/transition' },
              { text: 'TransitionGroup', link: '/en/components/transition-group' },
              { text: 'KeepAlive', link: '/en/components/keep-alive' },
              { text: 'Teleport', link: '/en/components/teleport' },
              { text: 'Suspense', link: '/en/components/suspense' },
              { text: 'Component', link: '/en/components/dynamic-component' },
            ]
          },
          {
            text: 'Router',
            items: [
              { text: 'Getting Started', link: '/en/router/guide' },
              { text: 'Dynamic Route Matching', link: '/en/router/dynamic-matching' },
              { text: 'Route Matching Syntax', link: '/en/router/route-matching-syntax' },
              { text: 'Named Routes', link: '/en/router/named-routes' },
              { text: 'Navigation', link: '/en/router/navigation' },
              { text: 'Different History modes', link: '/en/router/history-mode' },
              { text: 'Navigation Guards', link: '/en/router/navigation-guards' },
              { text: 'Route Meta Fields', link: '/en/router/meta' },
              { text: 'Custom RouterView', link: '/en/router/router-view-custom' },
              { text: 'Transitions', link: '/en/router/transitions' },
              { text: 'Lazy Loading', link: '/en/router/lazy-loading' },
              { text: 'Extending Router Link', link: '/en/router/extending-router-link' },
            ]
          },
          {
            text: 'Others',
            items: [
              { text: 'Transition Stylesheet', link: '/en/other/transition-css' },
            ],
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