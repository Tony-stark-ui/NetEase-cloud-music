// 引入axios
import axios from 'axios'
import $store from '@/store/index'

export const request = axios.create({
  baseURL: 'http://localhost:3000',
  method: 'GET'
})

request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  $store.commit('loading');
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  $store.commit('closeLoading')
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


export default request