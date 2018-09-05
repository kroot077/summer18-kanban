<template>
  <div class="list">
    <div class="col-6 mt-2 mb-1">
      <h1>{{listName}}</h1>
    </div>
    <div class="col-6 mt-2 mb-1">
      <button @click="deleteLists(listId)" class="btn">X</button>
    </div>
    <div class="col-12">
      <form @submit.prevent="addTasks" class="form-inline">
        <div class="form-group row">
          <input type="text" placeholder="title" v-model="name" required class="form-control col-3">
          <input type="text" placeholder="description" v-model="description" class="form-control col-3">
          <button type="submit" class="col-1 btn">+</button>
        </div>
      </form>
    </div>
    <div v-for="task in tasks" :key="task._id" class="col-12 p-2">
      <Task :taskId="task._id" :taskName="task.name" :taskDescription="task.description"></Task>
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
  methods: {
    deleteLists(listId) {
      this.$store.dispatch("deleteLists", listId)
    },
    addTasks() {
      let taskData = {name: this.name, description: this.description, listId: this.listId}
      this.$store.dispatch("addTasks", taskData)
    }
  },
  mounted() {
    return this.$store.dispatch('getTasks')
  },
  computed: {
    tasks() {
      return this.$store.state.tasks
    }
  },
  components: {
    Task
  },
  props: ["listId", "listName"]
}
</script>

<style scoped>
.list {
  border: 2px solid black;
}
</style>