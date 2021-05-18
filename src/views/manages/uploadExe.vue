<template>
  <div>
    <el-row style="margin-top:30px" > 
      <el-col :span="20" style="background:white">
        <el-container>
          <el-main>
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
                  <el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="item.stems" 
  list-type="picture">
  <el-button size="small" type="primary">点击上传题干描述 </el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload> 
                   <el-button type="danger" plain @click="function(){item.input!=''?item.selects.push({name:item.input}):w;item.input=''}">添加题目选项</el-button>
                   <el-button type="danger" plain @click="item.selects=[]">清空题目选项</el-button> 
                 <el-input v-model="item.input" placeholder="请输入题目描述"   clearable></el-input>
                 <el-radio-group 
                    v-model="item.selected"
                    v-for="(select, ind) in item.selects"
                    :key="ind"
                  >
                    <el-radio :label="select.name">{{ select.name }}</el-radio>
                  </el-radio-group>
                  <p>
                        <el-button type="danger" plain @click="function(){item.tag!=''?item.tags.push({name:item.tag}):w;item.tag=''}">添加题目知识点</el-button>
                   <el-button type="danger" plain @click="item.tags=[]">清空题目知识点</el-button> 
                  </p>  
                 <el-input v-model="item.tag" placeholder="请输入内容"   clearable></el-input>
                 <ul
                    v-for="(select, ind) in item.tags"
                    :key="ind"
                  >
                    <li><span style="font-weight:bold ">知识点{{ind+1}}：</span> {{ select.name }}</li>
                  </ul>
               
                </li>
              </ul>
            </div>
            <div >
              <h3>多选题
                   <el-tooltip content="新建题目" placement="bottom" effect="light">
                    <el-button type="primary" icon="el-icon-edit" @click="addQuestion(3)" circle></el-button>
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
                  <el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="item.stems" 
  list-type="picture">
  <el-button size="small" type="primary">点击上传题干描述 </el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload> 
                   <el-button type="danger" plain @click="function(){item.input!=''?item.selects.push({name:item.input}):w;item.input=''}">添加题目选项</el-button>
                   <el-button type="danger" plain @click="item.selects=[]">清空题目选项</el-button> 
                 <el-input v-model="item.input" placeholder="请输入题目描述"   clearable></el-input>
                 <el-radio-group 
                    v-model="item.selected"
                    v-for="(select, ind) in item.selects"
                    :key="ind"
                  >
                    <el-checkbox :label="select.name">{{ select.name }}</el-checkbox>
                  </el-radio-group>
                  <p>
                        <el-button type="danger" plain @click="function(){item.tag!=''?item.tags.push({name:item.tag}):w;item.tag=''}">添加题目知识点</el-button>
                   <el-button type="danger" plain @click="item.tags=[]">清空题目知识点</el-button> 
                  </p> 
                 <el-input v-model="item.tag" placeholder="请输入内容"   clearable></el-input>
                 <ul
                    v-for="(select, ind) in item.tags"
                    :key="ind"
                  >
                    <li><span style="font-weight:bold ">知识点{{ind+1}}：</span> {{ select.name }}</li>
                  </ul>
                </li>
              </ul> 
            </div>
             <div >
              <h3>不定项选择题
                   <el-tooltip content="新建题目" placement="bottom" effect="light">
                    <el-button type="primary" icon="el-icon-edit" @click="addQuestion(4)" circle></el-button>
                </el-tooltip>
              </h3>
              <ul v-for="(item, index) in maybe" :key="index">
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
                      <el-input type="textarea" :rows="2" placeholder="请输入题目描述" v-model="item.title"   clearable></el-input>  
                  </p> 
                  <el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="item.stems" 
  list-type="picture">
  <el-button size="small" type="primary">点击上传题干描述 </el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload> 
                   <el-button type="danger" plain @click="function(){item.input!=''?item.selects.push({name:item.input}):w;item.input=''}">添加题目选项</el-button>
                   <el-button type="danger" plain @click="item.selects=[]">清空题目选项</el-button> 
                 <el-input v-model="item.input" placeholder="请输入内容"   clearable></el-input>
                 <el-radio-group 
                    v-model="item.selected"
                    v-for="(select, ind) in item.selects"
                    :key="ind"
                  >
                    <el-checkbox :label="select.name">{{ select.name }}</el-checkbox>
                  </el-radio-group>
                  <p>
                        <el-button type="danger" plain @click="function(){item.tag!=''?item.tags.push({name:item.tag}):w;item.tag=''}">添加题目知识点</el-button>
                   <el-button type="danger" plain @click="item.tags=[]">清空题目知识点</el-button> 
                  </p> 
                 <el-input v-model="item.tag" placeholder="请输入内容"   clearable></el-input>
                 <ul
                    v-for="(select, ind) in item.tags"
                    :key="ind"
                  >
                    <li><span style="font-weight:bold ">知识点{{ind+1}}：</span> {{ select.name }}</li>
                  </ul>
                </li>
              </ul>
            </div>
            <div >
              <h3>填空题
                   <el-tooltip content="新建题目" placement="bottom" effect="light">
                    <el-button type="primary" icon="el-icon-edit" @click="addQuestion(2)" circle></el-button>
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
                               <el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="item.stems" 
  list-type="picture">
  <el-button size="small" type="primary">点击上传题干描述 </el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>  
                   <el-button type="danger" plain @click="item.input!=''?item.answers.push({answer:item.input}):w">添加题目答案</el-button>
                   <el-button type="danger" plain @click="item.answers=[]">清空题目答案</el-button> 
                 <el-input v-model="item.input" placeholder="请输入内容" clearable></el-input> 
                  <ul v-for="(it,ind) in item.answers" :key="ind">
                    <li>
                       <p>第{{ind+1}}空：{{it.answer}}</p> 
                    </li>
                  </ul>
                  <p>
                              <el-button type="danger" plain @click="function(){item.tag!=''?item.tags.push({name:item.tag}):w;item.tag=''}">添加题目知识点</el-button>
                   <el-button type="danger" plain @click="item.tags=[]">清空题目知识点</el-button> 
                  </p>  
                 <el-input v-model="item.tag" placeholder="请输入内容"   clearable></el-input>
                 <ul
                    v-for="(select, ind) in item.tags"
                    :key="ind"
                  >
                    <li><span style="font-weight:bold ">知识点{{ind+1}}：</span> {{ select.name }}</li>
                  </ul>
                </li> 
              </ul>
              <h3>主观题
                   <el-tooltip content="新建题目" placement="bottom" effect="light">
                    <el-button type="primary" icon="el-icon-edit" @click="addQuestion(5)" circle></el-button>
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
                               <el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="item.stems" 
  list-type="picture">
  <el-button size="small" type="primary">点击上传题干描述 </el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>  
    <el-input  type="textarea"
  :rows="2" v-model="item.answers[0].answer" placeholder="请输入答案" clearable></el-input>  
                 <p>
                              <el-button type="danger" plain @click="function(){item.tag!=''?item.tags.push({name:item.tag}):w;item.tag=''}">添加题目知识点</el-button>
                   <el-button type="danger" plain @click="item.tags=[]">清空题目知识点</el-button> 
                  </p>  
                 <el-input v-model="item.tag" placeholder="请输入内容"   clearable></el-input>
                 <ul
                    v-for="(select, ind) in item.tags"
                    :key="ind"
                  >
                    <li><span style="font-weight:bold ">知识点{{ind+1}}：</span> {{ select.name }}</li>
                  </ul>
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
      fileList:[],
      show_class:false, 
         items:[{name:"sad",id:"123",classes:[{className:"sad",classId:"123"}]},{name:"sad",id:"123",classes:[{className:"sazzzzzzd",classId:"123"}]}],
    click:"请选择课程",
    course_id:"",
      class_id:"",
    exercise_id:0,
    show_exercise:false,
     show_question:false,
       items_class:[{className:"sad",classId:"123"},{className:"saddd",classId:"123"}],
    click_class:"请选择课程",
    click_exercise:"请选择习题",
      name:"sda",
      one:[ ],
      more: [ ],
      maybe: [], 
      input: [ ],
      textarea: []
    }; 
  },
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

