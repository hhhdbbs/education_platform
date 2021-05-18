<template>
  <div class="classCarousel">
    <el-carousel trigger="click">
      <el-carousel-item v-for="item in list" :key="item.courseId"
        ><div @click="toClass(item)" style="cursor: pointer;">
          <el-image :src="item.class_img" :fit="'scale-down'"> </el-image>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "classCarousel",
  props: {
    list: {
      default: function(){
        return [
        {
          courseId: 1,
          class_img:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
        },
        {
          courseId: 2,
          class_img: ""
        },
        {
          courseId: 3,
          class_img: ""
        },
        {
          courseId: 4,
          class_img: ""
        }
      ]
      }
    }
  },
  data() {
    return {
      // list:[
      //   {
      //     courseId: 1,
      //     class_img: "http://img0.imgtn.bdimg.com/it/u=3318420653,2672036615&fm=26&gp=0.jpg",
      //   },
      //   {
      //     courseId: 2,
      //     class_img: ''
      //   },
      //   {
      //     courseId: 3,
      //     class_img: '',
      //   },
      //   {
      //     courseId: 4,
      //     class_img: ''
      //   }
      // ]
    };
  },
  mounted() {},
  methods: {
    toClass(item) {
      this.$router.push({
        name: "course_info",
        params: { courseId: item.courseId }
      });
    }
  }
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(n) {
  background-color: #c0c8be;
  height: 400px;
  text-align: center;
}

.el-carousel {
  height: 400px;
  margin: 0 auto;
  border-radius: 14px;
}
</style>
