export function username(field, value, cb) {
  // 判断value是否合法
  if (!/^\w{4,8}$/.test(value)) {
    return cb(new Error('用户名是4-8位字母数字下划线'))
  }
  // 没有错误
  cb();
}
export function phone(field, value, cb) {
  // 判断value是否合法
  if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    .test(value)) {
    return cb(new Error('手机号格式不正确'))
  }
  // 没有错误
  cb();
}
export function password(field, value, cb) {
  // 判断value是否合法
  if (!/[a-zA-Z].*\d|\d.*[a-zA-Z]/.test(value)) {
    return cb(new Error('密码要包含字母和数字'))
  }
  // 没有错误
  cb();
}
// 验证短信
export function captcha(field, value, cb) {
  // 判断value是否合法
  if (!/^[1-9]\d*$/.test(value)) {
    return cb(new Error('验证码不正确'))
  }
  // 没有错误
  cb();
}
// 重复性效验
export function repeat(data, name, fields, value, cb) {
  // 不能为空
  if (!value) {
    return cb(new Error(`请输入${name}`))
  }
  // 重复性效验
  if (value != data) {
    return cb(new Error(`${name}与${name}不一致`))
  }
  // 没有问题
  cb()
}