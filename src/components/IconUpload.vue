<!-- 注释：
传入的props列表：
hint: 显示在上传按钮上的提示文字，String型
type: 指定所传输头像的类型，是个人用户(填入user)还是机构用户(填入institution)还是其他(目前未定义)
background_mode: 给定组件所属环境的style：亮色模式（light）,还是暗色模式(dark)。
                组件会根据背景的模式决定hover时的高亮效果:亮色模式为蓝色，暗色模式为白色，以保证对于背景的区分效果。
                默认值为dark.
-->
<template>
  <v-card color="#00000000" flat tile>
    <el-upload class="avatar-uploader"
               action=""
               :http-request="uploadImage"
               :show-file-list="false"
               :before-upload="beforeAvatarUpload"
               name="user_icon"
               :auto-upload="true">
<!--      假的API网站post地址为"https://jsonplaceholder.typicode.com/posts/"-->
      <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="avatar">
      <div v-else>
        <i class="el-icon-plus avatar-uploader-icon"></i>
        <div class="avatar-uploader-hint">{{hint}}</div>
      </div>
    </el-upload>
  </v-card>
</template>

<script>
export default {
  name: "IconUpload",
  data() {  
    return {
      imageUrl:""
    }
  },
  props: {
    img:String,
    hint: String,
    type: String,
    background_mode: String,
  },
  mounted() {
    this.imageUrl=this.img
    this.createNode();
  },
  methods: {
    createNode() {
      let r = document.querySelector(":root");
      if(this.background_mode == "dark") {
        r.style.setProperty("--activatedColor", "white");
      }
      else {
        r.style.setProperty("--activatedColor", "blue");
      }
    },
    // 在上传之前，确保文件格式和文件大小正确
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //重载的上传操作，并emit上传成功后的图片URL
    uploadImage(params) {
      let file = params.file;
       this.$emit("avatar",file);
       this.imageUrl = ""
    },
  }
}
</script>

<style scoped>
/*关于上传图片控件的全部CSS样式都在此处*/
/*直到下一条结束的注释，以下CSS代码改造自 https://element.eleme.cn/#/zh-CN/component/upload */
:root {
  --activatedColor: blue;
}

.avatar-uploader{
  border: 1px dashed silver;
  border-radius: calc(3.5rem + 2px) !important;
  width: calc(7rem + 5px);
  height: calc(7rem + 5px);
  padding: 1px;
  margin-left: auto;
  margin-right: auto;
}
.avatar-uploader .el-upload {
  cursor: pointer;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: var(--activatedColor);
  transition: ease-in-out 0.2s;
}
.avatar-uploader:hover .avatar-uploader-icon{
  color: var(--activatedColor);
  transition: ease-in-out 0.2s;
}
.avatar-uploader:hover .avatar-uploader-hint{
  color: var(--activatedColor);
  transition: ease-in-out 0.2s;
}
.avatar-uploader-icon {
  font-size: 2rem;
  color: silver;
  width: 7rem;
  height: 7rem;
  line-height: 7rem;
  text-align: center;
}
.avatar-uploader-hint {
  position:relative;
  top: -3rem;
  font-size: 0.8rem;
  line-height: 3rem;
  color: silver;
}
.avatar {
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
}
</style>