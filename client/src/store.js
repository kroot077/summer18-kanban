import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

let auth = Axios.create({
  baseURL: "//localhost:3000/auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: "//localhost:3000/api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    lists: [],
    tasks: {},
    activeBoard: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setLists(state, lists) {
      state.lists = lists
    },
    setTasks(state, data) {
      state.tasks[data.listId] = data.tasks
    },
    clearUser(state) {
      state.user = {}
    }
  },
  actions: {
    //AUTH STUFF
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    logout({ commit, dispatch }) {
      auth.delete('logout')
        .then(() => {
          commit('clearUser')
          router.push({ name: 'login' })
        })
    },

    //BOARDS
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    deleteBoard({ commit, dispatch }, boardId) {
      api.delete('boards/' + boardId)
        .then(res => {
          dispatch('getBoards')
        })
    },

    //LISTS
    getLists({ commit, dispatch }, boardId) {
      api.get('list/' + boardId)
        .then(res => {
          commit('setLists', res.data)
        })
    },
    addList({commit, dispatch}, listData) {
      api.post('list/', listData)
      .then(res => {
          dispatch('getLists', listData.boardId)
        })
    },
    deleteLists({ commit, dispatch }, listObject) {
      api.delete('list/' + listObject.listId)
        .then(res => {
          dispatch('getLists', listObject.boardId)
      })
    },

    //TASKS
    getTasks({ commit, dispatch }, listId) {
      api.get('task/' + listId )
        .then(res => {
          commit('setTasks', {listId, tasks: res.data})
        })
    },
    addTasks({ commit, dispatch }, taskData) {
      api.post('task/', taskData)
        .then(res => {
          dispatch('getTasks', taskData.listId)
        })
    },
    deleteTasks({ commit, dispatch }, taskObject) {
      api.delete('task/' + taskObject.taskId)
        .then(res => {
          dispatch('getTasks', taskObject.listId)
        })
    },
    changeTasks({commit, dispatch}, taskObject) {
      api.put('task/' + taskObject.taskId, taskObject.listId)
        .then(res => {
          dispatch('getTasks', taskObject.listId)
        })
    }
  },
})