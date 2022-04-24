<template>
  <div class="article">
    <!-- 搜索框 -->
    <el-card shadow="never" class="box-card margin-30">
      <div slot="header" class="clearfix">
        <span>条件查询</span>
      </div>
      <el-form ref="form" :model="searchArticleForm" label-width="80px" size="mini">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="作者">
              <el-input v-model="searchArticleForm.author" placeholder="作者" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="标题">
              <el-input v-model="searchArticleForm.title" placeholder="标题" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="编辑类型">
              <el-select v-model="searchArticleForm.region" placeholder="编辑类型" clearable>
                <el-option label="富文本" :value="0" />
                <el-option label="markdown" :value="1" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="18">
            <el-button type="default" size="mini" @click="emptyform">重置</el-button>
            <el-button type="primary" size="mini" @click="searchArticle">搜索</el-button>
          </el-col>

        </el-row>
      </el-form>
    </el-card>
    <!-- 列表 -->
    <el-card shadow="never" class="box-card margin-30">
      <div slot="header" class="clearfix">
        <el-button type="primary" size="mini" @click="addArticle">新增</el-button>
      </div>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        border
        :data="articleList"
        style="width: 100%"
      >
        <el-table-column
          label="#"
          type="index"
          width="50"
          align="center"
        />
        <el-table-column
          prop="title"
          label="文章标题"
          width="250"
          align="center"
        />
        <el-table-column
          prop="coverImg"
          label="展示图片"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <img width="100px" height="100px" :src="scope.row.coverImg" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="添加时间"
          width="300"
          align="center"
        />
        <el-table-column
          prop="author"
          label="文章作者"
          align="center"
          width="200"
        />
        <el-table-column
          prop="isShow"
          label="文章是否展示"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isShow"
              :active-value="1"
              :inactive-value="0"
              @change="changeType(scope.row.isShow,scope.row.id)"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="editorType"
          label="内容"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <el-button v-if="scope.row.editorType == 0" type="primary" plain>富文本</el-button>
            <el-button v-if="scope.row.editorType == 1" type="primary" plain>markdown</el-button>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <el-button size="small" type="text" icon="el-icon-view" @click="editArticle(scope.row.id)">编辑文章</el-button>
            <el-button size="small" type="text" style="color:red" @click="delArticle(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
// 导入mixin混入
import mix from '@/mixins/index'
import { findArticles, changeShowStatus, delArticle as delArticleApi } from '@/api/content/article'
// 导入过滤搜索
import { searchFilter } from '@/utils/index'
export default {
  mixins: [mix],
  data() {
    return {
      searchArticleForm: {},
      articleList: [],
      loading: false
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    // 重置表单
    emptyform() {
      this.pagination.start = 1
      this.searchArticleForm = {}
      this.getArticleList()
    },
    // 搜索
    searchArticle() {
      this.pagination.start = 1
      this.getArticleList()
    },
    // 新增文章
    addArticle() {
      this.$router.push({ name: 'articleDetail' })
    },
    // 编辑
    editArticle(id) {
      this.$router.push({ name: 'articleEdit', params: { id }})
    },
    // 每页数量发生改变
    handleSizeChange(e) {
      // console.log(e)
      this.pagination.limit = e
      this.getArticleList()
    },
    // 页码发生改变
    handleCurrentChange(e) {
      // console.log(e)
      this.pagination.start = e
      this.getArticleList()
    },
    // 改变文章显示状态
    changeType(e, id) {
      changeShowStatus({
        isShow: e,
        id: id
      }).then(res => {
        const { success, message } = res
        if (success) {
          this.$message.success('文章状态修改成功')
        } else {
          this.$message.error(message)
        }
      })
    },
    // 删除
    delArticle(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delArticleApi(id).then(res => {
          console.log(res)
          const { success, message } = res
          if (success) {
            this.$message.success('删除成功')
          } else {
            this.$message.error(message)
          }
          this.getArticleList()
        })
      }).catch(() => {
        this.$message.info('点击取消')
      })
    },
    // 获取文章列表
    getArticleList() {
      this.loading = true
      var newSearch = searchFilter(this.searchArticleForm)

      findArticles(this.pagination.start, this.pagination.limit, newSearch)
        .then(res => {
        // console.log(res)
          const { success, data, message } = res
          if (success) {
            const { rows, total } = data
            this.articleList = rows
            this.pagination.alltotal = total
          } else {
            this.$message.error(message)
          }
          this.loading = false
        })
    }

  }
}
</script>

<style lang="scss" scoped>
.article {
  .margin-30 {
    margin: 30px;

  }
}
</style>
