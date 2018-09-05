<template>
  <div class="board">
    <form @submit.prevent="addList">
      <input type="text" v-model="name"/>
      <button type="submit"></button>
    </form>
    {{boardId}}
      <div v-for="list in lists" :key="list._id">
        <List :listId="list._id"></List>  
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
  props: ["boardId"]
};
</script>