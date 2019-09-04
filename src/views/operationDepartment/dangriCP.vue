<template>
    <div class="container">
        <div class="title">当日产品统计</div>
        <div class="content">
                <div class="tableTop">
                    <div class="oneMouth">
                        <el-card>
                            <div class="oneMouthTitle">1个月(含1个月以下)</div>
                            <el-table
                                :data="dataList"
                                border
                                style="width: 100%;line-height: 35px">
                                <el-table-column
                                align="center"
                                prop="lessOne"
                                label="小于一个月"
                                width="369">
                                </el-table-column>
                                <el-table-column
                                align="center"
                                prop="one"
                                label="一个月"
                                width="367">
                                </el-table-column>
                            </el-table>
                        </el-card>
                    </div>
                    <div class="threeMouth">
                        <el-card>
                            <div class="threeMouthTitle">3个月</div>
                            <el-table
                                :data="dataList"
                                border
                                style="width: 100%;line-height: 35px">
                                <el-table-column
                                align="center"
                                prop="threeDEBX"
                                label="等额本息"
                                width="245">
                                </el-table-column>
                                <el-table-column
                                align="center"
                                prop="threeDQBX"
                                label="到期本息"
                                width="245">
                                </el-table-column>
                                <el-table-column
                                align="center"
                                prop="threeAYHX"
                                label="按月还息"
                                width="247">
                                </el-table-column>
                            </el-table>
                        </el-card>
                    </div>
                </div>
                <div class="tableBottom">
                    <div class="sixMouth">
                        <el-card>
                            <div class="sixMouthTitle">6个月</div>
                            <el-table
                                :data="dataList"
                                border
                                style="width: 100%;line-height: 35px">
                                <el-table-column
                                align="center"
                                prop="sixDEBX"
                                label="等额本息"
                                width="242">
                                </el-table-column>
                                <el-table-column
                                align="center"
                                prop="sixDQBX"
                                label="到期本息"
                                width="247">
                                </el-table-column>
                                <el-table-column
                                align="center"
                                prop="sixAYHX"
                                label="按月还息"
                                width="247">
                                </el-table-column>
                            </el-table>
                        </el-card>
                    </div>
                    <div class="twentyMouth">
                        <el-card>
                            <div class="twentyMouthTitle">12个月</div>
                            <el-table
                                :data="dataList"
                                border
                                style="width: 100%;line-height: 35px">
                                <el-table-column
                                align="center"
                                prop="twelveDEBX"
                                label="等额本息"
                                width="247">
                                </el-table-column>
                                <el-table-column
                                align="center"
                                prop="twelveDQBX"
                                label="到期本息"
                                width="245">
                                </el-table-column>
                                <el-table-column
                                align="center"
                                prop="twelveAYHX"
                                label="按月还息"
                                width="245">
                                </el-table-column>
                            </el-table>
                        </el-card>
                    </div>
                </div>
        </div>
    </div>
</template>
<script>
    export default{
      data() {
        return {
          dataList: []
        }
      },
      methods: {
        getData() {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          this.$http.getRequest('dailyStatistics').then(res => {
            console.log(res)
            this.dataList.push(res.dailyStatistics)
            loading.close()
          }).catch(error => {
            console.log(error)
            loading.close()
          })
        }
      },
      mounted() {
        this.getData()
      }
    }
</script>
<style scoped>

 .title{
     font-size: 20px;
     padding-left: 25px;
     line-height: 60px;
     background: #f8f8f8
 }

 .content{
     /*width: 1660px;*/
     margin: 0 auto;
     margin-top: 90px;

 }
 .tableTop{
     overflow: hidden;
 }
 .oneMouth,.sixMouth{
     width: 48%;
     float: left;
   margin-left: 2%
 }
 .tableBottom{
     overflow: hidden;
     margin-top: 80px
 }
 .threeMouth,.twentyMouth{
     width: 48%;
     float: left;
    margin-left: 2%
 }
 .oneMouthTitle{
     text-align: center;
     color: #fff;
     font-size: 18px;
     background: #ffce55;
     line-height: 60px
 }
 .threeMouthTitle{
    text-align: center;
     color: #fff;
     font-size: 18px;
     background: #8cc474;
     line-height: 60px
 }
 .sixMouthTitle{
    text-align: center;
     color: #fff;
     font-size: 18px;
     background: #5db2ff;
     line-height: 60px
 }
 .twentyMouthTitle{
     text-align: center;
     color: #fff;
     font-size: 18px;
     background: #df5138;
     line-height: 60px
 }
</style>
<style>
        body{
            min-width: 1366px!important;
        }
        .el-loading-spinner i{
          font-size: 45px!important;
        }
        .el-loading-spinner .el-loading-text{
          font-size: 28px;
        }
      .el-table__header-wrapper>table{
        width:auto!important;
      }
  .el-table__body-wrapper>table{
    width:auto!important;
  }
       </style>
