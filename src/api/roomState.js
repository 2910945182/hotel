//定义操作房间状态的API函数
import { get,post } from '../utils/request.js'
import { msg_e,msg_s } from '../utils/msg'

export let list = async()=>{
    let ret = await get('RoomState/List')
    return ret
}

export let listToUpdate = async()=>{
    let ret = await get('RoomState/ListToUpdate')
    return ret
}
