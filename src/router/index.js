import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Shop from '@/components/Shop'
import AllItem from '@/components/AllItem'
import SingleItem from '@/components/SingleItem'
import Faq from '@/components/Faq'
import CreateOrder from '@/components/CreateOrder'
import Game from '@/components/Game'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
      {
      	path: '',
      	name: 'Shop',
      	component: Shop,
      	children: [
      	{
      		path: '',
      		name: 'AllItem',
      		component: AllItem
      	},
      	{
      		path: 'product/:itemId',
      		name: 'SingleItem',
      		component: SingleItem
      	},
      	]
      },
      {
      	path: 'faq',
      	name: 'Faq',
      	component: Faq
      },
      {
      	path: 'createOrder',
      	name: 'CreateOrder',
      	component: CreateOrder
      },
      {
      	path: 'game',
      	name: 'Game',
      	component: Game
      },
      ]
    },
  ]
})
