import request from '@/api/request'

/**
 * 退单列表
 * @param {*} start 开始页数
 * @param {*} limit 每页数量
 * @param {*} data 搜索条件
 * @returns
 */
export function findReturnApply(start, limit, data) {
  return request({
    url: `/lejuAdmin/orderReturn/findReturnApply/${start}/${limit}`,
    method: 'post',
    data
  })
}

/**
 * 退单明细
 * @param {*} id
 * @returns
 */
export function orderReturn(id) {
  return request({
    url: `/lejuAdmin/orderReturn/${id}`,
    method: 'get'
  })
}

/**
 * 同意退款
 * @param {*} id
 * @param {*} data
 * @returns
 */
export function agreeApply(id, data) {
  return request({
    url: `/lejuAdmin/orderReturn/agreeApply/${id}`,
    method: 'post',
    data
  })
}

/**
 * 拒绝退款
 * @param {*} id
 * @param {*} data
 * @returns
 */
export function rejectApply(id, data) {
  return request({
    url: `/lejuAdmin/orderReturn/rejectApply/${id}`,
    method: 'post',
    data
  })
}

/**
 * 确认收货
 * @param {*} id
 * @param {*} data
 * @returns
 */
export function receiveProduct(id, data) {
  return request({
    url: `/lejuAdmin/orderReturn/receiveProduct/${id}`,
    method: 'post',
    data
  })
}
