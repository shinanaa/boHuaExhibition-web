<template>
<div class="rightContent" v-bind:class=" !isChoose ? 'hiddenChoose' :''">
  <div class="choose-school">
    <el-tree ref="tree" :data="treeList" :props="defaultProps" show-checkbox></el-tree>
  </div>
  <div class="container">
    <table-tools @dialogFormVisible="dialogFormVisible = true"
                 @chooseSchool="isChoose = true"
                 :btn-edit-no-show="true"
                 :btn-del-no-show="true"
                 @searchData="searchData"
                 @createdContent="createdContent"></table-tools>
    <div class="content">
      <!--表格-->
      <el-table
        :data="tableList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        highlight-current-row
        border
        style="width: 100%">
        <template v-for="header in headers">
          <el-table-column
            :prop="header.prop"
            :label="header.label"
            :width="header.width">
          </el-table-column>
        </template>
        <el-table-column v-if="tableList.length" label="操作" width="80">
          <template slot-scope="scope">
            <el-button type="warning" size="small" @click="editDetails(scope.row)">查看</el-button>
          </template>
        </el-table-column>
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
      <el-dialog title="新增毕业要求" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="dialogForm">
          <el-form-item label="院系" :label-width="formLabelWidth" prop="college">
            <el-select v-model="form.college" placeholder="请选择学院" @change="selectCollege">
              <el-option v-for="(c, index) in treeList" :label="c.label" :value="index" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专业" :label-width="formLabelWidth" prop="major">
            <el-select v-model="form.major" placeholder="请选择专业" no-data-text="请先选择院系">
              <el-option v-for="(m, index) in majorList" :label="m.label" :value="index" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程选择" :label-width="formLabelWidth" prop="courseSelect">
            <el-select v-model="form.courseSelect" placeholder="请选择课程">
              <el-option label="中国教育史" value="2018"></el-option>
              <el-option label="小学课程论" value="2019"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程章节" :label-width="formLabelWidth" prop="chapter">
            <el-input type="number" v-model="form.chapter" placeholder="请输入章节数量" />
          </el-form-item>
          <el-form-item label="章节知识点数" :label-width="formLabelWidth" prop="knowledge">
            <el-input type="number" v-model="form.knowledge" placeholder="请输入知识点数量" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureDialog">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</div>
</template>


<script>
import ElButton from 'element-ui/packages/button/src/button'
import ElInput from 'element-ui/packages/input/src/input'
import TableTools from '@/components/Guizhou/tableTools'
import { filterDataIds } from '@/utils/common'
export default {
  name: 'knowledge',
  data: function() {
    return {
      headers: [],
      tableList: [], // 表格内容
      currentPage: 1,
      total: 0,
      pagesize: 10, // 表格列表每页显示条数
      dialogFormVisible: false, // 是否现在创建/编辑弹窗
      form: {
        title: '',
        college: '',
        major: '',
        courseSelect: '',
        chapter: '',
        knowledge: ''
      },
      rules: {
        college: [
          { required: true, message: '院系不能为空', trigger: 'change' }
        ],
        major: [
          { required: true, message: '专业不能为空', trigger: 'change' }
        ],
        courseSelect: [
          { required: true, message: '课程不能为空', trigger: 'change' }
        ],
        chapter: [
          { required: true, message: '章节不能为空', trigger: 'blur' }
        ],
        knowledge: [
          { required: true, message: '知识点不能为空', trigger: 'blur' }
        ]
      },
      treeList: [],
      majorList: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      isChoose: false,
      formLabelWidth: '120px'
    }
  },
  components: { ElButton, ElInput, TableTools },
  created() {
    this.getTableData('getKnowledge')
    this.$http.getRequest('getChooseData').then(res => {
      if (res.status === 1) {
        this.treeList = res.schoolData
      }
    })
  },
  methods: {
    /* 分页 val（每页显示数据）*/
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
    },
    /* 分页 当前显示的页码*/
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
    },
    /* 点击工具栏创建 */
    createdContent() {
      this.dialogFormVisible = true
      this.form = {}
      this.form.title = '新增毕业要求'
    },
    // 点击工具栏查询
    searchData(param) {
      const oldIds = this.$refs.tree.getCheckedNodes() // 获取所有的选中状态的数据
      const newIds = filterDataIds(oldIds) // 将重合的子项过滤
      if (newIds.length) {
        this.isChoose = false
      }
      if (param || newIds.length) {
        const searchRequest = {}
        searchRequest.inputText = param
        searchRequest.courses = newIds
        console.log(searchRequest)
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
    editDetails(row) {
      console.log(row)
    },
    // 弹框选择院校
    selectCollege(data) {
      this.majorList = this.treeList[data].children
    },
    // 弹框点击确定按钮
    sureDialog() {
      console.log(1)
      console.log(this.form)
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          if (this.form.title === '新增毕业要求') {
            console.log(this.form)
            this.operateForm('addDialog', this.form)
          } else if (this.form.title === '修改毕业要求') {
            this.operateForm('editDialog', this.form)
          }
          this.getTableData('getCourseManage')
          this.resetForm()
        } else {
          return false
        }
      })
    },
    // 弹窗点击取消重置form表单
    resetForm() {
      this.dialogFormVisible = false
      this.$refs.dialogForm.resetFields() // clearValidate取消验证状态颜色  resetFields // 清空验证表单所有，包括颜色和内容
      this.majorList = []
      console.log(this.form)
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
    },
    // 方法封装 获取页面全部数据
    getTableData(urlName) {
      var that = this
      this.$http.getRequest(urlName).then(res => {
        if (res.code === 1) {
          console.log(res)
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

