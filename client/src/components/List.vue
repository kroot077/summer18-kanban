<template>
  <div>
    {{listId}}
    <button @click="deleteLists(listId)">
      delete
    </button>
    <form @submit.prevent="addTasks">
      <input type="text" placeholder="title" v-model="name" required>
      <input type="text" placeholder="description" v-model="description">
      <button type="submit">Create Task</button>
    </form>
      <div v-for="task in tasks" :key="task._id">
        <Task :taskId="task._id"></Task>
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
  props: ["listId"]
}
</script>

<style scoped>
</style>
