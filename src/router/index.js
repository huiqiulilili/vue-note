import Vue from 'vue'
import Router from 'vue-router'
import MyFooter from "../components/MyFooter";


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MyFooter',
      component: MyFooter
    }
  ]
})
