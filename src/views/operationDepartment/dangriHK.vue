<template>
    <div class="container">
       <div class="title">当日还款总览</div>
       <div class="content">
          <el-card>
              <div class="userTypeTitle">普通用户</div>
              <div class="userTypeCon">
                  <div class="benjin">
                      <div class="benjinTitle">本金</div>
                      <div class="benjinTable">
                          <el-table
                                :data="dataList"
                                border
                                style="width: 100%;line-height: 35px">
                                <el-table-column
                                align="center"
                                prop="ptwhbj"
                                label="未还"
                                width="193">
                                </el-table-column>
                                <el-table-column
                                align="center"
                                prop="pthkzbj"
                                label="还款中"
                                width="193">
                                </el-table-column>
                                <el-table-column
                                align="center"
                                prop="ptyhbj"
                                label="已还"
                                width="193">
                                </el-table-column>
                          </el-table>
                      </div>
                  </div>
                  <div class="shouyi">
                      <div class="shouyiTitle">收益</div>
                      <div class="shouyiTable">
                            <el-table
                                  :data="dataList"
                                  border
                                  style="width: 100%;line-height: 35px">
                                  <el-table-column
                                  align="center"
                                  prop="ptwhsy"
                                  label="未还"
                                  width="193">
                                  </el-table-column>
                                  <el-table-column
                                  align="center"
                                  prop="pthkzsy"
                                  label="还款中"
                                  width="193">
                                  </el-table-column>
                                  <el-table-column
                                  align="center"
                                  prop="ptyhsy"
                                  label="已还"
                                  width="193">
                                  </el-table-column>
                            </el-table>
                        </div>
                  </div>
              </div>
          </el-card>


          <el-card style="margin-top:120px">
             <div class="userTypeTitle">中转用户</div>     
             <div class="userTypeCon">
                 <div class="benjin">
                    <div class="benjinTitle">本金</div>
                    <div>
                        <el-table
                            :data="dataList"
                            border
                            style="width: 100%;line-height: 35px">
                            <el-table-column
                            align="center"
                            prop="zzwhbj"
                            label="未还"
                            width="193">
                            </el-table-column>
                            <el-table-column
                            align="center"
                            prop="zzhkzbj"
                            label="还款中"
                            width="193">
                            </el-table-column>
                            <el-table-column
                            align="center"
                            prop="zzyhbj"
                            label="已还"
                            width="193">
                            </el-table-column>
                      </el-table>
                    </div>
                 </div>
                 <div class="shouyi">
                    <div class="shouyiTitle">收益</div>
                    <div class="shouyiTable">
                            <el-table
                                  :data="dataList"
                                  border
                                  style="width: 100%;line-height: 35px">
                                  <el-table-column
                                  align="center"
                                  prop="zzwhsy"
                                  label="未还"
                                  width="193">
                                  </el-table-column>
                                  <el-table-column
                                  align="center"
                                  prop="zzhkzsy"
                                  label="还款中"
                                  width="193">
                                  </el-table-column>
                                  <el-table-column
                                  align="center"
                                  prop="zzyhsy"
                                  label="已还"
                                  width="193">
                                  </el-table-column>
                            </el-table>
                        </div>
                 </div>
             </div>
          </el-card>
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
          this.$http.getRequest('dailyRepayment').then(res => {
            console.log(res)
            this.dataList.push(res.dailyRepayment)
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
     width: 1200px;
     margin: 0 auto;
     margin-top: 90px;
     min-width: 500px;
     
     
 }


 .userTypeTitle{
     font-size: 18px;
     text-align: center;
     line-height: 60px;
     background: #e75b8d;
     color: #fff;
     width: 1160px
 }
 .userTypeCon{
     display: flex
 }
 .benjin,.shouyi{
     flex:1;
     text-align: center;
     font-size: 18px; 
 }
 .benjin{
     border-right: 0px
 }
 .benjinTitle{
    background-color:#8cc474;
    color: #fff;
    line-height: 60px;
 }
 .shouyiTitle{
    background-color:#5db2ff;
    color: #fff;
    line-height: 60px;;
 }
 
 
</style>
<style>
 body{
     min-width: 1500px;
 }
 .el-loading-spinner i{
   font-size: 45px!important;
 }
 .el-loading-spinner .el-loading-text{
   font-size: 28px;
 }
</style>
