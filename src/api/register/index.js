import request from '@/api/request'

/**
 * 注册用户列表
 * @param {*} start 开始页数
 * @param {*} limit 每页数量
 * @returns
 */
export function findMembersByPage(start, limit) {
  return request({
    url: `/lejuAdmin/member/findMembersByPage/${start}/${limit}`,
    method: 'get'
  })
}
