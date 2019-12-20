import Vue from 'vue'
import Router from 'vue-router'
import menu from '../../examples/menu.js'

Vue.use(Router)

// const menu = require('../../examples/menu.js')
let routes = []

function format (str) {
  let _str = ''
  str.split('').forEach(item => {
    if (item !== item.toLowerCase()) {
      _str += `-${item.toLowerCase()}`
    } else {
      _str += item
    }
  })
  return _str
}

Object.entries(menu).forEach(typeArr => {
  typeArr[1].forEach(item => {
    if (typeArr[0] === 'developmentGuide') {
      routes.push({
        path: `/${item.to}`,
        name: item.to,
        meta: {
          title: item.name
        },
        component: () => import(`./views/${item.to}.md`)
      })
    } else if (typeArr[0] === 'directives') {
      routes.push({
        path: `/docs/directives/${item.to}`,
        name: item.to,
        meta: {
          title: item.name
        },
        component: () => import(`../../src/directives/${format(item.to)}/${item.to}.md`)
      })
    } else {
      routes.push({
        path: `/docs/components/${typeArr[0]}/${item.to}`,
        name: item.to,
        meta: {
          title: item.name
        },
        component: () => import(`../../src/components/${format(item.to)}/${item.to}.md`)
      })
    }
  })
})

const router = new Router({
  base: '/',
  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        document.querySelector('.page') && (document.querySelector('.page').scrollTop = 0)
        resolve({ x: 0, y: 0 })
      }, 10)
    })
  },
  routes: [
    { path: `/`, redirect: '/home' },
    {
      path: `/`,
      component: () => import(`./components/Layuout.vue`),
      children: routes
    },
    { path: `/home`, name: 'home', component: () => import(`./components/Home.vue`) },
    { path: '*', name: '404', component: () => import(`./components/NotFound.vue`) }
  ]
})

router.afterEach(to => {
  if (to.meta && to.meta.title) {
    document.title = `Neon | ${to.meta.title}`
  } else {
    document.title = `Neon`
  }
})

export const links = routes

export default router
