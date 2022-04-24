<template>
  <div>
    <el-card shadow="never" class="margin30">
      <div slot="header">
        <el-button type="primary" size="small" @click="isShow = true">新增</el-button>
      </div>
      <el-table
        :data="roleList"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="#"
          width="50"
        />
        <el-table-column
          prop="roleName"
          label="角色名称"
          width="200"
        />
        <el-table-column
          prop="roleCode"
          label="角色编码"
          width="200"
        />
        <el-table-column
          prop="remark"
          label="备注"
          width="255"
        />
        <el-table-column
          prop="createTime"
          label="添加时间"
          width="200"
        />
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="editItem(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="small" @click="delRole(scope.row.id)">删除</el-button>

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
      title="编辑角色"
      :visible.sync="isShow"
      width="30%"
      @close="closeDia"
    >
      <el-form :model="addiItem" label-width="80px" size="small">
        <el-form-item label="角色名称">
          <el-input v-model="addiItem.roleName" />
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input v-model="addiItem.roleCode" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addiItem.remark" type="textarea" :rows="2" />
        </el-form-item>
        <el-form-item label="选择菜单">
          <el-checkbox v-model="open" @change="openShow">展开/关闭</el-checkbox>
          <el-checkbox v-model="selectAll" @change="selectShow">全选/取消权限</el-checkbox>
          <el-tree ref="tree" v-model="addiItem.permissionIds" :data="menusList" :props="props" show-checkbox node-key="id" />
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
import { findRolesByPage, findAllPermissions, saveRolePermissions, findRolePermissions, removeRole } from '@/api/jurisdiction/user'
import mix from '@/mixins/index'
export default {
  mixins: [mix],
  data() {
    return {
      roleList: [],
      isShow: false,
      addiItem: {
        permissionIds: []
      },
      menusList: [],
      props: {
        label: 'title'
      },
      open: false, // 展开/关闭
      selectAll: false // 全选
    }
  },
  computed: {
  },
  created() {
    this.getLIst()
    this.getMenus()
  },
  methods: {
    // 展开
    openShow(e) {
      console.log(this.$refs.tree)
      var nodes = this.$refs.tree.store.nodesMap
      for (const i in nodes) {
        nodes[i].expanded = e
      }
    },
    // 全选
    selectShow(e) {
      var nodes = this.$refs.tree.store.nodesMap
      for (const i in nodes) {
        nodes[i].checked = e
      }

      console.log(this.$refs.tree)
    },
    // 确定
    sumbit() {
      this.addiItem.permissionIds = this.$refs.tree.getCheckedKeys()
      console.log(this.addiItem.permissionIds)
      saveRolePermissions(this.addiItem).then(res => {
        console.log(res)
        const { success, message } = res
        if (success) {
          this.$message.success('添加成功')
          this.isShow = false
          this.getLIst()
        } else {
          this.$message.error(message)
        }
      })
    },

    // 当对话框关闭
    closeDia() {
      this.addiItem = this.$options.data().addiItem
    },
    // 编辑
    editItem(id) {
      findRolePermissions(id).then(res => {
        console.log(res)
        const { success, data, message } = res
        if (success) {
          this.addiItem = data.role
          console.log(this.addiItem.permissionIds)
          if (this.addiItem.permissionIds == null) {
            this.addiItem.permissionIds = []
          }
          this.$nextTick(function() {
            if (this.addiItem.permissionIds) {
              this.$refs.tree.setCheckedKeys(this.addiItem.permissionIds)
            }
          })
          this.isShow = true
        } else {
          this.$message.error(message)
        }
      })
    },
    // 删除角色
    delRole(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeRole(id).then(res => {
          const { success, message } = res
          if (success) {
            this.$message.success('删除成功')
            this.getLIst()
          } else {
            this.$message.error(message)
          }
        })
      }).catch(() => {
        this.$message.info('点击取消')
      })
    },
    // 每页数量发生改变
    handleSizeChange(e) {
      // console.log(e)
      this.pagination.limit = e
      this.getLIst()
    },
    // 页码发生改变
    handleCurrentChange(e) {
      // console.log(e)
      this.pagination.start = e
      this.getLIst()
    },
    getLIst() {
      findRolesByPage(this.pagination.start, this.pagination.limit)
        .then(res => {
          console.log(res)
          const { success, data, message } = res
          if (success) {
            const { rows, total } = data
            this.roleList = rows
            this.pagination.alltotal = total
          } else {
            this.$message.error(message)
          }
        })
    },
    // 获取资源
    getMenus() {
      findAllPermissions()
        .then(res => {
          console.log(res)
          const { success, data, message } = res
          if (success) {
            const { menus } = data
            this.menusList = menus
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
