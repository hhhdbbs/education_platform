<template>
  <div>
    <el-row style="margin-top:30px" > 
      <el-col :span="20" style="background:white">
        <el-container>
          <el-main>
            <el-divider></el-divider>
                 <div v-show="one.length > 0">
              <h3>单选题</h3>
              <ul v-for="(item, index) in one" :key="index">
                <li>
                       <p>第{{ index + 1 }}题: {{ item.text }}
                      </p>
 
                  <el-radio-group
                    v-model="item.selected"
                   
                  >
                    <el-radio v-for="(select, ind) in item.choices" :key="ind" :label="select.name">{{ select.name }}</el-radio>
                  </el-radio-group>
                </li>
              </ul>
            </div>
            <div v-show="more.length > 0">
              <h3>多选题</h3>
              <ul v-for="(item, index) in more" :key="index">
                <li>
                   <p>第{{ index + 1 }}题: {{ item.text }}  
                 </p>
    
                  <el-checkbox-group
                    v-model="item.selected"
                    v-for="(select, ind) in item.selects"
                    :key="ind"
                  >
                    <el-checkbox :label="select.name">{{select.name}}</el-checkbox>
                  </el-checkbox-group>
                </li>
              </ul>
            </div>
            <div v-show="input.length > 0">
              <h3>填空题</h3>
              <ul v-for="(item, index) in input" :key="index">
                <li>
                    <p>第{{ index + 1 }}题: {{ item.text }} 
                    </p>
                       <el-input
                    placeholder="请输入内容"
                    v-model="item.answer" disabled
                  ></el-input>
                </li>
              </ul>
              <h3>主观题</h3>
              <ul v-for="(item, index) in textarea" :key="index">
                <li>
                    <p>第{{ index + 1 }}题: {{ item.text }} 
                   </p>
    
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="item.answer" 
                    disabled
                  ></el-input>
                </li>
              </ul>
            </div>
          </el-main>
        </el-container>
      </el-col>
      <el-col :span="4"><div class="grid-content "></div></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
            one:[ 
        { question_id:1,text:"提干",choices:[{name:"22",if_true:true}]},
      ],
      more: [
       { question_id:1,text:"提干",choices:[{name:"22",if_true:true}]},
         ],
      input: [
       { question_id:1,text:"提干",answer:"ss"},
         ],
      textarea: [
         { question_id:1,text:"提干",answer:"ss"},
        ]
    };
  }
  ,
  methods: {
    submit(){

    },
   
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

