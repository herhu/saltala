import API from "../util/api"

let api = new API()

export default {
  getProdutcsById(id) {
    return new Promise((resolve, reject) => {
      api
        .get(`products/${id}`)
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
  }
}
