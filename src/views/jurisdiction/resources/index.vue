<template>
  <div>
    <el-card shadow="always" class="margin30">
      <div slot="header">
        <span>
          <el-button type="warning" size="small">初始化菜单</el-button>
          <el-button type="primary" size="small" @click="isShow = true">新增菜单</el-button>
        </span>
      </div>
      <el-table :data="menusList" row-key="id" border>
        <el-table-column
          prop="title"
          label="菜单名称"
          width="200"
        />
        <el-table-column
          label="图标"
          width="100"
        >
          <template slot-scope="scope">
            <i :class="scope.row.icon" />
          </template>
        </el-table-column>
        <el-table-column
          prop="level"
          label="等级"
          width="100"
        />
        <el-table-column
          prop="sort"
          label="排序"
          width="100"
        />
        <el-table-column
          prop="permissionValue"
          label="权限标识"
          width="200"
        />
        <el-table-column
          prop="path"
          label="路由"
          width="200"
        /><el-table-column
          prop="component"
          label="组件路径"
          width="200"
        />
        <el-table-column
          prop="status"
          label="是否可用"
          width="100"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="200"
        />
      </el-table>
    </el-card>
    <el-dialog
      title="编辑菜单"
      :visible.sync="isShow"
      width="50%"
      @close="closeDia"
    >
      <el-form :model="editItem" label-width="80px" size="small">
        <el-form-item label="菜单类型">
          <el-radio v-model="editItem.type" :label="0">顶级目录</el-radio>
          <el-radio v-model="editItem.type" :label="1">菜单</el-radio>
          <el-radio v-model="editItem.type" :label="2">按钮</el-radio>
        </el-form-item>
        <el-form-item v-if="editItem.type == 1" label="上级菜单">
          <el-cascader
            v-model="editItem.upPage"
            :options="formatList"
            :props="{ checkStrictly: true, label:'title',value:'id',emitPath:false }"
            clearable
          />
        </el-form-item>
        <el-form-item v-if="editItem.type == 2" label="所在页面">
          <el-cascader
            v-model="editItem.nowPage"
            :options="formatList"
            :props="{ checkStrictly: true, label:'title',value:'id',emitPath:false }"
            clearable
          />
        </el-form-item>
        <el-form-item v-if="editItem.type == 2" label="按钮名称">
          <el-input v-model="editItem.name" placeholder="前端路由name,唯一" />
        </el-form-item>
        <el-form-item v-if="editItem.type !== 2" label="路由名称">
          <el-input v-model="editItem.name" placeholder="前端路由name,唯一" />
        </el-form-item>
        <el-form-item v-if="editItem.type !== 2" label="路径">
          <el-input v-model="editItem.name" placeholder="前端路由path,忽略父节点路径" />
        </el-form-item>
        <el-form-item v-if="editItem.type !== 2" label="组建路径">
          <el-input v-model="editItem.name" placeholder="前端路由组件路径,比如@/views/foo/foo.vue" />
        </el-form-item>
        <el-form-item v-if="editItem.type !== 2" label="重定向">
          <el-input v-model="editItem.name" placeholder="redirect属性" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <el-form-item label="排序">
              <el-input-number v-model="editItem.sort" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item v-if="editItem.type !==0" label="层级">
              <el-input-number v-model="editItem.sort" size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item v-if="editItem.type == 2" label="权限标识">
          <el-input v-model="editItem.name" type="textarea" />
        </el-form-item>
        <el-row v-if="editItem.type !== 2" :gutter="20">
          <el-col :span="12" :offset="0">
            <el-form-item label="是否隐藏">
              <el-radio v-model="editItem.isShow" :label="0">否</el-radio>
              <el-radio v-model="editItem.isShow" :label="1">是</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="是否展开">
              <el-radio v-model="editItem.open" :label="0">否</el-radio>
              <el-radio v-model="editItem.open" :label="1">是</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item v-if="editItem.type !== 2" label="meta属性">
          <el-row v-for="(item,index) in editItem.arr" :key="index">
            <el-col :span="8" :offset="0">
              <el-input v-model="item.key" size="mini" clearable />
            </el-col>
            <el-col :span="8" :offset="1">
              <el-input v-model="item.uname" size="mini" clearable />
            </el-col>
            <el-col :span="1" :offset="1">
              <el-button type="text" icon="el-icon-plus" @click="pushItem" />
            </el-col>
            <el-col v-if="index > 1" :span="1" :offset="0">
              <el-button type="text" style="color:red" icon="el-icon-minus" @click="splcItem(index)" />
            </el-col>
          </el-row>

        </el-form-item>

      </el-form>

      <span slot="footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="sumbit">确认</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { findAllPermissions } from '@/api/jurisdiction/user'
var _ = require('lodash')

export default {
  data() {
    return {
      menusList: [],
      isShow: false,
      editItem: {
        type: 0,
        sort: 0,
        isShow: 0,
        open: 0,
        arr: [
          {
            key: 'title',
            uname: '未命名'
          },
          {
            key: 'icon',
            uname: 'el-icon-menu'
          }
        ]
      }

    }
  },
  computed: {
    formatList() {
      var deepList = _.cloneDeep(this.menusList)
      this.reBuildDeepList(deepList)
      return deepList
    }
  },
  created() {
    this.getList()
  },
  methods: {
    sumbit() {

    },
    // 当关闭
    closeDia() {

    },
    // 添加meta属性
    pushItem() {
      this.editItem.arr.push({
        key: '',
        uname: ''
      })
    },
    // 删除meta属性
    splcItem(index) {
      this.editItem.arr.splice(index, 1)
    },
    // 转换
    reBuildDeepList(arr) {
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i]
        if (item.type === 2) {
          item.disabled = true
        }
        if (item.children && item.children.length > 0) {
          this.reBuildDeepList(item.children)
        } else {
          // 删除  空的 children
          delete item.children
        }
      }
      // console.log(this.formatList)
    },
    // 获取列表
    getList() {
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
.el-input {
  line-height: 40px;
}
</style>
