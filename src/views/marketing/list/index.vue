<template>
  <div>
    <el-card shadow="always" class="margin30">
      <div slot="header">
        <span><el-button type="primary" size="small" @click="isShow =true">新增</el-button>
        </span>
      </div>
      <el-table
        :data="marketList"
        border
        style="width: 100%"
      >
        <el-table-column
          fixed="left"
          type="index"
          label="序号"
          width="50"
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
          align="center"
          label="活动时间"
          width="300"
        >
          <template slot-scope="scope">
            <div>开始时间:{{ scope.row.promotionStartTime }}</div>
            <div>结束时间:{{ scope.row.promotionEndTime }}</div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="150"
          label="是否过期"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.promotionEndTime">否</div>
            <div v-else>过期</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="商品名称"
          width="300"
        />
        <el-table-column
          prop="brandName"
          align="center"
          label="品牌名称"
          width="250"
        />
        <el-table-column
          prop="price"
          align="center"
          label="商品价格"
          width="150"
        />
        <el-table-column
          prop="productCategoryName"
          align="center"
          label="商品类别"
          width="150"
        />
        <el-table-column
          prop="createTime"
          align="center"
          label="创建时间"
          width="300"
        />
        <el-table-column
          fixed="right"
          align="center"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button size="small" type="text" style="color:red" @click="delMarket(scope.row.recommendId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="热销详情"
      :visible.sync="isShow"
      width="80%"
    >
      <el-card shadow="never" class="margin30">
        <div slot="header">
          <span>条件查询</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="4" :offset="0">
            <el-input v-model="searchGoodsForm.name" placeholder="商品名称/模糊查询" clearable="" />
          </el-col>
          <el-col :span="4" :offset="0">
            <el-input v-model="searchGoodsForm.productSn" placeholder="商品货号" />
          </el-col>
          <el-col :span="4" :offset="0">
            <el-select v-model="searchGoodsForm.brandId" placeholder="品牌">
              <el-option label="正常订单" :value="0" />
              <el-option label="秒杀订单" :value="1" />
            </el-select>
          </el-col>
          <el-col :span="4" :offset="0">
            <el-select v-model="searchGoodsForm.publishStatus" placeholder="上架状态">
              <el-option label="下架" :value="0" />
              <el-option label="上架" :value="1" />
            </el-select>
          </el-col>
          <el-col :span="4" :offset="0">
            <el-select v-model="searchGoodsForm.verifyStatus " placeholder="审核状态">
              <el-option label="审核" :value="1" />
              <el-option label="未审核" :value="0" />
            </el-select>
          </el-col>
          <el-col :span="4" :offset="0">
            <el-button type="primary" size="mini" @click="searchOrder">搜索</el-button>
            <el-button style="margin: 0 20px;" type="default" size="mini" @click="emptyform">重置</el-button>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never" class="margin30">
        <div slot="header">
          <span>商品列表</span>
        </div>
        <el-table :data="goodsList" border stripe>
          <el-table-column
            type="index"
            label="#"
            width="50"
            align="center"
          />
          <el-table-column
            prop="pic"
            label="选择"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <!-- <input v-model="" type="checkbox"> -->
              <el-radio v-model="scope.row.radio" :label="true" @change="changeRadio(scope.row)">
                <span />
              </el-radio>

            </template>
          </el-table-column>
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
            prop="productCategoryName"
            label="商品类别"
            width="150"
            align="center"
          />
          <el-table-column
            prop="weight"
            label="重量"
            align="center"
          />
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
      <span slot="footer">
        <el-button @click=" isShow= false">Cancel</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑限时活动"
      :visible.sync="editShow"
      width="50%"
    >
      <el-form ref="DetailRef" :model="goodsDetail" label-width="120px" size="small">
        <el-row :gutter="20">
          <el-col :span="10" :offset="0">
            <el-form-item label="商品原价">
              <div>{{ goodsDetail.price }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="0">
            <el-form-item label="商品名称">
              <div>{{ goodsDetail.name }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="0">
            <el-form-item label="促销价格">
              <el-input-number v-model="goodsDetail.promotionPrice " style="width: 100%;" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="0">
            <el-form-item label="排序">
              <el-input-number v-model="goodsDetail.sort " style="width: 100%;" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="0">
            <el-form-item label="开始时间">
              <el-date-picker v-model="goodsDetail.promotionStartTime " size="mini" type="datetime" placeholder="选择日期" style="width: 100%;" value-format="yyyy-MM-dd HH:hh:mm" format="yyyy-MM-dd HH:hh:mm" />
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="0">
            <el-form-item label="结束时间">
              <el-date-picker v-model="goodsDetail.promotionEndTime " size="mini" type="datetime" placeholder="选择日期" style="width: 100%;" value-format="yyyy-MM-dd HH:hh:mm" format="yyyy-MM-dd HH:hh:mm" />
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="0">
            <el-form-item label="活动限购数量">
              <el-input-number v-model="goodsDetail.promotionPerLimit " style="width: 100%;" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="1">
            <el-form-item label="图片">
              <div>
                <img width="178" height="178" :src="goodsDetail.pic" alt="">
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer">
        <el-button @click=" editShow= false">Cancel</el-button>
        <el-button type="primary" @click="confim">OK</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { findAllRecommends, delRecommend, addRecommend } from '@/api/marketing/list'
import { productsByPage } from '@/api/goods/list'
import mix from '@/mixins/index'
import { searchFilter } from '@/utils/index'

export default {
  mixins: [mix],
  data() {
    return {
      marketList: [],
      isShow: false,
      searchGoodsForm: {},
      goodsList: [],
      editShow: false,
      goodsDetail: {
        pic: '',
        productId: ''

      }
    }
  },
  computed: {
  },
  created() {
    this.getMarketList()
    this.getGoodsList()
  },
  methods: {
    confim() {
      this.$confirm('是否确认新增最热推荐商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        addRecommend(this.goodsDetail)
          .then(res => {
            const { success, message } = res
            if (success) {
              this.$message.success('添加成功')
              this.isShow = false
              this.editShow = false
              this.getMarketList()
            } else {
              this.$message.error(message)
            }
          })
      }).catch(() => {
        this.$message.info('点击取消')
      })
    },
    // 点击
    changeRadio(item) {
      this.editShow = true
      this.goodsList.forEach(el => {
        if (el.id !== item.id) {
          el.radio = false
        } else {
          el.radio = true
        }
      })
      console.log(item)
      this.goodsDetail.productId = item.id
      this.goodsDetail.name = item.name
      this.goodsDetail.price = item.price
      this.goodsDetail.pic = item.pic
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
            rows.forEach(el => {
              el.radio = false
            })
            this.goodsList = rows
            this.pagination.alltotal = total
          } else {
            this.$message.error(message)
          }
        })
    },
    // 删除
    delMarket(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delRecommend(id)
          .then(res => {
            const { success, message } = res
            if (success) {
              this.$message.success('删除成功')
              this.getMarketList()
            } else {
              this.$message.error(message)
            }
          })
      }).catch(() => {
        this.$message.info('点击取消')
      })
    },
    // 获取活动列表
    getMarketList() {
      findAllRecommends()
        .then(res => {
          const { success, data, message } = res
          if (success) {
            // console.log(res)
            this.marketList = data.items
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
</style>
