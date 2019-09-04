<template>
    <div class="rightContent" v-bind:class=" !isChoose ? 'hiddenChoose' :''">
      <div class="choose-school">
        <el-tree :data="treeList" :props="defaultProps" ref="tree" show-checkbox></el-tree>
      </div>
      <div class="container">
        <table-tools @dialogFormVisible="dialogFormVisible = true"
                     @chooseSchool="isChoose = true"
                     @searchData="searchData"
                     :btn-not-visible="true"
                     :requires="requires"
                     :search-input-not-visible="true"
        ></table-tools>
        <div class="content">
          <!--表格-->
          <el-table
            v-loading="loading"
            :data="tableList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            :row-class-name="tableRowClassName"
            border
            style="width: 100%">
            <template v-for="header in headers">
              <el-table-column
                :prop="header.prop"
                :label="header.label">
              </el-table-column>
            </template>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-select v-model="scope.row.weight" placeholder="0.0">
                  <el-option v-for="(item, index) in 9" :label="'0.'+item" :value="'0.'+item" :key="index"></el-option>
                </el-select>
              </template>
            </el-table-column>
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
         <!--表单形式设置权重-->
          <!--<el-dialog width="90%" title="设置权重" :visible.sync="dialogWeightsVisible">-->
            <!--<el-table-->
              <!--:data="setTableList"-->
              <!--border-->
              <!--style="width: 100%"-->
            <!--&gt;-->
              <!--<template v-for="header in setHeaders">-->
                <!--<el-table-column-->
                  <!--:prop="header.prop"-->
                  <!--:label="header.label"-->
                <!--&gt;-->
                <!--</el-table-column>-->
              <!--</template>-->
              <!--<el-table-column label="操作" width="150">-->
                <!--<template slot-scope="scope">-->
                  <!--<el-select v-model="form.region" placeholder="0.0">-->
                    <!--<el-option v-for="(item, index) in 9" :label="'0.'+item" :value="item/10" :key="index"></el-option>-->
                  <!--</el-select>-->
                <!--</template>-->
              <!--</el-table-column>-->
            <!--</el-table>-->
            <!--<div slot="footer" class="dialog-footer">-->
              <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
              <!--<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
            <!--</div>-->
          <!--</el-dialog>-->
        </div>
      </div>
    </div>
</template>

<script>
  import TableTools from '@/components/Guizhou/tableTools'
  import { filterDataIds } from '@/utils/common'
  export default {
    data: function() {
      return {
        loading: true,
        headers: [],
        requires: [], // 毕业要求选项
        setHeaders: [], // 设置权重表格表头（弹窗中）
        tableList: [], // 表格内容
        setTableList: [], // 设置权重表格内容（弹窗中）
        currentPage: 1,
        total: 0,
        setTotal: 0, // 设置权重表格内容总条数（弹窗中）
        pageSize: 10, // 表格列表每页显示条数
        dialogFormVisible: false, // 是否现在创建/编辑弹窗
        dialogWeightsVisible: false, // 是否显示权重设置弹窗
        form: {
          region: ''
        },
        treeList: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        isChoose: false,
        formLabelWidth: '120px'
      }
    },
    created() {
      this.getTableData('getCourses')
      // 获取院系树的数据
      this.$http.getRequest('getChooseData').then(res => {
        if (res.status === 1) {
          this.treeList = res.schoolData
        }
      })
    },
    methods: {
      /* 分页 val（每页显示数据）*/
      handleSizeChange(val) {
        this.pagesSize = val
      },
      /* 分页 当前显示的页码*/
      handleCurrentChange(val) {
        this.currentPage = val
      },
      /* 学院选择树*/
      handleNodeClick(data) {
        console.log('点击了树')
        this.isChoose = false
      },
      // 点击工具栏查询
      searchData(param) {
        const oldIds = this.$refs.tree.getCheckedNodes() // 获取所有的选中状态的数据
        const newIds = filterDataIds(oldIds) // 将重合的子项过滤
        if (newIds.length) {
          this.isChoose = false
          console.log(newIds)
        }
        if (param || newIds.length) {
          const searchRequest = {}
          searchRequest.inputText = param
          searchRequest.courses = newIds
          var that = this
          this.$http.getRequest('getSearchData', searchRequest).then(res => {
            if (res.code === 1) {
              that.tableList = res.resultList
              that.total = res.resultList.length
              that.emptyText = '无相关内容，请您调整查询内容'
            }
          })
        } else {
          this.$message({
            showClose: true,
            message: '请选择院系或输入查询内容',
            type: 'error'
          })
        }
      },
      tableRowClassName({ row, rowIndex }) {
        if (row.colorflag) { // 根据colorflag给不同组进行class添加
          return 'dark'
        } else {
          return 'lightDark'
        }
      },
      // 弹窗形式，显示弹窗内容
      // setWeights(index, rows) {
      //   this.dialogWeightsVisible = true
      //   var that = this
      //   this.$http.getRequest('getCourses', rows[index]).then(res => {
      //     if (res.code === 1) {
      //       that.setHeaders = res.headers
      //       that.setTableList = res.resultList
      //       that.setTotal = res.resultList.length
      //     }
      //   })
      // },
      // 方法封装 获取页面全部数据
      getTableData(urlName) {
        var that = this
        this.$http.getRequest(urlName).then(res => {
          if (res.code === 1) {
            console.log(res)
            that.headers = res.headers
            that.tableList = that.smartSort(res.resultList)
            that.total = res.resultList.length
            that.requires = res.requires
            console.log(res.requires)
            that.loading = false
          } else {
            that.emptyText = '暂无数据'
          }
        })
      },
      smartSort(arrSimple2) {
        arrSimple2[0]['colorflag'] = true // 为第一组数据添加colorflag属性
        arrSimple2.sort(function(b, a) { // b为后一组数据，a为前一组数据
          if (a.number === b.number) {
            b['colorflag'] = a['colorflag']
          } else {
            b['colorflag'] = !a['colorflag']
          }
        })
        return arrSimple2
      }
    },
    components: { TableTools },
    name: 'set-weights'
  }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
  /deep/ .dark{
    background-color: #f0f9eb!important;
  }
  /deep/ .lightDark{
    background-color: #fff!important;
  }
  @import '../../styles/rightContent.scss';
  .customWidth{
    width: 90%;
  }
</style>
