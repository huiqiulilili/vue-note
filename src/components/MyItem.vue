<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" @click="handleCheck(todo.id)"/>
      <span v-show="!todo.isEdit">{{ todo.title }}</span>
      <input type="text"
             :value="todo.title"
             v-show="todo.isEdit"
             @blur="handlerBlur(todo,$event)"
             ref="inputTitle"
      >
    </label>
    <button class="btn btn-danger" @click="handlerDelete(todo.id)">删除</button>
    <button class="btn btn-edit" @click="handlerEdit(todo)" v-show="!todo.isEdit" >编辑</button>

  </li>
</template>

<script>
import pubsub from 'pubsub-js'

export default {
  name: "MyItem",
  // 接收父组件传来的值
  // props:['todo','checkTodo','deleteTodo'],
  props:['todo'],
  methods:{
    // 勾选or取消勾选
    handleCheck(id) {
      // 通知App组件将对应的todo对象的done取反
      // this.checkTodo(id);
      this.$bus.$emit('checkTodo',id);
    },
    // 删除
    handlerDelete(id) {
      if(confirm("确定删除吗？")) {
        // console.log(id);
        // this.deleteTodo(id);
        // this.$bus.$emit('deleteTodo',id);
        pubsub.publish('deleteTodo',id);
      }
    },
    // 编辑
    handlerEdit(todo) {

      if (!todo.hasOwnProperty('isEdit')) {
        this.$set(todo,'isEdit',true)
      }else {
        todo.isEdit = true;
      }
      // this.$refs.inputTitle.focus(); // 不起作用
      this.$nextTick(function () {
        this.$refs.inputTitle.focus();
      })
    },
    // 编辑框失去焦点，回调，真正修改逻辑
    handlerBlur(todo,e) {
      if (!e.target.value.trim()) {
        return alert("输入不能为空！")
      }
      this.$bus.$emit('updateTodo',todo.id,e.target.value);
      todo.isEdit = false;
    }
  }
}
</script>

<style scoped>

/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover{
  background-color: #ddd;
}

li:hover button{
  display: block;
}

</style>
