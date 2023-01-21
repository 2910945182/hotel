import { createRouter,createWebHashHistory } from 'vue-router'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Home from './views/Home.vue'
import Order from './views/Order.vue'
import Income from './views/Income.vue'
import Mine from './views/Mine.vue'
import Order02 from './views/Order02.vue'
import OrderDetails from './views/OrderDetails.vue'
import OrderDetails02 from './views/OrderDetails02.vue'
import OnBusiness from './views/OnBusiness.vue'
import TakeOff from './views/TakeOff.vue'
import TimeSheet from './views/TimeSheet.vue'
import Staff from './views/Staff.vue'

const routes = [
    { path: '/', redirect:'/login' },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/home', component: Home },
    { path: '/order', component: Order},
    { path: '/income', component: Income },
    { path: '/mine', component: Mine, redirect:'/mine/takeoff',
        children: [
            {
                path: 'takeoff',
                component: TakeOff,
            },
            {
                path: 'onbusiness',
                component: OnBusiness,
            },
            {
                path: 'timesheet',
                component: TimeSheet,
            }
        ],
    },
    {   
        path: '/staff', 
        component: Staff,
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        },
        beforeEnter: (to, from) => {
            // reject the navigation
            return true
        },
    },
    { path: '/order02', component: Order02 },
    { path: '/orderdetails', component: OrderDetails },
    { path: '/orderdetails02', component: OrderDetails02 },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// 全局路由导航守卫
// router.beforeEach((to,from,next)=>{
//     if(to.path==='/login') {
//         return next()
//     }

//     if(!token) {
//         return next('/login')
//     }

//     // 读取token
//     const token = localStorage.getItem('token')
//     if(to.path==='/home' && !token) {
//         next(false)
//     } else {
//         return next()
//     }
    
// })

export default router