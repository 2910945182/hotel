// 定义操作房间的api函数
import { get, post } from '../utils/request.js'
import { msg_e,msg_s,confirm } from '../utils/msg'

export let list = (params) => {
    let ret = get('Room/List',params)
    return ret
}