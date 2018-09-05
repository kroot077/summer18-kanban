<template>
  <div class="task row mt-1 mb-1">
    <div class="col-6 mt-2 mb-1">
      <h3>{{taskName}}</h3>
    </div>
    <div class="col-6 mt-2 mb-1">
      <button @click="deleteTasks()">X</button>
    </div>
    <div class="col-12">
      <p>{{taskDescription}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  methods: {
    deleteTasks() {
      let taskObject = { taskId: this.taskId, listId: this.listId };
      this.$store.dispatch("deleteTasks", taskObject);
    }
  },
  props: ["taskId", "taskName", "taskDescription", "listId"]
};
</script>

<style scoped>
</style>
