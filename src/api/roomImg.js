// 定义操作房间图片的API函数--围绕后台实现增删改查

// 导入请求函数
import { get, post } from '../utils/request.js'

// 导入js-md5
import md5 from 'js-md5'

import { msg_s,msg_e,confirm } from '../utils/msg'

// 添加房间图片
export let add = async(params)=>{
    let { success } = await post('RoomImg/Add',params)
    return success
}

// 查询指定房间对应的房间图片
export let list = async(params)=>{
    let ret = await get('Room/List',params)
    return ret
}

// 删除房间图片
export let del = async(params)=>{
    let { success } = await post('RoomImg/Delete',params)
    return success
}