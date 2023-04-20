import { get } from '../utils/request.js'

export let list = async(params)=>{
    let ret = await get('ResideState/List',params)
    return ret
}