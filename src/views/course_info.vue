<template>
  <div>
    <el-container>
      <el-container class="mid">
        <el-aside width="300px" style="margin-left: 100px;">
          <cib :fclass-card="classCard" :join="join" :like="like" @changeJoin="changeJoin" @changeLike="changeLike"></cib>
        </el-aside>
        <el-container><!--未登录用户看不到它-->
          <el-main style="margin-right: 100px;">
            <br />
            <div v-if="isLog">
            <el-table
              :data="
                tableData.filter(
                  data =>
                    !search ||
                    data.name.toLowerCase().includes(search.toLowerCase())
                )
              "
              style="width: 100%"
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
            >
              <el-table-column label="课时" prop="name">
                <template slot-scope="scope">
                  <i class="el-icon-reading"></i>
                  <el-button
                    style="margin-left: 10px; color: black;"
                    type="text"
                    @click="toClassView(scope.row)"
                  >
                    {{ scope.row.name }}</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column label="更新日期" prop="date"> </el-table-column>
              <el-table-column align="right">
                <template slot="header">
                  <el-input
                    v-model="search"
                    size="medium"
                    placeholder="输入章节搜索"
                  />
                </template>
                <template slot-scope="scope">
                  <el-button
                    size="medium"
                    @click="handleEdit(scope.$index, scope.row)"
                    >查看笔记本</el-button
                  >
                </template>
              </el-table-column>
            </el-table></div>
            <div v-else>
              <el-link style="margin: 0 auto; line-height: 20px; font-size: medium;" @click="toLogin">
                您暂时不能浏览更详细的信息，点我去登录</el-link>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "course_info",
  data() {
    return {
      userId: 1,
      classCard: {
        courseId: 1,
        className: "语文",
        class_img:
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        teacherName: "李廷",
        classDate: "2019-07-03",
        classIntro: "名师开设语文课！",
        stuNum: 20,
        like_num: 30
      },
      tableData: [
        {
          date: "2016-05-02",
          classId: "1.1",
          note_address: "上海市普陀区金沙江路 1518 弄",
          name: '1.1算法',
          v_address: '1',
          exercise_id: 3
        },
        {
          date: "2016-05-04",
          classId: "1.2",
          note_address: "上海市普陀区金沙江路 1517 弄",
          name: '1.2哈希树',
          v_address: '1',
          exercise_id: 3
        },
        {
          date: "2016-05-01",
          classId: "1.3",
          note_address: "上海市普陀区金沙江路 1519 弄",
          name: '1.3二叉树',
          v_address: '1',
          exercise_id: 3
        },
        {
          date: "2016-05-03",
          classId: "2.1",
          note_address: "上海市普陀区金沙江路 1516 弄",
          name: '2.1搜索树',
          v_address: '1',
          exercise_id: 3
        }
      ],
      search: "",
      join: false,
      like: false,
      isLog: true,
      test_id: 0
    };
  },
  mounted(){
    this.classCard.courseId = this.$route.params.courseId
    this.init()
  },
  methods: {
    init(){
      if(!localStorage.getItem('userId')){
        this.isLog = false;
      }
      else{
        this.isLog = true
      }
      this.getCourseInfo()
    },
    handleEdit(index, row) {//瞎写的，要改
      console.log(index, row);
      this.$router.push({
        name: "note_edit",
        params: {
          courseId: this.classCard.courseId, courseInfo: this.classCard, classId: row.classId,
        allClass: this.tableData}
      });
    },
    toClassView(item) {
      let params = {
        courseId: this.classCard.courseId, courseInfo: this.classCard, classId: item.classId, userId: this.userId,
      allClass: this.tableData}
      this.$router.push({
        name: "classView",
        params: params,
      });
    },
    getCourseInfo() {
      this.$axios.get("/course/info",{
        params:{ id: this.classCard.courseId}
      }).then(res => {
        if (res.status === 200) {
          let i = res.data
          this.classCard.className = i.name;
          this.classCard.classIntro = i.intro;
          this.classCard.class_img = i.class_img;
          this.classCard.teacherName = i.author_name;
          this.classCard.like_num = i.who_likes.length;
          this.classCard.stuNum = i.who_joins.length;
          this.join = i.is_join == 1 ? true : false
          this.like = i.is_like == 1 ? true:false
          this.test_id = res.data.test_id
          let j = 0
          if(i.classes.length>0){
            i.classes.forEach(item=>{
              this.tableData[j].classId = item.class_index
              this.tableData[j].name = item.class_name
              this.tableData[j].v_address = item.video_id
              this.tableData[j].note_address = item.note_id
              this.tableData[j].exercise_id = item.exercise_id
            })
          }
        }
      }).catch(e =>{this.$message({message: e, type: 'error'})});
    },
    changeJoin(){
      this.toLogin()
      let op = this.join?0:1
      this.$axios.post('/course/follow', {
        course_id:this.classCard.courseId, op: op}).then(res=>{
          if(res.data.status == 0){
            this.join = !this.join
            this.classCard.stuNum = res.data.new_join_num//在这里强制进入课前练习还是在进入课时时进入课前练习
            if(this.join === true){
              this.$router.push({name: 'exercise', params: {exerciseId: this.test_id, level: 0, courseId: this.classCard.courseId}})
            }
          } else {
            this.$message({message:'操作失败，请稍后重试', type: 'error'})
          }
      }).catch(e=>{this.$message({message:e, type:'error'})})
    },
    changeLike(){
      this.toLogin()
      let op = this.like?0:1
      this.$axios.post('/course/like', {
        course_id:this.classCard.courseId, op: op}).then(res=>{
          if(res.data.status == 0){
            this.like = !this.like
            this.classCard.like_num = res.data.new_like_num
          } else {
            this.$message({message:'操作失败，请稍后重试', type: 'error'})
          }
      }).catch(e=>{this.$message({message:e, type:'error'})})
    },
    toLogin(){
      if(!localStorage.getItem('userId')){
        console.log(this.$route.fullPath)
        this.$router.push({name: 'login', params:{to: this.$route.fullPath}})
      }
    }
  }
};
</script>

<style scoped>
.el-aside {
  color: #333;
  padding-top: 50px;
  padding-bottom: 30px;
}

.el-main {
  color: #333;
  padding-top: 50px;
}

.mid {
  margin-bottom: 40px;
  width: 1100px;
  margin: 0 auto;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
