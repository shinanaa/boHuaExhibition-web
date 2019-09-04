<template>
    <div class="rightContent" :class=" !isChoose ? 'hiddenChoose' :''">
      <div class="choose-school">
        <el-tree
          :data="treeList"
          :props="defaultProps"
          ref="tree"
          show-checkbox></el-tree>
      </div>
      <div class="container">
        <table-tools
          @createdContent="createdContent"
          @chooseSchool="isChoose = true"
          @editContent="editContent"
          @deleteContent="deleteContent"
          @searchData="searchData"
        ></table-tools>
        <div class="content">
          <!--表格-->
          <el-table
            v-loading="loading"
            :data="tableList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            highlight-current-row
            @current-change="handleCurrentRow"
            border
            style="width: 100%;">
            <template v-for="header in headers">
              <el-table-column
                :prop="header.prop"
                :label="header.label"
              >
              </el-table-column>
            </template>
            <div slot="empty">
                <p>{{emptyText}}</p>
            </div>
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
          <!--创建/编辑-->
          <el-dialog :title="form.title" :visible.sync="dialogFormVisible" :before-close="resetForm" >
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
              <el-form-item label="学年" :label-width="formLabelWidth" prop="schoolYear">
                <el-select v-model="form.schoolYear" placeholder="请选择学年">
                  <el-option label="2018" value="2018"></el-option>
                  <el-option label="2019" value="2019"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="专业毕业要求" :label-width="formLabelWidth" prop="require">
                <el-select v-model="form.require" placeholder="请选择要求">
                  <el-option label="师德规范" value="2013"></el-option>
                  <el-option label="教育情怀" value="2014"></el-option>
                  <el-option label="学科素养" value="2015"></el-option>
                  <el-option label="教学能力" value="2016"></el-option>
                  <el-option label="班级指导" value="2017"></el-option>
                  <el-option label="教育情怀" value="2019"></el-option>
                  <el-option label="学科素养" value="2018"></el-option>
                  <el-option label="教学能力" value="2010"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="活动性质" :label-width="formLabelWidth">
                <el-checkbox-group v-model="targets">
                  <el-checkbox v-for="target in targetOptions" :label="target" :key="target"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="指标点数量" :label-width="formLabelWidth" prop="number">
                <el-input type="number" v-model="form.number"></el-input>
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
    name: 'graduation-require',
    data() {
      return {
        loading: true,
        emptyText: '暂无数据',
        headers: [], // 表头
        tableList: [], // 表格内容
        currentPage: 1, // 分页 当前显示页
        total: 0, // 分页 总条数
        pageSize: 10, // 分页 表格列表每页显示条数
        dialogFormVisible: false, // 是否现在创建/编辑弹窗
        targetOptions: ['毕业培养目标1', '毕业培养目标2', '毕业培养目标3', '毕业培养目标4'], // 培养目标列表
        targets: [], // 表单中选中的培养目标
        form: {
          title: '', // 弹窗标题
          order: '',
          college: '',
          major: '',
          number: '',
          require: '',
          targets: [],
          schoolYear: ''
        },
        rules: {
          college: [
            { required: true, message: '请选择院系名称', trigger: 'change' }
          ],
          major: [
            { required: true, message: '请选择专业名称', trigger: 'change' }
          ],
          schoolYear: [
            { required: true, message: '请选择所属学年', trigger: 'change' }
          ],
          require: [
            { required: true, message: '请选择专业毕业要求', trigger: 'change' }
          ],
          number: [
            { required: true, message: '请输入指标点数量', trigger: 'blur' }
          ]
        },
        school: [],
        treeList: [],
        majorList: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        chooseTree: [], // 树形控件搜索
        isChoose: false,
        formLabelWidth: '120px',
        currentRow: null
      }
    },
    components: { TableTools },
    created() {
      this.getTableData('getGraduationRequire')
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
      /* 点击工具栏创建 */
      createdContent() {
        this.dialogFormVisible = true
        this.form = {}
        this.form.title = '新增毕业要求'
      },
      /* 点击工具栏编辑 */
      editContent() {
        if (this.currentRow) {
          this.dialogFormVisible = true
          this.form = this.currentRow
          this.form.title = '修改毕业要求'
          if (this.currentRow.target1 === '√') {
            this.targets.push('毕业培养目标1')
          }
          if (this.currentRow.target2 === '√') {
            this.targets.push('毕业培养目标2')
          }
          if (this.currentRow.target3 === '√') {
            this.targets.push('毕业培养目标3')
          }
          if (this.currentRow.target4 === '√') {
            this.targets.push('毕业培养目标4')
          }
          for (let i = 0; i < this.treeList.length; i++) {
            if (this.treeList[i].label === this.form.college) {
              this.majorList = this.treeList[i].children
              break
            }
          }
        } else {
          this.$message({
            showClose: true,
            message: '请先选择要修改的数据',
            type: 'warning'
          })
        }
      },
      // 获取表格当前行数据
      handleCurrentRow(val) {
        this.currentRow = val
      },
      // 点击工具栏删除
      deleteContent() {
        if (this.currentRow) {
          this.operateForm('deleteDialog', this.currentRow.order)
          this.getTableData('getGraduationRequire')
        } else {
          this.$message({
            showClose: true,
            message: '请先选择要删除的数据',
            type: 'warning'
          })
        }
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
      // 弹框点击确定按钮
      sureDialog() {
        this.$refs.dialogForm.validate(valid => {
          if (valid) {
            this.dialogFormVisible = false
            this.form.targets = this.targets // 上传后，后台根据targets内容为准，忽略target1234
            if (this.form.title === '新增毕业要求') {
              this.operateForm('addDialog', this.form)
            } else if (this.form.title === '修改毕业要求') {
              this.operateForm('editDialog', this.form)
            }
            this.getTableData('getGraduationRequire')
            this.resetForm()
          } else {
            return false
          }
        })
      },
      // 弹窗点击取消重置form表单
      resetForm() {
        this.dialogFormVisible = false
        this.$refs.dialogForm.clearValidate() // 取消验证状态颜色  resetFields // 清空验证表单所有，包括颜色和内容
        this.form = {}
        this.majorList = []
        this.targets = []
      },
      // 弹框选择院校
      selectCollege(data) {
        this.majorList = this.treeList[data].children
      },
      // 方法封装 获取页面全部数据
      getTableData(urlName) {
        var that = this
        this.$http.getRequest(urlName).then(res => {
          if (res.code === 1) {
            that.headers = res.headers
            that.tableList = that.targetsFilter(res.resultList)
            that.total = res.resultList.length
            that.loading = false
          } else {
            that.emptyText = '暂无数据'
          }
        })
      },
      // 将毕业培养目标为true的显示为✔
      targetsFilter(dataList) {
        dataList.map((item) => {
          for (var i in item.target) {
            if (item.target[i] === true) {
              item.target[i] = '√'
            }
          }
          var targets = item.target
          delete item['target']
          Object.assign(item, targets)
        })
        return dataList
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
    }
  }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
@import '../../styles/rightContent.scss';
</style>
