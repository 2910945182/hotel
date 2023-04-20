import { get, post } from "../utils/request.js";

import { msg_e, msg_s, confirm } from "../utils/msg";

export let list = async (params) => {
    let ret = await get("GuestRecord/List", params);
    return ret;
};

export let add = async (params) => {
    if (!checkInput(params)) return false;
    let { success, message } = await post("GuestRecord/Add", params);
    if (success) {
        msg_s(message);
    } else {
        msg_e(message);
    }
    return success;
};

export let update = async (params) => {
    if (!checkInput(params)) return false;
    let { success, message } = await post("GuestRecord/Update", params);
    if (success) {
        msg_s(message);
    } else {
        msg_e(message);
    }
    return success;
};

export let del = async (params) => {
    await confirm("是否确定删除");
    let { success, message } = await post("GuestRecord/Delete", params);
    if (success) {
        msg_s(message);
    } else {
        msg_e(message);
    }
    return success;
};

let checkInput = (params) => {
    if (!params.identityId) {
        msg_e("请输入身份证号");
    } else if (params.identityId.length !== 18) {
        msg_e("身份证号位数为18位");
    } else if (!params.guestName) {
        msg_e("请输入顾客姓名");
    } else if (!params.phone) {
        msg_e("请输入电话");
    } else if (!params.roomId) {
        msg_e("请选择房间");
    } else if (!params.resideDate) {
        msg_e("请选择入住日期");
    } else if (!params.deposit) {
        msg_e("请输入押金");
    } else if (!/^\d+$/.test(params.deposit)) {
        msg_e("押金格式错误");
    } else if (!params.guestNum) {
        msg_e("请输入人数");
    } else if (!/^\d+$/.test(params.guestNum)) {
        msg_e("入住人数格式错误");
    } else {
        return true;
    }
    return false;
};

export let checkout = async (params) => {
    let { totalMoney } = await post("GuestRecord/Checkout", params);
    msg_s("结账成功，支付" + totalMoney + "元");
};