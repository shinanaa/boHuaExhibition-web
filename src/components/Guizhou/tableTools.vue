<template>
  <div class="tools">
    <div class="tools-search">
      <div class="search-fill" v-if="searchInputVisible">
        <el-input placeholder="请输入..." v-model="search"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchData">查询</el-button>
      </div>
    </div>
    <div class="tools-btn">
      <el-button type="info" icon="el-icon-plus" @click="createdContent" v-if="btnAddShow">增加</el-button>
      <el-button type="warning" icon="el-icon-edit" @click="editContent" v-if="btnEditShow">修改</el-button>
      <el-button type="danger" icon="el-icon-delete" @click="deleteContent" v-if="btnDelShow">删除</el-button>
      <el-button type="success" icon="el-icon-view" @click="createdContent" v-if="btnAddShow">预览</el-button>
      <el-button type="success" icon="el-icon-check" @click="editContent" v-if="btnEditShow">审核通过</el-button>
      <el-button type="danger" icon="el-icon-close" @click="deleteContent" v-if="btnDelShow">审核不通过</el-button>
    </div>
  </div>
</template>

<script>
    export default {
      props: {
        searchInputVisible: {
          type: Boolean,
          default: true
        },
        btnAddShow: {
          type: Boolean,
          default: true
        },
        btnEditShow: {
          type: Boolean,
          default: true
        },
        btnDelShow: {
          type: Boolean,
          default: true
        }
      },
      data() {
        return {
          search: ''
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
