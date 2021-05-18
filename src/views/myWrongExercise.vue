<template>
  <div>
    <el-row
      style="position:relative;height:200px;background-color: rgba(192,200,190, 0.5)"
    >
      <el-col :span="17">
        <div id="info">
          <div style="width: 25% ;height:80%;">
            <div
              style="position:absolute;left:10%;top:70px;width: 100px;height:100px;border-radius:100px;-webkit-border-radius:100px; -moz-border-radius:100px;overflow: hidden"
            >
              <img
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                alt="头像"
                style="width:100px;height: 100px; display: block; ; border-radius:100px;"
              />
            </div>
          </div>
          <div style="position:absolute;left:40%;top:20px;">
            <h4 class="lead">{{ name }}</h4>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row style="background:white">
      <el-col :span="15">
        <el-row><el-menu
            default-active="/user/wrongExercise"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            router
          >
            <el-menu-item index="/user">我的课程</el-menu-item>
            <el-menu-item index="/user/wrongExercise">我的错题本</el-menu-item>
          </el-menu>
        </el-row>
        <el-row class="tac">
          <el-col :span="4">
            <h5>选择题型</h5>
            <el-menu
              :default-active="active"
              class="el-menu-vertical-demo"
              @select="handleSelect"
            >
              <el-menu-item index="1">
                <span slot="title">单选题</span>
              </el-menu-item>
              <el-menu-item index="2">
                <span slot="title">多选题</span>
              </el-menu-item>
               <el-menu-item index="3">
                <span slot="title">不定项选择题</span>
              </el-menu-item>
              <el-menu-item index="4">
                <span slot="title">填空题</span>
              </el-menu-item>
              <el-menu-item index="5">
                <span slot="title">主观题</span>
              </el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="20">
            <div v-show="active == 1">
              <h3>
                单选题
                <el-button type="primary" @click="showone = !showone"
                  >显示答案</el-button
                >
              </h3>
              <ul v-for="(item, index) in one" :key="index">
                <li style="position:relative">
                  <el-button
                    style="position:absolute;right:-50px"
                    type="danger"
                    icon="el-icon-delete"
                    @click="dele(item.question_type,index,item.id)"
                    circle
                  ></el-button>
                      <p>第{{ index + 1 }}题: {{ item.title }}   <el-button type="danger" @click="item.show_solutions=!item.show_solutions" plain>查看题目提示</el-button>
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
             
               
                  <p
                    v-show="showone"
                    style="font-size:16px;border-radius: 2px;border:solid 1px"
                  >
                    正确答案:&nbsp;&nbsp;<span
                      style="font-size:20px;color:red"
                      >{{ item.right }}</span
                    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    >
                  </p>
                </li>
              </ul>
              
            </div>
            <div v-show="active == 2">
              <h3>
                多选题
                <el-button type="primary" @click="showmore = !showmore"
                  >显示答案</el-button
                >
              </h3>

              <ul v-for="(item, index) in more" :key="index">
                <li style="position:relative">
                  <el-button
                    style="position:absolute;right:-50px"
                    type="danger"
                    icon="el-icon-delete"
                    @click="dele(item.question_type,index,item.id)"
                    circle
                  ></el-button>
                  <p>第{{ index + 1 }}题: {{ item.title }}   <el-button type="danger" @click="item.show_solutions=!item.show_solutions" plain>查看题目提示</el-button>
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
                  <p
                    v-show="showmore"
                    style="font-size:16px;border-radius: 2px;border:solid 1px"
                  >
                    正确答案:&nbsp;&nbsp;<span
                      style="font-size:20px;color:red"
                      >{{ item.right }}</span
                    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    >
                  </p>
                </li>
              </ul>
            </div>
               <div v-show="active == '3'">
              <h3>
                不定项选择题
                <el-button type="primary" @click="showmore = !showmore"
                  >显示答案</el-button
                >
              </h3>

              <ul v-for="(item, index) in more" :key="index">
                <li style="position:relative">
                  <el-button
                    style="position:absolute;right:-50px"
                    type="danger"
                    icon="el-icon-delete"
                    @click="dele(item.question_type,index,item.id)"
                    circle
                  ></el-button>
                   <p>第{{ index + 1 }}题: {{ item.title }}   <el-button type="danger" @click="item.show_solutions=!item.show_solutions" plain>查看题目提示</el-button>
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
                  <p
                    v-show="showmore"
                    style="font-size:16px;border-radius: 2px;border:solid 1px"
                  >
                    正确答案:&nbsp;&nbsp;<span
                      style="font-size:20px;color:red"
                      >{{ item.right }}</span
                    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    >
                  </p>
                </li>
              </ul>
            </div>
            <div v-show="active == '4'">
              <h3>
                填空题&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-button
                  type="primary"
                  @click="showinput = !showinput"
                  >显示答案</el-button
                >
              </h3>
              <ul v-for="(item, index) in input" :key="index">
                <li style="position:relative">
                  <el-button
                    style="position:absolute;right:-50px"
                    type="danger"
                    icon="el-icon-delete"
                    @click="dele(item.question_type,index,item.id)"
                    circle
                  ></el-button>
                    <p>第{{ index + 1 }}题: {{ item.title }}   <el-button type="danger" @click="item.show_solutions=!item.show_solutions" plain>查看题目提示</el-button>
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
                  <p
                    v-show="showinput"
                    style="font-size:16px;border-radius: 2px;border:solid 1px"
                  >
                    正确答案:&nbsp;&nbsp;<span
                      style="font-size:20px;color:red"
                      >{{ item.right }}</span
                    >
                  </p>
                  <p
                    v-show="showinput"
                    style="font-size:16px;border-radius: 2px;border:solid 1px"
                  >
                  
                  </p>
                </li>
              </ul>
            </div>
      

          <div v-show="active == '5'">
              <h3>
                主观题&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-button
                  type="primary"
                  @click="showinput = !showinput"
                  >显示答案</el-button
                >
              </h3>
              <ul v-for="(item, index) in input" :key="index">
                <li style="position:relative">
                  <el-button
                    style="position:absolute;right:-50px"
                    type="danger"
                    icon="el-icon-delete"
                    @click="dele(item.question_type,index,item.id)"
                    circle
                  ></el-button>
                  <p>第{{ index + 1 }}题: {{ item.title }}   <el-button type="danger" @click="item.show_solutions=!item.show_solutions" plain>查看题目提示</el-button>
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
                  <p
                    v-show="showinput"
                    style="font-size:16px;border-radius: 2px;border:solid 1px"
                  >
                    正确答案:&nbsp;&nbsp;<span
                      style="font-size:20px;color:red"
                      >{{ item.right }}</span
                    >
                  </p>
                  <p
                    v-show="showinput"
                    style="font-size:16px;border-radius: 2px;border:solid 1px"
                  >
        
                  </p> 
                </li>
              </ul>
            </div>
           
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="2">
        <el-dropdown style="margin-top:30px" @command="handleCommand" >
          <span class="el-dropdown-link">
            {{ click }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in items" :key="item" :command="item" @click.native="selectClass(item)">
              {{ item.name }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <el-row :gutter="20"> </el-row>
      </el-col>
      <el-col :span="6">
        <user-info></user-info>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import userInfo from "../components/userInfo.vue";
export default {
  name: "WrongExercise",
  components: {
    userInfo
  },
  data() {
    return {
       info: {
          sex:0,
          school:"",
          major:"sad",
          grade:"543",
          email:"241"
    },
    items:[{name:"sad",id:"123"},{name:"sdddfad",id:"123"}],
    click:"sad",
      active: "1",
      one: [
          { question_type:1,id:"",title: "题目描述", selects: [{name:"红色"}],selected:"",difficulty:0,stems:[{img:null,text:"题干描述",type:0}],show_solutions:false,solutions:[{img:"ss",text:"dasd",type:1,if_last:1}]
          ,right: "D",
          wrong: "C"
          
        },
      ],
      more: [
        {
          id:"",title: "你喜欢", selects: [{name:"红色"}] ,selected: ["红色"], difficulty:0,
          right: ["A", "B"],
          wrong: ["C"]
        },
      ],
      maybe: [
        {
          id:"",title: "你喜欢", selects: [{name:"红色"}] ,selected: ["红色"], difficulty:0,
          right: ["A", "B"],
          wrong: ["C"]
        },
      ],
      input: [
        { id:"",title: "你喜欢", answers:[{answer:"",input: ["fsdf"]},{answer:"",input: ["fsdf"]}],difficulty:0, right: "sda", wrong: "sad" },
      ],
      textarea: [
        {id:"", title: "你喜欢",answers:[{answer:"", textareas:""}],difficulty:0, right: "sda", wrong: "sad" },
      ],
      showone: false,
      showmore: false,
      showinput: false,
      jpg: "C:/Users/鸡蛋酱/IdeaProjects/untitled/myweb/src/jpg/book2.jpg",
      name: "Gua"
    };
  }
  ,
  mounted(){
         this.$axios.post('/course/user_list',
             {
               id: 0
             },
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(res=>{
        this.items=res.data.courses
      })
   
  },
  methods: {
    handleCommand(command) {
      this.click = command.name;
    }, 
    selectClass(item){
       this.click = item.name;
       var that=this
          this.$axios.post('/exercise/post_wrong_exercise_file',
     {
        course_id:item.id
      },
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res=>{
            if(res.status==200){
              for(var i=0;i<res.data.questions.length;i++){
              var dan={id:res.data.questions[i].id,title: res.data.questions[i].text,difficulty:res.data.questions[i].difficulty,tags:res.data.questions[i].tags,solutions:res.data.questions[i].solutions,stems:res.data.questions[i].stems,show_solutions:false,right:[],wrong:[],selects:res.data.questions[i].choices,answers:res.data.questions[i].answers}
              var j
              if(res.data.question_type==1){
                for(j=0;j<dan.selects.length;j++){
                  if(dan.selects[j].if_true==0)
                  dan.right.push(dan.selects[j].name)
                }
                that.one.push(dan)
              }
              if(res.data.question_type==2){ 
                for(j=0;j<dan.answers.length;j++){
                  dan.right.push(dan.answers[j].answer)
                }
                that.input.push(dan)
              }
              else if(res.data.question_type==3){     
                for(j=0;j<dan.selects.length;j++){
                  if(dan.selects[j].if_true==0)
                  dan.right.push(dan.selects[j].name)
                }
                that.more.push(dan)
              }
            else if(res.data.question_type==4){     
              for(j=0;j<dan.selects.length;j++){
                  if(dan.selects[j].if_true==0)
                  dan.right.push(dan.selects[j].name)
                }         
                that.maybe.push(dan)
              }
              else if(res.data.question_type==5){
                for(j=0;j<dan.answers.length;j++){
                  dan.right.push(dan.answers[j].answer)
                }
                that.textarea.push(dan)
              }
              }
          }})
        
    //////粘贴
  },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.active = key;
    },
    toEdit() {
      this.$router.push({ name: "Edit" });
    },
    dele(question_type,index,id){
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
    this.$axios({
      url:"http://127.0.0.1:8000/del_exercise",
      method:"post",
      data:{
        question_id:id,
        user_id:0
      }
        }).then(res=>{
          if(res.status==200){
            console.log(res);
            }
            })
    }
}}
</script>
<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.el-col {
  border-radius: 4px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
li {
  list-style: none;
}
</style>
