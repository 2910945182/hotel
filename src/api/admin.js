import { get, post } from '../utils/request.js'

import md5 from 'js-md5'

import { msg_s, msg_e, confirm } from '../utils/msg'

export let login = async (params) => {
    let { ckMe } = params
    params.loginPwd = md5(md5(params.loginPwd).split('').reverse().join(''))
    let { success, message, token } = await get('Admin/Login', params)

    if (success) {
        sessionStorage.setItem('token', token)
        // 将token信息设置为请求头
        // setToken()
        msg_s(message)
        localStorage.setItem('loginId', params.loginId)
        if (ckMe) {
            localStorage.setItem('loginPwd', params.loginPwd)
        }
    } else {
        msg_e(message)
    }
    return success
}

export let LoginAuto = async () => {
    let loginId = localStorage.getItem('loginId')
    let loginPwd = localStorage.getItem('loginPwd')
    
    if (loginId && loginPwd) {
        let params = {
            loginId,
            loginPwd,
        }
        let { success, message, token } = await get('Admin/Login', params)
        if (success) {
            sessionStorage.setItem('token', token)
            // 将token信息设置为请求头
            // setToken()
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

export let list = async (params) => {
    let ret = await get('/admin/list', params)
    return ret
}

export let add = async (params) => {
    if (!params.loginId) {
        msg_e('请输入账号')
        return false
    } else if (!params.loginPwd) {
        msg_e('请输入密码')
        return false
    } else if (params.loginPwd.length < 6) {
        msg_e('密码长度不能小于6位')
        return false
    } else if (params.loginPwd != params.loginPwd2) {
        msg_e('前后密码不一致，请重新输入')
        return false
    } else if (!params.name) {
        msg_e('请输入姓名')
        return false
    } else if (!params.phone) {
        msg_e('请输入电话')
        return false
    } else if (!(/^1\d{10}$/.test(params.phone))) {
        msg_e('电话格式错误')
        return false
    } else if (params.role == 0) {
        msg_e('请选择角色')
        return false
    }

    params.loginPwd = md5(md5(params.loginPwd).split('').reverse().join(''))

    let { success, message } = await post('Admin/Add', params)
    if (success) {
        msg_s(message)
    } else {
        msg_e(message)
    }
    return success
}

export let update = async (params) => {
    if (!params.name) {
        msg_e('请输入姓名')
        return false
    } else if (!params.phone) {
        msg_e('请输入电话')
        return false
    } else if(!(/^1\d{10}$/.test(params.phone))) {
        msg_e('电话格式错误')
        return false
    } else if (params.role == 0) {
        msg_e('请选择角色')
        return false
    }

    let { success, message } = await post('Admin/Update', params)

    if (success) {
        msg_s(message)
    } else {
        msg_e(message)
    }
    return success
}

export let del = async (params) => {
    await confirm('是否确定删除')
    let { success, message } = await post('Admin/Delete', params)
    if (success) {
        msg_s(message)
    } else {
        msg_e(message)
    }
    return success
}

export let getOne = async (params) => {
    let r = await get('Admin/GetOne', params)
    return r
}

export let resetPwd = async (params) => {
    if (!params.oldLoginPwd) {
        msg_e('请输入初始密码')
        return false
    } else if (!params.newLoginPwd) {
        msg_e('请输入新的密码')
        return false
    } else if (params.newLoginPwd != params.newLoginPwd2) {
        msg_e('两次密码不一致，请重新输入')
        return false
    } else if (params.newLoginPwd.length < 6) {
        msg_e('密码长度不能小于6位')
        return false
    }

    params.oldLoginPwd = md5(md5(params.oldLoginPwd).split('').reverse().join(''))
    params.newLoginPwd = md5(md5(params.newLoginPwd).split('').reverse().join(''))

    let { success, message } = await post('Admin/ResetPwd',params)
    if (success) {
        msg_s(message)
    } else {
        msg_e(message)
    }
    return success
}