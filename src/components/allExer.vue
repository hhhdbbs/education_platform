<template>
  <div >
    <div v-for="(item,index) in list" :key="index">
        <el-collapse v-model="activeName" accordion>
      <el-collapse-item :title="item.name" :name="item.name">
        <el-menu
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        > 
        <el-menu-item @click="toChap(item.id,item.test_id,0)">课前练习</el-menu-item>
           <div v-for="(it,ind) in item.classes" :key="ind">
        <el-collapse v-model="activeName2" accordion>
      <el-collapse-item :title="it.class_name" :name="it.class_name">
        <el-menu
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        > 
            <el-menu-item @click="toChap(item.id, it.exercise_id,0)">exercise_id</el-menu-item>
            <el-menu-item @click="toChap(item.id, it.exercise_easy_id,1)">exercise_easy_id</el-menu-item>
            <el-menu-item @click="toChap(item.id, it.exercise_middle_id,2)">exercise_middle_id</el-menu-item>
            <el-menu-item @click="toChap(item.id, it.exercise_hard_id,3)">exercise_hard_id</el-menu-item>
        </el-menu>
      </el-collapse-item>
    </el-collapse>
    </div>
        </el-menu>
      </el-collapse-item>
    </el-collapse>
    </div>
  </div>
</template>
<script>
let text = "初始化赋值123";
export default {
  props: {
    list: {
      default:function(){
        return
        [{name:"sd",id:"123",test_id:"123",classes:[{class_name:"123sad",exercise_id:123,exercise_easy_id:123,exercise_middle_id:234,exercise_hard_id:234}]}]
      }
    }
  },
  data() {
    return {
      user_id:"",
      txt_name: "",
      activeName:"",
      activeName2:""
    };
  },
  created: function() {
    this.txt_name = text;
  },
  methods: {
    handleCommand(command) {
      this.$message("click on item " + command);
    },
    toChap(course, chap,level) {
      this.$router.push({
        path:"/allExercise/"+course+"/"+chap+"/"+level
    //    name: "allExercise",
     //   params: { courseId: course, classId: chap,level:1 }
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
li {
  list-style: none;
}
</style>
