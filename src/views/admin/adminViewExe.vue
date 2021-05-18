<template>
  <div>
  <manage-exe></manage-exe>
  </div>
</template>
<script>
import manageExe from "@/components/manegeExe";
export default {
   components: {
    manageExe
  },
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
  },
  
  mounted(){
    var that=this
    ////复制 获取exerciselist
   ///获取课程id
        this.$axios.post('/course/user_list',
     {
        id:0
      },
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(res=>{
          if(res.status==200){
            console.log(res);
            this.list=res.data.courses
            }
        })
    //////粘贴 获取exerciselist
   this.$axios({
            url:'exercise/question/info',
             method:'GET',
             params: {
        id:this.$route.params.exerciseId
        }
          }).then(res=>{
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
  }
};
</script>
<style>
</style>

