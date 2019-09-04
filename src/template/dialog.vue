<template>
  <el-dialog title="新增毕业要求" :visible.sync="visible">
    <el-form :model="form">
      <el-form-item label="院系" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择学院">
          <el-option label="文学院" value="shanghai"></el-option>
          <el-option label="历史与政治" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专业" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择专业">
          <el-option label="汉语言文学" value="shanghai"></el-option>
          <el-option label="汉语国际教育" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专业毕业要求" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="毕业培养目标1" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="毕业培养目标2" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="毕业培养目标3" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="毕业培养目标4" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="指标点数量" :label-width="formLabelWidth">
        <el-input type="number" v-model="form.desc"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
    export default {
      props: [],
      name: 'dialog'
    }
</script>

<style scoped>

</style>
