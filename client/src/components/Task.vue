<template>
  <div class="task row mt-1 mb-1">
    <div class="col-6 mt-2 mb-1 d-flex justify-content-start">
      <h3>{{taskName}}</h3>
    </div>
    <div class="col-2 offset-4 mt-2">
      <button @click="deleteTasks()" class="btn btn-red">X</button>
    </div>
    <div class="col-12">
      <p>{{taskDescription}}</p>
    </div>
    <div class="col-12 d-flex justify-content-center">
      <form @submit.prevent="addComments" class="form-inline">
        <div class="form-group">
          <input type="text" placeholder="Comment Here!" v-model="description" required class="form-control">
          <button type="submit" class="btn bg-blue"><i class="fas fa-plus"></i></button>
        </div>
      </form>
    </div>
    <div v-for="comment in comments" :key="comment._id" class="col-12 mt-2 mb-1 bg-red mx-auto ma-w">
      <Comment :commentId="comment._id" :commentDescription="comment.description" :taskId="taskId"></Comment>
    </div>
    <div class="col-12 mb-2 mt-2 d-flex justify-content-around">
      <p>Move To...</p>
      <form>
        <select @change="moveTasks" v-model="newListId">
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
      let newData = {taskId: this.taskId, listId: this.newListId, taskName: this.taskName, taskDescription: this.taskDescription}
      this.$store.dispatch("changeTasks", {newData, oldId: this.listId})
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

  .btn-round{
    border-radius: 50%;
  }
  .btn-red{
  border-radius:50%;
  color: white;
  background-color:rgb(236, 67, 67);
}
.ht-all{
  height:50vh;
}
.bg-blue{
  background-color: #c3f1ff;
}
@font-face {
    font-family: primitive;
    src: url("../assets/Primitive.ttf");
}
.ma-w{
  max-width:80%;
  border-radius:10px;
}
.boards{
  font-family:primitive;
}
.bg-orange{
  font-family: primitive;
  color:white;
 background-color: #f87d42;
}
.bg-red{
  color:white;
 background-color: #db3951;
}
.bg-dark-blue{
 background-color: #00136c;
}
</style>
