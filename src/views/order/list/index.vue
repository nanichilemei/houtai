<template>
  <div>
    <el-card shadow="never" class="margin30">
      <div slot="header">
        <span>条件查询</span>
      </div>
      <el-form ref="searchForm" :model="searchOrderForm" label-width="80px" size="small">
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <el-form-item label="订单编号">
              <el-input v-model="searchOrderForm.orderSn" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="订单类型">
              <el-select v-model="searchOrderForm.orderType" placeholder="请选择活动区域">
                <el-option label="正常订单" :value="0" />
                <el-option label="秒杀订单" :value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="支付方式">
              <el-select v-model="searchOrderForm.payType" placeholder="请选择活动区域">
                <el-option label="未支付" :value="0" />
                <el-option label="支付宝" :value="1" />
                <el-option label="微信" :value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="订单状态">
              <el-select v-model="searchOrderForm.status" placeholder="请选择活动区域">
                <el-option label="待付款" :value="0" />
                <el-option label="待发货" :value="1" />
                <el-option label="已发货" :value="2" />
                <el-option label="已完成" :value="3" />
                <el-option label="退货" :value="4" />
                <el-option label="无效订单" :value="5" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="margin-top: 20px;" :span="4" :offset="21">
            <el-button type="primary" size="mini" @click="searchOrder">搜索</el-button>
            <el-button style="margin: 0 20px;" type="default" size="mini" @click="emptyform">重置</el-button>
          </el-col></el-row>
      </el-form>
    </el-card>
    <el-card shadow="never" class="margin30">
      <div slot="header" />
      <!-- card body -->
      <el-table
        :data="orderList"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="#"
          width="50"
        />
        <el-table-column
          prop="orderSn"
          label="订单编号"
          width="300"
          align="center"
        />
        <el-table-column
          label="支付方式"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-button v-if="scope.row.payType == 0" size="mini" type="info">未支付</el-button>
            <!-- <div v-if="scope.row.payType == 1">支付宝</div>
            <div v-if="scope.row.payType == 2">微信</div> -->
            <el-button v-if="scope.row.payType == 1" size="mini" type="primary">支付宝</el-button>
            <el-button v-if="scope.row.payType == 2" size="mini" type="success">微信</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="订单状态"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-button v-if="scope.row.status == 0" size="small" type="danger">待付款</el-button>
            <el-button v-if="scope.row.status == 1" size="small" type="warning">待发货</el-button>
            <el-button v-if="scope.row.status == 2" size="small" type="primary" plain>已发货</el-button>
            <el-button v-if="scope.row.status == 3" size="small" type="primary">已完成</el-button>
            <el-button v-if="scope.row.status == 4" size="small" type="info">退货</el-button>
            <el-button v-if="scope.row.status == 5" size="small" type="info" plain>无效订单</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="添加时间"
          width="300"
          align="center"
        />
        <el-table-column
          prop="memberUsername"
          label="用户账号"
          width="200"
          align="center"
        />
        <el-table-column
          prop="memberUsername"
          label="订单类型"
          width="200"
          align="center"
        >
          <template>
            <el-button type="success" size="small" plain>正常订单</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="note"
          label="备注"
          width="200"
          align="center"
        />
        <el-table-column
          fixed="right"
          prop="memberUsername"
          label="操作"
          width="200"
          align="center"
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
import { findOrdersByPage } from '@/api/order/list'
import mix from '@/mixins/index'
import { searchFilter } from '@/utils/index'
export default {

  mixins: [mix],
  data() {
    return {
      searchOrderForm: {
        orderSn: '',
        orderType: '',
        payType: '',
        status: ''
      },
      orderList: []
    }
  },
  computed: {
  },
  created() {
    this.getOrderList()
  },
  methods: {
    // 查看订单
    goDetail(id) {
      console.log(id)
      this.$router.push({ name: 'OrderDetail', params: { id }})
    },
    // 搜索
    searchOrder() {
      this.pagination.start = 1
      this.getOrderList()
    },
    // 重置
    emptyform() {
      this.pagination.start = 1
      this.searchOrderForm = {}
      this.getOrderList()
    },
    // 每页数量发生改变
    handleSizeChange(e) {
      // console.log(e)
      this.pagination.limit = e
      this.getOrderList()
    },
    // 页码发生改变
    handleCurrentChange(e) {
      // console.log(e)
      this.pagination.start = e
      this.getOrderList()
    },
    getOrderList() {
      var newSearch = searchFilter(this.searchOrderForm)
      console.log(newSearch)
      findOrdersByPage(this.pagination.start, this.pagination.limit, newSearch)
        .then(res => {
          console.log(res)
          const { success, data, message } = res
          if (success) {
            const { rows, total } = data
            this.orderList = rows
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
.el-form-item {
  font-weight: 100;
}
</style>
