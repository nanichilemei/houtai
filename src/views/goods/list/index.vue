<template>
  <div>
    <el-collapse>
      <el-collapse-item title="商品管理介绍">
        <div>商品管理模块可以对客户端的商品进行增删改查等相关操作,来控制客户端商品的列表展示和商品详情</div>
      </el-collapse-item>
    </el-collapse>

    <el-collapse class="margin30">
      <el-collapse-item title="条件查询">
        <el-form :model="searchGoodsForm" label-width="80px" size="mini">
          <el-row :gutter="20">
            <el-col :span="6" :offset="0">
              <el-form-item label="商品名称">
                <el-input v-model="searchGoodsForm.name" placeholder="商品名称/模糊查询" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="商品货号">
                <el-input v-model="searchGoodsForm.productSn" placeholder="商品货号" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="品牌">
                <el-select v-model="searchGoodsForm.brandId" placeholder="品牌">
                  <el-option label="正常订单" :value="0" />
                  <el-option label="秒杀订单" :value="1" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="上架状态">
                <el-select v-model="searchGoodsForm.publishStatus" placeholder="上架状态">
                  <el-option label="下架" :value="0" />
                  <el-option label="上架" :value="1" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6" :offset="0">
              <el-form-item label="审核状态">
                <el-select v-model="searchGoodsForm.verifyStatus " placeholder="审核状态">
                  <el-option label="审核" :value="1" />
                  <el-option label="未审核" :value="0" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" :offset="14">
              <el-button type="primary" size="mini" @click="searchOrder">搜索</el-button>
              <el-button style="margin: 0 20px;" type="default" size="mini" @click="emptyform">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <el-card shadow="never" class="margin30">
      <div slot="header">
        <el-button type="primary" size="mini" @click="goAddDetail">新增</el-button>
        <el-button type="primary" size="mini">导出商品列表excel文件</el-button>
      </div>
      <el-table
        :data="goodsList"
        border
        style="width: 100%"
      >
        <el-table-column
          fixed="left"
          type="index"
          label="#"
          width="50"
          align="center"
        />
        <el-table-column
          prop="pic"
          label="商品图片"
          width="150"
        >
          <template slot-scope="scope">
            <img width="100" height="100" :src="scope.row.pic" alt="">
          </template>
        </el-table-column>
        <el-table-column
          label="商品名称"
          width="350"
          align="center"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.name }}</div>
            <div>品牌:{{ scope.row.brandName }}</div>
            <div>{{ scope.row.description }}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="商品价格"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <div>原价:{{ scope.row.originalPrice }}</div>
            <div>现价:{{ scope.row.price }}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="sku"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="editSku(scope.row.id)">编辑sku</el-button>

          </template>
        </el-table-column>
        <el-table-column
          prop="productCategoryName"
          label="商品类别"
          width="150"
          align="center"
        />
        <el-table-column
          label="标签"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <div>推荐:<el-switch v-model="scope.row.recommendStatus" :active-value="1" :inactive-value="0" /></div>
            <div>最新:<el-switch v-model="scope.row.newStatus" :active-value="1" :inactive-value="0" /></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="标签2"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <div>发布:<el-switch v-model="scope.row.publishStatus" :active-value="1" :inactive-value="0" /> </div>
            <div>审核:<el-switch v-model="scope.row.verifyStatus" :active-value="1" :inactive-value="0" /></div>
          </template>
        </el-table-column>

        <el-table-column
          prop="weight"
          label="重量"
          width="80"
          align="center"
        />
        <el-table-column
          prop="sort"
          label="排序"
          width="150"
          align="center"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="editGoods(scope.row.id)">编辑</el-button>
            <el-button size="small" type="text" style="color:red" @click="delGoods(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:10px;text-align: right;"
        :current-page="pagination.start"
        :page-sizes="pagination.pageSize"
        :page-size="pagination.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.alltotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <el-dialog
      title="sku列表"
      :visible.sync="isShow"
      width="50%"
      @close="closeHandle"
    >

      <!-- <el-button @click="closeDia">取消</el-button> -->
      <el-button type="primary" @click="addSkuItem">新增</el-button>

      <el-table :data="skuList" border stripe>
        <el-table-column fixed="left" type="index" label="#" width="48" align="center" />
        <el-table-column label="图片" width="120px">
          <template slot-scope="scope">
            <el-upload
              :show-file-list="false"
              class="avatar-uploader"
              :action="uploadFileOss"
              :file-list="false"
              :headers="token"
              :on-success="handleSkuimgSuccess"
              @click.native="uploadSkuImg(scope.row.tempId)"
            >
              <img v-if="scope.row.pic" width="100px" height="100px" :src="scope.row.pic">
              <i v-else class="el-icon-plus avatar-uploader-icon1" />
            </el-upload>
          </template>
        </el-table-column>

        <el-table-column
          label="颜色"
          align="center"
          width="160"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.color" placeholder="颜色" size="mini" />
          </template>
        </el-table-column>
        <el-table-column
          label="大小"
          align="center"
          width="160"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.size" placeholder="大小" size="mini" />
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
        <el-table-column fixed="right" label="操作" align="center" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="mini" style="color:red" @click="delSkuItem(scope.row.id)">删除</el-button>
            <el-button type="text" size="mini" @click="editSkuItem(scope.row)">修改编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer">
        <el-button @click="closeDia">取消</el-button>
        <!-- <el-button type="primary" @click="isShow= false">OK</el-button> -->
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { productsByPage, delGoods as delGoodsApi, getSkusByProductId, delSku as delSkuApi, updateSkuInfo,
  addProductSkus } from '@/api/goods/list'
import { v4 as uuidv4 } from 'uuid'

import mix from '@/mixins/index'
import { searchFilter } from '@/utils/index'
export default {
  mixins: [mix],
  data() {
    return {
      searchGoodsForm: {},
      goodsList: [],
      skuList: [],
      isShow: false,
      itemId: '',
      skuTempId: ''
    }
  },
  computed: {
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    // 编辑sku
    editSku(id) {
      this.isShow = true
      getSkusByProductId(id)
        .then(res => {
          console.log(res.data.items)
          const { success, data, message } = res
          if (success) {
            this.itemId = id
            data.items.forEach((el) => {
              el.tempId = uuidv4()
              el.spData = JSON.parse(el.spData)
              el.color = el.spData[0].value
              el.size = el.spData[1].value
            })
            this.skuList = data.items
            console.log(this.skuList)
          } else {
            this.$message.error(message)
          }
        })
    },
    // 关闭对话框
    closeDia() {
      this.isShow = false
    },
    // 对话框关闭时
    closeHandle() {
      // this.skuList = this.$options.data().skuList
      this.itemId = ''
    },
    addSkuItem() {
      this.skuList.push({
        lockStock: '',
        lowStock: '',
        pic: '',
        price: '',
        stock: '',
        productId: this.itemId,
        sale: '',
        skuCode: '',
        color: '',
        size: '',
        promotionPrice: '',
        id: ''
      })
    },
    // 修改sku选项item
    editSkuItem(item) {
      var api = null
      var text = ''
      if (item.id) {
        api = updateSkuInfo
        text = '修改成功'
      } else {
        api = addProductSkus
        text = '添加成功'
      }
      console.log(item)
      item.spData = JSON.stringify([
        { key: '颜色', value: item.color },
        { key: '大小', value: item.size }
      ])
      api(item).then(res => {
        console.log(res)
        const { success, message } = res
        if (success) {
          this.$message.success(text)
        } else {
          this.$message.error(message)
        }
      })
    },
    // 删除SKU选项
    delSkuItem(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delSkuApi(id)
          .then(res => {
            const { success, message } = res
            if (success) {
              this.$message.success('删除成功')
              this.editSku(this.itemId)
            } else {
              this.$message.error(message)
            }
          })
      }).catch(() => {
        this.$message.info('点击取消')
      })
    },
    // 更改临时值
    uploadSkuImg(id) {
      this.skuTempId = id
      console.log(id)
    },
    // 上传sku图片
    handleSkuimgSuccess(res) {
      console.log(res)
      const { success, data, message } = res
      if (success) {
        var item = this.skuList.find(el => el.tempId === this.skuTempId)
        if (item) {
          item.pic = data.fileUrl
          console.log(this.skuTempId)
          this.skuTempId = ''
        } else {
          this.$message.error(message)
        }
      }
    },
    // 新增
    goAddDetail() {
      this.$router.push('/goods/add/detail')
    },
    // 编辑
    editGoods(id) {
      console.log(id)
      this.$router.push({ name: 'GoodsDetailEdit', params: { id }})
    },
    // 删除
    delGoods(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delGoodsApi(id)
          .then(res => {
            const { success, message } = res
            if (success) {
              this.$message.success('删除成功')
              this.getGoodsList()
            } else {
              this.$message.error(message)
            }
          })
      }).catch(() => {
        this.$message.info('点击取消')
      })
    },
    // 每页数量发生改变
    handleSizeChange(e) {
      // console.log(e)
      this.pagination.limit = e
      this.getGoodsList()
    },
    // 页码发生改变
    handleCurrentChange(e) {
      // console.log(e)
      this.pagination.start = e
      this.getGoodsList()
    },
    // 搜索
    searchOrder() {
      this.pagination.start = 1
      this.getGoodsList()
    },
    // 重置
    emptyform() {
      this.pagination.start = 1
      this.searchGoodsForm = {}
      this.getGoodsList()
    },
    // 获取商品列表
    getGoodsList() {
      var newSearch = searchFilter(this.searchGoodsForm)
      productsByPage(this.pagination.start, this.pagination.limit, newSearch)
        .then(res => {
          console.log(res)
          const { success, data, message } = res
          if (success) {
            const { rows, total } = data
            this.goodsList = rows
            this.pagination.alltotal = total
          } else {
            this.$message.error(message)
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-collapse{
    background-color: #fff;
    padding-bottom: 10px;
    text-indent: 10px;
  }

  ::v-deep .el-form-item__label{
    font-weight: normal;
  }
.margin30 {
  margin: 30px;
}
</style>
