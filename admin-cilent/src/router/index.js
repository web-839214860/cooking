import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login'
import Main from '@/views/main'
import NotFound from '../views/404'

import Media from '../views/media'
import MediaAdd from '../views/mediaAdd'
import MediaEdit from '../views/mediaEdit'

import Cooking from '../views/cooking'
import CookingAdd from '../views/cookingAdd'
import CookingEdit from '../views/cookingEdit'

import Trend from '../views/trend'
import TrendAdd from '../views/trendAdd'

import Discuss from '../views/discuss'

import UserCommon from '../views/userCommon'
import UserAdmin from '../views/userAdmin'
import UserAdd from '../views/userAdd'
import UserEdit from '../views/userEdit'

import Password from '@/views/password'

Vue.use(VueRouter)

const routes = [
    {path:'/login',name:'Login',component:Login},
    {path: '*',name:'NotFound',component:NotFound},

    {path:'/',component:Main,
        children:[
            
            {path:'/',name:'Media',component:Media},
            {path:'/mediaAdd',name:'MediaAdd',component:MediaAdd},
            {path:'/mediaEdit/:id',name:'MediaEdit',component:MediaEdit},

            {path:'/cooking',name:'Cooking',component:Cooking},
            {path:'/cookingAdd',name:'CookingAdd',component:CookingAdd},
            {path:'/cookingEdit/:id',name:'CookingEdit',component:CookingEdit},

            {path:'/trend',name:'Trend',component:Trend},
            {path:'/trendAdd',name:'TrendAdd',component:TrendAdd},

            {path:'/discuss',name:'Discuss',component:Discuss},

            {path:'/userCommon',name:'UserCommon',component:UserCommon},
            {path:'/userAdmin',name:'UserAdmin',component:UserAdmin},
            {path:'/userAdd',name:'UserAdd',component:UserAdd},
            {path:'/userEdit/:id',name:'UserEdit',component:UserEdit},

            {path:'/password',name:'Password',component:Password},
            
        ]
    },

]

const router = new VueRouter({
    //mode: 'history',
    routes
  })
  
  export default router