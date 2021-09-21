import { request } from '@/utils/request'

// 登录
export const userLogin = (params) => {
  return request({
    url: '/login/cellphone',
    params
  })
}
// 发送验证码
export const sendCaptch = (phone) => {
  return request({
    url: '/captcha/sent',
    params: {
      phone: phone
    }
  })
}

// 检测手机号是否注册
export const testPhoneNUmber = (phone) => {
  return request({
    url: '/cellphone/existence/check',
    params: {
      phone: phone
    }
  })
}
//校验验证码
export const testCaptch = (phone, captcha) => {
  return request({
    url: '/captcha/verify',
    params: {
      phone,
      captcha
    }
  })
}
// 注册
export const register = (params) => {
  return request({
    url: '/register/cellphone',
    params
  })
}