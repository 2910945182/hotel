//定义操作角色的API函数
import { get,post } from '../utils/request.js'
import { msg_e,msg_s } from '../utils/msg'

export let list = async() => {
    let data = await get('Role/List')
    return data
}

export let add = async(params) => {
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
    if(!params.roleName) {
        msg_e('请输入角色名称')
        return false
    }
}

export let del = async(params) => {
    await confirm('是否确定删除')
    let { success,message } = await post('role/delete',params)
    if(success) {
        msg_s(message)
    } else {
        msg_e(message)
    }
    return success
}

export let checkInput = (params) => {
    if(!params.roleName) {
        msg_e('请输入角色名称')
        return false
    } else {
        return true
    }
}