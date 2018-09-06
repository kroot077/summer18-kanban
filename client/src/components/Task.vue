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
    <div class="col-12">
      <form @submit.prevent="addComments" class="form-inline">
        <div class="form-group">
          <input type="text" placeholder="description" v-model="description" required class="form-control">
          <button type="submit" class="btn">+</button>
        </div>
      </form>
    </div>
    <div v-for="comment in comments" :key="comment._id" class="col-12 mt-2 mb-1">
      <Comment :commentId="comment._id" :commentDescription="comment.description" :taskId="taskId"></Comment>
    </div>
    <div class="col-12">
      <form>
        <select @change="moveTasks" v-model="newListId">
          <option value="moveto">Move to...</option>
            <option v-for="list in lists" :key="list._id" :value="list._id">{{list.name}}</option>
        </select>
      </form>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/Comment"

export default {
  name: "Task",
  data() {
    return {
      description: '',
      newListId: ''
    }
  },
  mounted() {
    return this.$store.dispatch('getComments', this.taskId)
  },
  computed: {
    comments() {
      return this.$store.state.comments[this.taskId]
    },
    lists() {
      return this.$store.state.lists
    }
  },
  methods: {
    deleteTasks() {
      let taskObject = {taskId: this.taskId, listId: this.listId}
      this.$store.dispatch("deleteTasks", taskObject)
    },
    moveTasks() {
      debugger
      let taskObject = {taskId: this.taskId, listId: this.newListId, taskName: this.taskName, taskDescription: this.taskDescription}
      this.$store.dispatch("changeTasks", taskObject)
    },
    addComments() {
      let commentData = {description: this.description, taskId: this.taskId}
      this.$store.dispatch("addComments", commentData)
    }
  },
  components: {
    Comment
  },
  props: ["taskId", "taskName", "taskDescription", "listId"]
};
</script>

<style scoped>
</style>
