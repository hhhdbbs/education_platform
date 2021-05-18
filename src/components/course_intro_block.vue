<template>
  <div class="cib">
    <el-card shadow="never" style="text-align: center; line-height: 30px;">
      <div>
        <el-image
          :src="classCard.class_img"
          :fit="'scale-down'"
          style="width: 250px;"
        ></el-image>
      </div>
      <div style="font-size: x-large; margin-bottom: 10px;">
        {{ classCard.className }}
      </div>
      <div v-if="!my_join" style=" margin-bottom: 10px;"><!-- :class="{'active': switchJoin}"-->
        <el-button
          plain
          style="padding: 10px; font-size: medium;"
          @click="join_class"
        >
          加入课程</el-button
        >
      </div>
      <div v-else style=" margin-bottom: 10px;">
        <el-button
          type="danger"
          style="padding: 10px; font-size: medium;"
          @click="join_class"
        >
          退出课程</el-button
        >
      </div>
      授课教师：<el-button
        type="text"
        style="font-size: medium; color: black; margin-bottom: 10px;"
        @click="toTeacher"
      >
        <div>{{ classCard.teacherName }}</div></el-button
      >
      <div>课程介绍：{{ classCard.classIntro }}</div>
      <div>参加人数：{{ classCard.stuNum }}</div>
      <div>创建时间：{{ classCard.classDate }}</div>
      <el-divider></el-divider>
      <div v-if="!my_like">
        <el-button
          plain
          style="padding: 10px; font-size: medium;"
          @click="like_class"
          >点赞课程</el-button
        >
      </div>
      <div v-else>
        <el-button
          type="danger"
          style="padding: 10px; font-size: medium;"
          @click="like_class"
          >取消点赞</el-button
        >
      </div>
      <div>有{{ classCard.like_num }}个同学给该课程点过赞</div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "cib",
  props: {
    fclassCard: {
      default: {
        courseId: 1,
        className: "语文",
        class_img:
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        teacherName: "李廷",
        classDate: "2019-07-03",
        classIntro: "名师开设语文课！",
        stuNum: 20,
        like_num: 30
      }
    },
    join:{
      default: false
    },
    like: {
      default: false
    },
  },
  data() {
    return {
      my_join: false,
      my_like: false,
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
    };
  },
  watch:{
    join(newV){
      this.my_join = newV
    },
    like(newV){
      this.my_like = newV
    },
    fclassCard:{
      handler(newValue, oldValue){
        console.log(oldValue)
        this.classCard = newValue
      },
      deep: true
    }
  },
  methods: {
    init() {
      this.my_join = this.join
      this.my_like = this.like
    },
    join_class() {
      const new_join = !this.join
      this.$emit('changeJoin', new_join)
    },
    like_class() {
      const new_like = !this.like
      this.$emit('changeLike', new_like)
    },
    toTeacher() {
      this.$router.push({ name: "User" });
    }
  }
};
</script>

<style scoped>
.el-divider {
  margin-top: 5px;
  margin-bottom: 12px;
}
</style>
