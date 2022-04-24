import request from '@/api/request'

/**
 * 品牌列表
 * @param {*} start 开始页数
 * @param {*} limit 每页数量
 * @returns
 */
export function findBrandByPage(start, limit) {
  return request({
    url: `/lejuAdmin/brand/findBrandByPage/${start}/${limit}`,
    method: 'get'
  })
}

/**
 * 删除品牌
 * @param {*} id 品牌id
 * @returns
 */
export function delBrand(id) {
  return request({
    url: `/lejuAdmin/brand/delBrand/${id}`,
    method: 'delete'
  })
}

/**
 * 新增品牌
 * @param {*} data
 * @returns
 */
export function addBrand(data) {
  return request({
    url: `/lejuAdmin/brand/addBrand`,
    method: 'post',
    data
  })
}

/**
 * 编辑品牌
 * @param {*} data
 * @returns
 */
export function updateBrand(data) {
  return request({
    url: `/lejuAdmin/brand/updateBrand`,
    method: 'post',
    data
  })
}

/**
 * 是否展示
 * @param {*} data
 * @returns
 */
export function switchShowStatus(data) {
  return request({
    url: `/lejuAdmin/brand/switchShowStatus`,
    method: 'post',
    data
  })
}
