<template>
  <div>
    <el-card shadow="never" class="margin30">
      <div slot="header">
        <span>条件查询</span>
      </div>
      <el-form ref="searchForm" :model="searchBackForm" label-width="80px" size="small">
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <el-form-item label="订单编号">
              <el-input v-model="searchBackForm.orderSn" placeholder="订单状态" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="退单状态">
              <el-select v-model="searchBackForm.status" placeholder="退单状态">
                <el-option label="待处理" :value="0" />
                <el-option label="退货中" :value="1" />
                <el-option label="已完成" :value="2" />
                <el-option label="已拒绝" :value="3" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="margin-top: 20px;" :span="4" :offset="21">
            <el-button type="primary" size="mini" @click="searchOrder">搜索</el-button>
            <el-button style="margin: 0 20px;" type="default" size="mini" @click="emptyform">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="never" class="margin30">
      <div slot="header" />
      <el-table
        :data="backList"
        border
        style="width: 100%"
      >
        <el-table-column
          fixed="left"
          type="index"
          label="#"
          width="50"
        />
        <el-table-column
          prop="orderSn"
          label="订单编号"
          width="250"
          align="center"
        />
        <el-table-column
          prop="status"
          label="退单状态"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <el-button v-if="scope.row.status == 0" type="danger" size="small">待处理</el-button>
            <el-button v-if="scope.row.status == 1" type="warning" size="small">退货中</el-button>
            <el-button v-if="scope.row.status == 2" type="primary" plain size="small">已完成</el-button>
            <el-button v-if="scope.row.status == 3" type="info" plain size="small">已拒绝</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          align="center"
          label="描述"
          width="250"
        />
        <el-table-column
          prop="reason"
          align="center"
          label="退单原因"
          width="250"
        />
        <el-table-column
          prop="productName"
          align="center"
          label="商品名称"
          width="200"
        />
        <el-table-column
          prop="productName"
          align="center"
          label="商品属性"
          width="200"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.productAttr | formatSpData }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="handleNote"
          align="center"
          label="商家备注"
          width="150"
        />
        <el-table-column
          prop="createTime"
          align="center"
          label="添加时间"
          width="250"
        />
        <el-table-column
          fixed="right"
          prop="productName"
          align="center"
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="small" style="width:150px" @click="goDetail(scope.row.id)"> <i class="el-icon-view" /> 查看订单</el-button>

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

  </div>
</template>
<script>
import { findReturnApply } from '@/api/order/back'
import mix from '@/mixins/index'
import { searchFilter } from '@/utils/index'

export default {
  filters: {
    formatSpData(val) {
      if (val) {
        var arr = JSON.parse(val)
        if (Array.isArray(arr)) {
          var str = ''
          for (var i = 0; i < arr.length; i++) {
            str += ',' + arr[i].key + ':' + arr[i].value
          }
          str = str.substr(1)
          return str
        } else {
          return val
        }
      } else {
        return val
      }
    }
  },
  mixins: [mix],
  data() {
    return {
      searchBackForm: {},
      backList: []
    }
  },
  computed: {
  },
  created() {
    this.getBcakList()
  },
  methods: {
    // 查看订单
    goDetail(id) {
      console.log(id)
      this.$router.push({ name: 'BackDetail', params: { id }})
    },
    // 搜索
    searchOrder() {
      this.pagination.start = 1
      this.getBcakList()
    },
    // 重置
    emptyform() {
      this.pagination.start = 1
      this.searchBackForm = {}
      this.getBcakList()
    },
    // 每页数量发生改变
    handleSizeChange(e) {
      // console.log(e)
      this.pagination.limit = e
      this.getBcakList()
    },
    // 页码发生改变
    handleCurrentChange(e) {
      // console.log(e)
      this.pagination.start = e
      this.getBcakList()
    },
    // 获取退单列表
    getBcakList() {
      var newSearch = searchFilter(this.searchBackForm)
      findReturnApply(this.pagination.start, this.pagination.limit, newSearch)
        .then(res => {
          console.log(res)
          const { success, data, message } = res
          if (success) {
            const { rows, total } = data
            this.backList = rows
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
.margin30 {
  margin: 30px;
}
</style>
