<template>
  <div class="classCardSp" style="height:100%">
    <v-card style="text-align:left" @click="toClass">
      <v-row>
        <v-col cols="3" style="padding-top:0;padding-right:0;padding-bottom:0">
          <v-img
          :src="classCard.class_img"
          ></v-img>
        </v-col>
        <v-col cols="7" style="">
          <v-card-title style="cursor:pointer" @click="toClass">{{classCard.className}}</v-card-title>
          <v-card-subtitle>{{ classCard.teacherName }}</v-card-subtitle>
          <v-card-text>{{ classCard.classIntro }}</v-card-text>
          <v-card-text style="position: absolute; bottom: 0px;width:50%">{{ classCard.stuNum }}人参加</v-card-text>
        </v-col>
        <v-col cols="2">
          <v-card-text style="text-align:right">{{ classCard.like_num }}人赞过</v-card-text>
          <v-card-text style="text-align:right;position: absolute; bottom: 0px;width:15%">{{ classCard.classDate }}</v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
/* eslint-disable */
  //如何一行在左右两边显示???????????????????????????????????????????????
  export default {
    name: "classCardSp",
    props:
    {
      classCard: {
        default:{
          classDate: '2019-07-03',
          className:'NULL',
          teacherName:'李廷',
          class_img: 'http://img0.imgtn.bdimg.com/it/u=3318420653,2672036615&fm=26&gp=0.jpg',
          classIntro:'名师开设语文课！',
          stuNum: 20,
          courseId:'1',
          like_num: 60,
        }
      }
    },
    data() {
      return {
      };
    },
    methods:{
      toClass(){
        console.log(this.classCard.courseId)
        this.$router.push({name: 'course_info', params:{courseId: this.classCard.courseId}})
      },
      toTeacher(){
        this.$router.push({name: 'User'})
      }
    },
  }
</script>

<style scoped>
  div.Intro{
    width: 100%;
    height: 85px;
  }

  .el-button{
    color: black;
    padding: 0px;
  }
</style>