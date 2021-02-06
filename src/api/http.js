/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params={}, headers={}){
    if (process.env.NODE_ENV === 'development') {
      
    }else if (process.env.NODE_ENV === 'production') {
      url = '/blb1'+url
    }
    return new Promise((resolve, reject) => {
    this.$axios.get(url,{
     params: params,
     headers: headers
    })
    .then(response => {
      console.log(response)
     resolve(response.data);
    })
    .catch(err => {
     reject(err)
    })
    })
   }
   /**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url, data = {}){
    return new Promise((resolve, reject) => {
    this.$axios.post(url, data)
     .then(response => {
     resolve(response);
     }, err => {
     reject(err)
     })
    })
}