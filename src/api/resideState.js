// 操作结账状态的api

// 导入请求函数
import { get,post } from '../utils/request.js'

// 导入消息框
import { msg_e,msg_s,confirm } from '../utils/msg'

// 查询结账状态信息
export let list = async(params)=>{
    let ret = await get('ResideState/List',params)
    return ret
}
