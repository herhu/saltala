import axios from "axios"
import dotenv from "dotenv"

// /* Config Vars */
dotenv.config()

const generateHeaders = () => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyaXBsZXkiLCJpYXQiOjE1NjcwMzQ0ODYsImV4cCI6MTU2OTcxMjg4Nn0.8n6HOhXpWjXQXB6ZXW0wKFXzx7R1UgdQciwM1hjctgg"
    }
  }
}

export default class API {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL
  }

  get(endPoint) {
    console.log(`${this.baseUrl}/${endPoint}`)
    return axios.get(`${this.baseUrl}/${endPoint}`, generateHeaders())
  }

  post(endPoint, body) {
    return axios.post(`${this.baseUrl}/${endPoint}`, body, generateHeaders())
  }

  put(endPoint, body) {
    return axios.put(`${this.baseUrl}/${endPoint}`, body, generateHeaders())
  }

  patch(endPoint, body) {
    return axios.patch(`${this.baseUrl}/${endPoint}`, body, generateHeaders())
  }

  delete(endPoint) {
    return axios.delete(`${this.baseUrl}/${endPoint}`, generateHeaders())
  }
}
