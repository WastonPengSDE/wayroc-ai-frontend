// export default [
//   {
//     path: '/user',
//     layout: false,
//     routes: [{ name: '登录', path: '/user/login', component: './user/login' }],
//   },
  
//   { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
//   {
//     path: '/admin',
//     name: '管理页',
//     icon: 'crown',
//     access: 'canAdmin',
//     routes: [
//       { path: '/admin', redirect: '/admin/sub-page' },
//       { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
//     ],
//   },
//   { name: '查询表格', icon: 'table', path: '/list', component: './table-list' },
//   { path: '/', redirect: '/welcome' },
//   { component: '404', layout: false, path: './*' },
// ];

export default [
  // 🔥 完全移除 /user 这一块
  { path: '/user', layout: false, routes: [{ path: '/user/login', component: './user/login' }] },

  // 根路径直接跳到 智能分析
  { path: '/', redirect: '/add_chart' },

  { path: '/add_chart', name: 'WAYROC AI', icon: 'barChart', component: './AddChart' },

  {
    path: '/admin',
    icon: 'crown',
    routes: [
      { path: '/admin', name: 'admin page', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: 'admin page2', component: './Admin' },
    ],
  },

  // 如果你有 Welcome 页面，也可以单独一个路由
  // { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },

  { path: '*', layout: false, component: './404' },
];
