 const _import = require('./_import_' + process.env.NODE_ENV);

// 首页模块
export default [
    {
        path: '/index',
        name: 'index',
        component: _import('pages/pdf'),
        meta: {
          title: '核酸报告单查询',
          tree: 0,
          requireAuth: true,  
        },
      },
      {
        path: '/pdfImg',
        name: 'pdfImg',
        component: _import('pages/pdfImg'),
        meta: {
          title: '核酸报告结果',
          tree: 0,
          requireAuth: false,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },
        
 
]