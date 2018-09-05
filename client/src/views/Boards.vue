<template>
  <div class="boards container">
    <div class="row">
      <div class="col">
        <h1>Welcome to Your Boards!</h1>
      </div>
      <div class="col">
        <button @click="logout" class="btn mt-1 mb-2">log out</button>
      </div>
    </div>
    <div class="row">
      <div class="col-12 d-flex justify-content-center"> 
        <form @submit.prevent="addBoard" class="form-group">
          <label for="title">Make a New Board</label>
          <input type="text" placeholder="title" v-model="newBoard.title" required class="form-control mb-1 mt-1">
          <input type="text" placeholder="description" v-model="newBoard.description" class="form-control mb-1 mt-1">
          <button type="submit" class="btn mb-1 mt-1">Create Board</button>
        </form>
      </div>
    </div>
    <div class="row">
      <div v-for="board in boards" :key="board._id" class="col-12">
        <h3>
          <router-link :to="{name: 'board', params: {boardId: board._id, boardName: board.title, boardDescription: board.description}}" class="p-2">{{board.title}}</router-link>
          <button @click="deleteBoard(board._id)" class="btn mb-1 mt-1">X</button>
        </h3>
      </div>
    </div>
  </div>
</template>

<script>

import List from '@/components/List'

export default {
  name: "boards",
  created() {
    //blocks users not logged in
    if (!this.$store.state.user._id) {
      this.$router.push({ name: "login" });
    }
  },
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    }
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    },
    deleteBoard(boardId) {
      this.$store.dispatch("deleteBoard", boardId);
    },
    logout(){
      this.$store.dispatch("logout")
    }
  },
  components: {
    List
  }
};
</script>