<template>
  <div>
    <el-dialog title="地址详情" :visible.sync="isShow" width="50%" @close="handleCloseDialog">
      <el-form ref="form" :model="addressForm" label-width="120px" :rules="rules" size="mini">
        <el-form-item label="发货地址" prop="addressName">
          <el-input v-model="addressForm.addressName" style="width:300px" autocomplete="on" />
        </el-form-item>
        <el-form-item label="发货人姓名">
          <el-input v-model="addressForm.name" style="width:300px" />
        </el-form-item>
        <el-form-item label="发货人手机号">
          <el-input v-model="addressForm.phone" style="width:300px" />
        </el-form-item>
        <el-form-item label="邮政编码">
          <el-input v-model="addressForm.postCode" style="width:300px" />
        </el-form-item>
        <el-form-item label="收货地址">
          <el-cascader
            v-model="initCity"
            size="mini"
            style="width:300px"
            :options="options"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="addressForm.detailAddress" style="width:300px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDlg">取 消</el-button>
        <el-button type="primary" @click="sumbit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { saveAdd, updateAdd } from '@/api/order/address'
import { regionDataPlus, CodeToText } from 'element-china-area-data'
export default {
  name: 'AddressCom',
  data() {
    return {
      isShow: false,
      addressForm: {
        addressName: '郑州市中原区'
      },
      initCity: [''],
      options: regionDataPlus,
      rules: {
        addressName: [{ required: true, message: '请填写发货地址', trigger: 'blur' }]
      }
    }
  },
  computed: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    openDialog() {
      this.isShow = true
    },
    handleChange(value) {
      // console.log(value)
      this.addressForm.province = CodeToText[value[0]]
      this.addressForm.city = CodeToText[value[1]]
      this.addressForm.region = CodeToText[value[2]]
      this.addressForm.cityCode = value.join(',')
    },
    closeDlg() {
      this.isShow = false
    },
    handleCloseDialog() {
      // console.log(this.$options.data().addressForm)
      // console.log(this.addressForm)
      this.addressForm = this.$options.data().addressForm
      // this.addressForm = {}
      this.$refs.form.resetFields()
    },
    // 点击确定
    sumbit() {
      console.log(this.addressForm)
      var api = null
      // 判断是否是编辑
      if (this.addressForm.id) {
        api = updateAdd
        // 判断是否是数组
        if (Array.isArray(this.addressForm.cityCode)) {
          console.log(this.addressForm.cityCode)
          this.addressForm.cityCode = this.addressForm.cityCode.join(',')
        }
      } else {
        api = saveAdd
      }
      api(this.addressForm)
        .then(res => {
          const { success, message } = res
          console.log(res)
          if (success) {
            this.$message.success('成功')
            this.isShow = false
            // 刷新列表
            this.$emit('updata')
          } else {
            this.$message.error(message)
          }
        })
    },
    setAddressForm(address) {
      this.addressForm = address
      // console.log(this.addressForm.cityCode.split(','))
      // console.log(this.addressForm.cityCode)
      this.initCity = this.addressForm.cityCode
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
