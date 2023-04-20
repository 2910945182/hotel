import { ElMessage, ElMessageBox } from 'element-plus'

// 成功
export let msg_s = (message,duration=2000)=>{
    ElMessage({
        showClose: true,
        message,
        duration,
        type: 'success',
    })
}

// 错误
export let msg_e = (message,duration=2000)=>{
    ElMessage({
        showClose: true,
        message,
        duration,
        type: 'error',
    })
}

// 警告
export let msg_w = (message,duration=2000)=>{
    ElMessage({
        showClose: true,
        message,
        duration,
        type: 'warnig',
    })
}

//确定取消框
export let confirm = (message) => {
    return new Promise((resolve,reject)=>{
        ElMessageBox.confirm(
            message,
            '警告',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
        .then(() => {
            resolve()
        })
        .catch(() => {
        })
    })
}