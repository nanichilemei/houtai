<template>
  <div>
    <el-card shadow="never" class="margin30">
      <div>
        <h4 style="display:inline-block; margin-right:20px">退单信息: </h4>
        <el-tag v-if="returnBase.status==0" type="danger" size="mini" effect="dark">待处理</el-tag>
        <el-tag v-if="returnBase.status==1" type="success" size="mini" effect="dark">退货中</el-tag>
        <el-tag v-if="returnBase.status==2" type="warn" size="mini" effect="dark">已完成</el-tag>
        <el-tag v-if="returnBase.status==3" type="default" size="mini" effect="dark">已拒绝</el-tag>
        <el-row class="itemCenter" :gutter="20">
          <el-col :span="6" :offset="0">
            <p>订单:<span> {{ returnBase.orderSn }}</span>
              <el-button type="text" size="small" @click="goOrder">查看订单详情</el-button>
            </p>
          </el-col>
          <el-col :span="6" :offset="0">
            <p>退单人姓名::<span> {{ returnBase.returnName }}</span></p>
          </el-col>
          <el-col :span="6" :offset="0">
            <p>退单理由:<span> {{ returnBase.reason }}</span></p>
          </el-col>
          <el-col :span="6" :offset="0">
            <p>退单描述:<span> {{ returnBase.description }}</span></p>
          </el-col>

        </el-row>
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <p>申请时间:<span> {{ returnBase.createTime }}</span></p>
          </el-col>

        </el-row>

        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <div style="display:inline-block; margin-right:20px">退单图片:</div>
            <div style="display:inline-block; vertical-align: text-top;">
              <el-image
                v-for="item in returnBase.proofPics"
                :key="item"
                style="width: 100px; height: 100px;margin-right:20px;"
                :src="item"
                :preview-src-list="returnBase.proofPics"
              />
            </div>
          </el-col>
        </el-row>
      </div>
      <el-divider />
      <div>
        <h4>退货商品:</h4>
        <el-table :data="goods" border stripe>
          <el-table-column
            label="商品图片"
            width="250"
          >
            <template slot-scope="scope">
              <img width="100" height="100" :src="scope.row.pic" alt="">
            </template>
          </el-table-column>
          <el-table-column
            prop="productBrand"
            label="商品描述"
            align="center"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.productName }}</div>
              <div>品牌:{{ scope.row.productBrand }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="productPrice"
            label="商品价格"
            width="250"
            align="center"
          />
          <el-table-column
            label="商品属性"
            width="250"
            align="center"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.productAttr | formatSpData }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="productCount"
            label="商品数量"
            width="250"
            align="center"
          />
          <el-table-column
            prop="returnAmount"
            label="总计"
            align="center"
          />
        </el-table>
      </div>
      <div>
        <h4>用户信息:</h4>
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <p>联系人:<span> {{ returnBase.returnPhone }}</span></p>
          </el-col>
          <el-col :span="6" :offset="0">
            <p>联系电话:<span> {{ returnBase.returnPhone }}</span></p>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-divider />
        <h4>费用信息:</h4>
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <p>退单金额:<span style="color:red"> {{ returnBase.returnAmount }}</span></p>
          </el-col>
          <el-col :span="6" :offset="0">
            <p>运费金额:<span style="color:red"> 0</span></p>
          </el-col>
        </el-row>
      </div>
      <div v-if="returnBase.status==0">
        <el-row :gutter="20">
          <el-form ref="returnRef" :model="returnForm" :rules="returnRules" label-width="auto" size="mini">
            <el-col :span="6" :offset="0">
              <el-form-item label="退款金额">
                <el-input-number v-model="returnForm.returnAmount" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="处理人" prop="handleMan">
                <el-input v-model="returnForm.handleMan" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="处理备注" prop="handleNote">
                <el-input v-model="returnForm.handleNote" />
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <div class="flex">
          <el-button type="primary" size="small" @click="agree">同意退款</el-button>
          <el-button size="small" @click="refuse">拒绝退款</el-button>
        </div>

      </div>
      <div v-if="returnBase.status!==0">
        <el-divider />
        <h4>处理结果:</h4>
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <p>处理人:<span> {{ returnBase.handleMan }}</span></p>
          </el-col>
          <el-col :span="6" :offset="0">
            <p>处理备注:<span> {{ returnBase.handleNote }}</span></p>
          </el-col>
          <el-col :span="6" :offset="0">
            <p>处理时间:<span> {{ returnBase.handleTime }}</span></p>
          </el-col>
        </el-row>
      </div>
      <div v-if="returnBase.status==1">
        <el-form :model="receivingInfo" label-width="auto" size="mini">
          <el-row :gutter="20">
            <el-col :span="6" :offset="0">
              <el-form-item label="收货人">
                <el-input v-model="receivingInfo.receiveMan" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="0">
              <el-form-item label="收货备注">
                <el-input v-model="receivingInfo.receiveNote" />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="flex">
            <el-button type="primary" size="small" @click="receiving">确认收货</el-button>
          </div>
        </el-form>
      </div>
      <div v-if="returnBase.status == 2">
        <el-divider />
        <h4>退货信息:</h4>
        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <p>退单收货人:<span> {{ returnBase.receiveMan }}</span></p>
          </el-col>
          <el-col :span="6" :offset="0">
            <p>退单收货备注:<span> {{ returnBase.receiveNote }}</span></p>
          </el-col>
          <el-col :span="6" :offset="0">
            <p>退单收货时间:<span> {{ returnBase.receiveTime }}</span></p>
          </el-col>
        </el-row>

      </div>
    </el-card>

  </div>
</template>
<script>
import { orderReturn, agreeApply, rejectApply, receiveProduct } from '@/api/order/back'
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
  data() {
    return {
      id: '',
      returnBase: {},
      goods: [], // 商品
      returnForm: {}, // 处理人
      returnRules: {
        handleMan: [{ required: true, message: '请填写处理人信息', trigger: 'blur' }],
        handleNote: [{ required: true, message: '请填写处理备注', trigger: 'blur' }]
      },
      receivingInfo: {}
    }
  },
  computed: {
  },
  created() {
    this.id = this.$route.params.id
    this.returnForm.id = this.$route.params.id
    this.getList()
  },
  methods: {
    // 确认收货
    receiving() {
      this.receivingInfo.id = this.id
      receiveProduct(this.id, this.receivingInfo).then(res => {
        console.log(res)
        const { success, message } = res
        if (success) {
          this.getList()
          this.goods = []
        } else {
          this.$message.error(message)
        }
      })
    },
    // 同意退款
    agree() {
      this.$refs['returnRef'].validate((valid) => {
        if (valid) {
          agreeApply(this.id, this.returnForm).then(res => {
            const { success, message } = res
            if (success) {
              this.getList()
              this.goods = []
            } else {
              this.$message.error(message)
            }
          })
        }
      })
    },
    // 拒绝退款
    refuse() {
      this.$refs['returnRef'].validate((valid) => {
        if (valid) {
          rejectApply(this.id, this.returnForm).then(res => {
            const { success, message } = res
            if (success) {
              this.getList()
              this.goods = []
            } else {
              this.$message.error(message)
            }
          })
        }
      })
    },
    // 查看详情
    goOrder() {
      console.log(this.returnBase)
      var id = this.returnBase.orderId
      this.$router.push({ name: 'OrderDetail', params: { id }})
    },
    // 获取信息
    getList() {
      orderReturn(this.id).then(res => {
        const { success, data, message } = res
        if (success) {
          data.orderReturnApply.proofPics = data.orderReturnApply.proofPics.split(',')
          this.returnBase = data.orderReturnApply
          console.log(data.orderReturnApply)
          this.goods.push({
            pic: data.orderReturnApply.productPic,
            productName: data.orderReturnApply.productName,
            productBrand: data.orderReturnApply.productBrand,
            productPrice: data.orderReturnApply.productPrice,
            productAttr: data.orderReturnApply.productAttr,
            productCount: data.orderReturnApply.productCount,
            returnAmount: data.orderReturnApply.returnAmount
          })
          console.log(this.returnBase)
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
.el-row {
  padding-bottom: 10px;
}
.el-col {
  font-size: 14px;
}
.flex {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
::v-deep .el-form-item__label{
    font-weight: normal;
  }
  .itemCenter{
    display: flex;
    align-items: center;
  }
</style>
