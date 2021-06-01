<template>
  <div class="custom-tree-container">
      <el-row :gutter="20" style="padding:20px 50px">
          <el-col :span="6"  v-for="item in list" :key="item">
              <el-card>
                  <el-avatar shape="square" :size="100" fit="fill" :src="item.img"></el-avatar>
                  <p><a :href="'/manage/manageVideo?id='+item.id">{{item.name}}</a></p>
                  <p>{{item.time}}</p>
              </el-card>
          </el-col>
      </el-row>
  </div>
    
  </template>
  
  <script>
  export default {

    name:"ClassList",
    data(){
        return{
            list:[{id:12,img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',name:"zxcs",time:"2020/23/31"},
            {id:12,img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',name:"zxcs",time:"2020/23/31"},
            {id:12,img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',name:"zxcs",time:"2020/23/31"},
            {id:12,img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',name:"zxcs",time:"2020/23/31"},]
        }
    },
    mounted(){
             this.$axios({
      url:"",
      method:"get",
      params:{
        },
      headers: {'Authorization':localStorage.token}
        }).then(res=>{
          if(res.data.code==200){
            this.list=res.data.data.courses
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