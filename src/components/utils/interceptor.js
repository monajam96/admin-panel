import axios from "axios";

const http = axios.create({
  baseURL: 'https://dummyjson.com'
})

const token = localStorage.getItem('token')
if (token) {
  http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
http.defaults.headers.common['Content-Type'] = 'application/json'

axios.interceptors.response.use(
  response => {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default http;