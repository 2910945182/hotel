import { get, post } from '../utils/request.js'

export let add = async(params)=>{
    let { success } = await post('RoomImg/Add',params)
    return success
}

export let list = async(params)=>{
    let ret = await get('RoomImg/List',params)
    return ret
}

export let del = async(params)=>{
    let { success } = await post('RoomImg/Delete',params)
    return success
}