<template>
  <div>
    <el-card shadow="always" class="margin30">
      <div slot="header">
        <span><el-button type="primary" size="small" @click="isShow = true">新增</el-button></span>
      </div>
      <el-table
        :data="adsList"
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
          label="广告图片"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <img width="100" height="100" :src="scope.row.pic" alt="">
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="时间"
          width="250"
        >
          <template slot-scope="scope">
            <div>开始时间:{{ scope.row.createTime }}</div>
            <div>结束时间:{{ scope.row.endTime }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          width="250"
          label="广告名称"
        />
        <el-table-column
          prop="clickCount"
          align="center"
          width="150"
          label="点击数"
        />
        <el-table-column
          prop="orderCount"
          align="center"
          width="150"
          label="下单数"
        />
        <el-table-column
          align="center"
          width="150"
          label="轮播位置"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.type == 0">首页轮播</div>
            <div v-if="scope.row.type == 1">其他</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="url"
          align="center"
          width="150"
          label="链接地址"
        />
        <el-table-column
          prop="note"
          align="center"
          width="150"
          label="备注"
        />
        <el-table-column
          align="center"
          width="200"
          label="上线状态"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.status == 1">上线</div>
            <div v-if="scope.row.status == 0">下线</div>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="editAds(scope.row)">编辑</el-button>
            <el-button size="small" type="text" style="color:red" @click="delAds(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="广告详情"
      :visible.sync="isShow"
      width="70%"
      @close="closeHandle"
    >
      <el-form ref="form" :model="advForm" :rules="rules" label-width="120px" size="mini">
        <el-row :gutter="20">
          <el-col :span="9" :offset="1">
            <el-form-item label="广告名称">
              <el-input v-model="advForm.name" />
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="1">
            <el-form-item label="备注">
              <el-input v-model="advForm.note" />
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="1">
            <el-form-item label="排序">
              <el-input v-model="advForm.sort" />
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="1">
            <el-form-item label="产品数量">
              <el-input v-model="advForm.orderCount" />
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="1">
            <el-form-item label="链接">
              <el-input v-model="advForm.url" />
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="1">
            <el-form-item label="首页轮播位置">
              <el-select v-model="advForm.type" placeholder="" clearable filterable>
                <el-option label="app首页轮播" :value="0" />
                <el-option label="1" :value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="1">
            <el-form-item label="开始时间">
              <el-date-picker v-model="advForm.startTime" size="mini" type="datetime" placeholder="选择日期" style="width: 100%;" value-format="yyyy-MM-dd HH:hh:mm" format="yyyy-MM-dd HH:hh:mm" />
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="1">
            <el-form-item label="结束时间">
              <el-date-picker v-model="advForm.endTime" size="mini" type="datetime" placeholder="选择日期" style="width: 100%;" value-format="yyyy-MM-dd HH:hh:mm" format="yyyy-MM-dd HH:hh:mm" />
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="1">
            <el-form-item label="上下线状态">
              <el-switch v-model="advForm.status" :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
          <el-col :span="9" :offset="1">
            <el-form-item label="图片">
              <el-upload
                ref="uploadCom"
                :action="uploadFileOss"
                :headers="token"
                :on-success="coverImgUplaodSucc"
              >
                <div style="width:178px;height:178px;fontSize:30px;lineHeight: 178px;">
                  <img v-if="advForm.pic" width="178" height="178" :src="advForm.pic" alt="">
                  <i v-else style="margin:auto" class="el-icon-plus" />
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer">
        <el-button @click="isShow= false">取消</el-button>
        <el-button type="primary" @click="sumbit">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { adsList as adsListApi, delAds as delAdsApi, addAds as addAdsApi, updateAds } from '@/api/marketing/advertisement'
import mix from '@/mixins/index'
export default {
  mixins: [mix],
  data() {
    return {
      adsList: [],
      dialogVisible: false,
      isShow: false,
      advForm: {
        type: 0,
        pic: '',
        id: ''
      },
      rules: {}
    }
  },
  computed: {
  },
  created() {
    this.getAdvertisementList()
  },
  methods: {
    closeHandle() {
      this.advForm = this.$options.data().advForm
    },
    // 修改
    editAds(item) {
      this.advForm = item
      this.isShow = true
    },
    // 提交
    sumbit() {
      var api = null
      var text = ''
      if (this.advForm.id) {
        api = updateAds
        text = '更新成功'
      } else {
        api = addAdsApi
        text = '添加成功'
      }
      api(this.advForm).then(res => {
        const { success, message } = res
        if (success) {
          this.$message.success(text)
          this.isShow = false
          this.getAdvertisementList()
        } else {
          this.$message.error(message)
        }
      })
    },
    // 上传图片
    coverImgUplaodSucc(res) {
      console.log(res)
      this.$refs.uploadCom.clearFiles()
      this.advForm.pic = res.data.fileUrl
    },
    // 删除
    delAds(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delAdsApi(id)
          .then(res => {
            const { success, message } = res
            if (success) {
              this.$message.success('删除成功')
              this.getAdvertisementList()
            } else {
              this.$message.error(message)
            }
          })
      }).catch(() => {
        this.$message.info('点击取消')
      })
    },
    // 获取广告列表
    getAdvertisementList() {
      adsListApi()
        .then(res => {
          const { success, data, message } = res
          if (success) {
            console.log(res)
            this.adsList = data.items
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
