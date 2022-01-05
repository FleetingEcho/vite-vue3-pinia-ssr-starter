import App from './App.vue'
import '@/assets/css/index.css'
import createStore, { storeKey } from './store/'
import { createApp } from 'vue'
import { isPromise } from './utils'
import createRouter from './router/'
import { sync } from 'vuex-router-sync'
import Antd from 'ant-design-vue'

import 'font-awesome/css/font-awesome.min.css'
import './index.scss'
import 'element-plus/theme-chalk/base.css'
import 'ant-design-vue/lib/style/index.css'
// @ts-ignore
import { createPinia } from 'pinia'
//====
const router = createRouter()
const store = createStore()
sync(store, router)
const piniaStore = createPinia()
const app = createApp(App)
app.use(piniaStore)
app.use(Antd)
app.use(router).use(store, storeKey)

router.beforeResolve((to: any, from: any, next: any) => {
  let diffed = false
  const matched = router.resolve(to).matched
  const prevMatched = router.resolve(from).matched
  // inject ssr-state
  // piniaStore.state.value = window.__PINIA_STATE__
  // piniaStore.state.value = window.__INITIAL_STATE__PINIA
  if (from && !from.name) {
    return next()
  }
  const activated = matched.filter((c: any, i: any) => {
    return diffed || (diffed = prevMatched[i] !== c)
  })
  if (!activated.length) {
    return next()
  }
  const matchedComponents: any = []
  for (let route of matched) {
    matchedComponents.push(...Object.values(route.components))
  }
  const asyncDataFuncs = matchedComponents.map((component: any) => {
    const asyncData = component.asyncData || null
    if (asyncData) {
      const config = {
        store,
        piniaStore,
        route: to
      }
      if (isPromise(asyncData) === false) {
        return Promise.resolve(asyncData(config))
      }
      return asyncData(config)
    }
  })
  try {
    Promise.all(asyncDataFuncs).then(() => {
      next()
    })
  } catch (err) {
    next(err as any)
  }
})

if (window?.__INITIAL_STATE__) {
  store.replaceState(window?.__INITIAL_STATE__)
}
router.isReady().then(() => {
  app.mount('#app', true)
})
