<template>
  <div class="list">
    <div class="col-6 mt-2"> 
      <h1>{{listName}}</h1>
    </div>
    <div class="col-6 mt-2">
      <button @click="deleteLists()" class="btn btn-round btn-red">X</button>
    </div>
    <div class="col-12 d-flex justify-content-center align-items-start mb-2 mt-2">
    <form @submit.prevent="addTasks" class="form-inline row">
        <input type="text" placeholder="title" v-model="name" required class="form-control col-5">
          <input type="text" placeholder="description" v-model="description" class="form-control col-5">
          <button type="submit" class="col-2 btn">+</button>
      </form>
    </div>
    <div v-for="task in tasks" :key="task._id" class="col-12 mt-2 mb-2">
      <Task :taskId="task._id" :taskName="task.name" :taskDescription="task.description" :listId="listId"></Task>
    </div>
  </div>
</template>

<script>
import Task from '@/components/Task'

export default {
  name: 'List',
  data() {
    return {
      name: '',
      description: ''
    }
  },
  mounted() {
    return this.$store.dispatch('getTasks', this.listId)
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.listId]
    }
  },
  methods: {
    deleteLists() {
      let listObject = {listId: this.listId, boardId: this.boardId}
      this.$store.dispatch("deleteLists", listObject)
    },
    addTasks() {
      let taskData = {name: this.name, description: this.description, listId: this.listId}
      this.$store.dispatch("addTasks", taskData)
    }
  },
  components: {
    Task
  },
  props: ["listId", "listName", "boardId"]
}
</script>

<style scoped>
.btn-red{
  border-radius:50%;
  color: white;
  background-color:rgb(236, 67, 67);
}
.list {
  border: 2px solid black;
}
  .btn-round{
    border-radius: 50%;
  }
</style>