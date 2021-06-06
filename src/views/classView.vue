<template>
  <div class="classView">
    <el-container direction="horizontal">
      <el-container direction="vertical">
        <el-main>
          <el-container direction="vertical">
            <div style="position: relative">
              <div style="position: absolute; left: 10px; font-size: larger">
                {{courseName}}:{{ className }}
              </div>
              <div style="position: absolute; right: 10px;">
                选择章节:

                <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
    {{className}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">黄金糕</el-dropdown-item>
    <el-dropdown-item command="b">狮子头</el-dropdown-item>
    <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
    <el-dropdown-item command="d" disabled>双皮奶</el-dropdown-item>
    <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item>
        <el-dropdown-item v-for="(item,index) in classes" :key="index" :command="item.video_id">{{item.class_name}}</el-dropdown-item>
       
  </el-dropdown-menu></el-dropdown>       </div>
            </div>
            <br /><!--字被视频盖住了-->
            <div>
              <video-player
                class="video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
                @ended="onPlayerEnd($event)"
              ></video-player>
            </div>
          </el-container>
        </el-main>
        <el-main style="text-align: left; padding: 10px; line-height: 25px;">
          <div style="font-size: x-large">本小节概要：
          </div>
          <br />
          <div>{{ intro }}</div>
        </el-main>
      </el-container>
      <div class="easide">
        <el-aside style="min-width:530px; height: 700px; padding: 0; overflow-y: hidden">
          <div v-show="!vis">
    <el-tooltip class="item" effect="light" content="点击保存(Ctrl+S)即是提交笔记标题和内容哦~" placement="left-start">
      <el-input v-model="note_title" placeholder="笔记标题"></el-input></el-tooltip>
            <mavon-editor
              style="height: 650px;"
              @save="saveDoc"
              @change="updateDoc"
              ref="editor"
              v-model="note_text"
            >
            </mavon-editor>
          </div>
          <div v-show="vis">
            <p>课后习题</p>
             <p>{{ title }}</p>
                  <el-radio-group v-show="question_type==1"
                    v-model="selected"
                    v-for="(select, ind) in choices"
                    :key="ind"
                  >
                    <el-radio :label="select.if_true">{{ select.name }}</el-radio>
                  </el-radio-group>
                    <el-checkbox-group v-show="question_type==3"
                    v-model="selected"
                    v-for="(select, ind) in choices"
                    :key="ind"
                  >
                    <el-checkbox :label="select"></el-checkbox></el-checkbox-group>
                    <el-input v-show="question_type==2"
                    placeholder="请输入内容"
                    v-model="input"
                    clearable
                  ></el-input>
                   <el-input v-show="question_type==4" type="textarea"
                    placeholder="请输入内容"
                    v-model="input"
                    clearable
                  ></el-input>
              <p><el-button @click="test">提交</el-button></p>
          </div>
        </el-aside>
      </div>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "classView",
  data() {
    return {
      className:"classname",
      courseName:"coutsename",
      note_title:"title",
      note_text:"text",
      classes:[{class_id:1,class_name:"12",video_id:123},{class_id:434,class_name:"1243",video_id:1233}],
      intro:"intro",
      class_id:1,
      note_id:1,
      question_type:1,
      choices:[{name:"213",if_true:true}],
      selected:[],
      input:"",
      answer:"answer",
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
            src: "http://www.html5videoplayer.net/videos/madagascar3.mp4" //url地址
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
      courseId:0,
      classId:0,
      chapName:"",
      vis:true
    };
  },
  mounted() {
    this.courseId = this.$route.params.courseId
    this.classId=this.$route.params.classId

      this.$axios({
      url:"/course/getCourseInfo",
      method:"get",
      params:{
        id:this.courseId
        },
      headers: {'Authorization':localStorage.token}
        }).then(res=>{
          if(res.data.code==200){
            var data=res.data.data
            this.courseName=data.name
            this.classes=data.classes
            }
            })

     this.$axios({
      url:"/video/getVideoInfo",
      method:"get",
      params:{
        video_id:this.classId
        },
      headers: {'Authorization':localStorage.token}
        }).then(res=>{
          if(res.data.code==200){
            var data=res.data.data
            this.className=data.name
            this.chapName=data.name
            this.intro=data.intro
            this.class_id=data.class_id
            this.note_id=data.note_id
            this.src=data.src
            this.question_type=data.question_type
            this.choices=data.choices
            this.answer=data.answer
            }
            })

      
     this.$axios({
      url:"",
      method:"get",
      params:{
        note_id:this.note_id
        },
      headers: {'Authorization':localStorage.token}
        }).then(res=>{
          if(res.data.code==200){
            var data=res.data.data
            this.note_title=data.title
            this.note_text=data.text
            }
            })
  },
  methods: {
    test(){
      if(this.question_type==1){
        if(this.selected)
         jumpTrue();
        else jumpFalse();
      }else if(this.question_type==2){
        if(this.input==this.answer)
        jumpTrue()
        else jumpFalse()
      }else if(this.question_type==3){
        let true_num=0,num=0;
        for(var item in this.choices){
          if(this.choices[item].if_true) true_num++
        }
        for(var item in this.selected){
          if(this.selected[item].if_true) num++
        }
        if(num==true_num) jumpTrue()
        else jumpFalse()
      }
      else{
         if(this.input==this.answer)
        jumpTrue()
        else jumpFalse()
      }
    },
    jumpFalse(){
      alert("答题错误，请重新作答")
    },
    jumpTrue(){
       this.$router.push({ path: "/video/"+this.courseId+"/"+this.classes[this.class_id].video_id });
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
    onSubmit() {
      this.$axios.post('', {
        id: this.note_id, 
        name:this.note_title,
        text:this.note_text
        },
        {
            headers: {'Authorization':localStorage.token}
        }).then(res =>{
          if(res.data.code == 200){
            this.$message({message:"修改成功", type: 'success'})
          } else{
            this.$message({message: res.data.note, type: 'error'})
          }
      }).catch(e =>{this.$message({message: e, type: 'error'})})
    },
      handleCommand(command) {
         this.$router.push({ path: "/video/"+this.courseId+"/"+command });
      },
      onPlayerEnd(event){
        vis=true;
        onSubmit()
      }
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
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
