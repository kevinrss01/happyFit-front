import axios from "axios";

class Axios {
  static headers = { headers: { apiKey: process.env.API_KEY } };

  static get(url) {
    return axios.get("http://localhost:4000/program/sport", this.headers);
  }

  static post(url, data) {
    return axios.post(url, data, this.headers);
  }

  static delete(url) {
    return axios.delete(url, this.headers);
  }

  static put(url, data) {
    return axios.put(url, data, this.headers);
  }

  static patch(url, data) {
    return axios.patch(url, data, this.headers);
  }
}

export default Axios;
