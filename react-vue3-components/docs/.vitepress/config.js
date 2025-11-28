import commonConfig from '../../../vitepress-common-config';

export default {
  title: 'React Vue3 Components',

  ...commonConfig,

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/',
      title: 'React Vue3 Components',
      description: 'React Vue3 跨栈融合工具包，精准模拟 Vue 的 <KeepAlive>、<Transition> 等核心组件和路由系统。 同时提供 Vue3 生命周期与 Hook APIs 的高度还原，为您的跨框架适配提供组件级与 Hook 级的完整解决方案。',
      themeConfig: {
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
            text: '适配指南',
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
      }
    },

    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'React Vue3 Components',
      description: `React Vue3 Cross-Stack Integration Toolkit accurately simulates Vue's core components such as <KeepAlive> and <Transition>, as well as the routing system. It also provides a high-fidelity reproduction of Vue3's lifecycle and Hook APIs, offering a complete component-level and Hook-level solution for your cross-framework adaptation.`,

      themeConfig: {
        socialLinks: [
          {
            icon: 'github',
            link: 'https://github.com/smirk9581/react-vue3-components',
          },
        ],

        nav: [
          {
            text: 'Adaptation Guide',
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
      }
    },
  },
};