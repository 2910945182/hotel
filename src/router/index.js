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
import Test from '../views/Test.vue'
import Permission from '../views/permission/Permission.vue'
import Guest from '../views/guest/Guest.vue'

import { useLoginStore } from '../store/admin.js'

const routes = [
    {
        path: '/',
        name: 'Index',
        // 配置路由元信息
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
        redirect: { name: 'Home' },
        component: Layout,
        children: [
            // 首页
            {
                path:'home',
                name:'Home',
                meta: {
                    title: '营业统计'
                },
                component: Home
            },
            // 邮件
            {
                path:'email',
                name:'Email',
                meta: {
                    title: '邮件'
                },
                component: Email
            },
            // 消息
            {
                path:'message',
                name:'Message',
                meta: {
                    title: '消息'
                },
                component: Message
            },
            // 个人中心
            {
                path: 'mine',
                name: 'Mine',
                meta: {
                    title: '个人中心'
                },
                component: Mine
            },
            // 修改密码
            {
                path: 'resetPwd',
                name: 'ResetPwd',
                meta: {
                    title: '修改密码'
                },
                component: ResetPwd
            },
            // 角色管理
            {
                path:'role',
                name: 'Role',
                meta: {
                    // 只有角色编号为 1 的管理员才能访问
                    title: '角色管理',
                    permission: [1],
                    // 设置该路由权限
                    role: [1]
                },
                component: Role
            },
            // 账户管理
            {
                path: 'admin',
                name: 'Admin',
                meta: {
                    title: '账户管理',
                },
                component: Admin
            },
            // 客房类型管理
            {
                path: 'roomType',
                name: 'RoomType',
                meta: {
                    title: '客房类型管理',
                    role: [1]
                },
                component: RoomType
            },
            // 客房管理
            {
                path: 'room',
                name: 'Room',
                meta: {
                    title: '客房管理'
                },
                component: Room
            },
            // 顾客管理
            {
                path: 'guest',
                name: 'Guest',
                meta: {
                    title: '顾客管理'
                },
                component: Guest
            },
            // 权限管理
            {
                path: 'permission',
                name: 'Permission',
                meta: {
                    title: '权限管理'
                },
                component: Permission
            }
        ]
    },
    // 404页面
    // {
    //     path: '/:pathMatch(.*)*',
    //     name: 'Error404',
    //     meta: {
    //         title: '404'
    //     },
    //     component: Error404
    // },
    // 测试页面
    {
        path: '/test',
        component: Test
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
router.beforeEach((to,from,next)=>{
    // 开启进度条
    // NProgress.start();

    // 设置网页的title属性值
    if(to.meta && to.meta.title) {
        document.title = to.meta.title
    }

    // 判断权限
    if(to.meta && to.meta.role) {
        // 获取当前登录用户的角色id
        let roleId = useLoginStore().admin.role.roleId
        console.log(roleId)
        // 判断当前登录用户有无访问该路由的权限
        if(to.meta.role.includes(roleId)) {
            next()
        }
    } else {
        next()
    }
    
    // 表示需要验证权限
    // if(to.meta && to.meta.permission) {
    //     if(to.meta.permission.includles(parseInt(localStorage.getItem('roleId')))) {
    //         next()
    //     } else {
    //         router.push('/layout')
    //     }
    // } else {
    //     调用next()方法，表示路由继续往下走
    //     next()
    // }
})

// 定义路由导航后置守卫
// router.afterEach((to,from)=>{
    // 判断路由元信息中，有没有配置标题信息
    // 如果配置，显示它里面配置的标题
    // if(to.meta && to.meta.title ) {
    //     document.title = to.meta.title
    // }

    // 关闭进度条
    // NProgress.done();
// })

export default router