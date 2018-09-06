<template>
    <div class="comment row mt-1 mb-1">
        <div class="col-12 mt-2 mb-1">
            <p>{{commentDescription}}</p>
        </div>
        <div class="col-12 mt-2 mb-1">
        <button @click="deleteComments()">X</button>
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

</style>
