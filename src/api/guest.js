// 导入请求函数
import { get,post } from '../utils/request.js'

// 导入消息框
import { msg_e,msg_s,confirm } from '../utils/msg'

// 查询客房信息
export let list = async(params)=>{
    let ret = await get('GuestRecord/List',params)
    return ret
}

