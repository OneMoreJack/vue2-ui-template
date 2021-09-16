const navConfig = require('../nav.config.json')

module.exports = {
  title: 'CIAS-UI',
  description: '中保车服公共组件库(PC)',
  themeConfig: {
    sidebarDepth: 0,
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/component/guide/installation' },
    ],

    sidebar: {
      '/component/': [
        {
          title: '开发指南',
          collapsable: false,
          children: [
            'guide/installation',
            'guide/quickstart'
          ]
        },
        {
          title: '基础组件',
          collapsable: false,
          children: [
            ...navConfig.basic
          ]
        },
        {
          title: '业务组件',
          collapsable: false,
          children: [
            ...navConfig.business
          ]
        }
      ]
    }
  }
}
