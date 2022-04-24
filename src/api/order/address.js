import request from '@/api/request'

/**
 * 获取地址列表
 * @returns
 */
export function addressList() {
  return request({
    url: `/lejuAdmin/companyAddress/addressList`,
    method: 'get'
  })
}

/**
 * 删除地址
 * @param {*} id 地址id
 * @returns
 */
export function companyAddress(id) {
  return request({
    url: `/lejuAdmin/companyAddress/${id}`,
    method: 'delete'
  })
}

/**
 * 更改默认发货地址
 * @param {*} data 地址id
 * @returns
 */
export function setSendOne(data) {
  return request({
    url: `/lejuAdmin/companyAddress/setSendOne`,
    method: 'post',
    data
  })
}

/**
 * 更改默认收货地址
 * @param {*} data 地址id
 * @returns
 */
export function setReceiveOne(data) {
  return request({
    url: `/lejuAdmin/companyAddress/setReceiveOne`,
    method: 'post',
    data
  })
}

// 获取明细
export function getCompanyAddress(id) {
  return request({
    url: `/lejuAdmin/companyAddress/${id}`,
    method: 'get'
  })
}

/**
 * 添加地址
 * @param {*} data
 * @returns
 */
export function saveAdd(data) {
  return request({
    url: `/lejuAdmin/companyAddress/save`,
    method: 'post',
    data
  })
}

/**
 * 编辑地址
 * @param {*} data
 * @returns
 */
export function updateAdd(data) {
  return request({
    url: `/lejuAdmin/companyAddress/update`,
    method: 'post',
    data
  })
}
