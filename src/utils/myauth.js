const LEJU_ADMIN_TOKEN = 'leju_admin_token'
const LEJU_USERINFO = 'leju_userinfo'
// 保存token到本地
export function setToken(token) {
  window.localStorage.setItem(LEJU_ADMIN_TOKEN, token)
}
// 获取本地保存的token
export function getToken() {
  const token = window.localStorage.getItem(LEJU_ADMIN_TOKEN)
  if (token) {
    return token
  } else {
    return null
  }
}
// 删除保存的token
export function removeToken() {
  window.localStorage.removeItem(LEJU_ADMIN_TOKEN)
}
// 保存用户信息
export function saveUserInfo(userInfo) {
  if (userInfo) {
    window.localStorage.setItem(LEJU_USERINFO, JSON.stringify(userInfo))
  }
}
// 获取用户信息
export function getUserInfo() {
  const userInfoStr = window.localStorage.getItem(LEJU_USERINFO)
  if (userInfoStr) {
    return JSON.parse(userInfoStr)
  } else {
    return null
  }
}
// 删除用户信息
export function removeUserInfo() {
  window.localStorage.removeItem(LEJU_USERINFO)
}
