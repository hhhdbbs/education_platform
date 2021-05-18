<template>
  <el-row>
    <el-col :span="5"><div class="grid-content"></div></el-col>
    <el-col :span="14" style="background:white">
      <el-container>
        <div> 
        <el-menu default-active="/user/editTeacher" class="el-menu-demo" mode="horizontal" router>
          <el-menu-item index="/user/edit">资料设置</el-menu-item>
          <el-menu-item index="/user/editAccount">账号设置</el-menu-item>
          <el-menu-item index="/user/editTeacher">申请成为老师</el-menu-item>
        </el-menu>
      </div>
      <el-main>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="个人学位" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择您的学位">
      <el-option label="小学" value="1"></el-option>
      <el-option label="初中" value="2"></el-option>
      <el-option label="高中" value="3"></el-option>
      <el-option label="本科" value="4"></el-option>
      <el-option label="硕士" value="5"></el-option>
      <el-option label="博士" value="6"></el-option>
      <el-option label="博士后" value="7"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="毕业院校" prop="graduate_school">
    <el-input type="text" v-model="ruleForm.graduate_school"></el-input>
  </el-form-item>
   <el-form-item label="任教年级" prop="teach_grade">
     <span><el-select v-model="ruleForm.select"  placeholder="请选择任教年级段">
      <el-option label="小学" value="1"></el-option>
      <el-option label="初中" value="2"></el-option>
      <el-option label="高中" value="3"></el-option>
    </el-select></span>
     <span><el-select id="sel" v-model="ruleForm.teach_grade" @click.native="selectgrade()" placeholder="请选择活动区域" >
      <div v-for="(item, index) in grade" :key="index">
      <el-option :label="item.label" :value="item.value"></el-option>
      </div>
    </el-select></span>
  </el-form-item>
  <el-form-item label="申请理由" prop="desc">
    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
  </el-form-item>
    <el-form-item :label-width="formLabelWidth" label="身份证照片"
										ref="uploadElement1">
				<el-upload ref="upload"
									 action="#"
									 accept="image/png,image/gif,image/jpg,image/jpeg"
									 list-type="picture-card"
									 :limit=limitNum
									 :auto-upload="false"
					         :before-upload="handleBeforeUpload1"
			
							
									 :on-change="imgChange1">
					<i class="el-icon-plus"></i>
				</el-upload>
			</el-form-item>
       <el-form-item :label-width="formLabelWidth" label="学信网照片"
										ref="uploadElement2">
				<el-upload ref="upload"
									 action="#"
									 accept="image/png,image/gif,image/jpg,image/jpeg"
									 list-type="picture-card"
									 :limit=limitNum
									 :auto-upload="false"
			
									 :before-upload="handleBeforeUpload2"
						
								
									 :on-change="imgChange2">
					<i class="el-icon-plus"></i>
				</el-upload>
			</el-form-item>
  <el-form-item :label-width="formLabelWidth" label="教师资格证照片"
										ref="uploadElement3">
				<el-upload ref="upload"
									 action="#"
									 accept="image/png,image/gif,image/jpg,image/jpeg"
									 list-type="picture-card"
									 :limit=limitNum
									 :auto-upload="false"
							
									 :before-upload="handleBeforeUpload3"
					
							
									 :on-change="imgChange3">
					<i class="el-icon-plus"></i>
				</el-upload>
			</el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交申请</el-button>
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
      return {
        formLabelWidth: '80px',
				limitNum: 1,
      dialogImageUrl1: "",
      dialogVisible1: false,
      dialogImageUrl2: "",
      dialogVisible2: false,
      dialogImageUrl3: "",
      dialogVisible3: false,
        grade:"",
        ruleForm: {
          select:"",
          teach_grade:"",
          region:"",
          desc: '',
          graduate_school:"",
           fileList1: [],
            fileList2: [],
             fileList3: []

        },
        rules: {
            region: [
            { required: true, message: '请选择您的学位', trigger: 'change' }
          ],
          teach_grade: [
            { required: true, message: '请选择您的学位', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写申请理由', trigger: 'blur' },
            { min: 20, max: 200, message: '长度在 20 到 200 个字符', trigger: 'blur' }
          ],
          graduate_school: [
            { required: true, message: '请填写最高学历毕业院校', trigger: 'blur' },
            { min: 20, max: 200, message: '长度在 20 到 100 个字符', trigger: 'blur' }
          ],
           fileList1: [
            { required: true, message: '请上传身份证照片', trigger: 'change' }
          ],
           fileList2: [
            { required: true, message: '请上传学信网照片', trigger: 'change' }
          ],
           fileList3: [
            { required: true, message: '请上传教师资格证照片', trigger: 'change' }
          ],
        }
      };
    },
    methods: {
          //图片上传之前检验
    beforeImageUpload(file) {
      console.log(file)
      var testmsg=file.name.substring(file.name.lastIndexOf('.')+1) 
      const isJpg = testmsg === 'jpg' || testmsg === 'png'
      if (!isJpg) {
        this.$message.error('上传图片只能是 jpg 或 png 格式!')
        return false
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
        return false
      }
      // return false // (返回false不会自动上传)
    },
	// 上传文件之前的钩子
			handleBeforeUpload1 (file) {
				if (!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
					this.$notify.warning({
						title: '警告',
						message: '请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片'
					})
				}
				let size = file.size / 1024 / 1024 / 2
				if (size > 2) {
					this.$notify.warning({
						title: '警告',
						message: '图片大小必须小于2M'
					})
        }
        this.ruleForm.fileList1=file
      },
      			handleBeforeUpload2 (file) {
				if (!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
					this.$notify.warning({
						title: '警告',
						message: '请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片'
					})
				}
				let size = file.size / 1024 / 1024 / 2
				if (size > 2) {
					this.$notify.warning({
						title: '警告',
						message: '图片大小必须小于2M'
					})
        }
        this.ruleForm.fileList2=file
      },
      			handleBeforeUpload3 (file) {
				if (!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
					this.$notify.warning({
						title: '警告',
						message: '请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片'
					})
				}
				let size = file.size / 1024 / 1024 / 2
				if (size > 2) {
					this.$notify.warning({
						title: '警告',
						message: '图片大小必须小于2M'
					})
        }
        this.ruleForm.fileList3=file
			},
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             var that=this
          
             let img_per = new FormData();//通过form数据格式来传
        img_per.append("img_per", that.ruleForm.fileList1); //传文件
           let img_xue = new FormData();//通过form数据格式来传
        img_xue.append("img_xue", that.ruleForm.fileList2); //传文件
           let img_tea = new FormData();//通过form数据格式来传
				img_tea.append("img_tea", that.ruleForm.fileList3); //传文件
          this.$axios({
            url:'/user/post_teacher',
            method:'POST',
             data: {
               id:0,
               degree:parseInt(that.ruleForm.region),
               graduate_school:that.ruleForm.graduate_school,
               teach_grade:parseInt(that.ruleForm.teach_grade),
               reason:that.ruleForm.reason,
               img_per,
               img_xue,
               img_tea, 
               }
          }).then(res=>{
            console.log(res)
            if(res.status==200){
              if(res.data.status==0)
                alert('提交成功')
              else
                alert('提交错误')
            }
          })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      imgChange1 (files, fileList) {
				this.hideUpload = fileList.length >= this.limitNum;
				if (fileList) {
					this.$refs.uploadElement1.clearValidate();
				}
      },
       imgChange2 (files, fileList) {
				this.hideUpload = fileList.length >= this.limitNum;
				if (fileList) {
					this.$refs.uploadElement2.clearValidate();
				}
      },
       imgChange3 (files, fileList) {
				this.hideUpload = fileList.length >= this.limitNum;
				if (fileList) {
					this.$refs.uploadElement3.clearValidate();
				}
			},
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      selectgrade(){
        if(this.ruleForm.select=="")
          alert("请先选择任教年级段")
        else{
          if(this.ruleForm.select=="1")
          this.grade=[{label:"一年级",value:"1"},{label:"二年级",value:"2"},{label:"三年级",value:"3"},{label:"四年级",value:"4"},{label:"五年级",value:"5"},{label:"六年级",value:"6"}]
          else if(this.ruleForm.select=="2")
          this.grade=[{label:"初一",value:"7"},{label:"初二",value:"8"},{label:"初三",value:"9"}]
          else
          this.grade=[{label:"高一",value:"10"},{label:"高二",value:"11"},{label:"高三",value:"12"}]
        }
      }
    }}
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