<template>
  <div class="container">
    <div class="chooseDate">
      <el-input v-model="inputValue" placeholder="请输入查询内容"></el-input>
      <div class="btn">
        <el-button type="primary" round @click="getData(2)">查询</el-button>
      </div>
    </div>
    <div class="content">

      <el-card class="box-card" style="margin-top:100px">
        <div class="title">{{title}}</div>
        <div class="chognzhi">
          <el-table
            :data="array"
            border
            style="width: 100%;margin-top: 16px">
            <el-table-column
              align="center"
              prop="name"
              label="渠道名称"
              width="402">
            </el-table-column>
            <el-table-column
              align="center"
              prop="fund"
              label="应收本金"
              width="402">
            </el-table-column>
            <el-table-column
              align="center"
              prop="income"
              label="应收收益"
              width="403">
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
        currentPage1: 1,
        pageShow: false,
        title: '',
        page: 1,
        inputValue: '',
        pageALL: '',
        totalCount: 0,
        array: [] // 数据
      }
    },
    created() {
      this.getData(1)
    },
    methods: {
      getData(type) {
        const that = this
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        if (type === 2) {
          that.currentPage1 = 1
        }
        const params = {
          pageNum: that.page,
          sourceName: that.inputValue
        }
        this.$http.postRequest('getSourceFund', params).then(res => {
          that.title = res.date + ' 渠道用户应收本金、收益'
          that.array = res.result
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
          pageNum: page,
          sourceName: that.inputtotalValue
        }
        this.$http.postRequest('getSourceFund', params).then(res => {
          that.array = res.result
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
  body{
    min-width: 1850px;
  }
  .el-loading-spinner i{
    font-size: 45px!important;
  }
  .el-loading-spinner .el-loading-text{
    font-size: 28px;
  }
  .pageCont{
    margin-top: 23px;
  }
  .pageCont>div{
    margin: 0 auto;
    text-align: right;
  }
</style>

