import Vue from 'vue'
import Router from 'vue-router'
import qs from 'qs' 
// import Login from '@/views/Login'
// import techInfo from '@/views/pages/techInfo'
const _import = require('./_import_' + process.env.NODE_ENV);

Vue.use(Router);

let routerList = [];
function importAll(r) {
  r.keys().forEach(
    (key) => routerList = routerList.concat(r(key).default)
  )
}
// require.context(url,bool,reg) url查找路径 bool是否查找子目录 reg正则表达式
importAll(require.context('./',true,/\.routes\.js/));
// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}


const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: _import('Index'),
      redirect: '/Index',
      meta: {
        title: '首页',
        requireAuth: true
      },
      children: [
        ...routerList,
      ]
    },
    
  ]
})
/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
export function urlParse(url) {
  // let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = url.match(reg);
  // ['?id=12345', '&a=b']
   if (arr) {
  arr.forEach((item) => {
  let tempArr = item.substring(1).split('=');
  let key = decodeURIComponent(tempArr[0]);
  let val = decodeURIComponent(tempArr[1]);
  obj[key] = val;
    });
   }
  return obj;
  };
  router.afterEach((to, from, next) => {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  })
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
      document.title = to.meta.title
    }
    console.log('Hello world');
    // const query = qs.parse(location.search.substring(1))
    console.log(urlParse(location.hash))
    // console.log(location.hash.split('=')[1])
    let etokenQuer = urlParse(location.hash)
    console.log(Object.keys(etokenQuer))
    var query = Object.keys(etokenQuer).length > 0 &&etokenQuer.etoken  ?  etokenQuer.etoken : ''
    let token = localStorage.getItem('userToken');
    console.log('tokenlainjie-----' + query)
    console.log('tokelogin----' + token)
    if(query){
      // token = query.token
      localStorage.setItem("userToken",query)
      
    }else if(token){
      localStorage.setItem("userToken",token)
    }
    next();
  })
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
//   debugger
//   // if(JSON.stringify(query) == "{}"){
//   //   // console.log('1111')
//   //   // next('/login');
//   // }

  
//   if (to.path === '/login') {
//     next();
//   } else {
//     // const query = qs.parse(location.search.substring(1))
//     // console.log(query.etoken)
//     // let token = localStorage.getItem('userToken');
//     // console.log(token)
//     let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBpZCI6NDMsIm9wZW5pZCI6IiIsImlkIjoxLCJvcmdpZCI6IjIifQ.m5LnpQlggxTJlhYUCM9axAu82p6_Iv0dl4O66CUh2kQ'
//     // console.log(token)
//     // if ( token === 'null' || token === '') {
//     if(!token){
//       next('/login');
//     } else {
//       // localStorage.setItem("userToken",query.etoken)
//       next();
//     }
//   }
// });
// router.beforeEach((to, from, next) => {
//   debugger
//     if (to.meta.title) {
//       document.title = to.meta.title
//     }
//     next({path:'/Index'})
//     // next()
//   /* 判断该路由是否需要登录权限 */
//   if (to.path === '/login') {
    
//     // next();
//   } 
//   //else {
//     if(to.matched&&to.matched.some(record => record.meta.requireAuth)) {
      
//     const query = qs.parse(location.search.substring(1))
//     console.log(query)
//     let token = null
    
//     if(query&&query.token){
//       token = query.token
//       localStorage.setItem("userToken",token)
     
//     }
    
//     // let token1 = localStorage.getItem('userToken')
//     // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBpZCI6NDMsIm9wZW5pZCI6IiIsImlkIjoxLCJvcmdpZCI6IjIifQ.m5LnpQlggxTJlhYUCM9axAu82p6_Iv0dl4O66CUh2kQ'
//     // if (token || token1) {  // 判断当前的token是否存在
     
      
//     // }
//     // else {
//     //   next({
//     //     path: '/login',
//     //   })
//     // }
//   }
// // }
// });
export default router;