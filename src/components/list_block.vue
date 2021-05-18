<template>
  <div>
    <div style="text-align: center">
      <h3>{{ title }}</h3>
    </div>
    <el-divider></el-divider>
    <div style="text-align: center; height: 350px;">
      <div
        v-for="(item, index) in list"
        :key="index"
        @click="click_item(item)"
        style="line-height: 30px;"
      >
        <el-button
          type="text"
          style="color: black; font-size: medium; padding: 0"
        >
          <span>{{ item.title ? item.title : item.name }}</span></el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "标题"
    },
    type: {
      type: String,
      default: "list"
    },
    uid: {
      type: Number,
      default: 0
    },
    list: {
      type: Array
    }
  },
  data() {
    return {
      s_title: "b",
      c_title: "a"
    };
  },
  methods: {
    click_item(item) {
      if (this.type == "subject") {
        this.$router.push({ name: "allClass", query: { subject_id: item.id } });
      } else if (this.type == "course") {
        this.$router.push({
          name: "course_info",
          params: { courseId: item.id }
        });
      }
    }
  }
};
</script>

<style scoped>
.list_block ul {
  padding: 0 5px;
  margin: 5px 0 0;
  line-height: 2em;
}

.list_block li {
  list-style: none;
  text-align: left;
  font-size: 15px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  height: 32px;
}

.list_block li:hover {
  color: hsl(1, 69%, 69%);
}

.icon-eye-close {
  margin-left: 0.6em;
}

.list_block > div {
  width: 100%;
  text-align: center;
  float: left;
  cursor: pointer;
}

.list_block .data_num {
  font-size: 35px;
  font-weight: bold;
}

.el-divider {
  margin: 3px 0 10px;
}

.iconfont {
  font-size: 110%;
}
</style>
