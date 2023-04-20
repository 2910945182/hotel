import { get } from '../utils/request.js'

export let list = async () => {
    let ret = await get('RoomState/List')
    return ret
}

export let listToUpdate = async () => {
    let ret = await get('RoomState/ListToUpdate')
    return ret
}