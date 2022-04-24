<template>
  <div>
    <el-card shadow="never" class="margin30">
      <div slot="header">
        <el-button type="primary" size="small" @click="showAddressDialog">新增</el-button>
      </div>
      <!-- card body -->
      <el-table
        :data="addressList"
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
          prop="addressName"
          label="地址名称"
          width="200"
          align="center"
        />
        <el-table-column
          prop="address"
          label="默认发货地址"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <div>默认发货地址 <el-switch v-model="scope.row.sendStatus" :active-value="1" :inactive-value="0" @change="updateSendStatus(scope.row.id)" />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="收货人姓名"
          width="150"
          align="center"
        />
        <el-table-column
          prop="phone"
          label="收货人电话"
          width="150"
          align="center"
        />
        <el-table-column
          prop="address"
          label="收货人地址"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.province }}</div>
            <div>{{ scope.row.city }}</div>
            <div>{{ scope.row.region }}</div>
            <div>{{ scope.row.detailAddress }}</div>
          </template>
        </el-table-column>

        <el-table-column
          prop="address"
          label="默认收货地址"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <div>默认发货地址 <el-switch v-model="scope.row.receiveStatus" :active-value="1" :inactive-value="0" @change="updateReceiveStatus(scope.row.id)" />
            </div>

          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="200"
          align="center"
        />
        <el-table-column
          fixed="right"
          prop="address"
          label="操作"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="editAddress(scope.row.id)">编辑</el-button>
            <el-button size="small" type="text" style="color:red" @click="delAddress(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <AddressDialog ref="dialogAddress" @updata="getAddressList" />
  </div>
</template>
<script>
import { addressList as addressListApi, companyAddress, setSendOne, setReceiveOne, getCompanyAddress } from '@/api/order/address'
import AddressDialog from './detail.vue'
export default {
  name: 'Address',
  components: {
    AddressDialog
  },
  data() {
    return {
      addressList: [],
      address: {}
    }
  },
  computed: {
  },
  created() {
    this.getAddressList()
  },
  methods: {
    showAddressDialog() {
      this.$refs.dialogAddress.openDialog()
    },
    // 编辑地址
    editAddress(id) {
      getCompanyAddress(id)
        .then(res => {
          if (res.success) {
            this.address = res.data.address
            console.log(this.address.cityCode)
            this.address.cityCode = res.data.address.cityCode.split(',')
            this.$refs.dialogAddress.setAddressForm(this.address)
            this.showAddressDialog()
          }
        })
    },
    // 更改发货默认状态
    updateSendStatus(id) {
      setSendOne({ id })
        .then(res => {
          const { success, message } = res
          if (success) {
            this.$message.success('修改成功')
            this.getAddressList()
          } else {
            this.$message.error(message)
          }
        })
    },
    // 更改收货默认状态
    updateReceiveStatus(id) {
      setReceiveOne({ id })
        .then(res => {
          const { success, message } = res
          if (success) {
            this.$message.success('修改成功')
            this.getAddressList()
          } else {
            this.$message.error(message)
          }
        })
    },

    // 删除地址
    delAddress(id) {
      console.log(id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        companyAddress(id)
          .then(res => {
            const { success, message } = res
            if (success) {
              this.$message.success('删除成功')
              this.getAddressList()
            } else {
              this.$message.error(message)
            }
          })
      }).catch(() => {
        this.$message.info('取消删除')
      })
    },
    // 获取列表
    getAddressList() {
      addressListApi().then(res => {
        console.log(res)
        const { success, data, message } = res
        if (success) {
          const { items } = data
          this.addressList = items
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
