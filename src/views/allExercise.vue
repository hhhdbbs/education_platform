<template>
  <div>
    <el-row style="margin-top:30px">
      <el-col :span="5"
        ><div class="grid-content "><all-exer :list="list"></all-exer></div
      ></el-col>
      <el-col :span="14" style="background:white">
        <el-container>
          <el-main>
            <h1 style="text-align:left">{{ name }}习题</h1>
            <el-divider></el-divider>
            <div v-show="one.length > 0">
              <h3>单选题</h3>
              <ul v-for="(item, index) in one" :key="index">
                <li>
                      <p>第{{ index + 1 }}题: {{ item.title }}   <el-button type="danger" @click="item.show_solutions=!item.show_solutions" plain>查看题目提示</el-button>
                      <el-tooltip content="加入错题集" placement="bottom" effect="light"><el-button type="warning" icon="el-icon-star-off" circle @click="addWrongExercise(item.id)"></el-button></el-tooltip>
                  </p>
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
             
               
                </li>
              </ul>
            </div>
            <div v-show="more.length > 0">
              <h3>多选题</h3>
              <ul v-for="(item, index) in more" :key="index">
                <li>
                   <p>第{{ index + 1 }}题: {{ item.title }}   <el-button type="danger" @click="item.show_solutions=!item.show_solutions" plain>查看题目提示</el-button>
                   <el-tooltip content="加入错题集" placement="bottom" effect="light"><el-button type="warning" icon="el-icon-star-off" circle @click="addWrongExercise(item.id)"></el-button></el-tooltip>
                   </p>
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
                </li>
              </ul>
            </div>
             <div v-show="maybe.length > 0">
              <h3>不定项选择题</h3>
              <ul v-for="(item, index) in maybe" :key="index">
                <li>
                    <p>第{{ index + 1 }}题: {{ item.title }}   <el-button type="danger" @click="item.show_solutions=!item.show_solutions" plain>查看题目提示</el-button>
                    <el-tooltip content="加入错题集" placement="bottom" effect="light"><el-button type="warning" icon="el-icon-star-off" circle @click="addWrongExercise(item.id)"></el-button></el-tooltip>
                    </p>
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
                </li>
              </ul>
            </div>
            <div v-show="input.length > 0">
              <h3>填空题</h3>
              <ul v-for="(item, index) in input" :key="index">
                <li>
                     <p>第{{ index + 1 }}题: {{ item.title }}   <el-button type="danger" @click="item.show_solutions=!item.show_solutions" plain>查看题目提示</el-button>
                     <el-tooltip content="加入错题集" placement="bottom" effect="light"><el-button type="warning" icon="el-icon-star-off" circle @click="addWrongExercise(item.id)"></el-button></el-tooltip>
                     </p>
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
                </li>
              </ul>
              <h3>主观题</h3>
              <ul v-for="(item, index) in textarea" :key="index">
                <li>
                    <p>第{{ index + 1 }}题: {{ item.title }}   <el-button type="danger" @click="item.show_solutions=!item.show_solutions" plain>查看题目提示</el-button>
                    <el-tooltip content="加入错题集" placement="bottom" effect="light"><el-button type="warning" icon="el-icon-star-off" circle @click="addWrongExercise(item.id)"></el-button></el-tooltip>
                    </p>
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
                </li>
              </ul>
            </div>
                <div class="center-children">
              <el-button type="primary"
              @click="submit()"
                >&nbsp;&nbsp;&nbsp;&nbsp; 提交
                &nbsp;&nbsp;&nbsp;&nbsp;</el-button
              >
            </div>
          </el-main>
        </el-container>
      </el-col>
      <el-col :span="5"><div class="grid-content "></div></el-col>
    </el-row>
  </div>
</template>
<script>
import allExer from "../components/allExer";
export default {
   components: {
    allExer
  },
  data() {
    return {
      name:"sda",
      courses:[],
     list:[{name:"sd",id:"123",test_id:"123",classes:[{class_name:"123sad",exercise_id:123,exercise_easy_id:123,exercise_middle_id:234,exercise_hard_id:234}]}],
      id:"",
      class_id:"",
      video_ids:[],
      question_ids:[],
      kecheng: "数据库",
      xiaojie: "1.1：算法",
      one:[
        { id:"",title: "题目描述", selects: [{name:"红色"}],selected:"",difficulty:0,stems:[{img:null,text:"题干描述",type:0}],show_solutions:false,solutions:[{img:"ss",text:"dasd",type:1,if_last:1}]},
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
  
  mounted(){
    var that=this
    ////复制 获取exerciselist
   ///获取课程id
        this.$axios.post('/course/user_list',
            {
              id: 0
            },
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(res=>{
          if(res.status==200){
            console.log(res);
            this.list=res.data.courses
            }
        })
    //////粘贴 获取exerciselist
       this.$axios.post('exercise/question/info',{
     params: {
        id:this.$route.params.exerciseId
        } ,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(res=>{
            if(res.status==200){
              for(var i=0;i<res.data.questions.length;i++){
              var dan={id:res.data.questions[i].id,title: res.data.questions[i].text,difficulty:res.data.questions[i].difficulty,tags:res.data.questions[i].tags,solutions:res.data.questions[i].solutions,stems:res.data.questions[i].stems,show_solutions:false,right:[],wrong:[],selects:res.data.questions[i].choices,answers:res.data.questions[i].answers}
              if(res.data.question_type==1){
                that.one.push(dan)
              }
              if(res.data.question_type==2){ 
                that.input.push(dan)
              }
              else if(res.data.question_type==3){     
                that.more.push(dan)
              }
            else if(res.data.question_type==4){              
                that.maybe.push(dan)
              }
              else if(res.data.question_type==5){
                that.textarea.push(dan)
              }
              }
          }})
        
    //////粘贴
 },
  methods: {
    addWrongExercise(id){
       this.$axios({
            url:'exercise/add_exercise',
             method:'POST',
             params: {
        question_id:id,
        user_id:0
        }
          }).then(res=>{
            if(res.status==200){
                this.$message({
          message: '加入错题集成功',
          type: 'success'
        });
          }})
    },
    easy() {},
    middle() {},
    hard() {}
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
