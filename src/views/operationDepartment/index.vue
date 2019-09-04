<template>
 <div class="container">
     <div class="chooseDate">

          <span class="demonstration">请选择查询日期</span>
          &nbsp;&nbsp;
         <div class="timer">
           <el-date-picker
              @change="chooseTimer"
              v-model="value"
              type="month"
              size="large"
              value-format="yyyy-MM"
              placeholder="选择日期">
            </el-date-picker>
         </div>

        <div class="btn">
          <el-button type="primary" round @click="getData">查询</el-button>
          <el-button type="success" round @click="exportFile">导出</el-button>
        </div>
     </div>
     <div class="content">
       <!-- 注册投资最快开始 -->
        <el-card class="box-card">
           <div class="title">注册投资最快的用户</div>
           <div class="fast">
              <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                  align="center"
                  prop="username"
                  label="用户名"
                  width="180">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="investType"
                  label="投资类型"
                  width="180">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="investTime"
                  label="投资时间">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="userCreated"
                  label="注册时间">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="realname"
                  label="姓名">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="amount"
                  label="金额">
                </el-table-column>
              </el-table>
          </div>
        </el-card>

       <!-- 邀请人最多开始 -->
       <el-card class="box-card" style="margin-top:100px">
          <div class="title">邀请人最多</div>
          <div class="person_duo">
              <el-table
                :data="person_duo"
                border
                style="width: 100%">
                <el-table-column
                  align="center"
                  prop="username"
                  label="用户名"
                  width="180">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="mobile"
                  label="电话"
                  width="180">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="inviterCount"
                  label="推荐多少个">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="realname"
                  label="姓名">
                </el-table-column>
              </el-table>
          </div>
       </el-card>

       <!-- 投资人数以及累计投资人数开始 -->
       <div class="inventCountAndTotleCount">
           <div class="inventCount" style="width:610px">
              <el-card class="box-card">
                  <div class="title">在投人数</div>
                  <el-table
                    :data="UsersCount"
                    border
                    style="width: 100%;margin-top: 15px">
                    <el-table-column
                      align="center"
                      prop="invUsers"
                      label="投资人数"
                      width="567">
                    </el-table-column>
                  </el-table>
              </el-card>
           </div>
           <div class="TotleCount" style="width:610px;margin-left: 30px">
              <el-card class="box-card">
                  <div class="title">累计投资人数</div>
                  <el-table
                      :data="totleCount"
                      border
                      style="width: 100%;margin-top: 15px">
                      <el-table-column
                        align="center"
                        prop="allInvUsers"
                        label="投资人数"
                        width="567">
                      </el-table-column>
                  </el-table>
              </el-card>
           </div>
       </div>
       <!-- 充值最多 -->
       <el-card class="box-card" style="margin-top:100px">
          <div class="title">充值最多</div>
          <div class="chognzhi">
              <el-table
                :data="chongzhi"
                border
                style="width: 100%;margin-top: 16px">
                <el-table-column
                  align="center"
                  prop="username"
                  label="用户名"
                  width="402">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="realname"
                  label="电话"
                  width="402">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="recharge"
                  label="充值金额"
                  width="403">
                </el-table-column>
              </el-table>
          </div>
       </el-card>

        <!-- 投资比数最多 -->
        <el-card class="box-card" style="margin-top:100px">
            <div class="title">投资比数最多</div>
            <div class="invCountMost" >
                <el-table
                  :data="invCountMost"
                  border
                  style="width: 100%;margin-top: 16px">
                  <el-table-column
                    align="center"
                    prop="username"
                    label="用户名"
                    width="305">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="realname"
                    label="姓名"
                    width="301">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="mobile"
                    label="电话"
                    width="301">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="invCount"
                    label="投资笔数"
                    width="300">
                  </el-table-column>

                </el-table>
            </div>
        </el-card>

        <!-- 性别比例 -->
        <el-card class="box-card" style="margin-top:100px">
            <div class="title">男女比例</div>
            <div class="sexRatio" >
                <el-table
                  :data="sexRatio"
                  border
                  style="margin-top: 15px">
                  <el-table-column
                    align="center"
                    prop="male"
                    label="男性人数"
                    width="604">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="female"
                    label="女性人数"
                    width="603">
                  </el-table-column>
                </el-table>
            </div>
        </el-card>

        <!-- 年龄比例 -->
        <el-card class="box-card" style="margin-top:100px">
            <div class="title">年龄比例</div>
            <div class="ageRatio">
                <el-table
                  :data="ageRatio"
                  border
                  style="width: 100%;margin-top: 15px">
                  <el-table-column
                    align="center"
                    prop="lt25"
                    label="0~25"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="lt35"
                    label="25~35"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="lt45"
                    label="35~45">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="lt55"
                    label="45~55">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="lt65"
                    label="55~65">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="lt100"
                    label="65~100">
                  </el-table-column>
                </el-table>
            </div>
         </el-card>
     </div>
 </div>
</template>

<script>
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  export default {
    name: 'index',
    data() {
      return {
        value: '', // 日期的值
        tableData: [], // 注册最快的数据
        person_duo: [], // 邀请人最多数据
        UsersCount: [], // 投资人数
        totleCount: [], // 累计投资人数
        chongzhi: [], // 充值最多
        invCountMost: [], // 投资笔数最多
        sexRatio: [], // 男女比例
        ageRatio: [] // 年龄比例
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
        const params = {
          month: this.value ? this.value : this.nowDate()
        }
        this.$http.getRequest('mouthReport', params)
          .then(res => {
            console.log(res.inviterMost)
            this.tableData = res.investFast
            this.person_duo = res.inviterMost
            this.chongzhi = res.rechargeMost
            this.invCountMost = res.invCountMost
            this.sexRatio = res.sexRatio
            this.ageRatio = res.ageRatio
            this.UsersCount = res.invUsers
            this.totleCount = res.allInvUsers
            loading.close()
          }).catch(error => {
            console.log(error)
            loading.close()
          })
      },
      // 获取当前的年月 2018-10
      nowDate() {
        const date = new Date()
        const year = date.getFullYear()
        let month = date.getMonth() + 1
        month = (month < 10 ? '0' + month : month)
        const mydate = (year.toString() + '-' + month.toString())
        return mydate
      },
      // 导出文件到excel中
      exportFile() {
        const wb = XLSX.utils.table_to_book(document.querySelector('.content'))
        const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      },

      chooseTimer(val) {
        this.value = val
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
 /*body{*/
   /*min-width: 1850px;*/
 /*}*/
 .el-loading-spinner i{
   font-size: 45px!important;
 }
 .el-loading-spinner .el-loading-text{
   font-size: 28px;
 }
</style>

