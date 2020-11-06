import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login'
import Register from '@/views/register'
import UserRules from '@/views/userRules'

import Main from '@/views/main'

import Index from '@/views/index'
import IndexInfo from '@/views/indexInfo'
import Trend from '@/views/trend'

import Cooking from '@/views/cooking'
import CookingInfo from '@/views/cookingInfo'

import Video from '@/views/video'

import Date from '@/views/date'

import My from '@/views/my'
import MyInfo from '@/views/myinfo'
import MyPassword from '@/views/mypassword'


Vue.use(VueRouter)


const routes = [

    {path:'/login',name:'Login',component:Login},
    {path:'/register',name:'Register',component:Register},
    {path:'/userrules',name:'UserRules',component:UserRules},

    {path:'/', component:Main,
        children: [
            
            {path:'/',name:'Index',component:Index},

            {path:'/cooking',name:'Cooking',component:Cooking},

            {path:'/video',name:'Video',component:Video},

            {path:'/date',name:'Date',component:Date},

            {path:'/my',name:'My',component:My},
      
        ]
    },

    {path:'/indexinfo/:id',name:'IndexInfo',component:IndexInfo},

    {path:'/trend',name:'Trend',component:Trend},

    {path:'/cookinginfo/:id',name:'CookingInfo',component:CookingInfo},

    {path:'/myinfo',name:'MyInfo',component:MyInfo},
    {path:'/mypassword',name:'MyPassword',component:MyPassword},

]

const router = new VueRouter({
    //mode: 'history',
    routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router