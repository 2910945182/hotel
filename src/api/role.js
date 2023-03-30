//定义操作角色的API函数--围绕后台实现增删改查

//导入请求函数
import { get,post } from '../utils/request.js'

// 导入消息框
import { msg_e,msg_s } from '../utils/msg'

//返回所有的角色信息
export let list = async() => {
    let data = await get('Role/List')
    return data
}

//添加角色信息
export let add = async(params) => {
    // 验证信息
    if(!params.roleName) {
        msg_e('请输入角色名称')
        return false
    } 
    let { success,message } = await post('Role/Add',params)
    if(success) {
        msg_s(message)
    } else {
        msg_e(message)
    }
    return success
}

export let update = async(params) => {
    // 验证信息
    if(!params.roleName) {
        msg_e('请输入角色名称')
        return false
    }
}

// 删除角色信息
export let del = async(params) => {
    // 提示是否确定删除
    await confirm('是否确定删除')
    let { success,message } = await post('role/delete',params)
    if(success) {
        msg_s(message)
    } else {
        msg_e(message)
    }
    return success
}

// 验证方法
export let checkInput = (params) => {
    // 验证信息
    if(!params.roleName) {
        msg_e('请输入角色名称')
        return false
    } else {
        return true
    }
}