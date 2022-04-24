import { getToken } from '@/utils/myauth'

export default {
  data() {
    return {
      pagination: {
        start: 1,
        limit: 10,
        alltotal: 0,
        pageSize: [10, 15, 20, 30]
      },
      uploadFileOss: '/lejuAdmin/material/uploadFileOss'
    }
  },
  computed: {
    token() {
      return {
        token: getToken()
      }
    }
  }
}
