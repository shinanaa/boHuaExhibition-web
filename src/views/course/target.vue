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
                   :search-input-not-visible="true"
      ></table-tools>
      <div class="content">
        <el-tabs v-model="activeName" @tab-click="changeTab">
          <el-tab-pane v-for="(tab, index) in tabs" :label="tab.title" :name="tab.name" :key="index">
            <el-table
              v-loading="loading"
              :data="tableList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              border
              style="width: 100%;">
              <template v-for="header in headers">
                <el-table-column
                  :prop="header.prop"
                  :label="header.label"
                  :width="header.width">
                </el-table-column>
              </template>
              <el-table-column v-if="tableList.length && !tab.hasDel" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button type="warning" size="small" @click="editContent(scope.row, index)">编辑</el-button>
                </template>
              </el-table-column>
              <el-table-column v-if="tableList.length && tab.hasDel" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button type="warning" size="small" @click="editContent(scope.row, index)">编辑</el-button>
                  <el-button type="danger" size="small" @click="deleteContent(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <!--编辑课程目标-->
        <el-dialog title="编辑课程目标" :visible.sync="dialogFormVisible" :before-close="resetForm">
          <!--编辑课程目标-->
          <el-form ref="dialogForm" v-if='elForm1'>
            <el-form-item label="课程：" :label-width="formLabelWidth">
              <p>{{form1.courseName}}</p>
            </el-form-item>
            <el-form-item label="课程目标观测点：" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="form1.watchPoint"></el-input>
            </el-form-item>
            <el-form-item label="课程权重：" :label-width="formLabelWidth">
              <el-select v-model="form1.weight" placeholder="请选择">
                <el-option
                  v-for="item in 9"
                  :key="item"
                  :label="item/10"
                  :value="item/10">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="与指标点支撑关系：" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="form1.relationWidthSupport"></el-input>
            </el-form-item>
            <el-form-item label="一践行三学会：" :label-width="formLabelWidth">
              <el-input type="text" v-model="form1.toDo"></el-input>
            </el-form-item>
          </el-form>
          <!--编辑课程模块-->
          <el-form ref="dialogForm" v-if='elForm2'>
            <el-form-item label="课程模块名称：" :label-width="formLabelWidth">
              <el-input type="text" v-model="form2.moduleName"></el-input>
            </el-form-item>
            <div class="line-left-right">
              <span>理论教学</span>
            </div>
            <el-form-item label="课内学时：" :label-width="formLabelWidth">
              <el-input type="text" v-model="form2.theoryInClass"></el-input>
            </el-form-item>
            <el-form-item label="课外学时：" :label-width="formLabelWidth">
              <el-input type="text" v-model="form2.theoryOutClass"></el-input>
            </el-form-item>
            <el-form-item label="教学手段与方法：" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="form2.theoryTeachMeansTheory"></el-input>
            </el-form-item>
            <div class="line-left-right">
              <span>实践教学</span>
            </div>
            <el-form-item label="课内学时：" :label-width="formLabelWidth">
              <el-input type="text" v-model="form2.practicalInClass"></el-input>
            </el-form-item>
            <el-form-item label="课外学时：" :label-width="formLabelWidth">
              <el-input type="text" v-model="form2.practicalOutClass"></el-input>
            </el-form-item>
            <el-form-item label="教学手段与方法：" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="form2.practicalTeachMeansPracical"></el-input>
            </el-form-item>
          </el-form>
          <!--编辑课程内容-->
          <el-form ref="dialogForm" v-if='elForm3'>
            <el-form-item label="课程目标：" :label-width="formLabelWidth">
              <p>{{form3.target}}</p>
            </el-form-item>
            <el-form-item label="教育学概述：" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="form3.module1"></el-input>
            </el-form-item>
            <el-form-item label="教育本体论：" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="form3.module2"></el-input>
            </el-form-item>
            <el-form-item label="教育价值论：" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="form3.module3"></el-input>
            </el-form-item>
            <el-form-item label="教育目的论：" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="form3.module4"></el-input>
            </el-form-item>
          </el-form>
          <!--编辑考核要点-->
          <el-form ref="dialogForm" v-if='elForm4'>
            <div class="line-left-right">
              <span>考试</span>
            </div>
            <el-form-item label="考试：" :label-width="formLabelWidth">
              <el-checkbox-group v-model="form4.test">
                <el-checkbox label="期中考试" name="type"></el-checkbox>
                <el-checkbox label="期末考试" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <div class="line-left-right">
              <span>平时</span>
            </div>
            <el-form-item label="课后作业：" :label-width="formLabelWidth">
              <el-checkbox-group v-model="form4.task">
                <el-checkbox label="课后作业一" name="type"></el-checkbox>
                <el-checkbox label="课后作业二" name="type"></el-checkbox>
                <el-checkbox label="课后作业三" name="type"></el-checkbox>
                <el-checkbox label="课后作业四" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="实验：" :label-width="formLabelWidth">
              <el-checkbox-group v-model="form4.experiment">
                <el-checkbox label="实验一" name="type"></el-checkbox>
                <el-checkbox label="实验二" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="课堂讨论：" :label-width="formLabelWidth">
              <el-checkbox-group v-model="form4.discuss">
                <el-checkbox label="课堂讨论一" name="type"></el-checkbox>
                <el-checkbox label="课堂讨论二" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
          <!--编辑评分标准-->
          <el-form ref="dialogForm" v-if='elForm5'>
            <el-form-item label="课程目标：" :label-width="formLabelWidth">
              <p>{{form5.target}}</p>
            </el-form-item>
            <el-form-item label="90~100（优）：" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="form5.excellent"></el-input>
            </el-form-item>
            <el-form-item label="80~89（良）：" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="form5.good"></el-input>
            </el-form-item>
            <el-form-item label="90~100（中）：" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="form5.medium"></el-input>
            </el-form-item>
            <el-form-item label="80~89（及格）：" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="form5.pass"></el-input>
            </el-form-item>
            <el-form-item label="90~100（不及格）：" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="form5.fail"></el-input>
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
    name: 'target',
    data() {
      return {
        isChoose: false,
        treeList: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        activeName: 'first',
        loading: false,
        headers: [],
        tableList: [],
        pagesize: 10,
        currentPage: 1,
        total: 0,
        dialogFormVisible: false, // 是否现在创建/编辑弹窗
        formLabelWidth: '145px',
        form1: {
          courseName: '',
          watchPoint: '',
          relationWidthSupport: '',
          toDo: '',
          weight: 0.1
        },
        form2: {
          moduleName: '',
          theoryInClass: '',
          theoryOutClass: '',
          theoryTeachMeansTheory: '',
          practicalInClass: '',
          practicalOutClass: '',
          practicalTeachMeansPracical: ''
        },
        form3: {
          target: '',
          module1: '',
          module2: '',
          module3: '',
          module4: ''
        },
        form4: {
          test: [],
          task: [],
          experiment: [],
          discuss: []
        },
        form5: {
          target: '',
          excellent: '',
          good: '',
          medium: '',
          pass: '',
          fail: ''
        },
        elForm1: true,
        elForm2: false,
        elForm3: false,
        elForm4: false,
        elForm5: false,
        tabs: [{
          title: '课程目标',
          name: 'first',
          hasDel: false
        }, {
          title: '课程模块',
          name: 'second',
          hasDel: true
        }, {
          title: '课程内容',
          name: 'third',
          hasDel: false
        }, {
          title: '考核要点',
          name: 'fourth',
          hasDel: false
        }, {
          title: '评分标准',
          name: 'fifth',
          hasDel: false
        }],
        index: 0
      }
    },
    components: { TableTools },
    created() {
      switch (this.activeName) {
        case 'first':
          this.getTableData('getCoursesTarget')
          break
      }
      this.$http.getRequest('getChooseData').then(res => {
        if (res.status === 1) {
          this.treeList = res.schoolData
        }
      })
    },
    methods: {
      changeTab(tab) {
        this.index = tab.index
        switch (tab.paneName) {
          case 'first':
            this.elForm1 = true
            this.elForm2 = false
            this.elForm3 = false
            this.elForm4 = false
            this.elForm5 = false
            this.getTableData('getCoursesTarget')
            break
          case 'second':
            this.elForm1 = false
            this.elForm2 = true
            this.elForm3 = false
            this.elForm4 = false
            this.elForm5 = false
            this.getTableData('getCoursesModule')
            break
          case 'third':
            this.elForm1 = false
            this.elForm2 = false
            this.elForm3 = true
            this.elForm4 = false
            this.elForm5 = false
            this.getTableData('getCoursesContent')
            break
          case 'fourth':
            this.elForm1 = false
            this.elForm2 = false
            this.elForm3 = false
            this.elForm4 = true
            this.elForm5 = false
            this.getTableData('getCoursesCheck')
            break
          case 'fifth':
            this.elForm1 = false
            this.elForm2 = false
            this.elForm3 = false
            this.elForm4 = false
            this.elForm5 = true
            this.getTableData('getCoursesStandard')
            break
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
          console.log(searchRequest)
          this.getTableData('getRequireCourses', searchRequest)
        } else {
          this.$message({
            showClose: true,
            message: '查询内容不可为空',
            type: 'error'
          })
        }
      },
      /* 点击工具栏编辑 */
      editContent(row, index) {
        this.dialogFormVisible = true
        switch (index) {
          case 0 :
            this.form1 = JSON.parse(JSON.stringify(row))
            break
          case 1:
            this.form2 = JSON.parse(JSON.stringify(row))
            break
          case 2:
            this.form3 = JSON.parse(JSON.stringify(row))
            break
          case 3:
            this.form4.test = []
            this.form4.task = []
            var arr = row.checkWay.split('\n')
            arr.map((item) => {
              if (item.indexOf('期末考试') > 0) {
                this.form4.test.push('期末考试')
              }
              if (item.indexOf('期中考试') > 0) {
                this.form4.test.push('期中考试')
              }
              if (item.indexOf('作业一') > 0) {
                this.form4.task.push('课后作业一')
              }
              if (item.indexOf('作业二') > 0) {
                this.form4.task.push('课后作业二')
              }
            })
            break
          case 4:
            this.form5 = JSON.parse(JSON.stringify(row))
        }
      },
      // 点击工具栏删除
      deleteContent(row) {
        console.log(row.order)
        this.operateForm('deleteDialog', row.order)
        this.getTableData('getCoursesModule')
      },
      // 弹框点击确定按钮
      sureDialog() {
        if (this.elForm1) {
          console.log(1)
          console.log(this.form1)
          this.submitForm(this.form1, 'getCoursesTarget')
          this.resetForm(this.form1)
        }
        if (this.elForm2) {
          console.log(this.form2)
          this.submitForm(this.form2, 'getCoursesModule')
          this.resetForm(this.form2)
        }
        if (this.elForm3) {
          this.submitForm(this.form3, 'getCoursesContent')
          this.resetForm(this.form3)
        }
        if (this.elForm4) {
          this.submitForm(this.form4, 'getCoursesCheck')
          this.resetForm(this.form4)
        }
        if (this.elForm5) {
          this.submitForm(this.form5, 'getCoursesStandard')
          this.resetForm(this.form5)
        }
      },
      // 提交
      submitForm(form, apiUrl) {
        console.log(2)
        console.log(form)
        this.operateForm('editDialog', form)
        this.getTableData(apiUrl)
      },
      // 弹窗点击取消重置form表单
      resetForm(form) {
        this.dialogFormVisible = false
        this.$refs.dialogForm.clearValidate() // clearValidate取消验证状态颜色  resetFields // 清空验证表单所有，包括颜色和内容
        form = {}
        console.log('reset')
        console.log(form)
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
  .el-form-item{
    p{margin: 0}
  }
  .line-left-right{
    margin: 35px 0px;
    line-height: 1px;
    text-align: center;
    height: 2px;
    background: rgb(198, 226, 255);
    span {
      padding: 0 40px;
      background: #ffffff;
      color: #409EFF;
    }
  }
</style>
