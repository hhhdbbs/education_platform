<template>
  <div>
    <el-row style="margin-top:30px" > 
      <el-col :span="20" style="background:white">
        <el-container>
          <el-main>
            <el-divider></el-divider>
                 <div v-show="one.length > 0">
              <h3>单选题</h3>
              <ul v-for="(item, index) in one" :key="index">
                <li>
                      <p>第{{ index + 1 }}题: {{ item.title }}   <el-button type="danger" @click="item.show_solutions=!item.show_solutions" plain>查看题目提示</el-button>   </p>
                  <ul v-for="(it,ind) in item.stems" :key="ind">
                    <li>
                      <p v-show="it.text!=null">{{it.text}}</p>
                    </li>
                  </ul>
                  <ul v-for="(it,ind) in item.stems" :key="ind">
                    <li>
                      <img v-show="it.img!=null" :src="it.img">
                    </li>
                  </ul>
                       <div  v-show="item.show_solutions">
   <el-divider content-position="left">鸭你来看提示啦</el-divider>
                  <ul  v-for="(it,ind) in item.solutions" :key="ind">
                    <li>
                      <p v-show="it.text!=null">{{it.text}}</p>
                      <img v-show="it.img!=null" :src="it.img">
                    </li>
                  </ul>
                   <el-divider content-position="left">好啦好啦快去写题 下次要自己做呦</el-divider>
                  </div>
                  <el-radio-group
                    v-model="item.selected"
                    v-for="(select, ind) in item.selects"
                    :key="ind"
                  >
                    <el-radio :label="select.name">{{ select.name }}</el-radio>
                  </el-radio-group>
                     <el-divider content-position="left">本题知识点</el-divider>
                  <ul  v-for="(it,ind) in item.tags" :key="ind">
                    <li>
                      <p>{{it}}</p>
                    </li>
                  </ul>
                   <el-divider content-position="left">是不是感觉更巩固了呢？</el-divider>
                </li>
              </ul>
            </div>
            <div v-show="more.length > 0">
              <h3>多选题</h3>
              <ul v-for="(item, index) in more" :key="index">
                <li>
                   <p>第{{ index + 1 }}题: {{ item.title }}   <el-button type="danger" @click="item.show_solutions=!item.show_solutions" plain>查看题目提示</el-button></p>
                  <ul v-for="(it,ind) in item.stems" :key="ind">
                    <li>
                      <p v-show="it.text!=null">{{it.text}}</p>
                    </li>
                  </ul>
                  <ul v-for="(it,ind) in item.stems" :key="ind">
                    <li>
                      <img v-show="it.img!=null" :src="it.img">
                    </li>
                  </ul>
                       <div  v-show="item.show_solutions">
   <el-divider content-position="left">鸭你来看提示啦</el-divider>
                  <ul  v-for="(it,ind) in item.solutions" :key="ind">
                    <li>
                      <p v-show="it.text!=null">{{it.text}}</p>
                      <img v-show="it.img!=null" :src="it.img">
                    </li>
                  </ul>
                   <el-divider content-position="left">好啦好啦快去写题 下次要自己做呦</el-divider>
                  </div>
                  <el-checkbox-group
                    v-model="item.selected"
                    v-for="(select, ind) in item.selects"
                    :key="ind"
                  >
                    <el-checkbox :label="select.name">{{select.name}}</el-checkbox>
                  </el-checkbox-group>
                                      <el-divider content-position="left">本题知识点</el-divider>
                  <ul  v-for="(it,ind) in item.tags" :key="ind">
                    <li>
                      <p>{{it}}</p>
                    </li>
                  </ul>
                   <el-divider content-position="left">是不是感觉更巩固了呢？</el-divider>
                </li>
              </ul>
            </div>
             <div v-show="maybe.length > 0">
              <h3>不定项选择题</h3>
              <ul v-for="(item, index) in maybe" :key="index">
                <li>
                    <p>第{{ index + 1 }}题: {{ item.title }}   <el-button type="danger" @click="item.show_solutions=!item.show_solutions" plain>查看题目提示</el-button> </p>
                  <ul v-for="(it,ind) in item.stems" :key="ind">
                    <li>
                      <p v-show="it.text!=null">{{it.text}}</p>
                    </li>
                  </ul>
                  <ul v-for="(it,ind) in item.stems" :key="ind">
                    <li>
                      <img v-show="it.img!=null" :src="it.img">
                    </li>
                  </ul>
                       <div  v-show="item.show_solutions">
   <el-divider content-position="left">鸭你来看提示啦</el-divider>
                  <ul  v-for="(it,ind) in item.solutions" :key="ind">
                    <li>
                      <p v-show="it.text!=null">{{it.text}}</p>
                      <img v-show="it.img!=null" :src="it.img">
                    </li>
                  </ul>
                   <el-divider content-position="left">好啦好啦快去写题 下次要自己做呦</el-divider>
                  </div>
                  <el-checkbox-group
                    v-model="item.selected"
                    v-for="(select, ind) in item.selects"
                    :key="ind"
                  >
                    <el-checkbox :label="select.name">{{select.name}}</el-checkbox>
                  </el-checkbox-group>
                                      <el-divider content-position="left">本题知识点</el-divider>
                  <ul  v-for="(it,ind) in item.tags" :key="ind">
                    <li>
                      <p>{{it}}</p>
                    </li>
                  </ul>
                   <el-divider content-position="left">是不是感觉更巩固了呢？</el-divider>
                </li>
              </ul>
            </div>
            <div v-show="input.length > 0">
              <h3>填空题</h3>
              <ul v-for="(item, index) in input" :key="index">
                <li>
                     <p>第{{ index + 1 }}题: {{ item.title }}   <el-button type="danger" @click="item.show_solutions=!item.show_solutions" plain>查看题目提示</el-button> </p>
                  <ul v-for="(it,ind) in item.stems" :key="ind"> 
                    <li>
                      <p v-show="it.text!=null">{{it.text}}</p>
                    </li>
                  </ul>
                  <ul v-for="(it,ind) in item.stems" :key="ind">
                    <li>
                      <img v-show="it.img!=null" :src="it.img">
                    </li>
                  </ul>
                       <div  v-show="item.show_solutions">
   <el-divider content-position="left">鸭你来看提示啦</el-divider>
                  <ul  v-for="(it,ind) in item.solutions" :key="ind">
                    <li>
                      <p v-show="it.text!=null">{{it.text}}</p>
                      <img v-show="it.img!=null" :src="it.img">
                    </li>
                  </ul>
                   <el-divider content-position="left">好啦好啦快去写题 下次要自己做呦</el-divider>
                  </div>
                  <ul v-for="(it,ind) in item.answers" :key="ind">
                    <li>
                       <el-input
                    placeholder="请输入内容"
                    v-model="it.input"
                    clearable
                  ></el-input>
                    </li>
                  </ul>
                                      <el-divider content-position="left">本题知识点</el-divider>
                  <ul  v-for="(it,ind) in item.tags" :key="ind">
                    <li>
                      <p>{{it}}</p>
                    </li>
                  </ul>
                   <el-divider content-position="left">是不是感觉更巩固了呢？</el-divider>
                </li>
              </ul>
              <h3>主观题</h3>
              <ul v-for="(item, index) in textarea" :key="index">
                <li>
                    <p>第{{ index + 1 }}题: {{ item.title }}   <el-button type="danger" @click="item.show_solutions=!item.show_solutions" plain>查看题目提示</el-button> </p>
                  <ul v-for="(it,ind) in item.stems" :key="ind">
                    <li>
                      <p v-show="it.text!=null">{{it.text}}</p>
                    </li>
                  </ul>
                  <ul v-for="(it,ind) in item.stems" :key="ind">
                    <li>
                      <img v-show="it.img!=null" :src="it.img">
                    </li>
                  </ul>
                       <div  v-show="item.show_solutions">
   <el-divider content-position="left">鸭你来看提示啦</el-divider>
                  <ul  v-for="(it,ind) in item.solutions" :key="ind">
                    <li>
                      <p v-show="it.text!=null">{{it.text}}</p>
                      <img v-show="it.img!=null" :src="it.img">
                    </li>
                  </ul>
                   <el-divider content-position="left">好啦好啦快去写题 下次要自己做呦</el-divider>
                  </div>
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="item.answers[0].textarea"
                    clearable
                  ></el-input>
                                      <el-divider content-position="left">本题知识点</el-divider>
                  <ul  v-for="(it,ind) in item.tags" :key="ind">
                    <li>
                      <p>{{it}}</p>
                    </li>
                  </ul>
                   <el-divider content-position="left">是不是感觉更巩固了呢？</el-divider> 
                </li>
              </ul>
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
      fileList:[],
         items:[{name:"sad",id:"123",classes:[{className:"sad",classId:"123"}]},{name:"sad",id:"123",classes:[{className:"sazzzzzzd",classId:"123"}]}],
    click:"请选择课程",
    course_id:"",
      class_id:"",
    exercise_id:0,
       items_class:[{className:"sad",classId:"123"},{className:"saddd",classId:"123"}],
    click_class:"请选择课程",
    click_exercise:"请选择习题",
      name:"sda",
         one:[ 
        { id:"",title: "题目描述", selects: [{name:"红色"}],selected:"",difficulty:0,stems:[{img:null,text:"题干描述",type:0}],show_solutions:false,solutions:[{img:"ss",text:"dasd",type:1,if_last:1}],tags:["asdas","dasda"]},
      ],
      more: [
        { id:"",title: "你喜欢", selects: [{name:"红色"}] ,selected: ["红色"], difficulty:0},
         ],
      maybe: [
         { id:"",title: "你喜欢", selects: [{name:"红色"}] ,selected: ["红色"], difficulty:0},
        ],
      input: [
        { id:"",title: "你喜欢", answers:[{answer:"",input: ["fsdf"]},{answer:"",input: ["fsdf"]}],difficulty:0},
         ],
      textarea: [
        { id:"", title: "你喜欢",answers:[{answer:"", textareas:""}],difficulty:0},
        ]
    };
  }
  ,
  methods: {
    addQuestion(question_type){
      if(question_type==1){
        this.one.push(  {input:"",question_type:1, id:"",title: "", selects: [],selected:"",difficulty:0,stems:[],tags:[],tag:""},)
      }
      else if(question_type==2){
           this.input.push(  {input:"",question_type:2, id:"",title: "",answers:[],difficulty:0,stems:[],tags:[],tag:""},)
 /////待定
      }
      else if(question_type==3){
           this.more.push(  {input:"",question_type:3, id:"",title: "", selects: [],selected:[],difficulty:0,stems:[],tags:[],tag:""},)

      }
      else if(question_type==4){
           this.maybe.push(  {input:"",question_type:4, id:"",title: "", selects: [],selected:[],difficulty:0,stems:[],tags:[],tag:""},)
      }
      else if(question_type==5){
           this.textarea.push(  {input:"",question_type:5, id:"",title: "", answers:[{answer:""}],difficulty:0,stems:[],tags:[],tag:""},)
    ////待定 
    }
    },
    submit(){

    },
      dele(question_type,index){
      if(question_type==1){
        this.one.splice(index,1)
      }
      else if(question_type==2){
        this.input.splice(index,1)
      }
      else if(question_type==3){
        this.more.splice(index,1)
      }
      else if(question_type==4){
        this.maybe.splice(index,1)
      }
      else if(question_type==5){
        this.textarea.splice(index,1)
      }
    },
    handleCommand(command) {
      if(this.show_class==true){
        this.show_question=false
        this.show_exercise=false
        this.click_class="请选择课时"
        this.click_exercise="请选择习题"
      } 
      else{
      this.show_class=true
      }
       this.click = command.name;
      this.course_id=command.id
      this.items_class=command.classes
    },
    handleCommand_class(command) {
       if(this.show_exercise==true){
        this.show_question=false
        this.click_exercise="请选择习题"
      } 
      else{
      this.show_exercise=true
      }
      this.click_class = command.className;
      this.class_id=command.classId 
    },
     handleCommand_exercise(command) {
       if(command==0)
      this.click_exercise = "课前习题";
      else (command==1)
      this.click_exercise = "课后习题";
      this.show_question=true 
      this.exercise_id=command.
      alert(this.exercise_id)    
    },
    easy() {},
    middle() {},
    hard() {},
    del_exercise(){

    }
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

