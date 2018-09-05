<template>
  <div>
    {{taskId}}
    <button @click="deleteTasks(taskId)">
      delete
    </button>
  </div>
</template>

<script>
export default {
  name: 'Task',
  methods: {
    deleteTasks(taskId) {
      this.$store.dispatch("deleteTasks", taskId)
    }
  },
  props: ["taskId"]
}
</script>

<style scoped>
</style>
