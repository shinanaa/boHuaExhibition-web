<template>
    <div class="rightContent" v-bind:class=" !isChoose ? 'hiddenChoose' :''">
      <div class="choose-school">
        <el-tree
          :data="treeList"
          :props="defaultProps"
          ref="tree"
          show-checkbox></el-tree>
      </div>
      <div class="container">
        <!--图表-->
        <el-card class="box-card" style="margin: 0 30px;">
          <div class="myChart" id="myChart" style=""></div>
        </el-card>
        <!--操作工具栏-->
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
            :data="tableList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            highlight-current-row
            @current-change="handleCurrentRow"
            border
            style="width: 100%">
            <template v-for="header in headers">
              <el-table-column
                :prop="header.prop"
                :label="header.label">
              </el-table-column>
            </template>
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
              <el-form-item label="毕业要求一" :label-width="formLabelWidth" prop="require1">
                <el-input type="number" v-model="form.require1" step="0.1" min="0.1" max="0.9"></el-input>
              </el-form-item>
              <el-form-item label="毕业要求二" :label-width="formLabelWidth" prop="require2">
                <el-input type="number" v-model="form.require2"></el-input>
              </el-form-item>
              <el-form-item label="毕业要求三" :label-width="formLabelWidth" prop="require3">
                <el-input type="number" v-model="form.require3"></el-input>
              </el-form-item>
              <el-form-item label="毕业要求四" :label-width="formLabelWidth" prop="require4">
                <el-input type="number" v-model="form.require4"></el-input>
              </el-form-item>
              <el-form-item label="毕业要求五" :label-width="formLabelWidth" prop="require5">
                <el-input type="number" v-model="form.require5"></el-input>
              </el-form-item>
              <el-form-item label="毕业要求六" :label-width="formLabelWidth" prop="require6">
                <el-input type="number" v-model="form.require6"></el-input>
              </el-form-item>
              <el-form-item label="毕业要求七" :label-width="formLabelWidth" prop="require7">
                <el-input type="number" v-model="form.require7"></el-input>
              </el-form-item>
              <el-form-item label="毕业要求八" :label-width="formLabelWidth" prop="require8">
                <el-input type="number" v-model="form.require8"></el-input>
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
  // import echarts from 'echarts'
  export default {
    data: function() {
      return {
        loading: true,
        headers: [],
        tableList: [], // 表格内容
        currentPage: 1,
        total: 0,
        pagesize: 10, // 表格列表每页显示条数
        dialogFormVisible: false, // 是否现在创建/编辑弹窗
        form: {
          college: '',
          major: '',
          schoolYear: '',
          require1: '',
          require2: '',
          require3: '',
          require4: '',
          require5: '',
          require6: '',
          require7: '',
          require8: ''
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
          require1: [
            { required: true, message: '毕业要求一不能为空', trigger: 'blur' },
            {
              validator(rule, value, callback) {
                var reg = /^0\.([1-9]|[0-9][1-9])$/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入0~1之间小于两位小数的数字'))
                }
              },
              trigger: 'blur'
            }
          ],
          require2: [
            { required: true, message: '毕业要求二不能为空', trigger: 'blur' },
            {
              validator(rule, value, callback) {
                var reg = /^0\.([1-9]|[0-9][1-9])$/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入0~1之间小于两位小数的数字'))
                }
              },
              trigger: 'blur'
            }
          ],
          require3: [
            { required: true, message: '毕业要求三不能为空', trigger: 'blur' },
            {
              validator(rule, value, callback) {
                var reg = /^0\.([1-9]|[0-9][1-9])$/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入0~1之间小于两位小数的数字'))
                }
              },
              trigger: 'blur'
            }
          ],
          require4: [
            { required: true, message: '毕业要求四不能为空', trigger: 'blur' },
            {
              validator(rule, value, callback) {
                var reg = /^0\.([1-9]|[0-9][1-9])$/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入0~1之间小于两位小数的数字'))
                }
              },
              trigger: 'blur'
            }
          ],
          require5: [
            { required: true, message: '毕业要求五不能为空', trigger: 'blur' },
            {
              validator(rule, value, callback) {
                var reg = /^0\.([1-9]|[0-9][1-9])$/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入0~1之间小于两位小数的数字'))
                }
              },
              trigger: 'blur'
            }
          ],
          require6: [
            { required: true, message: '毕业要求六不能为空', trigger: 'blur' },
            {
              validator(rule, value, callback) {
                var reg = /^0\.([1-9]|[0-9][1-9])$/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入0~1之间小于两位小数的数字'))
                }
              },
              trigger: 'blur'
            }
          ],
          require7: [
            { required: true, message: '毕业要求七不能为空', trigger: 'blur' },
            {
              validator(rule, value, callback) {
                var reg = /^0\.([1-9]|[0-9][1-9])$/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入0~1之间小于两位小数的数字'))
                }
              },
              trigger: 'blur'
            }
          ],
          require8: [
            { required: true, message: '毕业要求八不能为空', trigger: 'blur' },
            {
              validator(rule, value, callback) {
                var reg = /^0\.([1-9]|[0-9][1-9])$/
                if (reg.test(value)) {
                  callback()
                } else {
                  callback(new Error('请输入0~1之间小于两位小数的数字'))
                }
              },
              trigger: 'blur'
            }
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
    created() {
      this.getTableData('getEligibility')
      // 获取院系树的数据
      this.$http.getRequest('getChooseData').then(res => {
        if (res.status === 1) {
          this.treeList = res.schoolData
        }
      })
    },
    components: { TableTools },
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
        this.isChoose = false
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
          this.getTableData('getEligibility')
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
          this.$http.getRequest('getSearchData', param).then(res => {
            if (res.code === 1) {
              that.tableList = res.resultList
              that.total = res.resultList.length
              that.emptyText = '无相关内容，请您调整查询内容'
            }
          })
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
        this.$refs.dialogForm.validate(valid => {
          if (valid) {
            this.dialogFormVisible = false
            if (this.form.title === '新增毕业要求') {
              this.operateForm('addDialog', this.form)
            } else if (this.form.title === '修改毕业要求') {
              this.operateForm('editDialog', this.form)
            }
            this.getTableData('getEligibility')
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
            console.log(res)
            that.headers = res.headers
            that.tableList = res.resultList
            that.total = res.resultList.length
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
      // 初始化图表
      // initChart() {
      //   // const that = this
      //   var myChart = echarts.init(document.getElementById('myChart'))
      //   var option = {
      //     title: {
      //       text: '未来一周气温变化',
      //       subtext: '纯属虚构'
      //     },
      //     tooltip: {
      //       trigger: 'axis'
      //     },
      //     legend: {
      //       data: ['最高气温', '最低气温']
      //     },
      //     toolbox: {
      //       show: true,
      //       feature: {
      //         dataZoom: {
      //           yAxisIndex: 'none'
      //         },
      //         dataView: { readOnly: false },
      //         magicType: { type: ['line', 'bar'] },
      //         restore: {},
      //         saveAsImage: {}
      //       }
      //     },
      //     xAxis: {
      //       type: 'category',
      //       boundaryGap: false,
      //       data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      //     },
      //     yAxis: {
      //       type: 'value',
      //       axisLabel: {
      //         formatter: '{value} °C'
      //       }
      //     },
      //     series: [
      //       {
      //         name: '最高气温',
      //         type: 'line',
      //         data: [11, 11, 15, 13, 12, 13, 10],
      //         markPoint: {
      //           data: [
      //             { type: 'max', name: '最大值' },
      //             { type: 'min', name: '最小值' }
      //           ]
      //         },
      //         markLine: {
      //           data: [
      //             { type: 'average', name: '平均值' }
      //           ]
      //         }
      //       },
      //       {
      //         name: '最低气温',
      //         type: 'line',
      //         data: [1, -2, 2, 5, 3, 2, 0],
      //         markPoint: {
      //           data: [
      //             { name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }
      //           ]
      //         },
      //         markLine: {
      //           data: [
      //             { type: 'average', name: '平均值' },
      //             [{
      //               symbol: 'none',
      //               x: '90%',
      //               yAxis: 'max'
      //             }, {
      //               symbol: 'circle',
      //               label: {
      //                 normal: {
      //                   position: 'start',
      //                   formatter: '最大值'
      //                 }
      //               },
      //               type: 'max',
      //               name: '最高点'
      //             }]
      //           ]
      //         }
      //       }
      //     ]
      //   }
      //   myChart.setOption(option)
      // }
    },
    name: 'eligibility'
  }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
  @import '../../styles/rightContent.scss';
</style>
