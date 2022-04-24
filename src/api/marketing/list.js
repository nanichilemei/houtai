import request from '@/api/request'

/**
 * 获取活动列表
 * @returns
 */
export function findAllRecommends() {
  return request({
    url: `/lejuAdmin/homeRecommend/findAllRecommends`,
    method: 'get'
  })
}
/**
 * 删除活动
 * @param {*} recommendId 活动ID
 * @returns
 */
export function delRecommend(recommendId) {
  return request({
    url: `/lejuAdmin/homeRecommend/delRecommend/${recommendId}`,
    method: 'delete'
  })
}

/**
 * 添加活动
 * @param {*} data
 * @returns
 */
export function addRecommend(data) {
  return request({
    url: `/lejuAdmin/homeRecommend/addRecommend`,
    method: 'post',
    data
  })
}
