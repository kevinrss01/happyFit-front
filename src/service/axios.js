import axios from 'axios'
import { TOKEN_ACCESSOR, getItemFromLocalStorage } from './utils'

const backendServer = 'http://localhost:4000'
const formatUrl = (url) => `${backendServer}/${url}`
const headers = { headers: {} }

class Axios {
   static get(url) {
      return axios.get(formatUrl(url), headers)
   }

   static post(url, data) {
      return axios.post(formatUrl(url), data, headers)
   }

   static delete(url) {
      return axios.delete(formatUrl(url), headers)
   }

   static put(url, data) {
      return axios.put(formatUrl(url), data, headers)
   }

   static patch(url, data) {
      return axios.patch(formatUrl(url), data, headers)
   }

   static saveToken(token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
   }

   static tokenSaved() {
      return Boolean(axios.defaults.headers.common.Authorization)
   }

   static getTokenAxiosOrLocalStorage() {
      if (this.tokenSaved()) {
         const token = axios.defaults.headers.common.Authorization
         return token.replace('Bearer ', '')
      } else {
         const savedToken = getItemFromLocalStorage(TOKEN_ACCESSOR)
         if (savedToken) this.saveToken(savedToken.token)
         return savedToken ? savedToken.token : ''
      }
   }
}

export default Axios
