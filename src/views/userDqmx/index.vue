<template>
  <div class="container">
    <!--<div class="title2">到期明细</div>-->
    <div class="content">
      <el-card class="box-card" style="margin-top:100px">
        <div class="title">{{title}} 到期统计及到期用户投资统计</div>

        <div class="chognzhi">
          <el-table
            :data="chongzhi"
            border
            style="width: 100%;margin-top: 16px">
            <el-table-column
              align="center"
              prop="curDate"
              label="日期"
              width="240">
            </el-table-column>
            <el-table-column
              align="center"
              prop="curExpireAmount"
              label="当日到期金额"
              width="242">
            </el-table-column>
            <el-table-column
              align="center"
              prop="curExpireUserCount"
              label="当日到期用户数量"
              width="242">
            </el-table-column>
            <el-table-column
              align="center"
              prop="curInvestAmount"
              label="到期用户当日投资金额"
              width="242">
            </el-table-column>
            <el-table-column
              align="center"
              prop="curInvestUserCount"
              label="到期当日投资用户数量"
              width="241">
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
    <div class="content" >

      <el-card class="box-card" style="margin-top:100px">
        <div class="title">历史到期统计及到期用户投资统计</div>
        <div class="chognzhi">
          <el-table
            :data="array"
            border
            style="width: 100%;margin-top: 16px">
            <el-table-column
              align="center"
              prop="recordDate"
              label="日期"
              width="240">
            </el-table-column>
            <el-table-column
              align="center"
              prop="expireAmount"
              label="到期金额"
              width="242">
            </el-table-column>
            <el-table-column
              align="center"
              prop="expireUserCount"
              label="到期用户数量"
              width="242">
            </el-table-column>
            <el-table-column
              align="center"
              prop="investAmount"
              label="到期用户投资金额"
              width="242">
            </el-table-column>
            <el-table-column
              align="center"
              prop="investUserCount"
              label="到期当日投资用户数量"
              width="241">
            </el-table-column>
          </el-table>
          <div class="pageCont" v-show="pageShow">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage1"
              :page-size="10"
              background
              layout="prev, pager, next"
              :total="totalCount">
            </el-pagination>
          </div>
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
        chongzhi: [], // 数据
        currentPage1: 1,
        pageShow: false,
        page: 1,
        inputValue: '',
        pageALL: '',
        totalCount: 0,
        array: [], // 数据
        title2: ''
      }
    },
    created() {
      this.getData()
      this.getDataNew(1)
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
        // const that = this
        this.$http.postRequest('getMaturityCont').then(res => {
          loading.close()
          this.title = res.curDate
          const obj = {
            'curDate': res.curDate,
            'curExpireAmount': res.curExpireAmount,
            'curExpireUserCount': res.curExpireUserCount,
            'curInvestAmount': res.curInvestAmount,
            'curInvestUserCount': res.curInvestUserCount
          }
          this.chongzhi.push(obj)
        }).catch(error => {
          console.log(error)
          loading.close()
        })
      },
      getDataNew() {
        const that = this
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        const params = {
          pageNum: that.page
        }
        this.$http.postRequest('getMaturityContPage', params).then(res => {
          that.title2 = ' 渠道用户应收本金、收益'
          that.array = res.historyData
          if (that.array.length > 0) {
            that.pageShow = true
            that.totalCount = res.totalCount
          } else {
            that.pageShow = false
          }
          loading.close()
        }).catch(error => {
          console.log(error)
          loading.close()
        })
      },
      handleSizeChange(e) {
        this.pageChange(e)
      },
      handleCurrentChange(e) {
        this.pageChange(e)
      },
      pageChange(page) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        const that = this
        const params = {
          pageNum: page
        }
        this.$http.postRequest('getMaturityContPage', params).then(res => {
          that.array = res.historyData
          that.totalCount = res.totalCount
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
    padding-bottom: 50px
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
  body{
    min-width: 1850px;
  }
  .el-loading-spinner i{
    font-size: 45px!important;
  }
  .el-loading-spinner .el-loading-text{
    font-size: 28px;
  }
  .title2{
    font-size: 20px;
    padding-left: 25px;
    line-height: 60px;
    background: #f8f8f8
  }
  .pageCont{
    margin-top: 23px;
  }
  .pageCont>div{
    margin: 0 auto;
    text-align: right;
  }
</style>

