<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <all-exer :list="list"></all-exer>
      </el-aside>
      <el-main> </el-main>
    </el-container>
  </div>
</template>
<script>
import allExer from "../components/allExer";
export default{
  components:{
    allExer
  },
  data() {
    return {
      courses:[],
     list:  [{name:"sd",id:"123",test_id:"123",classes:[{class_name:"123sad",exercise_id:123,exercise_easy_id:123,exercise_middle_id:234,exercise_hard_id:234}]}]
    };
  },
  mounted(){
    this.$axios.post('/course/user_list',
     {
        id:0
      },
      {headers: {'X-CSRFToken': this.getCookie('csrftoken')}})
      .then(res=>{
          if(res.status==200){
            console.log(res);
            this.list=res.data.courses
            }
        })
  },
  methods:{
    getCookie (name) {
        var value = '; ' + document.cookie
        var parts = value.split('; ' + name + '=')
        if (parts.length === 2) return parts.pop().split(';').shift()
    },
  }
}
;
</script>
<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
