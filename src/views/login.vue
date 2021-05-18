<template>
  <div class="login">
    <h2><figure></figure></h2>
    <el-card class="loginForm" shadow="hover">
      <el-form :model="form" :rules="rules" ref="form" label-width="0">
        <el-form-item prop="account">
          <el-input
            prefix-icon="el-icon-message"
            v-model="form.account"
            autofocus="true"
            placeholder="请输入邮箱"
            @keyup.enter.native="$refs.pas.focus()"
            maxLength="50"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="form.password"
            type="password"
            ref="pas"
            @keyup.enter.native="submit('form')"
            maxLength="18"
            prefix-icon="el-icon-edit"
          >
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 0">
          <el-button type="primary" @click="submit('form')">登录</el-button>
          <el-button plain @click="resetForm">重置</el-button><br />
          <el-link @click="to_register" class="to_register"
            >没有账号？立即注册</el-link
          >
        </el-form-item>
      </el-form></el-card
    >
  </div>
</template>
<script>
/* eslint-disable no-irregular-whitespace */
export default {
  name: "login",
  data() {
    let validateEmail = (rule, value, callback) => {
      let reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (value.length === 0) {
        callback(new Error("请输入邮箱"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入形如xx@xx.xx格式的邮箱"));
      } else {
        callback();
      }
    };
    return {
      form: {
        account: "",
        password: ""
      },
      rules: {
        account: [
          { validator: validateEmail, trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    getCookie (name) {
        var value = '; ' + document.cookie
        var parts = value.split('; ' + name + '=')
        if (parts.length === 2) return parts.pop().split(';').shift()
    },
    submit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$message({
            message: "验证成功，正在登录",
            type: "success"
          });
          var that = this;
          this.$axios.post("/user/login",{
              email: this.form.account,
              password: this.form.password,},{
              headers: {'X-CSRFToken': that.getCookie('csrftoken')}
          }).then(res => {
            if (res.status === 200&&res.data.status===0) {
              this.$message({
                message: "登录成功",
                type: "success"
              });
              localStorage.setItem('token', res.data.token)
              this.getUserInfo()
              if(this.$route.params.to){
                this.$router.push(this.$route.params.to)
              }
              else this.$router.push({ name: "index" });
            } else {
              this.$message({
                message: "邮箱或密码错误",
                type: "error"
              });
              this.resetForm();
            }
          });
        } else {
          this.$message({
            message: "验证失败，请重新填写",
            type: "error"
          });
        }
      }).catch(e=>{
        console.log(e)
      });
      if(this.$route.params.to){
        this.$router.push(this.$route.params.to)
      }
      else this.$router.push({ name: "index" });
    },
    to_register() {
      if(this.$route.params.to)
        this.$router.push({ name: "register" , params:{to: this.$route.params.to}});
      else this.$router.push({name: 'register'})
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    getUserInfo(){
      this.$axios.get("/user/user_info",{
        params: {
          id: 0
        },
        headers: {'X-CSRFToken': this.getCookie('csrftoken')}
      }).then(res => {
        if(res.status === 200){
          this.user_img = res.data.img
          this.isLog = true
          localStorage.setItem('userId', res.data.id)
        }
        else{
          this.$message({
            message: '获取个人头像失败',
            type: 'error'
          })
        }
      }).catch(e =>{
        this.$message({
          message: e,
          type: 'error'
        })
      })
    }
  }
};
</script>
<style scoped>
div.login {
  text-align: center;
}
.loginForm {
  margin: 0 auto;
  width: 500px;
  border-radius: 20px;
  border: #c0c8be solid 1px;
}
.to_register {
  margin: 0 auto;
  line-height: 20px;
  font-size: medium;
}
h2 {
  text-align: center;
  letter-spacing: 2px;
  margin: 0;
}

h2 > figure {
  background-image: url("https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg");
  height: 200px;
  background-size: 90%;
  background-position: center;
  background-repeat: no-repeat;
  /*transition: 0.1s linear opacity,  0.3s ease background-size;*/
}

h2 > figure:hover {
  background-size: 100%;
}
</style>
