<template>
  <div class="container">

    <div class="content">
      <el-card class="box-card" style="height:700px;">
        <div class="myChart" id="myChart" style="width: 1250px;height: 700px;"></div>
      </el-card>
    </div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import { currency } from '../../utils/moneyGs.js'

  export default{
    data() {
      return {
        fullscreenLoading: false,
        value: '', // 日期
        data: {},
        resultData1: [],
        resultData3: [],
        resultData6: [],
        resultData12: [],
        xTime: [] // x轴数组
      }
    },
    filters: {
      currency
    },
    mounted() {
      this.getData()
    },
    // computed: {
    //    moren() {
    //       if(!this.data.length){
    //           return 0
    //       }else{
    //           return ""
    //       }
    //    }
    // },
    methods: {
      getData() {
        const that = this
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$http.getRequest('getLineData').then(res => {
          that.value = res.date
          for (let i = 0; i < res.resultData1.length; i++) {
            that.xTime.push(res.resultData1[i].recordTime)
          }
          for (let i = 0; i < res.resultData1.length; i++) {
            that.resultData1.push(res.resultData1[i].standardOne)
          }
          for (let i = 0; i < res.resultData3.length; i++) {
            that.resultData3.push(res.resultData3[i].standardThree)
          }
          for (let i = 0; i < res.resultData6.length; i++) {
            that.resultData6.push(res.resultData6[i].standardSix)
          }
          for (let i = 0; i < res.resultData12.length; i++) {
            that.resultData12.push(res.resultData12[i].standardTwelve)
          }
          that.initChart()
          loading.close()
        }).catch(error => {
          console.log(error)
          loading.close()
        })
      },
      initChart() {
        const that = this
        var myChart = echarts.init(document.getElementById('myChart'))
        var option = {
          title: {
            text: that.value
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            show: true,
            data: ['一个月散标产品', '三个月散标产品', '六个月散标产品', '十二个月散标产品']
          },
          grid: {
            left: '3%',
            right: '8%',
            bottom: '10%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: that.xTime
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '一个月散标产品',
              type: 'line',
              stack: '总量',
              data: that.resultData1
            },
            {
              name: '三个月散标产品',
              type: 'line',
              stack: '总量',
              data: that.resultData3
            },
            {
              name: '六个月散标产品',
              type: 'line',
              stack: '总量',
              data: that.resultData6
            },
            {
              name: '十二个月散标产品',
              type: 'line',
              stack: '总量',
              data: that.resultData12
            }
          ]
        }
        myChart.setOption(option)
      }

    }
  }
</script>

<style scoped>
  .chooseDate{
    width: 650px;
    margin: 0 auto;
    line-height: 40px;
    display: flex;
    margin-top: 80px;
    margin-bottom: 80px;
  }
  .btn>>>.el-button{
    width: 120px;
    margin-left: 20px
  }
  .content{
    width: 1250px;
    margin: 0 auto;
    margin-top: 60px;
  }
  .userAmount{
    margin-top: 40px
  }
  .realAmount{
    margin-top: 10px
  }
  .font20{
    font-size: 100px;
  }
</style>
<style>
  body{
    min-width: 1600px;
  }
  .el-loading-spinner i{
    font-size: 45px!important;
  }
  .el-loading-spinner .el-loading-text{
    font-size: 28px;
  }
</style>
