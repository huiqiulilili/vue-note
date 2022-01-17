<template>
  <div id="app">
    <div id="root">
      <div class="todo-container">
        <div class="todo-wrap">
         <MyHeader @receive="addTodo"/>
<!--          <MyList :todos="todos" :checkTodo="checkTodo" :deleteTodo="deleteTodo"/>-->
          <MyList :todos="todos" />
         <MyFooter :todos="todos" @checkAllTodo = 'checkAllTodo' @clearAllTodo="clearAllTodo"/>
<!--          <button @click="getStudent">点击</button>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
import MyHeader from "./components/MyHeader";
import MyList from "./components/MyList";
import MyFooter from "./components/MyFooter";
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      todos:JSON.parse(localStorage.getItem("todos")) || []
      // todos:[
      //   {id:'001',title:'干饭',done:true},
      //   {id:'002',title:'睡觉',done:false},
      //   {id:'003',title:'喝酒',done:true},
      // ]
    }
  },
  methods:{
    // 添加一个todo
    addTodo(x) {
      console.log("App"+x);
      this.todos.unshift(x);
    },
    // 勾选or取消一个勾选
    checkTodo(id) {
      this.todos.forEach((todo)=>{
        if(todo.id === id) {
          todo.done = !todo.done
        }
      })
    },
    // 更新一个todo
    updateTodo(id,title) {
      this.todos.forEach((todo)=>{
        if(todo.id === id) {
          todo.title = title
        }
      })
    },
    // 删除一个todo
    // deleteTodo(id) {
    //   this.todos = this.todos.filter((todo)=>{
    //     return todo.id != id;
    //   })
    // },
    deleteTodo(_,id) {
      this.todos = this.todos.filter((todo)=>{
        return todo.id != id;
      })
    },
    // 全选or取消全选
    checkAllTodo(done) {
         this.todos.forEach((todo)=>{
            todo.done = done
        })
    },
    // 清除所有已经完成的todo
    clearAllTodo() {
      this.todos = this.todos.filter((todo)=>{
        return !todo.done
      })
    },

    // /////////////////////////////////////////////////////////////////
    // 获取学会信息
    // getStudent() {
    //   axios.get('http://localhost:8080/lyx/students').then(res=>{
    //     console.log(res.data);
    //   }).catch(res=>{
    //   })
    // }
  },
  components: {MyHeader,MyList,MyFooter},
  watch:{
    todos:{
      deep:true,
      handler(value) {
        localStorage.setItem('todos',JSON.stringify(value))
      }
    }
  },
  mounted() {
    this.$bus.$on('checkTodo',this.checkTodo)
    this.$bus.$on('updateTodo',this.updateTodo)
    // this.$bus.$on('deleteTodo',this.deleteTodo)
    this.pubId = pubsub.subscribe('deleteTodo',this.deleteTodo)

  },

  // 解绑
  beforeDestroy() {
    this.$bus.$off('checkTodo')
    this.$bus.$off('updateTodo')
    // this.$bus.$off('deleteTodo')
    pubsub.unsubscribe(this.pubId)
  }
}
</script>

<style>
body {
  background: #fff;
}
.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}



</style>
