import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import Layout from '../views/Layout.vue'
import Role from '../views/role/Role.vue'
import Admin from '../views/admin/Admin.vue'
import Mine from '../views/admin/Mine.vue'
import Message from '../views/home/Message.vue'
import Home from '../views/home/Home.vue'
import Email from '../views/home/Email.vue'
import ResetPwd from '../views/admin/ResetPwd.vue'
import Error404 from '../views/Error404.vue'
import RoomType from '../views/roomType/RoomType.vue'
import Room from '../views/room/Room.vue'

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/layout',
        name: 'Layout',
        component: Layout,
        children: [
            // 首页
            {
                path:'home',
                name:'Home',
                component: Home
            },
            // 邮件
            {
                path:'email',
                name:'Email',
                component: Email
            },
            // 消息
            {
                path:'message',
                name:'Message',
                component: Message
            },
            // 个人中心
            {
                path: 'mine',
                name: 'Mine',
                component: Mine
            },
            // 修改密码
            {
                path: 'resetPwd',
                name: 'ResetPwd',
                component: ResetPwd
            },
            // 角色管理
            {
                path:'role',
                name: 'Role',
                component: Role
            },
            // 账户管理
            {
                path: 'admin',
                name: 'Admin',
                component: Admin
            },
            // 客房类型管理
            {
                path: 'roomType',
                name: 'RoomType',
                component: RoomType
            },
            // 客房管理
            {
                path: 'room',
                name: 'Room',
                component: Room
            }
        ]
    },
    // 404页面
    {
        path: '/:pathMatch(.*)*',
        name: 'Error404',
        component: Error404
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 导入nprogress
import NProgress from 'nprogress'
// 导入nprogress的样式
import 'nprogress/nprogress.css'


// 定义路由导航前置守卫
// router.beforeEach((to,from,next)=>{
//     NProgress.start();
//     next()
// })

// 定义路由导航后置守卫
// router.afterEach((to,from)=>{
//     NProgress.done();
// })

export default router