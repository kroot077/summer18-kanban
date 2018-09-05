<template>
  <div class="board container">
    <div class="row">
      <div class="col-12 d-flex justify-content-center">
        <h1>Welcome to {{boardName}}</h1>
      </div>
      <div class="col-12 d-flex justify-content-center">
        <form @submit.prevent="addList">
          <input type="text" v-model="name"/>
          <button type="submit">+</button>
        </form>
      </div>
    </div>
    <div class="row">
      <div v-for="list in lists" :key="list._id" class="col-4 d-flex justify-content-center">
        <List :listId="list._id" :listName="list.name" class="row"></List>  
      </div>
    </div>
  </div>

</template>

<script>
import List from '@/components/List'

export default {
  name: "board",
  data() {
    return {
      name: ''
    }
  },
  created() {
    //blocks users not logged in
    if (!this.$store.state.user._id) {
      this.$router.push({ name: "login" });
    }
  },
  mounted() {
    return this.$store.dispatch('getLists')
  },
  computed: {
    lists() {
      return this.$store.state.lists
    }
  },
  methods: {
    addList() {
      let listData = {name: this.name, boardId: this.boardId}
      this.$store.dispatch('addList', listData)
    }
  },
  components: {
    List
  },
  props: ["boardId", "boardDescription", "boardName"]
};
</script>