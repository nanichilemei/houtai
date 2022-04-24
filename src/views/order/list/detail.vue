<template>
  <div>
    <el-card shadow="always" class="margin30">

      <el-steps style="padding:30px 120px 0" :active="orderBase.status + 1">
        <el-step title="待付款" :description="orderBase.createTime" />
        <el-step title="待发货" :description="orderBase.paymentTime" />
        <el-step title="已发货" :description="orderBase.deliveryTime" />
        <el-step v-if="orderBase.status !== 4 && orderBase.status !== 5" title="已完成" :description="orderBase.receiveTime" />
        <el-step v-if="orderBase.status !== 3 && orderBase.status !== 5" title="退货" :description="orderBase.finishTime" />
      </el-steps>
      <el-divider />
      <div>
        <h4 style="display:inline-block; margin-right:20px">订单信息: </h4>
        <el-tag v-if="orderBase.status==0" type="danger" size="mini" effect="dark">待付款</el-tag>
        <el-tag v-if="orderBase.status==1" type="success" size="mini" effect="dark">待发货</el-tag>
        <el-tag v-if="orderBase.status==2" type="info" size="mini" effect="dark">已发货</el-tag>
        <el-tag v-if="orderBase.status==3" type="warn" size="mini" effect="dark">已完成</el-tag>
        <el-tag v-if="orderBase.status==4" type="default" size="mini" effect="dark">退货</el-tag>
        <el-tag v-if="orderBase.status==5" type="danger" size="mini" effect="dark">无效订单</el-tag>
      </div>
      <el-row :gutter="20">
        <el-col :span="6" :offset="0">
          <p>订单金额:<span style="color:red;"> {{ orderBase.totalAmount }}</span></p>
        </el-col>
        <el-col :span="6" :offset="0">
          <p>订单编号:<span>{{ orderBase.orderSn }}</span></p>
        </el-col>
        <el-col :span="6" :offset="0">
          <p>用户账号: <span>{{ orderBase.memberUsername }}</span></p>
        </el-col>
        <el-col :span="6" :offset="0">
          <p> 备注: <span>{{ orderBase.note }}</span></p>
        </el-col>
        <el-col :span="6" :offset="0">
          <p>下单时间:<span> {{ orderBase.createTime }}</span></p>
        </el-col>
        <el-col :span="6" :offset="0">
          <p>付款时间:<span>{{ orderBase.paymentTime }}</span></p>
        </el-col>
        <el-col :span="6" :offset="0">
          <p>发货时间: <span>{{ orderBase.deliveryTime }}</span></p>
        </el-col>
        <el-col :span="6" :offset="0">
          <p> 收货时间: <span>{{ orderBase.receiveTime }}</span></p>
        </el-col>
      </el-row>
      <div>
        <h4>收货人信息:</h4>
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <p>收货人:<span>{{ orderBase.receiverName }}</span></p>
          </el-col>
          <el-col :span="6" :offset="0">
            <p>用户姓名: <span>{{ orderBase.memberUsername }}</span></p>
          </el-col>
          <el-col :span="6" :offset="0">
            <p> 手机号码: <span>{{ orderBase.receiverPhone }}</span></p>
          </el-col>
          <el-col :span="6" :offset="0">
            <p>邮政编码:<span> {{ orderBase.receiverPostCode }}</span></p>
          </el-col>
          <el-col :span="6" :offset="0">
            <p>地市:<span>{{ orderBase.receiverProvince }} {{ orderBase.receiverCity }}</span></p>
          </el-col>
          <el-col :span="6" :offset="0">
            <p>详细地址: <span>{{ orderBase.receiverDetailAddress }}</span></p>
          </el-col>
        </el-row>
      </div>
      <div>
        <h4>商品信息</h4>
        <el-table :data="orderItems" border stripe>
          <el-table-column
            prop="productName"
            label="商品名称"
            :width="80"
            align="center"
          />
          <el-table-column
            prop="productName"
            label="商品图片"
            :width="250"
            align="center"
          >
            <template slot-scope="scope">
              <img width="100" height="100" :src="scope.row.productPic" alt="">
            </template>
          </el-table-column>
          <el-table-column
            prop="productName"
            label="是否退货"
            :width="200"
            align="center"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.isReturn == 0? '否':'是' }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="productBrand"
            label="品牌"
            :width="200"
            align="center"
          />
          <el-table-column
            prop="productPrice"
            label="价格"
            :width="200"
            align="center"
          />
          <el-table-column
            prop="productQuantity"
            label="商品数量"
            :width="200"
            align="center"
          />
          <el-table-column
            fixed="right"
            prop="totalPrice"
            label="小计"
            :width="250"
            align="center"
          />
        </el-table>
      </div>
      <div style="margin:20px 0;">
        <h4>费用信息:</h4>
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <p>运费金额:<span style="color:red;"> 0</span></p>
          </el-col>
          <el-col :span="6" :offset="0">
            <p>订单总金额:<span style="color:red;">{{ orderBase.totalAmount }}</span></p>
          </el-col>
          <el-col :span="6" :offset="0">
            <p>实际金额: <span style="color:red;">{{ orderBase.payAmount }}</span></p>
          </el-col>
          <el-col :span="6" :offset="0">
            <p>促销优惠金额: <span style="color:red;">0</span></p>
          </el-col>
        </el-row>
      </div>
      <div v-if="orderBase.status==1">
        <el-form ref="expressRef" :model="expressForm" :rules="expressRules" size="mini">
          <el-row :gutter="20">
            <el-col :span="6" :offset="0">
              <el-form-item label="物流公司" prop="company">
                <el-select v-model="expressForm.company" placeholder="请选择物流公司" clearable filterable>
                  <el-option
                    v-for="item in expressList"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="物流单号" label-width="80px" prop="numbers">
                <el-input v-model="expressForm.numbers" size="mini" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="margin20-0">
            <el-button type="primary" size="small" @click="confirm">确认发货</el-button>
          </div>
        </el-form>
      </div>
      <div v-if="orderBase.status !== 0 && orderBase.status !==1">
        <h4>物流信息: <span style="color:gray">{{ orderBase.deliveryCompany }}[{{ orderBase.deliverySn }}]</span></h4>
        <el-table :data="logistics" border stripe>
          <el-table-column
            prop="time"
            label="时间"
            :width="180"
          />
          <el-table-column
            prop="status"
            label="状态"
          />
          <el-table-column
            prop="note"
            label="备注"
            :width="450"
          />
        </el-table>

      </div>
    </el-card>

  </div>
</template>
<script>
import { orderDetail, sendDone } from '@/api/order/list'
export default {
  filters: {
  },
  mixins: [
  ],
  data() {
    return {
      id: '',
      orderBase: {},
      orderItems: [],
      expressList: ['顺丰', '韵达', '邮政', '申通', '中通', '圆通'],
      expressForm: {
        company: ''
      },
      expressRules: {
        company: [{ required: true, message: '请填写物流公司', trigger: 'blur' }],
        numbers: [{ required: true, message: '请填写物流单号', trigger: 'blur' }]
      },
      // 物流信息
      logistics: [
        {
          time: '2015-03-06 21:16:58',
          status: '深圳市横岗速递营销部已收件',
          note: '揽投员姓名：钟定基;联系电话：13883838888'
        },
        {
          time: '2015-03-07 14:25:00',
          status: '离开深圳市 发往广州市',
          note: ''
        },
        {
          time: '2015-03-08 00:17:00',
          status: '到达广东速递物流公司广航中心处理中心（经转）',
          note: ''
        },
        {
          time: '2015-03-08 01:15:00',
          status: '离开广州市 发往北京市（经转）',
          note: ''
        },
        {
          time: '2015-03-09 09:01:00',
          status: '到达北京黄村转运站处理中心（经转）',
          note: ''
        },
        {
          time: '2015-03-09 18:39:00',
          status: '离开北京市 发往呼和浩特市（经转）',
          note: ''
        },
        {
          time: '2015-03-10 18:06:00',
          status: '到达 呼和浩特市 处理中心',
          note: ''
        },
        {
          time: '2015-03-11 09:53:48',
          status: '呼和浩特市邮政速递物流分公司金川揽投部安排投递',
          note: '投递员姓名：安长虹;联系电话：18047140142'
        }
      ]
    }
  },
  computed: {
  },
  created() {
    this.id = this.$route.params.id
    console.log(this.id)
    this.getOrderDetail()
  },
  methods: {
    // 确认发货
    confirm() {
      this.$refs['expressRef'].validate((valid) => {
        if (valid) {
          sendDone({
            orderId: this.id,
            deliverySn: this.expressForm.numbers,
            deliveryCompany: this.expressForm.company
          }).then(res => {
            const { success, message } = res
            if (success) {
              this.$message.success('发货成功')
              this.getOrderDetail()
            } else {
              this.$message.error(message)
            }
          })
        }
      })
    },
    getOrderDetail() {
      orderDetail(this.id).then(res => {
        const { success, data, message } = res
        if (success) {
          this.orderBase = data.orderDetail.orderBase
          this.orderItems = data.orderDetail.orderItems
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
.el-col {
  font-size: 14px;
}
::v-deep .el-form-item__label{
    font-weight: normal;
}
.margin20-0 {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}
</style>
