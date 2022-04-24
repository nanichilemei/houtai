<template>
  <div>
    <el-card shadow="never" class="margin30">
      <el-form :model="userFrom" label-width="80px" size="mini">

        <el-row :gutter="20">
          <el-col :span="6" :offset="0">
            <el-form-item label="昵称">
              <el-input v-model="userFrom.nickName" placeholder="昵称模糊搜索" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-form-item label="用户名">
              <el-input v-model="userFrom.username" placeholder="用户名模糊搜索" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" :offset="18">
            <el-button type="primary" size="mini" @click="searchUser">搜索</el-button>
            <el-button style="margin: 0 20px;" type="default" size="mini" @click="emptyform">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="never" class="margin30">
      <div slot="header">
        <el-button type="primary" size="small" @click="isShow = true">新增</el-button>
      </div>
      <el-table
        :data="userList"
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
          width="200"
        />
        <el-table-column
          prop="nick_name"
          label="昵称"
          width="200"
        />
        <el-table-column
          label="头像"
          width="200"
        >
          <template slot-scope="scope">
            <img width="100" height="100" :src="scope.row.salt" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="roles"
          label="角色"
          width="80"
        />
        <el-table-column
          prop="create_time"
          label="添加时间"
          width="200"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="editUser(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="small" @click="delUser(scope.row.id)">删除</el-button>

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
    <el-dialog
      title="编辑用户"
      :visible.sync="isShow"
      width="30%"
      @close="closeDia"
    >
      <el-form :model="newForm" label-width="80px" size="small">
        <el-form-item label="用户名">
          <el-input v-model="newForm.username" :disabled="newForm.id == ''? false:true" />
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input v-model="newForm.nickName" />
        </el-form-item>
        <el-form-item v-if="newForm.id == ''" label="密码">
          <el-input v-model="newForm.password " />
        </el-form-item>
        <el-form-item label="用户头像">
          <el-upload
            :show-file-list="false"
            :action="uploadFileOss"
            :headers="token"
            :on-success="coverImgUplaodSucc"
          >
            <div style="width:50px;height:50px;">
              <img v-if="newForm.salt" width="80" height="80" :src="newForm.salt" alt="">
              <div v-else class="block"><el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" /></div>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="选择角色">
          <el-select v-model="newForm.roleIds" multiple clearable>
            <el-option
              v-for="item in allRolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click=" isShow= false">取消</el-button>
        <el-button type="primary" @click="sumbit">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { findUsersByPage, findAllRoles, saveUserRoles, removeUser, getUserInfo, updateUserRoles } from '@/api/jurisdiction/user'
import mix from '@/mixins/index'
import { searchFilter } from '@/utils/index'
export default {
  mixins: [mix],
  data() {
    return {
      userFrom: {
        nickName: '',
        username: ''
      },
      userList: [],
      isShow: false,
      newForm: {
        salt: '',
        roleIds: [],
        id: ''
      },
      allRolesList: []
    }
  },
  computed: {
  },
  created() {
    this.getUserList()
    this.getAllRoles()
  },
  methods: {
    // 确认
    sumbit() {
      var api = null
      var text = ''
      if (this.newForm.id) {
        api = updateUserRoles
        text = '更新成功'
      } else {
        api = saveUserRoles
        text = '添加成功'
      }
      console.log(this.newForm.roleList)
      api(this.newForm).then(res => {
        console.log(res)
        const { success, message } = res
        if (success) {
          this.$message.success(text)
          this.isShow = false
          this.getUserList()
        } else {
          this.$message.error(message)
        }
      })
    },
    // 关闭
    closeDia() {
      this.newForm = this.$options.data().newForm
    },
    // 上传头像
    coverImgUplaodSucc(res) {
      console.log(res)
      this.newForm.salt = res.data.fileUrl
    },
    // 获取所有角色
    getAllRoles() {
      findAllRoles().then(res => {
        this.allRolesList = res.data.items
      })
    },
    // 编辑用户
    editUser(id) {
      getUserInfo(id).then(res => {
        console.log(res.data.user.roleIds)
        const { success, data, message } = res
        if (success) {
          this.newForm = data.user
          this.isShow = true
        } else {
          this.$message.error(message)
        }
      })
    },
    // 删除用户
    delUser(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeUser(id).then(res => {
          const { success, message } = res
          if (success) {
            this.$message.success('删除成功')
            this.getUserList()
          } else {
            this.$message.error(message)
          }
        })
      }).catch(() => {
        this.$message.info('点击取消')
      })
    },
    // 搜索
    searchUser() {
      // this.pagination.start = 1
      // this.getUserList()
    },
    // 重置
    emptyform() {
      this.pagination.start = 1
      this.searchGoodsForm = {}
      this.getUserList()
    },
    // 每页数量发生改变
    handleSizeChange(e) {
      // console.log(e)
      this.pagination.limit = e
      this.getUserList()
    },
    // 页码发生改变
    handleCurrentChange(e) {
      // console.log(e)
      this.pagination.start = e
      this.getUserList()
    },
    // 获取商品列表
    getUserList() {
      var newSearch = searchFilter(this.userFrom)
      console.log(newSearch)
      findUsersByPage(this.pagination.start, this.pagination.limit)
        .then(res => {
          const { success, data, message } = res
          if (success) {
            const { rows, total } = data
            this.userList = rows
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
</style>
