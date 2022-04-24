<template>
  <div>
    <el-steps class="steps" :active="step" finish-status="success">
      <el-step title="商品基本信息" />
      <el-step title="添加库存信息" />
      <el-step title="添加移动端详情" />
    </el-steps>
    <el-card shadow="always" class="margin30">
      <el-form ref="formadd" :model="goods" :rules="rules" label-width="100px" size="mini">
        <div v-if="step == 1" class="step1">
          <div class="header">
            <span>基本信息</span>
            <el-divider />
          </div>
          <el-row :gutter="20">
            <el-col :span="8" :offset="0">
              <el-form-item label="商品名称" prop="name">
                <el-input v-model="goods.name" />
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="0">
              <el-form-item label="商品编码" prop="productSn">
                <el-input v-model="goods.productSn" />
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="0">
              <el-form-item label="商品分类" prop="productCategoryId">
                <el-select v-model="goods.productCategoryId" clearable placeholder="商品分类">
                  <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>

              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="0">
              <el-form-item label="商品品牌" prop="brandId">
                <el-select v-model="goods.brandId" clearable placeholder="商品分类">
                  <el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="15" :offset="0">
              <el-form-item label="商品描述">
                <el-input v-model="goods.description" type="textarea" :rows="2" placeholder="商品描述" />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="header">
            <span>商品属性</span>
            <el-divider />
          </div>
          <el-row :gutter="20">
            <el-col :span="8" :offset="0">
              <el-form-item label="商品原价" prop="originalPrice">
                <el-input-number v-model="goods.originalPrice" :min="0" />
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="0">
              <el-form-item label="促销类型">
                <el-select v-model="goods.promotionType" disabled placeholder="请选择" />
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="0">
              <el-form-item label="活动价格">
                <el-input-number v-model="goods.originalPrice" :disabled="true" :min="0" />
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="0">
              <el-form-item label="重量" prop="weight">
                <el-input-number v-model="goods.weight" :min="0" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" :offset="0">
              <el-form-item label="审核状态">
                <el-switch v-model="goods.verifyStatus" :active-value="1" :inactive-value="0" />
              </el-form-item>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-form-item label="是否上架">
                <el-switch v-model="goods.publishStatus" :active-value="1" :inactive-value="0" />
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12" :offset="0">
              <el-button type="primary" size="default" @click="abcd">点击</el-button>
            </el-col> -->
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" :offset="0">
              <el-form-item label="缩略图" prop="pic">
                <el-upload
                  ref="uploadCom"
                  class="avatar-uploader"
                  :action="uploadFileOss"
                  :headers="token"
                  :on-success="handleAvatarSuccess"
                >
                  <img v-if="goods.pic" :src="goods.pic" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="header">
            <span>其他信息</span>
            <el-divider />
          </div>
          <el-row :gutter="20">
            <el-col :span="8" :offset="0">
              <el-form-item label="推荐状态">
                <el-switch v-model="goods.recommendStatus" :active-value="1" :inactive-value="0" />
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="0">
              <el-form-item label="新品状态">
                <el-switch v-model="goods.newStatus" :active-value="1" :inactive-value="0" />
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="0">
              <el-form-item label="预告商品">
                <el-switch v-model="goods.previewStatus" :active-value="1" :inactive-value="0" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8" :offset="0">
              <el-form-item label="搜索关键词">
                <el-input v-model="goods.keywords" />
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="0">
              <el-form-item label="库存预警">
                <el-input-number v-model="goods.lowStock" :min="0" />
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="0">
              <el-form-item label="商品排序">
                <el-input-number v-model="goods.sort" :min="0" />
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" :offset="0">
              <el-form-item label="产品服务">
                <el-checkbox-group v-model="goods.serviceIds">
                  <el-checkbox label="1">无忧退货</el-checkbox>
                  <el-checkbox label="2">快速退款</el-checkbox>
                  <el-checkbox label="3">免费包邮</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>

        </div>
        <div v-if="step == 2" class="step2">
          <div class="header">
            <span>产品sku信息</span>
            <el-divider />
          </div>
          <el-row :gutter="20">
            <el-col :span="8" :offset="0">
              <el-form-item label="标题">
                <el-input v-model="goods.detailTitle" placeholder="标题" />
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="0">
              <el-form-item label="副标题">
                <el-input v-model="goods.subTitle" placeholder="副标题" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" :offset="0">
              <el-form-item label="画册图片">
                <el-upload
                  :action="uploadFileOss"
                  :headers="token"
                  :on-success="uploadAlbumPicsSuccess"
                  list-type="picture-card"
                  :auto-upload="true"
                  :before-upload="beforeCoverImg"
                  :on-remove="removeImg"
                  :file-list="imgList"
                >
                  <i slot="default" class="el-icon-plus" />
                  <!-- <div slot="file" slot-scope="{file}">
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url"
                      alt=""
                    >
                    <span class="el-upload-list__item-actions">
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                      >
                        <i class="el-icon-delete" />
                      </span>
                    </span>
                  </div> -->
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24" :offset="0">
              <el-form-item label="sku设置">
                <!-- 颜色sku -->
                <div>
                  <span>颜色: </span>
                  <el-checkbox-group v-model="skuColorTemp.skuSelectedList" style="display:inline-block;">
                    <el-checkbox v-for="(item,index) in skuColorTemp.skuList" :key="item" :label="item">
                      {{ item }}
                      <el-button type="text" size="mini" style="color:red;" @click="delColorSelect(index,item)">删除</el-button>
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
                <!-- 大小sku -->
                <div>
                  <span>大小: </span>
                  <el-checkbox-group v-model="skuSizeTemp.skuSelectedList" style="display:inline-block;">
                    <el-checkbox v-for="item in skuSizeTemp.skuList" :key="item" :label="item">
                      {{ item }}
                      <el-button type="text" size="mini" style="color:red;" @click="delSizeSelect(index,item)">删除</el-button>
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
                <!-- 创建 -->
                <div>
                  <el-input v-model="skuColorTemp.text" style="width:200px;" placeholder="颜色描述" size="mini" clearable />
                  <el-button style="margin:0 20px;" type="defautl" size="mini" @click="createOptin('color')">创建颜色选项</el-button>
                  <el-input v-model="skuSizeTemp.text" style="width:200px;" placeholder="大小描述" size="mini" clearable />
                  <el-button style="margin:0 20px;" type="defautl" size="mini" @click="createOptin('size')">创建颜色选项</el-button>
                  <el-button type="primary" size="small" @click="generate">生成sku列表</el-button>
                </div>
                <el-table :data="pmsSkuStockList" border stripe>
                  <el-table-column fixed="left" type="index" label="#" width="50" align="center" />
                  <el-table-column label="图片" width="120px">
                    <template slot-scope="scope">
                      <el-upload
                        :ref="`upload_${scope.row.tempid}`"
                        class="avatar-uploader"
                        :action="uploadFileOss"
                        :headers="token"
                        :on-success="handleSkuimgSuccess"
                        @click.native="uploadSkuImg(scope.row.tempid)"
                      >
                        <img v-if="scope.row.pic" width="100px" height="100px" :src="scope.row.pic">
                        <i v-else class="el-icon-plus avatar-uploader-icon1" />
                      </el-upload>
                    </template>
                  </el-table-column>

                  <el-table-column
                    label="颜色"
                    align="center"
                    width="200"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.color" placeholder="颜色" size="mini" clearable />
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="大小"
                    align="center"
                    width="200"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.size" placeholder="大小" size="mini" clearable />
                    </template>
                  </el-table-column>
                  <el-table-column label="价格" align="center" width="170">
                    <template slot-scope="scope">
                      <el-input-number v-model="scope.row.price" :min="0" size="mini" />
                    </template>
                  </el-table-column>
                  <el-table-column label="sku编码" align="center" width="200">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.skuCode" size="mini" placeholder="请填写sku编码" clearable />
                    </template>
                  </el-table-column>
                  <el-table-column label="库存" align="center" width="170">
                    <template slot-scope="scope">
                      <el-input-number v-model="scope.row.stock" :min="0" size="mini" />
                    </template>
                  </el-table-column>
                  <el-table-column label="预警库存" align="center" width="170">
                    <template slot-scope="scope">
                      <el-input-number v-model="scope.row.lowStock" :min="0" size="mini" />
                    </template>
                  </el-table-column>
                  <el-table-column label="锁定库存" align="center" width="170">
                    <template slot-scope="scope">
                      <el-input-number v-model="scope.row.lockStock" :min="0" size="mini" />
                    </template>
                  </el-table-column>
                  <el-table-column label="销量" align="center" width="170">
                    <template slot-scope="scope">
                      <el-input-number v-model="scope.row.sale" :min="0" size="mini" />
                    </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" align="center" width="100">
                    <template slot-scope="scope">
                      <el-button type="text" size="mini" style="color:red" @click="delSkuItem(scope.row.tempid)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>

              </el-form-item>
            </el-col>
          </el-row>

        </div>
        <div v-if="step == 3" class="step3">
          <el-form-item label="商品详情">
            <Tinymce v-model="goods.detailMobileHtml" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="goods.note" type="textarea" placeholder="备注" :rows="2" />
          </el-form-item>
        </div>

      </el-form>
      <div class="footer">
        <el-button v-if="step !== 1" size="small" @click="step--">返回上一步</el-button>
        <el-button v-if="step !== 3" type="primary" size="small" @click="ncxtStep">下一步</el-button>
        <el-button v-if="step == 3" type="primary" size="small" @click="sumbit">提交保存</el-button>
        <!-- <el-button type="primary" size="default" @click="abcd">点击</el-button> -->
      </div>

    </el-card>

  </div>
</template>
<script>
// 引入富文本
import Tinymce from '@/components/Tinymce'
// 引入uuid
import { v4 as uuidv4 } from 'uuid'
import { getAllCategory } from '@/api/goods/category'
import { findAllBrand, addProductAndSkus, productSkusDetail, updateProductAndSkus } from '@/api/goods/list'
import mix from '@/mixins/index'
export default {
  name: 'GoodsDetail',
  components: {
    Tinymce
  },
  mixins: [mix],
  data() {
    return {
      step: 1,
      goods: {
        pic: '', // 封面
        serviceIds: [], // 服务
        albumPics: [], // 画册
        detailMobileHtml: '', // 富文本
        id: ''
      },
      pmsSkuStockList: [], // sku
      categoryList: [], // 分类
      brandList: [], // 品牌
      // 验证规则
      rules: {
        name: [{ required: true, message: '请填写商品名称', trigger: 'blur' }],
        productSn: [{ required: true, message: '请填写商品编码', trigger: 'blur' }],
        productCategoryId: [{ required: true, message: '请选择商品分类', trigger: 'blur' }],
        brandId: [{ required: true, message: '请选择商品品牌', trigger: 'blur' }],
        // originalPrice: [{ mix: '1', message: '商品原价要求为大于 0 的数', trigger: 'blur' }],
        weight: [{ required: true, message: '商品重量要求为大于 0 的数', trigger: 'blur' }],
        pic: [{ required: true, message: '请上传缩略图', trigger: 'blur' }]
      },
      disabled: false,
      skuColorTemp: {
        text: '',
        skuList: [],
        skuSelectedList: []
      },
      skuSizeTemp: {
        text: '',
        skuList: [],
        skuSelectedList: []
      },
      skuTempId: '',
      id: '',
      imgList: []
    }
  },
  computed: {
  },
  created() {
    this.getInfo()
    this.id = this.$route.params.id
    if (this.id) {
      this.getCont(this.id)
    }
  },
  methods: {
    abcd() {
      var brandName = this.brandList.filter(el => el.id === this.goods.brandId)[0].name
      console.log(brandName)
      var arr = []
      this.pmsSkuStockList.forEach(el => {
        el.spData = JSON.stringify([
          {
            key: '颜色',
            value: el.color
          },
          {
            key: '大小',
            value: el.size
          }
        ])
        arr.push({
          id: el.id,
          lockStock: el.lockStock, // 锁定库存
          lowStock: el.lowStock, // 库存警戒线
          pic: el.pic, // 图片
          price: el.price, // 当前价格
          promotionPrice: 0, // 单品促销价格
          sale: el.sale, // 销量
          skuCode: el.skuCode, // sku的编码,手动填写
          spData: el.spData,
          stock: el.stock // 库存
        })
      })
      console.log(arr)
    },
    // 提交
    sumbit() {
      var arr = []
      this.pmsSkuStockList.forEach(el => {
        el.spData = JSON.stringify([
          { key: '颜色', value: el.color },
          { key: '大小', value: el.size }
        ])
        arr.push({
          lockStock: el.lockStock, // 锁定库存
          lowStock: el.lowStock, // 库存警戒线
          pic: el.pic, // 图片
          price: el.price, // 当前价格
          promotionPrice: 0, // 单品促销价格
          sale: el.sale, // 销量
          skuCode: el.skuCode, // sku的编码,手动填写
          spData: el.spData,
          stock: el.stock // 库存
        })
      })
      var brandName = this.brandList.filter(el => el.id === this.goods.brandId)[0].name
      var cateName = this.categoryList.filter(el => el.id === this.goods.productCategoryId)[0].name
      var albumPics = this.goods.albumPics.join(',')
      var serviceIds = this.goods.serviceIds.join(',')
      var product = {
        pmsSkuStockList: arr,
        product: {
          id: this.id,
          albumPics: albumPics, //  画册图片，连产品图片限制为5张，以逗号分割 ,会在移动端商品详情页展示
          brandId: this.goods.brandId, // 关联的 品牌id
          brandName: brandName, // 品牌名称
          description: this.goods.description, // 详情内容
          detailDesc: '123',
          detailMobileHtml: this.goods.detailMobileHtml, // 移动端展示方式,商品的富文本内容,放到这个字段
          detailTitle: this.goods.detailTitle, // 标题详情
          keywords: this.goods.keywords, // 关键词,逗号分割,  地中海,凳子,xxx
          lowStock: this.goods.lowStock, // 预警库存(预留)
          name: this.goods.name, // 商品名称 简野（JIANYE）ZY-22
          newStatus: this.goods.newStatus, // 新品状态:0->不是新品；1->新品 ,新品会在移动端首页推荐
          note: this.goods.note, // 备注,比如小舅子供货不入账 ,
          originalPrice: this.goods.originalPrice, // 原价
          pic: this.goods.pic, // 封面图片
          previewStatus: this.goods.previewStatus, // 是否为预告商品：0->不是；1->是 ,
          price: this.goods.originalPrice, // 当前价格
          productCategoryId: this.goods.productCategoryId, // 分类id
          productCategoryName: cateName, // 分类名称
          productSn: this.goods.productSn, // 商品编码,需要手填.
          promotionType: 0, // 促销类型0->没有促销使用原价;1->使用促销价；2->使用会员价；3->使用阶梯价格；4->使用满减价格；5->限时购 ,
          publishStatus: this.goods.publishStatus, // 上架状态：0->下架；1->上架 ,
          recommendStatus: this.goods.recommendStatus, // 推荐状态；0->不推荐；1->推荐 ,
          // 销量,不用处理
          sale: 0,
          //  以逗号分割的产品服务：1->无忧退货；2->快速退款；3->免费包邮 ,
          serviceIds: serviceIds, // .join(',') 1,2
          sort: this.goods.sort, // 排序,降序.值越大越靠前
          stock: this.goods.stock, // 库存
          subTitle: this.goods.subTitle, // 二级标题
          unit: '件', // 单位,比如 斤/辆/台
          verifyStatus: this.goods.verifyStatus, //  审核状态：0->未审核；1->审核通过 ,
          weight: this.goods.weight // 商品重量，默认为千克
        }
      }
      console.log(product)
      var api = null
      var text = ''
      if (this.id) {
        api = updateProductAndSkus
        text = '更新成功'
      } else {
        api = addProductAndSkus
        text = '添加成功'
      }
      api(product).then(res => {
        const { success, message } = res
        if (success) {
          this.$router.push({ name: 'GoodsList' })
          this.$message.success(text)
        } else {
          this.$message.error(message)
        }
        console.log(res)
      })
    },
    // 生成sku列表
    generate() {
      this.$confirm('此操作将清空sku列表,并生成新的列表, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.pmsSkuStockList = []
        for (var i = 0; i < this.skuColorTemp.skuSelectedList.length; i++) {
          for (var j = 0; j < this.skuSizeTemp.skuSelectedList.length; j++) {
            this.pmsSkuStockList.push({
              tempid: uuidv4(),
              id: '', // 如果是新增 不需要
              productId: '', // 商品的id,如果是新增,不需要
              lockStock: 0, // 锁定库存
              lowStock: 0, // 库存警戒线
              pic: '', // 图片
              price: 0, // 当前价格
              promotionPrice: 0, // 单品促销价格
              sale: 0, // 销量
              skuCode: '', // sku的编码,手动填写
              stock: 0, // 库存
              color: this.skuColorTemp.skuSelectedList[i],
              size: this.skuSizeTemp.skuSelectedList[j]
            })
          }
        }
      }).catch(() => {
        this.$message.info('点击取消')
      })
    },
    uploadSkuImg(id) {
      this.skuTempId = id
      console.log(id)
    },
    // 上传sku图片
    handleSkuimgSuccess(res) {
      console.log(res)
      const { success, data, message } = res
      if (success) {
        var item = this.pmsSkuStockList.find(el => el.tempid === this.skuTempId)
        if (item) {
          item.pic = data.fileUrl
          // console.log(this.$refs[`upload_${this.skuTempId}`].clearFiles())
          this.$refs[`upload_${this.skuTempId}`].clearFiles()
          this.skuTempId = ''
        } else {
          this.$message.error(message)
        }

        console.log(this.skuTempId)
      }
    },
    // 删除sku列表选项
    delSkuItem(id) {
      console.log(id)
      var num = this.pmsSkuStockList.findIndex(el => el.tempid === id)
      console.log(num)
      this.pmsSkuStockList.splice(num, 1)
    },
    // 创建选项
    createOptin(type) {
      if (type === 'color') {
        if (this.skuColorTemp.text === '') return
        if (this.skuColorTemp.skuList.indexOf(this.skuColorTemp.text) === -1) {
          this.skuColorTemp.skuList.push(this.skuColorTemp.text)
          this.skuColorTemp.text = ''
        } else {
          this.$message.warning('此类型已存在')
        }
      } else if (type === 'size') {
        if (this.skuSizeTemp.text === '') return
        if (this.skuSizeTemp.skuList.indexOf(this.skuSizeTemp.text) === -1) {
          this.skuSizeTemp.skuList.push(this.skuSizeTemp.text)
          this.skuSizeTemp.text = ''
        } else {
          this.$message.warning('此类型已存在')
        }
      }
    },
    // 删除选项
    delColorSelect(index, item) {
      this.skuColorTemp.skuList.splice(index, 1)
      var num = this.skuColorTemp.skuSelectedList.indexOf(item)
      if (num !== -1) {
        this.skuColorTemp.skuSelectedList.splice(num, 1)
      }
    },
    delSizeSelect(index, item) {
      this.skuSizeTemp.skuList.splice(index, 1)
      var num = this.skuSizeTemp.skuSelectedList.indexOf(item)
      if (num !== -1) {
        this.skuSizeTemp.skuSelectedList.splice(num, 1)
      }
    },
    // 上传前验证图片
    beforeCoverImg(file) {
      const reg = /^image\/(jpeg|png|gif|webp)$/
      const isJPG = reg.test(file.type)
      const isLt2M = file.size / 1024 / 1024 < 0.5

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 500kb!')
      }
      return isJPG && isLt2M
    },
    // 删除图片 报废
    handleRemove(index) {
      console.log(index)
      this.goods.albumPics.splice(index, 1)
    },
    // 删除画册图片
    removeImg(file) {
      // console.log(file)
      console.log(file.response.data.fileUrl)
      this.goods.albumPics = this.goods.albumPics.filter(el => el !== file.response.data.fileUrl)
      console.log(this.goods.albumPics)
    },
    // 上传画册
    uploadAlbumPicsSuccess(res) {
      // console.log(res)
      const { success, data, message } = res
      if (success) {
        this.goods.albumPics.push(data.fileUrl)
      } else {
        this.$message.error(message)
      }
    },
    // 上传封面
    handleAvatarSuccess(res) {
      console.log(res)
      const { success, data, message } = res
      if (success) {
        this.goods.pic = data.fileUrl
        this.$refs.uploadCom.clearFiles()
      } else {
        this.$message.error(message)
      }
    },
    // 下一步
    ncxtStep() {
      if (this.step === 1) {
        this.$refs['formadd'].validate((valid) => {
          if (valid) {
            this.step++
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else if (this.step === 2) {
        this.step++
      }
    },
    getInfo() {
      // 获取分类
      getAllCategory().then(res => {
        const { success, data, message } = res
        if (success) {
          const leju = data.items.find(ele => ele.category.name === '乐居')
          if (leju) {
            this.categoryList = leju.children
          }
        } else {
          this.$message.error(message)
        }
      })
      // 获取品牌
      findAllBrand().then(res => {
        const { success, data, message } = res
        if (success) {
          this.brandList = data.items
        } else {
          this.$message.error(message)
        }
      })
    },
    getCont(id) {
      productSkusDetail(id).then(res => {
        const { success, data, message } = res
        if (success) {
          this.goods = data.product
          data.skus.forEach((el) => {
            el.tempid = uuidv4()
            el.spData = JSON.parse(el.spData)
            el.color = el.spData[0].value
            el.size = el.spData[1].value
          })
          this.pmsSkuStockList = data.skus
          this.goods.albumPics = data.product.albumPics.split(',')
          this.goods.serviceIds = data.product.serviceIds.split(',')
          this.goods.albumPics.forEach(el => {
            this.imgList.push({
              url: el
            })
          })
          console.log(this.imgList)
        } else {
          this.$message.error(message)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.margin30 {
  margin: 30px;
}
.steps{
  padding: 30px 300px;
  background-color: #fff;
}
::v-deep .el-form-item__label{
    font-weight: normal;
  }
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar-uploader-icon1 {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .footer {
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    width: 200px;

  }
</style>
