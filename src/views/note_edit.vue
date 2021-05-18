<template>
  <div class="notes">
    <el-form :model="note">
      <div style="height: 20px;"></div>
      <el-form-item style="width: 80%; margin:0 auto;">
        <el-row>
          <el-col :span="12">
        选择章节:
        <el-select v-model="chap" filterable @change="getChap">
          <el-option
              v-for="item in chapters"
              :key="item.classId"
              :label="item.name"
              :value="item.classId"
          >
          </el-option>
        </el-select></el-col>
          <el-col :span="12">
        <div style="float: right">
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button plain @click="resetForm">重置</el-button>
        </div></el-col>
        </el-row>

      </el-form-item><br>
      <el-form-item style="width: 80%; margin: 0 auto;" label="笔记标题">
          <el-input v-model="note.title"></el-input></el-form-item>
      <el-form-item style="width: 80%; margin: 0 auto;">
        <mavon-editor
          style="height: 650px;"
          @save="saveDoc"
          ref="editor"
          v-model="note.text"
        >
<!--          @change="updateDoc"-->
        </mavon-editor>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "note_edit",
  data() {
    return {
      chap: "1.1",
      userId: 1,
      // classId: 1,
      courseInfo: {
        class_img:
          "http://img0.imgtn.bdimg.com/it/u=3318420653,2672036615&fm=26&gp=0.jpg",
        className: "语文",
        doc: "", //相关课程放在那里??????????????????????????????????
        classIntro:
          "这是一门需要脑子的课。每星期五晚20：00更新。更多消息请关注老师微信123###",
        courseId: "1"
      },
      note:{
        id: 1,
        title: '语文课笔记',
        text: '<h2>这是笔记内容！</h2>'
      },
      chapters: [
        {
          date: "2016-05-02",
          classId: "1.1",
          note_address: "上海市普陀区金沙江路 1518 弄",
          name: '1.1算法',
          v_address: '1'
        },
        {
          date: "2016-05-04",
          classId: "1.2",
          note_address: "上海市普陀区金沙江路 1517 弄",
          name: '1.2哈希树',
          v_address: '1'
        },
        {
          date: "2016-05-01",
          classId: "1.3",
          note_address: "上海市普陀区金沙江路 1519 弄",
          name: '1.3二叉树',
          v_address: '1'
        },
        {
          date: "2016-05-03",
          classId: "2.1",
          note_address: "上海市普陀区金沙江路 1516 弄",
          name: '2.1搜索树',
          v_address: '1'
        }
      ],
      note_id: 0,
    };
  },
  mounted() {
    this.courseInfo = this.$route.params.courseInfo
    this.chap = this.$route.params.classId;
    this.chapters = this.$route.params.allClass;
    this.init(this.chap)
  },
  methods: {
    init: function (chap) {
      this.chapters.forEach(item=>{
        if(item.classId == chap){
          this.note_id = item.note_address;
        }
      })
      this.$axios.get('/note/info', {params: {note_id: this.note_id}}).then(res=>{
        if(res.status == 200){
          console.log(res)
          this.note.id = res.note.id
          this.note.title = res.note.title
          this.note.text = res.note.text
        }
      })
    },
    onSubmit() {
      this.$axios.post('/note/info', {
        id: this.note.id, title: this.note.title, text: this.note.text,
          class_id: this.chap, course_id: this.courseInfo.courseId, author_id: this.userId
        }).then(res =>{
          if(res.status == 1){
            this.note.id = res.data.note.id
            this.note.title = res.data.note.title
            this.note.text = res.data.note.text
          } else{
            this.$message({message: res.data.note, type: 'error'})
          }
      }).catch(e =>{this.$message({message: e, type: 'error'})})
    },
    // updateDoc(markdown, html) {
    //   // 此时会自动将 markdown 和 html 传递到这个方法中
    //   console.log("markdown内容: " + markdown);
    //   console.log("html内容:" + html);
    //   this.form.doc = html
    // },
    saveDoc(markdown, html) {
      // 此时会自动将 markdown 和 html 传递到这个方法中
      console.log("markdown内容:" + markdown);
      console.log("html内容:" + html);
      this.note.text = markdown
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    getChap(val) {
      console.log(val);
      this.chap = val;
      this.init(this.chap)
    }
  }
};
</script>

<style scoped></style>
