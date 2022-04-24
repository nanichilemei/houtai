<template>
  <div class="salenum">
    <countTo :start-val="startVal" :end-val="endVal" :duration="2000" />
  </div>
</template>
<script>
import countTo from 'vue-count-to'
export default {
  components: { countTo },
  data() {
    return {
      startVal: 0,
      endVal: 21008642
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.salenum {
  letter-spacing: 1px;
  font-size: 60px;
  font-weight: 700;
  color: #fff;
}

</style>
