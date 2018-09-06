import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "./router";

Vue.use(Vuex);

let auth = Axios.create({
  baseURL: "//localhost:3000/auth/",
  timeout: 3000,
  withCredentials: true
});

let api = Axios.create({
  baseURL: "//localhost:3000/api/",
  timeout: 3000,
  withCredentials: true
});

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    lists: [],
    tasks: {},
    comments: {},
    activeBoard: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setBoards(state, boards) {
      state.boards = boards;
    },
    setLists(state, lists) {
      state.lists = lists;
    },
    setTasks(state, data) {
      // state.tasks[data.listId] = data.tasks
      //we use vue set because the tasks object is not watched deeply(this applies a watcher to the key so computeds work)
      Vue.set(state.tasks, data.listId, data.tasks);
    },
    setComments(state, data) {
      Vue.set(state.comments, data.taskId, data.comments);
    },
    clearUser(state) {
      state.user = {};
    }
  },
  actions: {
    //AUTH STUFF
    register({ commit, dispatch }, newUser) {
      auth.post("register", newUser).then(res => {
        commit("setUser", res.data);
        router.push({ name: "boards" });
      });
    },
    authenticate({ commit, dispatch }) {
      auth.get("authenticate").then(res => {
        commit("setUser", res.data);
        router.push({ name: "boards" });
      });
    },
    login({ commit, dispatch }, creds) {
      auth.post("login", creds).then(res => {
        commit("setUser", res.data);
        router.push({ name: "boards" });
      });
    },
    logout({ commit, dispatch }) {
      auth.delete("logout").then(() => {
        commit("clearUser");
        router.push({ name: "login" });
      });
    },

    //BOARDS
    getBoards({ commit, dispatch }) {
      api.get("boards").then(res => {
        commit("setBoards", res.data);
      });
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post("boards", boardData).then(serverBoard => {
        dispatch("getBoards");
      });
    },
    deleteBoard({ commit, dispatch }, boardId) {
      api.delete("boards/" + boardId).then(res => {
        dispatch("getBoards");
      });
    },

    //LISTS
    getLists({ commit, dispatch }, boardId) {
      api.get("list/" + boardId).then(res => {
        commit("setLists", res.data);
      });
    },
    addList({ commit, dispatch }, listData) {
      api.post("list/", listData).then(res => {
        dispatch("getLists", listData.boardId);
      });
    },
    deleteLists({ commit, dispatch }, listObject) {
      api.delete("list/" + listObject.listId).then(res => {
        dispatch("getLists", listObject.boardId);
      });
    },

    //TASKS
    getTasks({ commit, dispatch }, listId) {
      api.get("task/" + listId).then(res => {
        commit("setTasks", { listId, tasks: res.data });
      });
    },
    addTasks({ commit, dispatch }, taskData) {
      api.post("task/", taskData).then(res => {
        dispatch("getTasks", taskData.listId);
      });
    },
    deleteTasks({ commit, dispatch }, taskObject) {
      api.delete("task/" + taskObject.taskId).then(res => {
        dispatch("getTasks", taskObject.listId);
      });
    },
    changeTasks({ commit, dispatch }, payload) {
      api.put("task/" + payload.newData.taskId, payload.newData).then(res => {
        dispatch("getTasks", payload.newData.listId);
        dispatch("getTasks", payload.oldId);
      });
    },

    //COMMENTS
    getComments({ commit, dispatch }, taskId) {
      api.get("comment/" + taskId).then(res => {
        commit("setComments", { taskId, comments: res.data });
      });
    },
    addComments({ commit, dispatch }, commentData) {
      api.post("comment/", commentData).then(res => {
        dispatch("getComments", commentData.taskId);
      });
    },
    deleteComments({ commit, dispatch }, commentObject) {
      api.delete("comment/" + commentObject.commentId).then(res => {
        dispatch("getComments", commentObject.taskId);
      });
    }
  }
});
