<template>
  <div>
    <el-card shadow="never" class="margin30">
      <div slot="header">
        <el-upload
          ref="uploadCom"
          action="/lejuAdmin/material/uploadFileOssSave"
          :on-success="materialUploadSucc"
          multiple
          :limit="1"
          :headers="token"
          :on-exceed="exceedChange"
        >
          <el-button size="small" type="primary">点击上传素材</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
      <!-- card body -->
      <el-row :gutter="20">
        <el-col v-for="item in materailList" :key="item.id" class="w20" :offset="0">
          <el-card shadow="always">
            <div slot="header" style="font-size: 14px;">
              <span>创建时间:{{ item.createTime }}</span>
            </div>
            <div>
              <!-- <img width="100%" height="250px" :src="item.ossUrl" alt=""> -->
              <el-image :src="item.ossUrl" :lazy="true" :preview-src-list="srcList" />

            </div>
            <div class="del">
              <el-button class="btn" type="danger" size="mini" @click="delMaterial(item.id)">删除</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="block">
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
      </div>

    </el-card>

  </div>
</template>
<script>
import mix from '@/mixins/index'
import { findMaterialByPage, delMaterial as delMaterialApi } from '@/api/content/metarial'
export default {
  mixins: [mix],
  data() {
    return {
      num: 10,
      materailList: [],
      srcList: []
    }
  },
  computed: {
  },
  created() {
    this.getmetrialList()
  },
  methods: {
    // 图片数量超出
    exceedChange() {
      this.$message.error('图片数量超出')
    },
    // 上传文件
    materialUploadSucc(res) {
      console.log(res)
      const { success, message } = res
      if (success) {
        this.$message.success('添加成功')
        this.getmetrialList()
        this.$refs.uploadCom.clearFiles()
      } else {
        this.$message.error(message)
      }
    },
    // 删除素材
    delMaterial(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delMaterialApi(id)
          .then(res => {
            const { success, message } = res
            if (success) {
              this.$message.success('删除成功')
              this.getmetrialList()
            } else {
              this.$message.error(message)
            }
          })
      }).catch(() => {
        this.$message.info('取消删除')
      })
    },
    // 每页数量发生改变
    handleSizeChange(e) {
      // console.log(e)
      this.pagination.limit = e
      this.getmetrialList()
    },
    // 页码发生改变
    handleCurrentChange(e) {
      // console.log(e)
      this.pagination.start = e
      this.getmetrialList()
    },
    // 获取素材列表
    getmetrialList() {
      findMaterialByPage(this.pagination.start, this.pagination.limit)
        .then(res => {
          console.log(res)
          const { success, data, message } = res
          if (success) {
            const { rows, total } = data
            this.materailList = rows
            this.pagination.alltotal = total
            this.srcList = rows.map(el => el.ossUrl)
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
.w20 {
  width: 20%;
  box-sizing: border-box;
  margin-bottom: 20px;
  padding: 0 10px;

}
.del {
  display: flex;
  flex-direction: row-reverse;
  .btn {
    width: 90px;
    margin-top: 20px;
  }
}
.el-image {
  width: 100%;
  height: 250px;
}
</style>
