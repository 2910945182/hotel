import { get, post } from '../utils/request.js'

import { msg_e, msg_s, confirm } from '../utils/msg'

export let list = (params) => {
    let ret = get('Room/List', params)
    return ret
}

export let add = async (params) => {
    if (!checkInput(params)) return false
    let { success, message } = await post('Room/Add', params)
    console.log(message)
    if (success) {
        msg_s(message)
    } else {
        msg_e(message)
    }
    return success
}

export let update = async (params) => {
    if (!checkInput(params)) return false
    let { success, message } = await post('Room/Update', params)
    if (success) {
        msg_s(message)
    } else {
        msg_e(message)
    }
    return success
}

export let del = async (params) => {
    await confirm('是否确定删除')
    let { success, message } = await post('Room/Delete', params)
    if (success) {
        msg_s(message)
    } else {
        msg_e(message)
    }
    return success
}

let checkInput = (params) => {
    if (!params.roomId) {
        msg_e('请输入房间号')
    } else if (params.roomStateId==0) {
        msg_e('请选择房间状态')
    } else if (params.roomTypeId==0) {
        msg_e('请选择房间类型')
    } else {
        return true
    }
    return false
}