import { get, post } from '../utils/request.js'

import { msg_e,msg_s,confirm } from '../utils/msg'

export let list = async()=>{
    let r = await get('RoomType/List')
    return r
}

export let add = async (params)=>{
    if(!checkInput(params)) {
        return false
    }

    let { success,message } = await post('RoomType/Add',params)
    
    if(success) {
        msg_s(message)
    } else {
        msg_e(message)
    }
    return success
}

export let update = async(params)=>{
    if(!checkInput(params)) {
        return false
    }
    let { success,message } = await post('RoomType/Update',params)
    if(success){
        msg_s(message)
    } else {
        msg_e(message)
    }
    return success
}

export let del = async(params)=>{
    await confirm('是否确定删除')
    let { success,message } = await post('RoomType/Delete',params)
    if(success){
        msg_s(message)
    } else {
        msg_e(message)
    }
    return success
}

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

export let totalTypePrice = async()=>{
    let ret = await get('RoomType/TotalTypePrice')
    return ret
}