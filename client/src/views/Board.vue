<template>
  <div class="board container-fluid">
    <div class="row d-flex justify-content-between bg-orange">
      <div class="col-12">
        <h1>Welcome to {{boardName}}</h1>
      </div>
    <div class="col-12">
      <p>Board Description: {{boardDescription}}</p>
    </div>
    </div>
    <div class="row d-flex justify-content-center bg-red">
        <div class="col-3 mb-5 mt-5">
        <form @submit.prevent="addList" class="form-inline">
          <div class="form-group">
          <input type="text" v-model="name" placeholder="Make a List Here" class="form-control"/>
          <button class="btn bg-orange btn-round" type="submit"><i class="fas fa-plus"></i></button>
          </div>
        </form>
      </div>
    </div>
    <div class="row d-flex justify-content-center bg-image">
      <div v-for="list in lists" :key="list._id" class="col-4 d-flex mt-2 mb-2 mx-1">
        <List :listId="list._id" :listName="list.name" :boardId="boardId" class="row bg-blue"></List>  
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
.bg-image{
   background-image:url('../../public/assets-public/Image018.png');
    background-position:center;
    background-size: cover;
    background-repeat:no-repeat;
    background-attachment:fixed;
    height:100%;
}
  .ht-all{
  height:50vh;
}
@font-face {
    font-family: primitive;
    src: url("../assets/Primitive.ttf");
}
.board{
  font-family:primitive;
}
.bg-orange{
  font-family: primitive;
  color:white;
 background-color: #f87d42;
}
.ma-w{
  max-width:95%;
}
.bg-red{
  color:white;
 background-color: #db3951;
}
.bg-dark-blue{
 background-color: #00136c;
}
</style>
