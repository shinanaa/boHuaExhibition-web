<template>
  <div class="container">
    <div class="content">
      <el-card class="box-card" style="margin-top:100px">
        <div class="title">{{title}}</div>
        <div class="chognzhi">
          <el-table
            :data="chongzhi"
            border
            style="width: 100%;margin-top: 16px">
            <el-table-column
              align="center"
              prop="sourceName"
              label="渠道名称"
              width="301">
            </el-table-column>
            <el-table-column
              align="center"
              prop="rechargeMoney"
              label="充值金额"
              width="301">
            </el-table-column>
            <el-table-column
              align="center"
              prop="withdrawMoney"
              label="提现金额"
              width="301">
            </el-table-column>
            <el-table-column
              align="center"
              prop="amount"
              label="投资金额"
              width="301">
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        title: '',
        chongzhi: [] // 数据
      }
    },
    created() {
      this.getData()
    },
    methods: {
      // 根据日期查询方法

      getData() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        const that = this
        this.$http.getRequest('getSourceCount').then(res => {
          if (res.code === 1) {
            that.title = res.recordTime + ' 渠道用户充值、提现、投资信息'
            that.chongzhi = res.resultList
          } else {
            that.title = ' 暂无数据'
          }
          loading.close()
        }).catch(error => {
          console.log(error)
          loading.close()
        })
      }
    }
  }
</script>

<style scoped>
  .btn>>>.el-button{
    width: 120px;
    margin-left: 20px
  }
  .chooseDate{
    width: 650px;

    margin: 0 auto;
    line-height: 40px;
    margin-top: 80px;
    display: flex;
    margin-bottom: 80px
  }
  .content{
    margin: 0 auto;
    width: 1250px;
    padding-bottom: 150px
  }
  .title{
    text-align: center;
    font-size: 18px
  }
  .fast,.person_duo{
    margin-top: 15px;
  }
  .inventCountAndTotleCount{
    display: flex;
    margin-top: 100px;
    width: 1248px
  }
  /* .inventCountAndTotleCount>div{
    flex:1
  } */
  .content>>>.el-table__header th, .el-table__header tr {
    background-color: skyblue;
    color: #fff
  }

</style>
<style>
  .el-loading-spinner i{
    font-size: 45px!important;
  }
  .el-loading-spinner .el-loading-text{
    font-size: 28px;
  }
</style>

