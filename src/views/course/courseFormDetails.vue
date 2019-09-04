<template>
  <div class="rightContent">
    <div class="container">
      <div class="content">
        <div class="detailsText">
          <p>{{this.msg.class}} > {{this.msg.course}}</p>
        </div>
        <el-table
          v-loading="loading"
          :data="courseDetailsTable"
          :span-method="mergeSpan"
          border
          style="width: 100%;">
          <el-table-column label="总评成绩组成">
            <el-table-column
              prop="type"
              label="类别">
            </el-table-column>
            <el-table-column
              prop="allForm"
              label="组成内容">
              <template slot-scope="scope">
                <span v-if="scope.row.timeNumber < 2">{{scope.row.allForm}}</span>
                <el-button v-if="scope.row.timeNumber > 1" type="text" @click="showPeaseDetails(scope.row)">{{scope.row.allForm}}</el-button>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            prop="allRatio"
            label="总成绩占比">
          </el-table-column>
          <el-table-column
            prop="peaceRatio"
            label="平时成绩占比">
          </el-table-column>
          <el-table-column
            prop="score"
            label="分数/次">
          </el-table-column>
          <el-table-column
            prop="timeNumber"
            label="次数">
          </el-table-column>
          <el-table-column
            prop="totalScore"
            label="总分">
          </el-table-column>
        </el-table>
        <el-dialog title="课程组成详情" :visible.sync="courseFormDetails" width="60%">
          <el-table
          v-loading="loading"
          :data="peaseDetails"
          border
          style="width: 100%;">
          <template v-for="header in peaseDetailsHead">
            <el-table-column
              :prop="header.prop"
              :label="header.label"
              :width="header.width">
            </el-table-column>
          </template>
        </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button @click="courseFormDetails = false">取 消</el-button>
            <el-button type="primary" @click="courseFormDetails = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'course-form-details',
    data() {
      return {
        courseDetailsTable: [],
        loading: false,
        msg: {},
        spanArr: [],
        position: 0,
        peaseDetails: [],
        peaseDetailsHead: [],
        courseFormDetails: false
      }
    },
    created() {
      this.msg = this.$route.query.course
      var that = this
      this.$http.getRequest('getCourseDetails', this.msg).then(res => {
        if (res.code === 1) {
          that.courseDetailsTable = res.resultList
          that.loading = false
          that.rowspan()
        } else {
          that.emptyText = '暂无数据'
        }
      })
    },
    watch: {
      '$route': {
        handler: function() {
          console.log('luyoubianle')
          this.msg = this.$route.query.course
          var that = this
          this.$http.getRequest('getCourseDetails', this.msg).then(res => {
            if (res.code === 1) {
              that.courseDetailsTable = res.resultList
              that.loading = false
              that.rowspan()
            } else {
              that.emptyText = '暂无数据'
            }
          })
        }
      }
    },
    methods: {
      rowspan() {
        this.courseDetailsTable.forEach((item, index) => {
          if (index === 0) {
            this.spanArr.push(1)
            this.position = 0
          } else {
            if (this.courseDetailsTable[index].type === this.courseDetailsTable[index - 1].type) {
              this.spanArr[this.position] += 1
              this.spanArr.push(0)
            } else {
              this.spanArr.push(1)
              this.position = index
            }
          }
        })
      },
      // 课程详情合并表格
      mergeSpan({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0 || columnIndex === 2) {
          const _row = this.spanArr[rowIndex]
          console.log(_row)
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      },
      // 查看平时成绩详情
      showPeaseDetails(row) {
        var getInfo = {
          class: this.msg.class,
          course: this.msg.course,
          allForm: row.allForm
        }
        var that = this
        this.$http.getRequest('getPeaseDetails', getInfo).then(res => {
          if (res.code === 1) {
            console.log(res)
            that.courseFormDetails = true
            that.peaseDetailsHead = res.headers
            that.peaseDetails = res.resultList
            that.loading = false
          } else {
            that.emptyText = '暂无数据'
          }
        })
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import '../../styles/rightContent.scss';
  .container{margin-left: 0 !important;
    .detailsText{
      color: #666;background: #FFFFFF;
      padding: 3px 10px;margin: 20px 0px;font-size: 14px;}
  }
</style>
