import request from '@/api/request'

/**
 * 分类列表
 * @returns
 */
export function getAllCategory() {
  return request({
    url: `/lejuAdmin/category/getAllCategory`,
    method: 'get'
  })
}
