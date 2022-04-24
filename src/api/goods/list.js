import request from '@/api/request'
/**
 * 商品列表
 * @param {*} start 开始页数
 * @param {*} limit 每页数量
 * @param {*} data 搜索条件
 * @returns
 */
export function productsByPage(start, limit, data) {
  return request({
    url: `/lejuAdmin/product/productsByPage/${start}/${limit}`,
    method: 'post',
    data
  })
}

/**
 * 删除商品
 * @param {*} productId 商品id
 * @returns
 */
export function delGoods(productId) {
  return request({
    url: `/lejuAdmin/product/del/${productId}`,
    method: 'delete'
  })
}

/**
 * 所有品牌
 * @returns
 */
export function findAllBrand() {
  return request({
    url: `/lejuAdmin/brand/findAllBrand`,
    method: 'get'
  })
}

/**
 * 新增
 * @param {*} data 新增的数据
 * @returns
 */
export function addProductAndSkus(data) {
  return request({
    url: `/lejuAdmin/product/addProductAndSkus`,
    method: 'post',
    data
  })
}

/**
 * 获取商品明细
 * @param {*} productId 商品id
 * @returns
 */
export function productSkusDetail(productId) {
  return request({
    url: `/lejuAdmin/product/productSkusDetail/${productId}`,
    method: 'get'
  })
}

/**
 * 更新
 * @param {*} data 数据
 * @returns
 */
export function updateProductAndSkus(data) {
  return request({
    url: `/lejuAdmin/product/updateProductAndSkus`,
    method: 'post',
    data
  })
}

/**
 * 根据id获取sku
 * @param {*} productId 商品id
 * @returns
 */
export function getSkusByProductId(productId) {
  return request({
    url: `/lejuAdmin/sku/getSkusByProductId/${productId}`,
    method: 'get'
  })
}

/**
 * 删除库存
 * @param {*} skuId skuId
 * @returns
 */
export function delSku(skuId) {
  return request({
    url: `/lejuAdmin/sku/delSku/${skuId}`,
    method: 'delete'
  })
}

/**
 * 更新sku库存
 * @param {*} data 数据
 * @returns
 */
export function updateSkuInfo(data) {
  return request({
    url: `/lejuAdmin/sku/updateSkuInfo`,
    method: 'post',
    data
  })
}

/**
 * 新增sku库存
 * @param {*} data
 * @returns
 */
export function addProductSkus(data) {
  return request({
    url: `/lejuAdmin/sku/addProductSkus`,
    method: 'post',
    data
  })
}
