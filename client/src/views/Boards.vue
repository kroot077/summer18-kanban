<template>
  <div class="boards container-fluid">
    <div class="row d-flex justify-content-between bg-orange">
      <div class="col d-flex justify-content-end mb-5 mt-5">
        <h1>WELCOME A"BOARD"!</h1>
      </div>
      <div class="col mt-5">
        <button @click="logout" class="btn bg-red">log out</button>
      </div>
    </div>
    <div class="row bg-red">
      <div class="col-12 d-flex justify-content-around align-items-center mb-2 mt-3"> 
        <h2>Make A New Board Here ----------------></h2>
        <form @submit.prevent="addBoard" class="form-group">
          <input type="text" placeholder="Put Your Board Title Here" v-model="newBoard.title" required class="form-control mb-1 mt-1">
          <input type="text" placeholder="And Here's The Description" v-model="newBoard.description" class="form-control mb-1 mt-1">
          <button type="submit" class="btn btn-danger mb-1 mt-1">Create Board</button>
        </form>
      </div>
    </div>
    <div class="row mt-2 ht-all">
      <div v-for="board in boards" :key="board._id" class="col-3">
        <div class=" bg-blue mw-75 dark-blue mb">
          <h3>
          <router-link :to="{name: 'board', params: {boardId: board._id, boardName: board.title, boardDescription: board.description}}" class="p-2 dark-blue">{{board.title}}</router-link>
        </h3>
        <!-- <p>{{board.description}}</p> -->
        <button @click="deleteBoard(board._id)" class="btn bg-red mb-1 mt-1">X</button>
        </div>
      </div>
    </div>
    <footer class="row align-items-end white-font">
      <div class="col">
         <p>Copyright jshfajsgfjhdsgjhdsvl 2018</p>
      </div>
    </footer>
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
<style>

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
  font-family: primitive;
  color:white;
 background-color: #f87d42;
}
.bg-red{
  color:white;
 background-color: #db3951;
}
.white-font{
 color: white;
}
.dark-blue{
 color: #00136c;
}
.ma-w{
  max-width:50%;
}
</style>
