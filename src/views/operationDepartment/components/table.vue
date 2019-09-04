<template>
    <div>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column 
                v-for="(item,index) in filedList"
                prop="date"
                label="item"
                width="180">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
   export default {
     data() {
       return {

       }
     },
     props: {
       tableData: {
         default: [],
         type: Array
       },
       filedList: {
         default: [],
         type: Array
       },
       data: {
         default: [],
         type: Array
       }
     }
   }
</script>

<style scoped>

</style>