<template>
  <div class="classView">
    <el-container direction="horizontal">
      <el-container direction="vertical">
        <el-main>
          <el-container direction="vertical">
            <div style="position: relative">
              <div style="position: absolute; left: 10px; font-size: larger">
                {{ courseInfo.className }}
              </div>
              <div style="position: absolute; right: 10px;">
                选择章节:
                <el-select v-model="chapName" filterable @change="getChap">
                  <el-option
                    v-for="item in chapters"
                    :key="item.classId"
                    :label="item.name"
                    :value="item.classId"
                  >
                  </el-option>
                </el-select>
                习题：<!--易中难字体问题-->
                <el-link @click="toExe('1', courseInfo.courseId, chap)"
                  >易</el-link
                >
                <el-link @click="toExe('2', courseInfo.courseId, chap)"
                  >中</el-link
                >
                <el-link @click="toExe('3', courseInfo.courseId, chap)"
                  >难</el-link
                >
              </div>
            </div>
            <br /><!--字被视频盖住了-->
            <div>
              <video-player
                class="video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
              ></video-player>
            </div>
          </el-container>
        </el-main>
        <el-main style="text-align: left; padding: 10px; line-height: 25px;">
          <div style="font-size: x-large">本小节概要：
          </div>
          <br />
          <div>{{ classIntro }}</div>
        </el-main>
      </el-container>
      <div class="easide">
        <el-aside style="min-width:530px; height: 700px; padding: 0; overflow-y: hidden">
          <div>
    <el-tooltip class="item" effect="light" content="点击保存(Ctrl+S)即是提交笔记标题和内容哦~" placement="left-start">
      <el-input v-model="note.title" placeholder="笔记标题"></el-input></el-tooltip>
            <mavon-editor
              style="height: 650px;"
              @save="saveDoc"
              @change="updateDoc"
              ref="editor"
              v-model="note.text"
            >
            </mavon-editor>
          </div>
        </el-aside>
      </div>
    </el-container>
    <el-container>
      <el-main> 相关课程</el-main>
      <!--感觉把一页占满了，所以没写相关课程。如果要加上就在这里加，展示课程的封面。-->
    </el-container>
  </div>
</template>

<script>
export default {
  name: "classView",
  data() {
    return {
      userId:1,
      courseInfo: {
        class_img:
          "http://img0.imgtn.bdimg.com/it/u=3318420653,2672036615&fm=26&gp=0.jpg",
        className: "语文",
        courseId: "1"
      },
      classIntro:
        "这是一门需要脑子的课。每星期五晚20：00更新。更多消息请关注老师微信123###",
      note:{
        id: 1,
        title: '语文课笔记',
        text: '<h2>这是笔记内容！</h2>'
      },
      chap: "1.1",
      chapters: [
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
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: "http://vjs.zencdn.net/v/oceans.mp4" //url地址
          }
        ],
        //poster: this.courseInfo.className, 你的封面地址
        // width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      },
      note_id: 0,
      video_id: 0,
      chapName: '',
      exerciseId: 3,
    };
  },
  mounted() {
    console.log(this.$route.params)
    this.userId = this.$route.params.userId
    this.courseInfo = this.$route.params.courseInfo;
    this.chapters = this.$route.params.allClass
    this.chap = this.$route.params.classId;
    this.init(this.chap)
  },
  methods: {
    init(chap) {
      console.log(this.chapters)
      this.chapters.forEach(item=>{
        if(item.classId == chap){
          this.note_id = item.note_address;
          this.video_id = item.v_address;
          this.chapName = item.name
        }
      })
      this.$axios.get('/video/info', {params:{video_id:this.video_id}}).then(res =>{
        if(res.status ==200){
          this.classIntro = res.data.intro;
          this.playerOptions.sources[0].src = res.data.src;
        }
      }).catch(e =>{this.$message({message: e, type: 'error'})})
      this.$axios.get('/note/info', {params: {note_id: this.note_id}}).then(res=>{
        if(res.status == 200){
          console.log(res)
          this.note.id = res.note.id
          this.note.title = res.note.title
          this.note.text = res.note.text
        }
      }).catch(e =>{this.$message({message: e, type: 'error'})})
    },
    updateDoc(markdown, html) {
      // 此时会自动将 markdown 和 html 传递到这个方法中
      console.log("markdown内容: " + markdown);
      console.log("html内容:" + html);
    },
    saveDoc(markdown, html) {
      // 此时会自动将 markdown 和 html 传递到这个方法中
      console.log("markdown内容:" + markdown);
      console.log("html内容:" + html);
      this.note.text = markdown
      this.onSubmit()
    },
    getChap(val) {
      console.log(val);
      this.chap = val;
      this.init(this.chap)
    },
    toExe(level, courseId, chap) {
      this.chapters.forEach(item=>{
        if(item.classId == chap){
          this.exerciseId = item.exercise_id;
        }
      })
      this.$router.push({
        name: "exercise",
        params: { exerciseId: this.exerciseId, level: 0 ,courseId: this.classCard.courseId}//level
      });
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
  }
};
</script>

<style scoped>
div.easide {
  background-color: white;
  color: #333333;
  border: 0px solid #c0c8be;
  text-align: center;
  line-height: 50px;
  margin-right: 40px;
  margin-top: 20px;
  min-width: 530px;
}

.el-main {
  background-color: whitesmoke;
  color: #333;
  border: 0px solid #c0c8be;
  text-align: center;
  line-height: 50px;
  margin-left: 40px;
  margin-top: 20px;
  margin-right: 20px;
  max-height: 600px;
  padding: 0;
  overflow-x: hidden;
  overflow-y: hidden;
}

.el-input__inner {
  height: 25px;
}

.el-link {
  padding: 0px 5px 0px 0px;
}
</style>
