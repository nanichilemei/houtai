<template>
  <div>
    <el-card shadow="never" class="margin30">
      <div slot="header">
        <span>新增文章</span>
      </div>
      <el-form ref="articleForm" :model="acticle" :rules="rules" label-width="120px" :inline="false" size="mini">
        <el-row :gutter="20">
          <el-col :span="8" :offset="0">
            <el-form-item label="作者" prop="author">
              <el-input v-model="acticle.author" placeholder="作者姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="0">
            <el-form-item label="标题" prop="title">
              <el-input v-model="acticle.title" placeholder="文章标题" />
            </el-form-item>
          </el-col>
          <el-col :span="3" :offset="0">
            <el-form-item label="是否显示">
              <el-switch v-model="acticle.isShow " :active-value="1" :inactive-value="0" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="17" :offset="0">
            <el-form-item label="摘要">
              <el-input v-model="acticle.summary " type="textarea" :rows="3" placeholder="摘要" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="17" :offset="0">
            <el-form-item label="封面图片">
              <el-upload
                ref="uploadCom"
                :action="uploadFileOss"
                :headers="token"
                :on-success="coverImgUplaodSucc"
                :before-upload="beforeCoverImg"
              >
                <img v-if="acticle.coverImg" width="100" height="100" :src="acticle.coverImg" alt="">
                <el-button v-else size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <el-form-item label="切换富文本类型">
              <el-radio v-model="acticle.editorType" :label="0" @change="editorchange">富文本</el-radio>
              <el-radio v-model="acticle.editorType" :label="1" @change="editorchange">markdown</el-radio>
              <span style="color:#e6a23c"> <i class="el-icon-warning" /> 注意!切换编辑器会清空编辑内容</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" :offset="0">
            <Tinymce v-if="acticle.editorType == 0" v-model="acticle.content1" />
            <mavon-editor v-if="acticle.editorType == 1" ref="markdowneditor" v-model="acticle.content1" @imgAdd="$imgAdd" />
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="center">
          <el-col :span="6" :offset="0">
            <el-form-item>
              <el-button style="margin-top: 20px;" type="primary" size="default" @click="sumbit">{{ sumbitTitle }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import { addArticle, productArticle, updateArticle } from '@/api/content/article'
import mix from '@/mixins/index'
import axios from 'axios'
export default {
  components: {
    Tinymce
  },
  mixins: [mix],
  data() {
    return {
      rules: {

        author: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      },
      acticle: {
        isShow: 1,
        editorType: 0,
        coverImg: ''
      },
      id: '',
      sumbitTitle: '立即新增'
    }
  },
  computed: {
  },
  created() {
    this.id = this.$route.params.id
    // console.log(this.id)
    if (this.id) {
      this.updateArticle()
      this.sumbitTitle = '更新'
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$confirm('是否要跳转到其他界面?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      next()
    }).catch(() => {
      this.$message.info('点击取消')
    })
  },
  methods: {
    // 更新文章
    updateArticle() {
      productArticle(this.id)
        .then(res => {
          const { success, data, message } = res
          if (success) {
            this.acticle = data.productArticle
          } else {
            this.$message.error(message)
          }
        })
    },
    // 编辑器类型发生改变
    editorchange() {
      this.acticle.content1 = ''
    },
    // 提交
    sumbit() {
      this.$refs.articleForm.validate((valid) => {
        if (valid) {
          console.log(this.acticle)
          // 判断是否富文本或markd
          if (this.acticle.editorType === 0) {
            this.acticle.content2 = this.acticle.content1
          } else if (this.acticle.editorType === 1) {
            this.acticle.content2 = this.$refs.markdowneditor.d_render
          }
          // 判断是新增还是更新
          var Api = null
          if (this.id) {
            this.acticle.id = this.id
            Api = updateArticle
          } else {
            Api = addArticle
          }
          Api(this.acticle)
            .then(res => {
              // console.log(res)
              const { success, message } = res
              if (success) {
                this.$message.success('添加成功')
                this.$router.push('/content/article')
              } else {
                this.$message.error(message)
              }
            })
        } else {
          this.$message.error('请注意表单验证')
          return false
        }
      })
    },
    // 上传之前校验
    beforeCoverImg(file) {
      const reg = /^image\/(jpeg|png|gif|webp)$/
      const isJPG = reg.test(file.type)
      const isLt2M = file.size / 1024 / 1024 < 1.5

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1.5MB!')
      }
      return isJPG && isLt2M
    },
    // 封面图片上传成功
    coverImgUplaodSucc(response, file, fileList) {
      const { success, data, message } = response
      if (success) {
        this.acticle.coverImg = data.fileUrl
        this.$refs.uploadCom.clearFiles()
      } else {
        this.$message.error(message)
      }
    },
    // markdown上传图片
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('file', $file)
      axios({
        url: this.uploadFileOss,
        method: 'post',
        data: formdata,
        headers: this.token
      }).then((res) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
               * $vm 指为mavonEditor实例，可以通过如下两种方式获取
               * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
               * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
               */
        const { success, data, message } = res
        if (success) {
          const { fileUrl } = data
          this.$refs.markdowneditor.$img2Url(pos, fileUrl)
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
