<template>
  <div>
    <el-card shadow="never" class="margin30">
      <div slot="header">
        <span>注册用户列表</span>
      </div>
      <el-table
        :data="registerList"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="#"
          width="50"
        />
        <el-table-column
          prop="username"
          label="用户名"
          align="center"
          width="200"
        />
        <el-table-column
          align="center"
          label="头像"
          width="200"
        >
          <template slot-scope="scope">
            <!-- <img width="100px" style="border-radius: 50%;" height="100px" :src="scope.row.icon" alt=""> -->
            <el-avatar :size="8*8" :src="scope.row.icon" />
          </template>
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
          align="center"
          width="150"
        />
        <el-table-column
          prop="realname"
          label="真实姓名"
          align="center"
          width="200"
        />
        <el-table-column
          label="性别"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.sex == 1">男</div>
            <div v-if="scope.row.sex == 0">女</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          align="center"
          width="200"
        />
        <el-table-column
          prop="email"
          label="邮箱"
          align="center"
          width="200"
        />
        <el-table-column
          prop="birthday"
          label="生日"
          align="center"
          width="200"
        />
        <el-table-column
          prop="createTime"
          label="注册时间"
          align="center"
          width="150"
        />
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
import { findMembersByPage } from '@/api/register/index'
import mix from '@/mixins/index'

export default {
  mixins: [mix],
  data() {
    return {
      registerList: []
    }
  },
  computed: {
  },
  created() {
    this.getRegisterList()
  },
  methods: {
    // 每页数量发生改变
    handleSizeChange(e) {
      // console.log(e)
      this.pagination.limit = e
      this.getRegisterList()
    },
    // 页码发生改变
    handleCurrentChange(e) {
      // console.log(e)
      this.pagination.start = e
      this.getRegisterList()
    },
    // 获取注册用户列表
    getRegisterList() {
      findMembersByPage(this.pagination.start, this.pagination.limit)
        .then(res => {
          console.log(res)
          const { success, data, message } = res
          if (success) {
            const { rows, total } = data
            this.registerList = rows
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
.userIcon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
