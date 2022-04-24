import request from '@/api/request'

/**
 * 获取广告列表
 * @returns
 */
export function adsList() {
  return request({
    url: `/lejuAdmin/advertise/adsList`,
    method: 'get'
  })
}

export function delAds(adsId) {
  return request({
    url: `/lejuAdmin/advertise/delAds/${adsId}`,
    method: 'delete'
  })
}

/**
 * 添加广告
 * @param {*} data
 * @returns
 */
export function addAds(data) {
  return request({
    url: `/lejuAdmin/advertise/addAds`,
    method: 'post',
    data
  })
}

/**
 * 更新广告
 * @param {*} data
 * @returns
 */
export function updateAds(data) {
  return request({
    url: `/lejuAdmin/advertise/updateAds`,
    method: 'post',
    data
  })
}

