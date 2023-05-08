import axios from "axios";

const backendServer = "http://localhost:4000";
const formatUrl = (url) => `${backendServer}/${url}`;
const headers = { headers: {} };

class Axios {
  static get(url) {
    return axios.get(formatUrl(url), headers);
  }

  static post(url, data) {
    return axios.post(formatUrl(url), data, headers);
  }

  static delete(url) {
    return axios.delete(formatUrl(url), headers);
  }

  static put(url, data) {
    return axios.put(formatUrl(url), data, headers);
  }

  static patch(url, data) {
    return axios.patch(formatUrl(url), data, headers);
  }

  static saveToken(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}

export default Axios;
