// 定义操作房间类型的api函数
import { get, post } from '../utils/request.js'
// 导入消息框
import { msg_e,msg_s,confirm } from '../utils/msg'

// 获取所有房间类型的方法
export let list = async()=>{
    let r = await get('RoomType/List')
    return r
}

// 添加房间类型的方法
export let add = async (params)=>{
    // if(!checkInput(params)) {
    //     return false
    // }

    let { success,message } = await post('RoomType/Add',params)
    
    if(success) {
        msg_s(message)
    } else {
        msg_e(message)
    }
    return success
}

// 删除房间类型的方法
export let del = async(params)=>{
    // 提示是否删除
    await confirm('是否确定删除')
    let { success,message } = await post('RoomType/Delete',params)
    if(success){
        msg_s(message)
    } else {
        msg_e(message)
    }
    return success
}

// 验证输入方法
let checkInput = (params)=>{
    if (!params.roomTypeName) {
        msg_e('请输入房型名称')
    } else if (!params.roomTypePrice) {
        msg_e('请输入房型价格')
    } else if(isNaN(params.roomTypePrice)) {
        msg_e('房型价格必须为数字')
    } else if (!params.bedNum) {
        msg_e('请输入床位数量')
    } else if (!Number.isInteger(Number.parseInt(params.bedNum))) {
        msg_e('床位数量必须为整数')
    } else {
        return true
    }
    return false
}

// 统计房间类型的销售额
export let totalTypePrice = async()=>{
    let ret = await get('RoomType/TotalTypePrice')
    return ret
}