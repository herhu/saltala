import API from "../util/api"

let api = new API()

export default {
  AddTicket: async body => {
    return new Promise((resolve, reject) => {
      api
        .post("tickets", body)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getTickets: async () => {
    return new Promise((resolve, reject) => {
      api
        .get("tickets")
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getTicketsbyID: async id => {
    return new Promise((resolve, reject) => {
      api
        .get(`tickets/user/${id}`)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  updateUserTicket: async (id, body) => {
    return new Promise((resolve, reject) => {
      api
        .put(`tickets/user/${id}`, body)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  requestTicket: async (id, body) => {
    return new Promise((resolve, reject) => {
      api
        .put(`tickets/requested/${id}`, body)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  deleteTicket: async id => {
    return new Promise((resolve, reject) => {
      api
        .delete(`tickets/${id}`)
        .then(res => {
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
