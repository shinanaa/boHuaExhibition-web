<template>
  <div class="tools">
    <div class="tools-search">
      <el-button type="info" class="choose" @click="chooseSchool">选择院系及专业</el-button>
      <div class="search-fill">
        <el-input v-if="!searchInputNotVisible" placeholder="请输入..." v-model="search"></el-input>
        <el-select v-if="searchInputNotVisible" v-model="requireType" placeholder="请选择毕业要求">
          <el-option
            v-for="item in requires"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="searchData">查询</el-button>
      </div>
    </div>
    <div class="tools-btn" v-if="!showIf">
      <el-button type="success" icon="el-icon-plus" @click="createdContent">创建</el-button>
      <el-button type="warning" icon="el-icon-edit" @click="editContent" v-if="!btnEditNoShow">编辑</el-button>
      <el-button type="danger" icon="el-icon-delete" @click="deleteContent" v-if="!btnDelNoShow">删除</el-button>
    </div>
  </div>
</template>

<script>
    export default {
      props: ['btnNotVisible', 'requires', 'searchInputNotVisible', 'btnEditNoShow', 'btnDelNoShow'],
      data() {
        return {
          'search': '',
          showIf: this.btnNotVisible,
          requireType: ''
        }
      },
      methods: {
        createdContent() {
          this.$emit('createdContent')
        },
        chooseSchool() {
          this.$emit('chooseSchool')
        },
        editContent() {
          this.$emit('editContent')
        },
        deleteContent() {
          this.$emit('deleteContent')
        },
        searchData() {
          this.$emit('searchData', this.search)
        }
      },
      name: 'table-tools'
    }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .tools{
    height:90px;padding: 0 30px;line-height: 90px;
  .tools-search{float: left;}
  .tools-btn{float: right;}
  .choose{margin-right: 50px;}
  .search-fill{
    display: inline-block;
    .el-input{margin-right: 10px;
      width: auto;}
  }
  }
</style>
