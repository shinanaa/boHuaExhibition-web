<template>
    <div class="container">
        <div class="chooseDate">
            <span>请选择查询日期</span>&nbsp;&nbsp;&nbsp;
            <div class="timer">
                <el-date-picker
                    @change="chooseTimer"
                    v-model="value"
                    type="date"
                    size="large"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="btn">
                <el-button type="primary" round @click="getData">查询</el-button>
            </div>
        </div>
        <div class="content">
            <el-card class="box-card" style="height:150px">
                <div class="realAmount">
                    <span style="font-size:20px;color: #5db2ff">真实待收金额 :</span> 
                    <span style="font-size:20px">{{data.realAmount |currency}} </span>   
                </div>
                <div class="userAmount">
                    <span style="font-size:20px;color: #8cc474">用户待收金额 :</span>
                    <span style="font-size:20px">{{data.userAmount |currency}} </span>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script>
    import { currency } from '../../utils/moneyGs.js'
    export default{
      data() {
        return {
          value: '', // 日期
          data: {}
        }
      },
      mounted() {
        this.firstMethod()
      },
      filters: {
        currency
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
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          const params = {
            startDate: this.value
          }
          this.$http.getRequest('unrepayRecord', params).then(res => {
            this.data = res
            loading.close()
          }).catch(error => {
            console.log(error)
            loading.close()
          })
        },
        chooseTimer(val) {
          this.value = val
        },
        firstMethod() {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          loading.close()
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
        width: 800px;
        margin: 0 auto;
        margin-top: 60px;
    }
    .userAmount{
        margin-top: 40px
    }
    .realAmount{
        margin-top: 10px
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
