import axios from 'axios'

//不是export default 默认导出
export function request(config) {
  return new Promise((resolve, reject) =>{
    // 1.创建axios实例
    const instance = axios.create({
      // baseURL: 'http://123.207.32.32:8000',
      baseURL: 'http://152.136.185.210:7878/api/m5',
      timeout: 5000
    })

    // 配置请求和响应拦截
    // 请求拦截
    instance.interceptors.request.use(config => {
      return config
    },err=> {
      return err
    })
    // 响应拦截
    instance.interceptors.response.use(config => {
      return config
    },err => {
      console.log('来到了response拦截failure中');
      return err
    })
    // 发送真正的网络请求
    //这里返回的是promise
    // 不是export default 默认导出
    instance(config).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
