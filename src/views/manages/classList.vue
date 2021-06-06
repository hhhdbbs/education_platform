<template>
  <div class="custom-tree-container">
    <el-button @click="dialogVisible = true">新建课程</el-button>
      <el-row :gutter="20" style="padding:20px 50px">
          <el-col :span="6"  v-for="item in list" :key="item">
              <el-card>
                  <el-avatar shape="square" :size="100" fit="fill" :src="item.img"></el-avatar>
                  <p><a :href="'/manage/manageVideo?id='+item.id">{{item.name}}</a></p>
                  <p>{{item.time}}</p>
              </el-card>
          </el-col>
      </el-row>
      
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="50%"
  :before-close="handleClose">
  <div>
    <el-input placeholder="课程名称" v-model="form.name"></el-input>
  </div>
  <div>
    <span>图片：</span>
    ？？？？
  </div>
  <div>
    <span>学科类别</span>
     <el-radio-group v-model="form.subject">
    <el-radio :label="item.id" v-for="(item,index) in subject" :key="index">{{item.name}}</el-radio>
     </el-radio-group>
  </div>
  <div>
    <el-input type="textarea" v-model="form.intro"></el-input>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false;get_new_class()">确 定</el-button>
  </span>
</el-dialog>
  </div>
    
  </template>
  
  <script>
import directorEdit from '../../components/directorEdit.vue'
  export default {
  components: { directorEdit },
    name:"ClassList",
    data(){
        return{
        dialogVisible:false,
          subject:[{name:"asd",id:23},{name:"232",id:23}],
          form:{name:"",subject:2,intro:"",img:null},
            list:[{id:12,img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',name:"zxcs",time:"2020/23/31"},
            {id:12,img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',name:"zxcs",time:"2020/23/31"},
            {id:12,img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',name:"zxcs",time:"2020/23/31"},
            {id:12,img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',name:"zxcs",time:"2020/23/31"},]
        }
    },
    mounted(){
             this.$axios({
      url:"/course/getCourseByUser",
      method:"get",
      params:{
        },
      headers: {'Authorization':localStorage.token}
        }).then(res=>{
          if(res.data.code==200){
            this.list=res.data.data.courses
            }
            })
    },
    get_new_class(){
           this.$axios({
      url:"",
      method:"post",
      params:{
        name:form.name,
        subject:form.subject,
        intro:form.intro,
        img:form.img
        },
      headers: {'Authorization':localStorage.token}
        }).then(res=>{
          if(res.data.code==200){
            alert(新建成功)
            }
            })
    }
  }
  </script>
  
  <style>
  a{
      text-decoration:none;
      color: black;
  }
  </style>