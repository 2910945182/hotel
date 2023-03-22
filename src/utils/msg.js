// 封装消息框
import { ElMessage,ElMessageBox } from "element-plus";

// 成功的消息框
export let msg_s = (message,duration=2000)=>{
    ElMessage({
        showClose: true,
        message,
        duration,
        type: 'success',
    })
}

// 错误的消息框
export let msg_e = (message,duration=2000)=>{
    ElMessage({
        showClose: true,
        message,
        duration,
        type: 'error',
    })
}

// 警告的消息框
export let msg_w = (message,duration=2000)=>{
    ElMessage({
        showClose: true,
        message,
        duration,
        type: 'warnig',
    })
}

//确定取消框
export let confirm = (message,title='提示',type='warning') => {
    ElMessageBox.confirm(
        message,
        title,
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type,
        }
    )
    .then(() => {
        resolve(true)
    })
    .catch(() => {
        reject(false)
    })
}