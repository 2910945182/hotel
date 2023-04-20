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
import Guest from '../views/guest/Guest.vue'

const routes = [
    {
        path: '/',
        name: 'Index',
        meta: {
            title: '酒店管理系统'
        },
        component: Index
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录'
        },
        component: Login
    },
    {
        path: '/layout',
        name: 'Layout',
        meta: {
            title: '酒店管理系统'
        },
        redirect: { name: 'Mine' },
        component: Layout,
        children: [
            {
                path:'home',
                name:'Home',
                meta: {
                    title: '营业统计',
                    role: [1]
                },
                component: Home
            },
            {
                path:'email',
                name:'Email',
                meta: {
                    title: '邮件'
                },
                component: Email
            },
            {
                path:'message',
                name:'Message',
                meta: {
                    title: '消息'
                },
                component: Message
            },
            {
                path: 'mine',
                name: 'Mine',
                meta: {
                    title: '个人中心',
                },
                component: Mine
            },
            {
                path: 'resetPwd',
                name: 'ResetPwd',
                meta: {
                    title: '修改密码'
                },
                component: ResetPwd
            },
            {
                path:'role',
                name: 'Role',
                meta: {
                    title: '角色管理',
                    role: [1]
                },
                component: Role
            },
            {
                path: 'admin',
                name: 'Admin',
                meta: {
                    title: '账户管理',
                    role: [1]
                },
                component: Admin
            },
            {
                path: 'roomType',
                name: 'RoomType',
                meta: {
                    title: '客房类型管理',
                    role: [1]
                },
                component: RoomType
            },
            {
                path: 'room',
                name: 'Room',
                meta: {
                    title: '客房管理',
                    role: [1]
                },
                component: Room
            },
            {
                path: 'guest',
                name: 'Guest',
                meta: {
                    title: '订单管理'
                },
                component: Guest
            },
            {
                path: '/:pathMatch(.*)*',
                name: 'Error404',
                meta: {
                    title: '404'
                },
                component: Error404
            },
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to,from,next)=>{

    if(to.meta && to.meta.title) {
        document.title = to.meta.title
    }

    if(to.meta && to.meta.role) {
        let roleId = localStorage.getItem('roleId')
        
        if(to.meta.role.includes(Number(roleId))) {
            next()
        } else {
            next(false)
        }
    } else {
        next()
    }
})

export default router