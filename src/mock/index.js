// 导入mock
import { options } from 'less'
import Mock from 'mockjs'

// 设置延迟时间
Mock.setup({
    timeout: 400,
})

// 随机生成数据
const { roleList } = Mock.mock({
    "roleList|2-10": [{
        'roleId|+1': 1,
        roleName: '@ctitle(4,6)'
    }],
})

// 定义一个接口，拦截指定的请求
Mock.mock(/Role\/List/,"get",(options)=>{
    return roleList
})

// Mock.mock(/post/,'post',(options)=>{
//     return {}
// })

Mock.mock(/Role\/Add/,"post",(options)=>{
    let { body } = options
    let obj = JSON.parse(body)
    obj.idroleId = roleList.length + 1
    roleList.push(obj)
    return {
        success: true,
        message: '添加成功'
    } 
})