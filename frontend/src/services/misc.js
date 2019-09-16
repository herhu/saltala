import API from "../util/api"

let api = new API()

export default {
  getProfiles: async () => {
    return new Promise((resolve, reject) => {
      api
        .get("profiles")
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getUsers: async id => {
    return new Promise((resolve, reject) => {
      api
        .get(`users/profile/${id}`)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
