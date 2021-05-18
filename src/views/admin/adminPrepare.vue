<template>
  <div class="custom-tree-container">
    <div class="block">
      <div style="margin:25px 0px;">
        搜索：<el-input class="tree-input"
          placeholder="输入关键字进行过滤"
          v-model="filterText">
        </el-input>
        <span style="float: right">
        <el-button type="primary" @click="resetChecked">全不选</el-button>
        <el-button type="danger" @click="getCheckedNodes(2)">批量通过</el-button>
        <el-button type="danger" @click="getCheckedNodes(1)">批量拒绝</el-button></span><!--这里可以改成通过和不通过-->
      </div>
      <el-tree class="my-tree"
        :data="data"
        show-checkbox
        :expand-on-click-node="false"
        node-key="id"
        :filter-node-method="filterNode"
        :check-strictly="true"
        ref="tree">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-tooltip class="item" effect="dark" content="查看" placement="top">
              <el-button
                icon="el-icon-search"
                circle
                v-if="node.level === 2"
                @click="seeAll(node, data)">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="通过" placement="top">
              <el-button
                icon="el-icon-edit"
                circle
                v-if="node.level === 2"
                type="success"
                @click="editAll(node, data)">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="拒绝" placement="top">
              <el-button
              type="danger"
              icon="el-icon-delete"
              circle
                v-if="node.level === 2"
              @click="() => remove(node, data)">
              </el-button>
            </el-tooltip>
          </span>
        </span>
      </el-tree>
    </div>
    <view-file :dialog="dialog" @changeVisible="changeVisible"></view-file>
  </div>
</template>

<script>
  import viewFile from "../../components/viewFile";
  export default {
    name: 'adminPrepare',
    data() {
      const data = [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }];
      return {
        filterText: '',
        data: JSON.parse(JSON.stringify(data)),
        leaf_prop:{
          label: 'name',
          id: 'id',
          isLeaf:'leaf'
        },
        id: 0,
        dialog: false
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      loadNode(node, resolve){
        if(node.level == 0){//在这里请求教师
          this.$axios.post('/course/list', {author_id: localStorage.getItem('userId')}).then(res=>{
            if(res.status == 200){
              let treeData = []
              res.data.course.forEach(i =>{
                treeData.push({
                  name: i.name,
                  id: i.id,
                  leaf: false
                })
                this.id = i.id
              })
              this.id += 1
              return resolve(treeData)
            }
          }).catch(e => {this.$message({message:e, type: 'error'})})
          //return resolve([{label: this.data[0].label}, {label: this.data[1].label}, {label:this.data[2].label}])
        }
        else if(node.level == 1){//在这里请求备课文件
          this.$axios.get('/course/info', {params:{id: node.data.id}}).then(res=>{
            if(res.status == 200){
              let sonData = []
              res.data.className.forEach(i =>{
                sonData.push({
                  id: this.id++,
                  name: i,
                  courseName: res.data.name,
                  video_ids:res.data.video_ids,
                  leaf: true
                })
              })
              return resolve(sonData)
            }
          }).catch(e => {this.$message({message:e, type: 'error'})})
        }
      },
      seeAll(node, data){
        if(node.level == 2){//查看文件详情
          console.log('edit single class => pop up dialogue for user to edit',data.id)
          //这里需要请求课程详细信息，或许懒加载时已请求
          this.dialog = true
        }
      },
      editAll(node, data){
        if(node.level == 2){//通过文件
          console.log('pass',data.id)
        }
      },
      remove(node, data) {//不通过文件
        if(node.level == 2){//通过文件
          console.log('not pass',data.id)
        }
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      resetChecked(){
        this.$refs.tree.setCheckedKeys([]);
      },
      getCheckedNodes(op) {
        let datas = this.$refs.tree.getCheckedNodes()
        datas.forEach(i =>{
          let node = this.$refs.tree.getNode(i)
          if(op === 1){
            this.remove(node, node.data)
          } else if (op === 2){
            this.editAll(node, node.data)
          }
        })
        this.resetChecked()
      },
      changeVisible(val){
        this.dialog = val
      }
    },
    components:{
      viewFile
    }
  };
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    padding-right: 8px;
  }
  div.block{
    margin-right: 16.7%;
  }

  .my-tree .el-tree-node__content {
    display: flex;
    align-items: center;
    height: 50px;
    cursor: pointer;
  }
  .tree-input{
    width: 30%;
  }
</style>
