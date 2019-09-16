import API from "../util/api"

let api = new API()

export default {
  login: async user => {
    return new Promise((resolve, reject) => {
      api
        .post("login", user)
        .then(res => {
          console.log(res)
          resolve(res.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  register(user) {
    return new Promise((resolve, reject) => {
      api
        .post("register", user)
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },

  me() {
    return new Promise((resolve, reject) => {
      api
        .post("me")
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  logout() {
    return new Promise((resolve, reject) => {
      api
        .post("logout")
        .then(res => {
          resolve(res.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  isLoggedIn() {
    const user = localStorage.getItem("user")
    if (user) {
      return true
    } else {
      return false
    }
  }
}
