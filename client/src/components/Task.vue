<template>
  <div class="task row mt-1 mb-1">
    <div class="col-6 mt-2 mb-1">
      <h3>{{taskName}}</h3>
    </div>
    <div class="col-6 mt-2 mb-1">
      <button @click="deleteTasks(taskId)">
        X
      </button>
    </div>
    <div class="col-12">
      <p>{{taskDescription}}</p>
    </div>
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
  props: ["taskId", "taskName", "taskDescription"]
}
</script>

<style scoped>
</style>
