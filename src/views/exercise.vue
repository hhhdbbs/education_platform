<template>
  <div>
  <manage-exe :one="one" :more="more" :input="input" :textraea="textarea"></manage-exe>
  </div>
</template>
<script>
import manageExe from "@/components/manegeExe";
export default {
  name:"CourseExe",
   components: {
    manageExe
  },
  data() {
    return {
      one:[ 
        { question_id:1,text:"提干",choices:[{name:"22",if_true:true}]},
      ],
      more: [
       { question_id:1,text:"提干",choices:[{name:"22",if_true:true}]},
         ],
      input: [
       { question_id:1,text:"提干",answer:"ss"},
         ],
      textarea: [
         { question_id:1,text:"提干",answer:"ss"},
        ]
    };
  },
    
  mounted(){
    this.id==this.$route.query.id
    var that=this
   this.$axios({
            url:'/exercise/getExerciseInfo',
             method:'GET',
             params: {
        id:this.id
        },
        headers: {'Authorization':localStorage.token}
          }).then(res=>{
            if(res.data.code==200){
              that.one=res.data.data.questions_1
              that.more=res.data.data.questions_3
              that.input=res.data.data.questions_2
              that.textarea=res.data.data.questions_4
          }})

 },
};
</script>
<style>
</style>
