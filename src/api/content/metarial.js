
import request from '@/api/request'
/**
 *获取素材列表
 * @param {*} start 开始页数
 * @param {*} limit 每页数量
 * @returns
 */
export function findMaterialByPage(start, limit) {
  return request({
    url: `/lejuAdmin/material/findMaterialByPage/${start}/${limit}`,
    method: 'get'
  })
}

export function delMaterial(id) {
  return request({
    url: `/lejuAdmin/material/delMaterial/${id}`,
    method: 'delete'
  })
}

