<template>
  <div class="list">
    <div class="col-12">
      <div class="row">
        <div class="col-6 mt-2 d-flex justify-content-start"> 
      <h1>{{listName}}</h1>
    </div>
    <div class="col-2 offset-4 mt-2">
      <button @click="deleteLists()" class="btn btn-round btn-red">X</button>
    </div>
    <div class="col-12 d-flex justify-content-center align-items-start mb-2 mt-2 ma-w mx-auto">
    <form @submit.prevent="addTasks" class="form-inline row">
        <input type="text" placeholder="title" v-model="name" required class="form-control col-5">
          <input type="text" placeholder="description" v-model="description" class="form-control col-5">
          <button type="submit" class="col-2 btn bg-orange"><i class="fas fa-plus"></i></button>
      </form>
    </div>
      </div>
    </div>
    
    <div v-for="task in tasks" :key="task._id" class="col-12 mt-2 mb-3 bg-orange ma-w mx-auto">
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
  .btn-round{
    border-radius: 50%;
  }
  .ht-all{
  height:50vh;
}
.bg-blue{
  background-color: rgba(193, 240, 254, 0.8);
}
@font-face {
    font-family: primitive;
    src: url("../assets/Primitive.ttf");
}
.boards{
  font-family:primitive;
}
.bg-orange{
  border-radius:10px;
  font-family: primitive;
  color:white;
 background-color: #fc9a6d;
}
.bg-red{
  color:white;
 background-color: #db3951;
}
.bg-dark-blue{
 background-color: #00136c;
}
.ma-w{
  max-width:95%;
}
</style>