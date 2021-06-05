<template>
  <div class="custom-tree-container">
    <div class="block">
      <el-button @click="dialogVisible = true">添加课时</el-button>
      <div v-for="(item,index) in video" :key="index">
        <el-collapse v-model="activeName" accordion>
  <el-collapse-item :title="'课时'+(index+1)+':'+item.class_name" :name="index">
    <p>{{item.text}}</p>
   <el-radio-group v-if="item.type==1" v-model="item.selected">
      <el-radio v-for="(select,ind) in item.choices" :key="ind" :label="select.name"  v-model="item.selected" disabled>{{select.name}}</el-radio>
    </el-radio-group>
    <el-checkbox-group v-if="item.type==2" v-model="item.selected">
    <el-checkbox  v-for="(select,ind) in item.choices" :key="ind" :label="select.name" disabled></el-checkbox>
    </el-checkbox-group>
    <el-input v-if="item.type==3" v-model="item.answer" disabled></el-input>
    <el-input v-if="item.type==4" type="textare" v-model="item.answer" disabled></el-input>
  </el-collapse-item>
        </el-collapse>
      </div>
       <div style="background:white;padding:20px">
          <span>期末试卷</span>
          <el-tooltip class="item" effect="dark" content="查看" placement="top">
              <el-button style="float:right;margin-right:20px"
                icon="el-icon-search"
                circle
                @click="jumpExe">
              </el-button>
            </el-tooltip>
           <el-tooltip class="item" effect="dark" content="新建试卷" placement="top">
              <el-button
              style="float:right"
                icon="el-icon-edit"
                circle
                @click="jumpUploadExe">
              </el-button>
            </el-tooltip>
        </div>
  </div>
  <el-dialog
  title="新建课时"
  :visible.sync="dialogVisible"
  width="50%">
  <el-form>
    <div class="demo-input-suffix">
  <span>课时名称：</span>
  <el-input
    placeholder="课时名称"
    v-model="new_class.name">
  </el-input>
  </div>
      <div class="demo-input-suffix">
  <span>课时介绍：</span>
  <el-input
    placeholder="课时介绍"
    v-model="new_class.intro">
  </el-input>
  </div>
  <div class="demo-input-suffix">
  <span>课时文件上传：</span>
  学习
  </div>
  <div class="demo-input-suffix">
  <span>课后习题类型：</span>
  <el-radio v-model="radio" label="1" @change="choiceE">单选题</el-radio>
  <el-radio v-model="radio" label="2" @change="choiceE">多选题</el-radio>
  <el-radio v-model="radio" label="3" @change="choiceE">填空题</el-radio>
  <el-radio v-model="radio" label="4" @change="choiceE">主观题</el-radio>
  </div>
  <div v-if="radio=='1'">
    <el-input type="textarea" :rows="2" placeholder="请输入题干信息" v-model="new_class.title"   clearable></el-input>  
    <div>
       <el-input v-model="new_class.input" placeholder="请输入选项信息"   clearable></el-input>
       <el-button type="danger" plain @click="new_class.selects.push(new_class.input);new_class.input=''">添加题目选项</el-button>
    </div>   
    <el-radio-group 
                    v-model="new_class.selected"
                  
                  >
                    <el-radio  v-for="(select, ind) in new_class.selects"
                    :key="ind" :label="select">{{ select }}</el-radio>
                  </el-radio-group>
  </div>
  <div v-if="radio=='2'">
    <el-input type="textarea" :rows="2" placeholder="请输入题干信息" v-model="new_class.title"   clearable></el-input>  
    <div>
       <el-input v-model="new_class.input" placeholder="请输入选项信息"   clearable></el-input>
       <el-button type="danger" plain @click="new_class.selects.push(new_class.input);new_class.input=''">添加题目选项</el-button>
    </div>   
     <el-checkbox-group v-model="new_class.selected">
    <el-checkbox v-for="(item,index) in new_class.selects" :key="index" :label="(index+1).toString()">{{item}}</el-checkbox>
    </el-checkbox-group>
  </div>
  <div v-if="radio=='3'">
    <el-input type="textarea" :rows="2" placeholder="请输入题干信息" v-model="new_class.title"   clearable></el-input>  
    <el-input type="textarea" :rows="2" placeholder="请输入填空题答案" v-model="new_class.answer"   clearable></el-input>  
  </div>
   <div v-if="radio=='4'">
    <el-input type="textarea" :rows="2" placeholder="请输入题干信息" v-model="new_class.title"   clearable></el-input>  
    <el-input type="textarea" :rows="2" placeholder="请输入主观题答案" v-model="new_class.answer"   clearable></el-input>  
  </div>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false;upoloaVideo()">添加课时</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
  import editClass from "../../components/editClass";
  export default {
    name: 'manageVideo',
    data() {
      return {
        new_class:{name:"",title:"",input:"",selects:[],type:1,answer:"",selected:[],file:null,intro:""},
         radio: '1',
        dialogVisible:false,
        activeName: -1,
        id:0,
        name:"课时名称",
        video:[
        {class_name:"课时名称",video_id:123,type:1,text:"题干",choices:[{name:"这个是A",if_true:true}],answer:"32423",selected:"这个是A"},
        {class_name:"课时名称",video_id:123,type:2,text:"题干",choices:[{name:"这个是A",if_true:true}],answer:"32423",selected:["这个是A"]},
        {class_name:"课时名称",video_id:123,type:3,text:"题干",choices:[{name:"这个是A",if_true:true}],answer:"32423"},
        {class_name:"课时名称",video_id:123,type:4,text:"题干",choices:[{name:"这个是A",if_true:true}],answer:"32423"}
        ],
        exeId:0
      }
    },
    mounted(){
      this.id=this.$route.query.id
                   this.$axios({
      url:"/course/getVideoAndQuestion",
      method:"get",
      params:{
        course_id:this.id
        },
      headers: {'Authorization':localStorage.token}
        }).then(res=>{
          if(res.data.code==200){
            var data=res.data.data
            this.video=data.classes
            for(let i=0;i<this.video.length;i++){
              var item=this.video[i]
              if(item.type==1){
                for(let j=0;j<item.choices.length;j++){
                  if(item[j].if_true){
                    item.selected=item[j].name
                    break
                  }
                  
                }
              }else if(item.type==2){
                item.selected=[]
                for(let j=0;j<item.choices.length;j++){
                  if(item[j].if_true){
                    item.selected.push(item[j].name)
                  }
                }
              }
            }
            }
            })
    },
    methods: {
      choiceE(label){
        this.new_class.type=parseInt(label)
        this.new_class.selects=[]
        this.new_class.selected=[]
        this.new_class.answer=""
      },
      upoloaVideo(){
      this.$axios({
      url:"/video/addVideo",
      method:"post",
      params:{
        course_id:this.id,
        video_src:this.new_class.file,
        name:this.new_class.title,
        intro:this.new_class.intro
        },
      headers: {'Authorization':localStorage.token}
        }).then(res=>{
          if(res.data.code==200){

               console.log("添加视频成功")
               uploadE(res.data.data)
            }
            })
      },
      uploadE(id){
           this.$axios({
      url:"/exercise/addExercise",
      method:"post",
      params:{
        name:this.new_class.t=title,
        question_type:this.new_class.type,
        choice_count:this.new_class.selects.length,
        choice_contents:this.new_class.selects.join(";;"),
        choice_right:this.new_class.type==2?this.new_class.selected.join(","):this.new_class.selected,
        answer:this.new_class.answer
        },
      headers: {'Authorization':localStorage.token}
        }).then(res=>{
          if(res.data.code==200){
               console.log("添加题目成功")
               binEAndV(id,res.data.data)
            }
            })
      },
      binEAndV(v_id,q_id){
          this.$axios({
      url:"/exercise/addExercise",
      method:"post",
      params:{
        video_id:v_id,
        question_id:q_id
        },
      headers: {'Authorization':localStorage.token}
        }).then(res=>{
          if(res.data.code==200){
               console.log("绑定成功")
              
            }
            })
      },
      jumpExe(){
        this.$router.push({path:'/manage/exercise',query: {id:this.exeId}})
      },
      jumpUploadExe(){
        this.$router.push({path:'/manage/uploadExercise',query: {id:this.id}})
      }
      }
    
  };
</script>

<style>
 
</style>
