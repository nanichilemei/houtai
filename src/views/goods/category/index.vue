<template>
  <div>
    <el-card shadow="never" class="margin30">
      <div slot="header">
        <span>分类管理</span>
      </div>
      <!-- card body -->
      <div style="margin-bottom: 30px;">乐居分类</div>
      <el-row :gutter="20">
        <el-col v-for="item in headList" :key="item.id" class="w25" :offset="0">
          <el-card shadow="always" :body-style="{ padding: '20px' }">
            <div slot="header">
              <span>{{ item.name }}</span>
            </div>
            <img width="100%" height="300px" :src="item.icon" alt="">
          </el-card>
        </el-col>
      </el-row>
      <div style="margin-bottom: 30px;">全部分类</div>
      <el-table
        :data="cateList"
        style="width: 100%;"
        row-key="id"
        border
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column
          prop="name"
          label="菜单名称"
          width="150"
        />
        <el-table-column
          label="icon"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <img width="60" height="60" :src="scope.row.icon" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="分类名字"
          width="150"
          align="center"
        />
        <el-table-column
          prop="sort"
          label="排序"
          width="120"
          align="center"
        />
        <el-table-column
          prop="name"
          label="显示状态"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.showStatus == 1? '显示':'不显示' }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="导航栏展示"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.navStatus == 1? '展示':'不展示' }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          width="100"
          align="center"
        />
        <el-table-column
          prop="modifyTime"
          label="创建时间"
          align="center"
        />
      </el-table>

    </el-card>

  </div>
</template>
<script>
import { getAllCategory as getAllCategoryApi } from '@/api/goods/category'
export default {
  data() {
    return {
      headList: [],
      cateList: []
    }
  },
  computed: {
  },
  created() {
    this.getAllCategory()
  },
  methods: {
    getAllCategory() {
      getAllCategoryApi()
        .then(res => {
          console.log(res)
          const { success, data, message } = res
          if (success) {
            data.items.forEach((el, index) => {
              this.cateList.push(el.category)
              this.cateList[index].children = el.children
            })
            this.headList = data.items[1].children
            console.log(this.cateList)
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
.w25 {
  width: 25%;
  box-sizing: border-box;
  margin-bottom: 20px;
  padding: 0 10px;
}
</style>
