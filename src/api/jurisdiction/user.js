import request from '@/api/request'

/**
 * 获取用户列表
 * @param {*} start 开始页数
 * @param {*} limit 每页数量
 * @param {*} data 搜索条件
 * @returns
 */
export function findUsersByPage(start, limit, data) {
  return request({
    url: `/admin/sysAuth/user/findUsersByPage/${start}/${limit}`,
    method: 'post',
    data
  })
}

/**
 * 新增用户
 * @param {*} data
 * @returns
 */
export function saveUserRoles(data) {
  return request({
    url: `/admin/sysAuth/user/saveUserRoles`,
    method: 'post',
    data
  })
}

/**
 * 获取用户明细
 * @param {} id
 * @returns
 */
export function getUserInfo(id) {
  return request({
    url: `/admin/sysAuth/user/${id}`,
    method: 'get'
  })
}

/**
 * 更新用户信息
 * @param {*} data
 * @returns
 */
export function updateUserRoles(data) {
  return request({
    url: `/admin/sysAuth/user/updateUserRoles`,
    method: 'put',
    data
  })
}
/**
 * 删除用户
 * @param {*} id
 * @returns
 */
export function removeUser(id) {
  return request({
    url: `/admin/sysAuth/user/removeUser/${id}`,
    method: 'delete'
  })
}

// 获取所有资源
export function findAllPermissions() {
  return request({
    url: `/admin/sysAuth/permission/findAllPermissions`,
    method: 'get'
  })
}

/**
 * 获取角色
 * @param {*} start
 * @param {*} limit
 * @returns
 */
export function findRolesByPage(start, limit) {
  return request({
    url: `/admin/sysAuth/role/findRolesByPage/${start}/${limit}`,
    method: 'get'
  })
}

/**
 *
 * @returns 获取所有角色
 */
export function findAllRoles() {
  return request({
    url: `/admin/sysAuth/role/findAllRoles`,
    method: 'get'
  })
}

/**
 * 新增角色
 * @param {*} data
 * @returns
 */
export function saveRolePermissions(data) {
  return request({
    url: `/admin/sysAuth/role/saveRolePermissions`,
    method: 'post',
    data
  })
}

/**
 * 角色明细
 * @param {*} id
 * @returns
 */
export function findRolePermissions(id) {
  return request({
    url: `/admin/sysAuth/role/findRolePermissions/${id}`,
    method: 'get'
  })
}

/**
 * 删除角色
 * @param {*} id
 * @returns
 */
export function removeRole(id) {
  return request({
    url: `/admin/sysAuth/role/removeRole/${id}`,
    method: 'delete'
  })
}
