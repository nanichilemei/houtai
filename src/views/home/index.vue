<template>
  <div ref="home" class="home">
    <div class="top">
      <div class="icon1" @click="quanping">
        <svg t="1648348810518" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2224" width="25" height="25">
          <path d="M368.896 192H224a32 32 0 0 0-32 32v137.888a32 32 0 0 0 64 0V256h112.896a32 32 0 0 0 0-64zM784.864 192H640a32 32 0 1 0 0 64h112.864v105.888a32 32 0 1 0 64 0V224a32 32 0 0 0-32-32zM368.896 777.92H256V672a32 32 0 1 0-64 0v137.92a32 32 0 0 0 32 32h144.896a32 32 0 1 0 0-64zM784.864 640a32 32 0 0 0-32 32v105.92H640a32 32 0 1 0 0 64h144.864a32 32 0 0 0 32-32V672a32 32 0 0 0-32-32z" p-id="2225" fill="#9aa8d4" />
          <path d="M912 48h-800c-35.296 0-64 28.704-64 64v800c0 35.296 28.704 64 64 64h800c35.296 0 64-28.704 64-64v-800c0-35.296-28.704-64-64-64z m-800 864v-800h800l0.064 800H112z" p-id="2226" fill="#9aa8d4" />
        </svg>
      </div>
      <div class="title">
        <span>不凡数据大屏</span>
      </div>
      <div class="nowtime">{{ nowTime }}</div>
    </div>
    <div class="cont">
      <div class="contItem contLeft">
        <div class="Title">
          电商数据 <span>Shell Data</span>
        </div>
        <div class="leftData">
          <div class="leftTitle">
            销售量
            <span>万元</span>
          </div>
          <div class="numb">
            <SaleNum />
          </div>
        </div>
        <div class="leftData">
          <div class="leftTitle">
            完成百分比
          </div>
          <div class="wrapper">
            <div class="line">
              <div id="lineInner" class="lineInner" />
            </div>
          </div>
        </div>
        <div class="Title">
          热门搜索词 <span>Top Search</span>
        </div>
        <div class="worldech">
          <World />
        </div>
      </div>
      <div class="contItem contCenter">
        <div id="echBox">
          <OrderEcharts :order-num="orderNum" />
        </div>
        <div class="bottomBox">
          <div class="item">
            <MapEcharts />
          </div>
          <div class="item">
            <PieEcharts />
          </div>
        </div>
      </div>
      <div class="contItem contRight">
        <div class="Title">
          统计数据 <span>Statistics Data</span>
        </div>
        <div class="statistics-content">
          <div class="statistics-item">
            <div class="left">
              <img width="80%" src="@/icons/order.png" alt="">
            </div>
            <div class="right">
              <div class="wrapper">
                <div class="value">85.6</div>
                <div class="text">订单总数 (万)</div>
              </div>
            </div>
          </div>
          <div class="statistics-item">
            <div class="left">
              <img width="80%" src="@/icons/order.png" alt="">
            </div>
            <div class="right">
              <div class="wrapper">
                <div class="value">85.6</div>
                <div class="text">订单总数 (万)</div>
              </div>
            </div>
          </div>
          <div class="statistics-item">
            <div class="left">
              <img width="80%" src="@/icons/order.png" alt="">
            </div>
            <div class="right">
              <div class="wrapper">
                <div class="value">85.6</div>
                <div class="text">订单总数 (万)</div>
              </div>
            </div>
          </div>
          <div class="statistics-item">
            <div class="left">
              <img width="80%" src="@/icons/order.png" alt="">
            </div>
            <div class="right">
              <div class="wrapper">
                <div class="value">85.6</div>
                <div class="text">订单总数 (万)</div>
              </div>
            </div>
          </div>
        </div>
        <div class="Title" style="margin:20px 0">
          大额订单Top <span>Supper Orders</span>
        </div>
        <div class="table">
          <table>
            <tr>
              <th>时间</th>
              <th>物品</th>
              <th>数量</th>
              <th>金额</th>
            </tr>
            <tr v-for="item in mocklist" :key="item.name">
              <td>12-22</td>
              <td>{{ item.name }}</td>
              <td>{{ item.number }}</td>
              <td>{{ item.price }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="bg-animate">
      <BgAnimate />
    </div>
  </div>
</template>
<script>
import { mockData, mockList } from './mock'
import OrderEcharts from './components/orderEchatys.vue'
import SaleNum from './components/saleNumb.vue'
import World from './components/worldEcharts.vue'
import PieEcharts from './components/pieEcharts.vue'
import MapEcharts from './components/mapEcharts.vue'
import BgAnimate from './components/BgAnimate.vue'
import screenfull from 'screenfull'
export default {
  components: {
    OrderEcharts,
    SaleNum,
    World,
    PieEcharts,
    MapEcharts,
    BgAnimate
  },
  mixins: [
  ],
  data() {
    return {
      nowTime: '',
      p: '88%'
    }
  },
  computed: {
    orderNum() {
      return mockData()
    },
    mocklist() {
      return mockList()
    }
  },
  created() {
    this.getNowTime()
  },
  mounted() {
    document.getElementById('lineInner').style.setProperty('--animationWidth', this.p)
  },
  methods: {
    quanping() {
      if (screenfull.isEnabled) {
        // screenfull.request(this.$refs.home)
        screenfull.toggle(this.$refs.home)
      }
    },
    getNowTime() {
      setInterval(() => {
        var now = new Date()
        // console.log(new Date())
        // console.log(Date.now())
        var month = now.getMonth() + 1
        var nowMonth = month < 10 ? '0' + month : month
        this.nowTime = `${now.getFullYear()}- ${nowMonth}- ${now.getDate()} ${now.getHours()}: ${now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()}: ${now.getSeconds()}`
        // console.log(this.nowTime)
      }, 1000)
    }
  }

}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  // height: 800px;
  background-color: #0a1631;
  font-family: Microsoft Yahei,Arial,sans-serif;
  .top {
    width: 100%;
    height: 100px;
    position: relative;
    .icon1 {
      // display: inline-block;
      position: absolute;
      left: 10px;
      top: 10px;
      font-size: 10px;
    }
    .title {
      margin: 0 auto;
      background-image: url("http://zhujinlong.gitee.io/leju_shop_admin/static/img/titleBG.a4cdf1b6.png");
      background-size: 100% 100%;
      width: 70%;
      height: 122px;
      text-align: center;
      line-height: 100px;
      font-size: 36px;
      position: relative;
      span {
        font-family: Microsoft Yahei,Arial,sans-serif;
        font-size: 36px;
        color: #fff;
        text-shadow: #fff 0 0 15px;
        font-weight: 700;
      }
    }
    .nowtime{
      color: #fff;
      position: absolute;
      right: 50px;
      top: 20px;
      font-family: Microsoft Yahei,Arial,sans-serif;
      font-size: 20px;
    }
  }
  .cont {
    display: flex;
    height: 800px;
    width: 100%;
    .Title {
        font-size: 22px;
        color: #9aa8d4;
        span {
          font-size: 20px;
          color: #404d69;
        }
      }
    .contItem{
      padding: 10px 0 0 10px;
      box-sizing: border-box;
    }
    .contLeft {
      width: 25%;
      height: 100%;

      .leftData {
        margin: 20px 0;
        .leftTitle {
          font-size: 16px;
          color: #9aa8d4;
          span {
            float: right;
            font-size: 16px;
            color: #73aae5;
          }
        }
        .numb {
          margin-top: 20px;
          width: 100%;
          overflow: hidden;
        }
        .wrapper {
          margin: 20px auto;
          width: 85%;
          height: 50px;
          position: relative;
          .line {
            position: absolute;
            top: 65%;
            transform: translateY(-50%);
            width: 100%;
            height: 10px;
            border-radius: 5px;
            background-color: #283052;
            .lineInner {
              width: 50%;
              border-radius: 5px;
              height: 10px;
              top: 0;
              left: 0;
              background: linear-gradient(90deg,#24cbff 30%,#9000ff);
              position: absolute;
              animation: sliding 0.5s linear 2s  forwards;
              &::before {
                content: "88%";
                color: #fff;
                font-size: 22px;
                position: absolute;
                right: -10px;
                top: -30px;
              }
              &::after{
                content: '';
                width: 0;
                height: 0;
                position: absolute;
                right: -10px;
                top: 15px;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-bottom: 10px solid #fff;
              }
            }
          }
          @keyframes sliding {
            from{
              // width: 50%;
            }
            to{
              // 自定义属性
              // --demo:50%;
              width:var(--animationWidth);

            }
          }
        }
      }
      .worldech {
        margin-top: 20px;
        width: 100%;
        height: 390px;
        background-color: #16223c;
      }

    }
    .contCenter{
      width: 50%;
      #echBox {
        width: 95%;
        margin: 0 auto;
        height: 360px;
      }
      .bottomBox {
        width: 95%;
        margin: 0 auto;
        height: 360px;
        overflow: hidden;
        display: flex;
        .item {
          width: 50%;
          height: 360px;
        }
      }
    }
    .contRight {
      width: 25%;
      padding-right: 10px;
      .statistics-content {
        position: relative;
        width: 100%;
        height: 150px;
        margin-top: 20px;
        .statistics-item {
          position: relative;
          float: left;
          width: 50%;
          height: 50%;
          .left {
            float: left;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 35%;
          }
          .right {
            float: left;
            display: flex;
            align-items: center;
            height: 100%;
            width: 65%;
            padding-left: 15px;
            .value {
              font-size: 32px;
              font-weight: 700;
              color: #fff;
            }
            .text {
              margin-top: 4px;
              font-size: 12px;
              color: #b0c2f9;
              align-self: flex-start;
            }
          }
        }
      }
      .table{
        color: #9aa8d4;
        border: 1px solid #33416b;
        border-bottom: none;
        table {
          width: 100%;
        }
        tr{
          width: 100%;
          height: 34px;
        th{
          height: 34px;
          width: 25%;
          line-height: 34px;
          text-align: center;
          border-bottom: 1px solid #33416b;
        }
        td{
          text-align: center;
          height: 34px;
          line-height: 34px;
          width: 25%;
          font-size: 14px;
          border-bottom: 1px solid #33416b;
        }
        }
}

    }
  }
  .bg-animate{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 20%;
  }
}
</style>
