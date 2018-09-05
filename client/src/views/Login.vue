<template>
  <div class="login container">
    <div class="row">
      <div class="col">
        <h1>KANBAN</h1>
      </div>
    </div>
    <div class="row">
      <form v-if="loginForm" @submit.prevent="loginUser" class="col-12 d-flex justify-content-center">
        <div class="form-group">
          <input type="email" v-model="creds.email" placeholder="email" class="form-control mb-1 mt-1">
          <input type="password" v-model="creds.password" placeholder="password" class="form-control mb-1 mt-1">
          <button type="submit" class="btn mb-1 mt-1">Login</button>
        </div>
      </form>
      <form v-else @submit.prevent="register" class="col-12 d-flex justify-content-center">
        <div class="form-group">
          <input type="text" v-model="newUser.name" placeholder="name" class="form-control mb-1 mt-1">
          <input type="email" v-model="newUser.email" placeholder="email" class="form-control mb-1 mt-1">
          <input type="password" v-model="newUser.password" placeholder="password" class="form-control mb-1 mt-1">
          <button type="submit" class="btn mb-1 mt-1">Create Account</button>
        </div>
      </form>
      <div @click="loginForm = !loginForm" class="col-12">
        <p v-if="loginForm">No account? Click here to Register</p>
        <p v-else>Already have an account? Click here to Login</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: true,
      creds: {
        email: "",
        password: ""
      },
      newUser: {
        email: "",
        password: "",
        name: ""
      }
    };
  },
  methods: {
    register() {
      this.$store.dispatch("register", this.newUser);
    },
    loginUser() {
      this.$store.dispatch("login", this.creds);
    }
  }
};
</script>