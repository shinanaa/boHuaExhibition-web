<template>
  <div class="rightContent" v-bind:class=" !isChoose ? 'hiddenChoose' :''">
    <div class="choose-school">
      <el-tree :data="treeList" :props="defaultProps" ref="tree" show-checkbox></el-tree>
    </div>
    <div class="container">
      <table-tools @dialogFormVisible="dialogFormVisible = true"
                   @chooseSchool="chooseSchool"
                   @searchData="searchData"
                   :btn-not-visible="true"
                   :requires="requires"
                   :search-input-not-visible="true"
      ></table-tools>
      <div class="content">
        <!--表格-->
        <el-table
          v-loading="loading"
          :data="tableList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          border
          style="width: 100%;text-align: center;">
          <template v-for="header in headers">
            <el-table-column
              :prop="header.prop"
              :label="header.label">
            </el-table-column>
          </template>
          <el-table-column v-if="tableList.length" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editContent(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
          <div slot="empty">
            <p>{{emptyText}}</p>
          </div>
        </el-table>
        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pagesize"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        <!--创建-->
        <el-dialog title="编辑指标点对应的课程" :visible.sync="dialogFormVisible" :before-close="resetForm">
          <el-form ref="dialogForm">
            <el-form-item class="formCenter" :class="item.value !== '' ? 'selected' : ''" label-position="center" v-for="(item,index) in currentCourses" :label="item.label" :label-width="formLabelWidth" :key="index" ref="formItem">
              <el-select placeholder="难度" v-model="item.value" @change="chooseCourses(item.value)">
                <el-option label="不设置" value=""></el-option>
                <el-option label="H" value="H"></el-option>
                <el-option label="M" value="M"></el-option>
                <el-option label="L" value="L"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm">取 消</el-button>
            <el-button type="primary" @click="sureDialog">确 定</el-button>
          </div>
        </el-dialog>
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
        loading: false,
        emptyText: '请先选择院系及专业，进行查询',
        requires: [], // 毕业要求选项
        currentCourses: [], // 当前专业的所有课程
        headers: [],
        tableList: [], // 表格内容
        currentPage: 1,
        total: 0,
        pagesize: 10, // 表格列表每页显示条数
        dialogFormVisible: false, // 是否现在创建/编辑弹窗
        treeList: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        isChoose: false,
        formLabelWidth: '220px',
        currentRow: null
      }
    },
    created() {
      // this.getTableData('getRequireCourses')
      this.$http.getRequest('getChooseData').then(res => {
        if (res.status === 1) {
          this.treeList = res.schoolData
          this.requires = res.requires
        }
      })
    },
    methods: {
      /* 分页 val（每页显示数据）*/
      handleSizeChange(val) {
        this.pagesize = val
      },
      /* 分页 当前显示的页码*/
      handleCurrentChange(val) {
        this.currentPage = val
      },
      /* 学院选择树*/
      handleNodeClick(data) {
        // this.isChoose = false;
      },
      chooseSchool() {
        this.isChoose = true
      },
      /* 点击工具栏编辑 */
      editContent(row) {
        this.dialogFormVisible = true
        for (let i = 0; i < this.currentCourses.length; i++) {
          for (const keys in row) {
            if (this.currentCourses[i].prop === keys) {
              // this.currentCourses[i].value = row[keys]
              this.$set(this.currentCourses[i], 'value', row[keys])
            }
          }
        }
      },
      // 点击工具栏查询
      searchData(param) {
        this.loading = true
        const oldIds = this.$refs.tree.getCheckedNodes() // 获取所有的选中状态的数据
        const newIds = filterDataIds(oldIds) // 将重合的子项过滤
        if (newIds.length) {
          this.isChoose = false
        }
        if (param || newIds.length) {
          const searchRequest = {}
          searchRequest.inputText = param
          searchRequest.courses = newIds
          this.getTableData('getRequireCourses')
        } else {
          this.$message({
            showClose: true,
            message: '查询内容不可为空',
            type: 'error'
          })
        }
      },
      // 弹框点击确定按钮
      sureDialog() {
        this.operateForm('editDialog', this.currentCourses)
        this.resetForm()
        this.getTableData('getRequireCourses')
      },
      // 弹窗点击取消重置form表单
      resetForm() {
        this.dialogFormVisible = false
        this.$refs.dialogForm.clearValidate() // 取消验证状态颜色  resetFields // 清空验证表单所有，包括颜色和内容
        this.form = {}
        this.majorList = []
      },
      chooseCourses(values) {
        console.log(values)
      },
      // 方法封装 获取页面全部数据
      getTableData(urlName, params) {
        var that = this
        this.$http.getRequest(urlName, params).then(res => {
          if (res.code === 1) {
            that.headers = res.headers
            that.tableList = res.resultList
            that.total = res.resultList.length
            that.currentCourses = res.headers.slice(1)
            that.loading = false
          } else {
            that.emptyText = '暂无数据'
          }
        })
      },
      // 方法封装 操作（添加/编辑/删除）表单
      operateForm(url, params) {
        this.$http.postRequest(url, params).then(res => {
          if (res.status === 0) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'success'
            })
          }
        })
      }
    },
    components: { TableTools },
    name: 'require-and-courses'
  }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
  @import '../../styles/rightContent.scss';
  .el-form{text-align: center;}
  /deep/ .formCenter{
    .el-form-item__label{text-align: center;}
  }
  /deep/ .selected{
    .el-form-item__label{background: #f0f9eb;color: #666;border: 1px solid #c2e7b0;}
  }
</style>

