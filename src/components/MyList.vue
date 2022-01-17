<template>
  <div>
    <!--问题来了：父组件的值怎么传递给子组件-->
    <ul class="todo-main">
      <MyItem
        v-for="(todoObj,index) in todos"
        :key="todoObj.id"
        :todo="todoObj"

      />
<!--      :checkTodo="checkTodo"-->
<!--      :deleteTodo="deleteTodo"-->
    </ul>
  </div>
</template>

<script>
import MyItem from "./MyItem";

export default {
  name: "MyList",
  components:{MyItem},
  // props:['todos','checkTodo','deleteTodo'],
  props:['todos'],
  methods:{

  }
}
</script>

<style scoped>

/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>


