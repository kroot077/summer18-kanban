<template>
  <div class="board container-fluid">
    <div class="row d-flex justify-content-between">
      <div class="col-12">
        <h1>Welcome to {{boardName}}</h1>
      </div>
    <div class="col-12">
      <p>Board Description: {{boardDescription}}</p>
    </div>
    </div>
    <div class="row">
        <div class="col-12 mb-5 mt-1">
        <form @submit.prevent="addList" class="form-inline">
          <div class="form-group">
          <input type="text" v-model="name" placeholder="Make a List Here" class="form-control"/>
          <button class="btn btn-primary btn-round" type="submit">+</button>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div v-for="list in lists" :key="list._id" class="col-4 d-flex">
        <List :listId="list._id" :listName="list.name" :boardId="boardId" class="row"></List>  
      </div>
    </div>
    <footer class="row">
      <div class="col">
        <router-link :to="{name: 'boards'}">Back to Boards</router-link>
      </div>
      <div class="col">
          <button @click="logout" class="btn btn-danger mt-1 mb-2">log out</button>
      </div>
    </footer>
  </div>

</template>

<script>
import List from "@/components/List";

export default {
  name: "board",
  data() {
    return {
      name: ""
    };
  },
  created() {
    //blocks users not logged in
    if (!this.$store.state.user._id) {
      this.$router.push({ name: "login" });
    }
  },
  mounted() {
    return this.$store.dispatch("getLists", this.boardId);
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    addList() {
      let listData = { name: this.name, boardId: this.boardId };
      this.$store.dispatch("addList", listData);
    }
  },
  components: {
    List
  },
  props: ["boardId", "boardDescription", "boardName"]
};
</script>
<style>
  .btn-round{
    border-radius: 50%;
  }
</style>
