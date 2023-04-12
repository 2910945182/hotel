// 定义操作房间的api函数
import { get, post } from '../utils/request.js'
// 导入消息框
import { msg_e, msg_s, confirm } from '../utils/msg'

// 获取房间信息的方法
export let list = (params) => {
    let ret = get('Room/List', params)
    return ret
}

// 添加房间信息的方法
export let add = async (params) => {
    // 验证输入是否完整
    // if (!checkInput(params)) return false
    // 执行添加操作
    let { success, message } = await post('Room/Add', params)
    console.log(message)
    if (success) {
        msg_s(message)
    } else {
        msg_e(message)
    }
    return success
}

// 修改房间信息的方法
export let update = async (params) => {
    // 验证输入是否完整
    // if (!checkInput(params)) return false
    // 执行添加操作
    let { success, message } = await post('Room/Update', params)
    if (success) {
        msg_s(message)
    } else {
        msg_e(message)
    }
    return success
}

// 删除房间信息
export let del = async (params) => {
    // 提示是否删除
    await confirm('是否确定删除')
    let { success, message } = await post('Room/Delete', params)
    if (success) {
        msg_s(message)
    } else {
        msg_e(message)
    }
    return success
}

// 验证输入方法
let checkInput = (params) => {
    if (!params.roomId) {

    }
}


