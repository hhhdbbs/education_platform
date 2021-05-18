<template>
  <div class="viewFile">
    <el-dialog title="查看备课文件" :visible.sync="dialogueVisible" center :before-close="handleClose">
    <el-form :model="form">
      <el-form-item label="活动名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="Submit">确 定</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "viewFile",
    props:{
      dialog:{
        default: false
      }
    },
    data(){
      return{
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        dialogueVisible: false
      };
    },
    watch:{
      dialog(newValue){
        this.dialogueVisible = newValue
      }
    },
    methods:{
      closeDialog(){
        this.$emit('changeVisible', false)
      },
      Submit(){
        this.$emit('changeVisible', false)
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(() => {
            this.$emit('changeVisible', false)
            done();
          })
          .catch(e => {console.log(e)});
      }
    }
  }
</script>

<style scoped>

</style>