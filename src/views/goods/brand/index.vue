<template>
  <div>
    <el-card shadow="never" class="margin30">
      <div slot="header">
        <el-button type="primary" size="mini" @click="isShow = true">新增</el-button>
      </div>
      <el-table
        :data="brandList"
        border
        style="width: 100%"
      >
        <el-table-column
          fixed="left"
          type="index"
          label="序号"
          width="50"
          align="center"
        />
        <el-table-column
          prop="name"
          label="品牌名称"
          width="150"
          align="center"
        />
        <el-table-column
          label="展示状态"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <div>是否展示:<el-switch v-model="scope.row.showStatus" :active-value="1" :inactive-value="0" @change="updataShow(scope.row)" /></div>

          </template>
        </el-table-column>
        <el-table-column
          prop="pic"
          label="logo"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <img width="100" height="100" :src="scope.row.logo" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="pic"
          label="专区大图"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <img width="100" height="100" :src="scope.row.bigPic" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="brandStory"
          label="品牌故事"
          width="150"
          align="center"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="300"
          align="center"
        />
        <el-table-column
          prop="sort"
          label="排序"
          width="150"
          align="center"
        />
        <el-table-column
          prop="productCommentCount"
          label="产品评论数量"
          width="150"
          align="center"
        />
        <el-table-column
          prop="productCount"
          label="产品数量"
          width="150"
          align="center"
        />
        <el-table-column
          prop="factoryStatus"
          label="是否品牌制造商"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.factoryStatus == 1? '是':'不是' }}</div>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="editBrand(scope.row)">编辑</el-button>
            <el-button size="small" type="text" style="color:red" @click="delBrand(scope.row.id)">删除</el-button>
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
    <el-dialog title="品牌详情" width="50%" :visible.sync="isShow" @close="handleCloseDialog">
      <el-form :model="brand" label-width="100px" size="mini" class="disflex">
        <el-form-item label="品牌名称" style="width:45%">
          <el-input v-model="brand.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="首字母" style="width:45%">
          <el-input v-model="brand.firstLetter" autocomplete="off" />
        </el-form-item>
        <el-form-item label="排序" style="width:45%">
          <el-input v-model="brand.sort" autocomplete="off" />
        </el-form-item>
        <el-form-item label="产品数量" style="width:45%">
          <el-input v-model="brand.productCount" autocomplete="off" />
        </el-form-item>
        <el-form-item label="是否展示" style="width:45%">
          <el-switch v-model="brand.showStatus" :active-value="1" :inactive-value="0" />
        </el-form-item>
        <el-form-item label="是否为制造商" style="width:45%">
          <el-switch v-model="brand.factoryStatus" :active-value="1" :inactive-value="0" />
        </el-form-item>
        <el-form-item label="上传专区大图" style="width:45%">
          <el-upload
            ref="uploadCom"
            :action="uploadFileOss"
            :headers="token"
            :on-success="coverImgUplaodSucc"
          >
            <div style="width:178px;height:178px;fontSize:30px;lineHeight: 178px;">
              <img v-if="brand.bigPic" width="178" height="178" :src="brand.bigPic" alt="">
              <i v-else style="margin:auto" class="el-icon-plus" />
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="上传Logo" style="width:45%">
          <el-upload
            ref="uploadCom1"
            :action="uploadFileOss"
            :headers="token"
            :on-success="coverImgUplaodSucc1"
          >
            <div style="width:178px;height:178px;fontSize:30px;lineHeight: 178px;">
              <img v-if="brand.logo" width="178" height="178" :src="brand.logo" alt="">
              <i v-else style="margin:auto" class="el-icon-plus" />
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="sumbit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { findBrandByPage, delBrand as delBrandApi, addBrand, updateBrand, switchShowStatus } from '@/api/goods/brand'
import mix from '@/mixins/index'
export default {
  name: 'Brand',
  mixins: [mix],
  data() {
    return {
      brandList: [],
      isShow: false,
      brand: {
        showStatus: 1,
        factoryStatus: 1,
        bigPic: '',
        logo: ''
      }
    }
  },
  computed: {
  },
  created() {
    this.getBrandList()
  },
  methods: {
    // 上传大图
    coverImgUplaodSucc(res) {
      console.log(res)
      this.$refs.uploadCom.clearFiles()
      this.brand.bigPic = res.data.fileUrl
    },
    // 上传Logo
    coverImgUplaodSucc1(res) {
      this.$refs.uploadCom1.clearFiles()
      this.brand.logo = res.data.fileUrl
    },
    // 编辑
    editBrand(row) {
      this.brand = row
      this.isShow = true
    },
    // 提交
    sumbit() {
      var api = null
      var txt = null
      if (this.brand.id) {
        api = updateBrand
        txt = '修改'
      } else {
        api = addBrand
        txt = '新增'
      }
      this.$confirm(`是否确认${txt}品牌?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api(this.brand)
          .then(res => {
            const { success, message } = res
            if (success) {
              this.$message.success(`${txt}成功`)
              this.isShow = false
              this.getBrandList()
            } else {
              this.$message.error(message)
            }
          })
      }).catch(() => {
        this.$message.info('点击取消')
      })
    },
    // 对话框关闭
    handleCloseDialog() {
      this.brand = this.$options.data().brand
    },
    // 删除
    delBrand(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delBrandApi(id)
          .then(res => {
            const { success, message } = res
            if (success) {
              this.$message.success('删除成功')
              this.getBrandList()
            } else {
              this.$message.error(message)
            }
          })
      }).catch(() => {
        this.$message.info('点击取消')
      })
    },
    // 是否展示
    updataShow(item) {
      switchShowStatus({
        id: item.id,
        status: item.showStatus
      }).then(res => {
        const { success, message } = res
        if (success) {
          this.$message.success('更新成功')
        } else {
          this.$message.error(message)
        }
      })
    },
    // 每页数量发生改变
    handleSizeChange(e) {
      // console.log(e)
      this.pagination.limit = e
      this.getBrandList()
    },
    // 页码发生改变
    handleCurrentChange(e) {
      // console.log(e)
      this.pagination.start = e
      this.getBrandList()
    },
    // 获取品牌列表
    getBrandList() {
      findBrandByPage(this.pagination.start, this.pagination.limit)
        .then(res => {
          console.log(res)
          const { success, data, message } = res
          if (success) {
            const { rows, total } = data
            this.brandList = rows
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
.disflex {
  display: flex;
  justify-content: space-around;

  flex-wrap: wrap;
}
</style>
