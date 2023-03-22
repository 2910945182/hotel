// 定义操作房间类型的api函数
import { get, post } from '../utils/request.js'
import { msg_e,msg_s,confirm } from '../utils/msg'

export let list = async()=>{
    let r = await get('RoomType/List')
    return r
}