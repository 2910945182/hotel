//定义操作房间状态的API函数--围绕后台实现增删改查

//导入请求函数
import { get,post } from '../utils/request.js'

// 导入消息框
import { msg_e,msg_s } from '../utils/msg'

// 获取所有房间状态的方法
export let list = async()=>{
    let ret = await get('RoomState/List')
    return ret
}

// 获取所有房间状态的方法（没有入驻信息）
export let listToUpdate = async()=>{
    let ret = await get('RoomState/ListToUpdate')
    return ret
}
