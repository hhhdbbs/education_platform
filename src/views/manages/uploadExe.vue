<template>
  <div>
    <el-row style="margin-top:30px" > 
      <el-col :span="20" style="background:white">
        <el-container>

          
          <el-main>
            <el-input v-model="name" placeholder="期末试卷名称"></el-input>
            <el-divider></el-divider>
            <div>
              <h3>单选题  
                <el-tooltip content="新建题目" placement="bottom" effect="light">
                    <el-button type="primary" icon="el-icon-edit" @click="addQuestion(1)" circle></el-button>
                </el-tooltip>
              </h3>
              <ul v-for="(item, index) in one" :key="index">
                <li style="position:relative">
                    <el-button
                    type="danger" 
                          style="position:absolute;left:-43px"  
                    icon="el-icon-delete"
                    @click="dele(item.question_type,index)"
                    circle
                  ></el-button>
                      <p>第{{ index + 1 }}题: 
                      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="item.title"   clearable></el-input>  
                  </p> 
                  <el-input v-model="item.input" placeholder="请输入题目选项内容"   clearable></el-input>
                   <el-button type="danger" plain @click="function(){item.input!=''?item.selects.push({name:item.input}):w;item.input=''}">添加题目选项</el-button>
                   <el-button type="danger" plain @click="item.selects=[]">清空题目选项</el-button> 
                 <div>
                   <el-radio-group 
                    v-model="item.selected"
                   
                  >
                    <el-radio :label="ind+1" v-for="(select, ind) in item.selects" :key="ind">{{ select.name }}</el-radio>
                  </el-radio-group>
                 </div>
                 
                </li></ul>
            </div>
            <div >
              <h3>多选题
                   <el-tooltip content="新建题目" placement="bottom" effect="light">
                    <el-button type="primary" icon="el-icon-edit" @click="addQuestion(2)" circle></el-button>
                </el-tooltip>
              </h3>
              <ul v-for="(item, index) in more" :key="index">
                <li>
                     <li style="position:relative">
                    <el-button
                    type="danger" 
                          style="position:absolute;left:-43px"  
                    icon="el-icon-delete"
                    @click="dele(item.question_type,index)"
                    circle
                  ></el-button>
                      <p>第{{ index + 1 }}题: 
                      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="item.title"   clearable></el-input>  
                  </p> 
                  <el-input v-model="item.input" placeholder="请输入题目描述"   clearable></el-input>
                   <el-button type="danger" plain @click="function(){item.input!=''?item.selects.push({name:item.input}):w;item.input=''}">添加题目选项</el-button>
                   <el-button type="danger" plain @click="item.selects=[]">清空题目选项</el-button> 
                 <div>
                    <el-radio-group 
                    v-model="item.selected"
                    v-for="(select, ind) in item.selects"
                    :key="ind"
                  >
                    <el-checkbox :label="ind+1">{{ select.name }}</el-checkbox>
                  </el-radio-group>
                 </div>
                
               
                </li>
              </ul> 
            </div>
            <div >
              <h3>填空题
                   <el-tooltip content="新建题目" placement="bottom" effect="light">
                    <el-button type="primary" icon="el-icon-edit" @click="addQuestion(3)" circle></el-button>
                </el-tooltip>
              </h3>
              <ul v-for="(item, index) in input" :key="index">
                 <li style="position:relative">
                    <el-button
                    type="danger" 
                          style="position:absolute;left:-43px"  
                    icon="el-icon-delete"
                    @click="dele(item.question_type,index)"
                    circle
                  ></el-button>
                      <p>第{{ index + 1 }}题: 
                      <el-input type="textarea" :rows="2" placeholder="请输入题目描述" v-model="item.title"   clearable></el-input>  
                  </p> 
                   <el-input v-model="item.answer" placeholder="请输入内容" clearable></el-input> 
                </li> 
              </ul>
              <h3>主观题
                   <el-tooltip content="新建题目" placement="bottom" effect="light">
                    <el-button type="primary" icon="el-icon-edit" @click="addQuestion(4)" circle></el-button>
                </el-tooltip>
              </h3>
              <ul v-for="(item, index) in textarea" :key="index">
                <li style="position:relative">
                    <el-button
                    type="danger" 
                          style="position:absolute;left:-43px"  
                    icon="el-icon-delete"
                    @click="dele(item.question_type,index)"
                    circle
                  ></el-button>
                      <p>第{{ index + 1 }}题: 
                      <el-input type="textarea" :rows="2" placeholder="请输入题目描述" v-model="item.title"   clearable></el-input>  
             </p>
    <el-input  type="textarea"
  :rows="2" v-model="item.answer" placeholder="请输入答案" clearable></el-input>  
                     
                 
                </li>  
              </ul>
                <div class="center-children">
              <el-button type="primary"
              @click="submit()"
                >&nbsp;&nbsp;&nbsp;&nbsp; 提交
                &nbsp;&nbsp;&nbsp;&nbsp;</el-button
              >
            </div>
              </div>
          </el-main>
        </el-container>
      </el-col>
      <el-col :span="4"><div class="grid-content "></div></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
     name:"",
      one:[ ],
      more: [ ],
      maybe: [], 
      input: [ ],
      textarea: []
    }; 
  },
  mounted(){
    this.id=this.$route.query.id
  },
  methods: {
    addQuestion(question_type){
      if(question_type==1){
        this.one.push(  {input:"",question_type:1, id:"",title: "", selects: [],selected:""},)
      }
      else if(question_type==3){
           this.input.push(  {input:"",question_type:2, id:"",title: "",answer:""},)
 /////待定
      }
      else if(question_type==2){
           this.more.push(  {input:"",question_type:3, id:"",title: "", selects: [],selected:[]},)

      }
      else if(question_type==4){
           this.textarea.push(  {input:"",question_type:5, id:"",title: "", answer:""},)
    ////待定 
    }
    },
    submit(){
      var ids=[]
      var num=this.one.length+this.more.length+this.input.length+this.textarea.length
      for(let i in this.one){
        var item=this.one[i]
        ids.push(uploadOne(item))
      }
      for(let i in this.more){
        var item=this.more[i]
        ids.push(uploadMore(item))
      }
      for(let i in this.input){
        var item=this.input[i]
        ids.push(uploadInput(item))
      }
       for(let i in this.textarea){
        var item=this.textarea[i]
        ids.push(uploadTextarea(item))
      }
      var timer=setInterval(
        function(){
          if(num==ids.length){
            clearInterval(timer)
                this.$axios({
      url:"/exercise/changeExercise",
      method:"post",
      data:{
        course_id:this.id,
        question_ids:ids.join(","),
        name:this.name
      },
      headers: {'Authorization':localStorage.token}
        }).then(res=>{
         if(res.data.code==200)
         console.log("上传成功")
         else   console.log("S"+res.data.message)
            })
          }
        },
        1000)
    },
    uploadOne(item){  
    this.$axios({
      url:"/exercise/addExercise",
      method:"post",
      data:{
        name:item.title,
        question_type:item.question_type,
        choice_count:item.selects.length,
        choice_contents:item.selects.join(";;"),
        choice_right:item.selected,
      },
      headers: {'Authorization':localStorage.token}
        }).then(res=>{
         if(res.data.code==200)
         return res.data.data
         else alert("上传失败")
            })
    },
     uploadMore(item){  
    this.$axios({
      url:"/exercise/addExercise",
      method:"post",
      data:{
        name:item.title,
        question_type:item.question_type,
        choice_count:item.selects.length,
        choice_contents:item.selects.join(";;"),
        choice_right:item.selected.join(","),
      },
      headers: {'Authorization':localStorage.token}
        }).then(res=>{
         if(res.data.code==200)
         return res.data.data
         else alert("上传失败")
            })
    },
     uploadInput(item){  
    this.$axios({
      url:"/exercise/addExercise",
      method:"post",
      data:{
        name:item.title,
        question_type:item.question_type,
        answer:item.answer
      },
      headers: {'Authorization':localStorage.token}
        }).then(res=>{
         if(res.data.code==200)
         return res.data.data
         else alert("上传失败")
            })
    },
     uploadTextarea(item){  
    this.$axios({
      url:"/exercise/addExercise",
      method:"post",
      data:{
        name:item.title,
        question_type:item.question_type,
        answer:item.answer
      },
      headers: {'Authorization':localStorage.token}
        }).then(res=>{
         if(res.data.code==200)
         return res.data.data
         else alert("上传失败")
            })
    },
      dele(question_type,index){
      if(question_type==1){
        this.one.splice(index,1)
      }
      else if(question_type==3){
        this.input.splice(index,1)
      }
      else if(question_type==2){
        this.more.splice(index,1)
      }
      else if(question_type==4){
        this.textarea.splice(index,1)
      }
    },
 
  }
};
</script>
<style>
li {
  list-style: none;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
}
.center-children {
  text-align: center;
}
</style>

