import request from '@/api/request'

/**
 * 获取订单列表
 * @param {*} start 开始页数
 * @param {*} limit 每页数量
 * @param {*} data 搜索条件
 * @returns
 */
export function findOrdersByPage(start, limit, data) {
  return request({
    url: `/lejuAdmin/order/findOrdersByPage/${start}/${limit}`,
    method: 'post',
    data
  })
}

/**
 * 订单详情明细
 * @param {*} orderId
 * @returns
 */
export function orderDetail(orderId) {
  return request({
    url: `/lejuAdmin/order/orderDetail/${orderId}`,
    method: 'get'
  })
}

/**
 * 确认发货
 * @param {*} data
 * @returns
 */
export function sendDone(data) {
  return request({
    url: `/lejuAdmin/order/sendDone`,
    method: 'post',
    data
  })
}
