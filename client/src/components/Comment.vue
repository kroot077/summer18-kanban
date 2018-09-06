<template>
    <div class="comment row mt-1 mb-1 d-flex justify-content-between">
        <div class="col-6 mt-2 mb-1 d-flex align-items-center">
            <p>{{commentDescription}}</p>
        </div>
        <div class="col-2 mt-2 mb-1">
        <button @click="deleteComments()" class="btn btn-round bg-orange small-size">X</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Comment',
    mounted() {
        return this.$store.dispatch('getComments', this.taskId)
    },
    methods: {
        deleteComments() {
            let commentObject = {commentId: this.commentId, taskId: this.taskId}
            this.$store.dispatch("deleteComments", commentObject)
        }
    },
    props: ["commentId", "commentDescription", "taskId"]
}
</script>

<style>

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
.small-size{
    font-size:10px;
}
</style>
