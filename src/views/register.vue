<template>
  <div class="register">
    <h2><figure></figure></h2>
    <el-card class="demo-registerForm" shadow="hover">
      <el-form
        :model="registerForm"
        status-icon
        :rules="rules"
        ref="registerForm"
        label-width="0px"
      >
        <el-form-item prop="name" class="formlabel">
          <el-input
            v-model="registerForm.name"
            @keyup.enter.native="$refs.email.focus()"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            autofocus="true"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="email" class="formlabel">
          <el-input
            v-model="registerForm.email"
            ref="email"
            @keyup.enter.native="$refs.pas.focus()"
            placeholder="请输入邮箱"
            prefix-icon="el-icon-message"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="pass" class="formlabel">
          <el-input
            type="password"
            v-model="registerForm.pass"
            autocomplete="off"
            ref="pas"
            @keyup.enter.native="$refs.repas.focus()"
            placeholder="请输入密码"
            prefix-icon="el-icon-edit"
            maxLength="18"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="checkPass" class="formlabel">
          <el-input
            type="password"
            maxLength="18"
            v-model="registerForm.checkPass"
            placeholder="再次输入密码以确认"
            prefix-icon="el-icon-check"
            autocomplete="off"
            ref="repas"
            @keyup.enter.native="submitForm('registerForm')"
          >
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 0">
          <el-button type="primary" @click="submitForm('registerForm')"
            >注册</el-button
          >
          <el-button @click="resetForm('registerForm')">重置</el-button><br />
          <el-link @click="to_login" class="to_login"
            >已有帐号？现在登录</el-link
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    let checkName = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("昵称不能为空"));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      let reg=/^(?![^a-zA-Z]+$)(?!\D+$).{6,18}/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!reg.test(value)) {
        callback(new Error("密码必须包含数字、字母，长度大于6小于18"))
      } else {
        if (this.registerForm.checkPass !== "") {
          this.$refs.registerForm.validateField("checkPass");
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
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
      registerForm: {
        pass: "",
        checkPass: "",
        name: "",
        email: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        name: [{ validator: checkName, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        console.log(valid);
        if (valid) {
          this.$message({ message: "验证成功，正在提交……", type: "success" });
          this.$axios.post("/user/register",{
              email: this.registerForm.email,
              name: this.registerForm.name,
              password: this.registerForm.pass},
              // {headers: {'X-CSRFToken': this.getCookie('csrftoken'),}
          ).then(res => {
            if (res.status === 200) {
              if(res.data.status === 0){
                this.$message({ message: "注册成功！请登录", type: "success" });
                this.$router.push({ name: "login" });
              } else {
                this.$message({ message: "注册失败", type: "error" });
              }
            } else {
              this.$message({ message: "注册失败", type: "error" });
            }
          });
        } else {
          this.$message({ message: "验证失败，请重新填写", type: "error" });
          return false;
        }
      }).catch(e=>{
        console.log(e)
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    to_login() {
      if(this.$route.params.to)
        this.$router.push({ name: "login" , params:{to: this.$route.params.to}});
      else this.$router.push({name: 'login'})
    }
  }
};
</script>

<style>
div.register {
  text-align: center;
}
.demo-registerForm {
  margin: 0 auto;
  width: 500px;
  border-radius: 20px;
  border: #c0c8be solid 1px;
}
.formlabel .el-form-item__label {
  vertical-align: middle;
  float: left;
  font-size: medium;
  color: black;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
.to_login {
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
}

h2 > figure:hover {
  background-size: 100%;
}
</style>
