<template>
  <el-row>
    <el-col :span="5"><div class="grid-content"></div></el-col>
    <el-col :span="14" style="background:white">
      <el-container>
        <div> 
        <el-menu default-active="/user/editAccount" class="el-menu-demo" mode="horizontal" router>
          <el-menu-item index="/user/edit">资料设置</el-menu-item>
          <el-menu-item index="/user/editAccount">账号设置</el-menu-item>
          <el-menu-item index="/user/editTeacher">申请成为老师</el-menu-item>
        </el-menu>
      </div>
      <el-main>
         
     <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
   <el-form-item label="旧密码" prop="pass_old">
    <el-input type="password" v-model="ruleForm.pass_old" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
   <el-form-item label="常用邮箱" prop="email">
    <el-input v-model="ruleForm.email"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
  </el-form-item>
</el-form>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </el-col>
   <el-col :span="5"><div class="grid-content"></div></el-col>
</el-row>
</template>

<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass_old:"",
          pass: '',
          checkPass: '',
          email:"",
        },
        rules: {
          pass: [
              { required: true, message: '密码不能为空', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ],
          pass_old: [
              { required: true, message: '密码不能为空', trigger: 'blur' },
          ],
          checkPass: [
              { required: true, message: '确认密码不能为空', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ],
         email:[
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
             { type: 'email', required: true, message: '邮箱必须合法', trigger: 'change' }
          ]
        }
      };
    },
  mounted(){
    var that=this
    this.$axios({
      url:"/user/user_info",
      method:"GET",
      params:{
        id:'0'
        },
        headers: {'X-CSRFToken': that.getCookie('csrftoken')}
        }).then(res=>{
          if(res.status==200){
            console.log(res);
            that.ruleForm.email=res.data.email;
            }
            })
            }
            ,
    methods: {
    getCookie (name) {
        var value = '; ' + document.cookie
        var parts = value.split('; ' + name + '=')
        if (parts.length === 2) return parts.pop().split(';').shift()
    },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             var that=this
          this.$axios({
            url:'user/user_account',
            method:'POST',
             data: {
               id:"123",
               pass_old:that.ruleForm.pass_old,
               pass_new:that.ruleForm.pass,
               email:that.ruleForm.email
               }
          }).then(res=>{
            if(res.status==200){
              if(res.data.status==0)
                alert('修改成功')
              else
                alert('未知错误')
            }
          })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
   export function checkPhoneNumber(rule, value, callback) {
  const reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
  if (!value) {
    return callback(new Error('请填写手机号码！'))
  } else if (!reg.test(value)) {
    return callback(new Error('请填写正确的手机号码！'))
  }else{
    callback()
  }
}

</script>
<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>