<template>
  <div>
    <el-row style="margin-top:30px">
      <el-col :span="5"><div class="grid-content "></div></el-col>
      <el-col :span="14" style="background:white">
        <el-container>
          <el-main>
            <h1 style="text-align:left">{{ kecheng }}{{ xiaojie }}习题</h1>
            <el-divider></el-divider>
            <div v-show="one.length > 0">
              <h3>单选题</h3>
              <ul v-for="(item, index) in one" :key="index">
                <li>
                  <p>第{{ index + 1 }}题: {{ item.title }}</p>
                  <el-radio-group
                    v-model="item.selected"
                    v-for="(select, ind) in item.selects"
                    :key="ind"
                  >
                    <el-radio :label="ind">{{ select }}</el-radio>
                  </el-radio-group>
                </li>
              </ul>
            </div>
            <div v-show="more.length > 0">
              <h3>多选题</h3>
              <ul v-for="(item, index) in more" :key="index">
                <li>
                  <p>第{{ index + 1 }}题: {{ item.title }}</p>
                  <el-checkbox-group
                    v-model="item.selected"
                    v-for="(select, ind) in item.selects"
                    :key="ind"
                  >
                    <el-checkbox :label="select"></el-checkbox>
                  </el-checkbox-group>
                </li>
              </ul>
            </div>
            <div v-show="input.length > 0">
              <h3>填空题</h3>
              <ul v-for="(item, index) in input" :key="index">
                <li>
                  <span>第{{ index + 1 }}题: {{ item.title }}</span>
                  <el-input
                    placeholder="请输入内容"
                    v-model="item.input"
                    clearable
                  ></el-input>
                </li>
              </ul>
              <h3>主观题</h3>
              <ul v-for="(item, index) in textarea" :key="index">
                <li>
                  <span>第{{ index + 1 }}题: {{ item.title }}</span>
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="item.textarea"
                    clearable
                  ></el-input>
                </li>
              </ul>
            </div>
            <div class="center-children">
              <el-button type="primary"
                >&nbsp;&nbsp;&nbsp;&nbsp; 提交
                &nbsp;&nbsp;&nbsp;&nbsp;</el-button
              >
            </div>
          </el-main>
        </el-container>
      </el-col>
      <el-col :span="5"><div class="grid-content "></div></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      kecheng: "数据库",
      xiaojie: "1.1：算法",
      one: [
        { title: "你最喜欢", selects: ["红色", "蓝色", "黄色"], selected: "" },
        { title: "你最喜欢", selects: ["红色", "蓝色", "黄色"], selected: "" }
      ],
      more: [
        { title: "你喜欢", selected: [], selects: ["红色", "蓝色", "黄色"] },
        { title: "你喜欢", selected: [], selects: ["红色", "蓝色", "黄色"] }
      ],
      input: [
        { title: "你喜欢", input: "" },
        { title: "你喜欢", input: "" }
      ],
      textarea: [
        { title: "你喜欢", textarea: "hgjh" },
        { title: "你喜欢", textarea: "" }
      ]
    };
  },
  methods: {
    easy() {},
    middle() {},
    hard() {}
  }
};
</script>
<style>
li {
  list-style: none;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
}
.center-children {
  text-align: center;
}
</style>
