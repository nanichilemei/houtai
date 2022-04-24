
import request from '@/api/request'
/**
 * 获取文章列表
 * @param {*} start 开始页
 * @param {*} limit 每页数量
 * @param {*} data 搜索条件
 * @returns
 */
export function findArticles(start, limit, data) {
  return request({
    url: `/lejuAdmin/productArticle/findArticles/${start}/${limit}`,
    method: 'post',
    data
  })
}

/**
 * 改变文章显示状态
 * @param {*} data 传入的id与修改的状态
 * @returns
 */
export function changeShowStatus(data) {
  return request({
    url: `/lejuAdmin/productArticle/changeShowStatus`,
    method: 'post',
    data
  })
}

/**
 * 删除文章
 * @param {*} id 文章id
 * @returns
 */
export function delArticle(id) {
  return request({
    url: `/lejuAdmin/productArticle/del/${id}`,
    method: 'delete'
  })
}

/**
 * 新增文章
 * @param {*} data 传入的值
 * @returns
 */
export function addArticle(data) {
  return request({
    url: `/lejuAdmin/productArticle/addArticle`,
    method: 'post',
    data
  })
}
/**
 * 获取文章明细
 * @param {*} id 文章id
 * @returns
 */
export function productArticle(id) {
  return request({
    url: `/lejuAdmin/productArticle/productArticle/${id}`,
    method: 'get'
  })
}

/**
 * 更新文章
 * @param {*} data 文章明细
 * @returns
 */
export function updateArticle(data) {
  return request({
    url: `/lejuAdmin/productArticle/updateArticle`,
    method: 'post',
    data
  })
}
