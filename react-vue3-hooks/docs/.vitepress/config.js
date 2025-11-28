import commonConfig from '../../../vitepress-common-config';

export default {
  title: 'React Vue3 Hooks',

  ...commonConfig,

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/',
      title: 'React Vue3 Hooks',
      description: 'React Vue3 跨栈融合工具包，提供 Vue3 生命周期与 Hook APIs 的高度还原。同时精准模拟 Vue 的 <KeepAlive>、<Transition> 等核心组件和路由系统，为您的跨框架适配提供Hook 级与组件级的完整解决方案。',
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
            text: '适配指南',
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
          { text: '安装', link: '/guide/installation' },
          { text: '对照表', link: '/guide/api-comparison' },
          {
            text: '钩子',
            items: [
              {
                text: '状态', items: [
                  { text: 'useState$', link: '/hooks/useState$' },
                  { text: 'useReadonly', link: '/hooks/useReadonly' },
                ]
              },
              {
                text: '副作用', items: [
                  { text: 'useWatch', link: '/hooks/useWatch' },
                  { text: 'useWatchEffect', link: '/hooks/useWatchEffect' },
                ]
              },
              {
                text: '生命周期', items: [
                  { text: 'useMounted', link: '/hooks/useMounted' },
                  { text: 'useUnmounted', link: '/hooks/useUnmounted' },
                  { text: 'useUpdated', link: '/hooks/useUpdated' },
                ]
              },
            ]
          },
          { text: 'nextTick', link: '/nextTick' },
        ],
      }
    },

    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'React Vue3 Hooks',
      description: `React Vue3 Cross-Stack Integration Toolkit provides a high-fidelity reproduction of Vue3's lifecycle and Hook APIs. It also accurately simulates Vue's core components such as <KeepAlive>  and <Transition>, as well as the routing system, offering a complete Hook-level and component-level solution for your cross-framework adaptation.`,

      themeConfig: {
        socialLinks: [
          {
            icon: 'github',
            link: 'https://github.com/smirk9581/react-vue3-hooks',
          },
        ],

        nav: [
          {
            text: 'Adaptation Guide',
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
          { text: 'Installation', link: '/en/guide/installation' },
          { text: 'Comparison Table', link: '/en/guide/api-comparison' },
          {
            text: 'Hook',
            items: [
              {
                text: 'State', items: [
                  { text: 'useState$', link: '/en/hooks/useState$' },
                  { text: 'useReadonly', link: '/en/hooks/useReadonly' },
                ]
              },
              {
                text: 'Side Effect', items: [
                  { text: 'useWatch', link: '/en/hooks/useWatch' },
                  { text: 'useWatchEffect', link: '/en/hooks/useWatchEffect' },
                ]
              },
              {
                text: 'Lifecycle', items: [
                  { text: 'useMounted', link: '/en/hooks/useMounted' },
                  { text: 'useUnmounted', link: '/en/hooks/useUnmounted' },
                  { text: 'useUpdated', link: '/en/hooks/useUpdated' },
                ]
              },
            ]
          },
          { text: 'nextTick', link: '/en/nextTick' },
        ],
      }
    },
  },
};