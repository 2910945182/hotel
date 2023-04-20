//开发模式
let model = {
    // 开发阶段接口地址
    dev: 'http://119.45.221.185:8003',
    // 测试阶段接口地址
    test: 'http://119.45.221.185:8004',
    // 发布阶段接口地址
    pro: 'http://119.45.221.185:8005'
}

// 定义请求根路径
export const BASE_URL = model.dev     //根据当前开发阶段，返回对应的地址接口

// 账户头像上传地址
export const admin_upload_url = BASE_URL + '/Admin/UploadImg'

// 账户头像地址
export const admin_photo_base_url = BASE_URL + '/upload/admin/'

// 房间照片上传地址
export const room_upload_url = BASE_URL + '/RoomImg/UploadImg'

// 查看房间照片地址
export const room_photo_base_url = BASE_URL + '/upload/room/'