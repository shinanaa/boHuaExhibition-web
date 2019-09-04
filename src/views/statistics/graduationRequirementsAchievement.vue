<template>
  <div class="rightContent" v-bind:class=" !isChoose ? 'hiddenChoose' :''">
    <div class="choose-school">
      <el-tree :data="treeList" :props="defaultProps" ref="tree" show-checkbox></el-tree>
    </div>
    <div class="container">
      <table-tools @dialogFormVisible="dialogFormVisible = true"
                   @chooseSchool="isChoose = true"
                   :btn-not-visible="true"
                   :search-input-not-visible="true"
      ></table-tools>
      <div class="content">
        <el-table
          v-loading="loading"
          :data="tableList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          border
          @cell-click="showDetails"
          style="width: 100%;">
          <template v-for="header in headers">
            <el-table-column
              :prop="header.prop"
              :label="header.label">
              <template slot-scope="scope">
                <span v-if="header.prop.indexOf('require') < 0">{{scope.row[header.prop]}}</span>
                <el-button v-if="header.prop.indexOf('require') >= 0" type="text">{{scope.row[header.prop]}}</el-button>
          </template>
            </el-table-column>
          </template>
        </el-table>
        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        <!--弹窗-->
        <el-dialog width="80%" title="毕业要求详情" :visible.sync="dialogFormVisible">
          <el-table
            v-loading="loading"
            :data="detailTableList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            border
            show-summary
            sum-text="评价结果"
            style="width: 100%;">
            <template v-for="header in detailHeaders">
              <el-table-column
                :prop="header.prop"
                :width="header.width"
                :label="header.label">
              </el-table-column>
            </template>
          </el-table>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import TableTools from '@/components/Guizhou/tableTools'
  export default {
    name: 'graduation-requirements-achievement',
    data() {
      return {
        isChoose: false,
        treeList: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        loading: false,
        tableList: [],
        headers: [],
        pageSize: 10,
        currentPage: 1,
        total: 0,
        dialogFormVisible: false,
        detailHeaders: [],
        detailTableList: []
      }
    },
    components: { TableTools },
    created() {
      this.getTableData('getRequireAchievement')
      this.$http.getRequest('getChooseData').then(res => {
        if (res.status === 1) {
          this.treeList = res.schoolData
        }
      })
    },
    methods: {
      /* 分页 val（每页显示数据）*/
      handleSizeChange(val) {
        this.pageSize = val
      },
      /* 分页 当前显示的页码*/
      handleCurrentChange(val) {
        this.currentPage = val
      },
      showDetails(row, column) {
        var showInfo = {
          schoolYear: row.schoolYear,
          major: row.major,
          require: column.property,
          requireLabel: column.label
        }
        console.log(showInfo)
        var that = this
        this.$http.getRequest('getRequireDetails', showInfo).then(res => {
          if (res.code === 1) {
            that.detailHeaders = res.headers
            that.detailTableList = res.resultList
            that.loading = false
            this.dialogFormVisible = true
          } else {
            that.emptyText = '暂无数据'
          }
        })
      },
      // 方法封装 获取页面全部数据
      getTableData(urlName, params) {
        var that = this
        this.$http.getRequest(urlName, params).then(res => {
          if (res.code === 1) {
            that.headers = res.headers
            that.tableList = res.resultList
            that.total = res.resultList.length
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
</style>
