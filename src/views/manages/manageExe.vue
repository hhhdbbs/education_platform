<template>
  <div class="custom-tree-container">
    <div class="block">
      <div style="margin:25px 0px;">
        搜索：<el-input class="tree-input"
          placeholder="输入关键字进行过滤"
          v-model="filterText">
        </el-input>
        <span style="float: right">
        <el-button type="warning" @click="setCheckedNodes">全选</el-button>
        <el-button type="primary" @click="resetChecked">全不选</el-button>
        <el-button type="danger" @click="getCheckedNodes">批量删除</el-button></span>
      </div>
      <el-tree class="my-tree"
        :data="data"
        show-checkbox
        node-key="id"
        :filter-node-method="filterNode"
        ref="tree"
   
        >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-tooltip class="item" effect="dark" content="查看" placement="top">
              <el-button
              v-show="data.show_name"
                icon="el-icon-search"
                circle
                @click="seeAll(node, data)">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="新添习题" placement="top">
              <el-button
              v-show="data.show_edit"
                icon="el-icon-edit"
                circle
                @click="edit(node, data)">
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button
              v-show="data.show_del"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="() => remove(node, data)">
              </el-button>
            </el-tooltip>
          </span>
        </span>
      </el-tree>
    </div>
     <el-dialog>
         <el-dialog title="登陆" :visible.sync="dialog" center :append-to-body='true' :lock-scroll="false" width="30%">
           <p>sada</p> 
      </el-dialog>       
     </el-dialog>
  </div>
</template> 

<script>
  export default {
    name: 'manageExe',

    data() {
      const data = [{
          id: 20,
          label: '课程1-1',
        show_name:true,
        show_del:false,
           children: [
           {
          id: 20, 
          label: '课前习题',
          is_exer:true,
        show_name:true,
        show_del:false,
        },
    {
          id: 4, 
          label: '课时 1-1',
        show_name:true,
        show_edit:true,
        show_del:false,
          children: [{
            id: 9,
            label: '一般习题 1-1-1',
        show_name:true,
        show_del:true,
          },
          {
            id: 12,
            label: '一般习题 1-1-1',
        show_name:true,
        show_del:true,
          }]
        }
      ]
     }];
      return {
        courseId:0,
        classId:0, 
        type:-1,
        filterText: '',
        data: JSON.parse(JSON.stringify(data)),
        leaf_prop:{
          label: 'name',
          id: 'id',
          isLeaf:'leaf'
        },
        id: 0,
        dialog:false
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    mounted(){
    this.$axios.post('',
     {
        id:0
      },
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then(res=>{
          if(res.status==200){
            console.log(res);
            for(var i=0;i<res.data.courses.length;i++){
              var dd=res.data.courses[i]
              var course={id:dd.id,
              label:dd.course,
               show_name:true,
              show_del:false,
              children:[
                  {
          id: dd.pre_exercise, 
          label: '课前习题',
          is_exer:true,
        show_name:true,
        show_del:false,
        },
              ]
              }
              for(var j=0;j<dd.classes.length;j++){
                var cla=dd.classes[j]
                course.children.push(
  {
          id: cla.id, 
          label: cla.class_name,
        show_name:true,
        show_edit:true,
        show_del:false,
          children: [{
            id: cla.exercise_id,
            label: '一般习题',
        show_name:true,
        show_del:true,
          },
          {
            id: cla.exercise_easy_id,
            label: '简单习题',
        show_name:true,
        show_del:true,
          },
          {
            id: cla.exercise_middle_id,
            label: '困难习题',
        show_name:true,
        show_del:true,
          }
          ,
          {
            id: cla.exercise_hard_id,
            label: '简单习题',
        show_name:true,
        show_del:true,
          }]
        }

                )
              }
              this.data.data.push(course)
            }
            }
        })
  
  },
    methods: {
      loadNode(node, resolve){
        if(node.level == 0){//在这里请求课程
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
        else if(node.level == 1){//在这里请求课时
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
        if(node.level ==1){//查看课程
          console.log('edit course'+data.id)
          this.$router.push({name: 'course_info', params: {courseId: data.id}})
        }
        else if(node.level == 2&&!(data.is_exer==true)){//查看课时
          console.log('edit single class => pop up dialogue for user to edit'+data.id)
          //这里需要请求课程详细信息，或许懒加载时已请求
          this.$router.push({name: 'classView', params: {courseId: node.parent.data.id, classId: data.id,
            userId: localStorage.getItem('userId'), video_ids: [], courseName:data.courseName}})
        }
        else{ 
           this.$router.push({
        path:"/manage/adminViewExe/"+data.id}) 
       }
      },
      edit(node, data){
        this.dialog=true
        this.aa=node,//
        this.aa=data/////
      },
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        var that=this
    this.$axios({
      url:"exericse/del_exercise",
      method:"post",
      data:{
        exercise_id:data.id
        }
        }).then(res=>{
          if(res.status==200){
            console.log(res);
            if(res.data.status==0) 
            children.splice(index, 1);
            else
            that.$message("删除失败")
            }
            })
       
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },
      setCheckedNodes() {
        this.$refs.tree.setCheckedNodes(this.data);
      },
      getCheckedNodes() {
        let datas = this.$refs.tree.getCheckedNodes()
        datas.forEach(i =>{
          let node = this.$refs.tree.getNode(i)
          if(node.isLeaf&&node.level==4) 
          this.remove(node, node.data)
        })
        this.resetChecked()
      },
      changeVisible(val){
        this.dialog = val
      }
     
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
