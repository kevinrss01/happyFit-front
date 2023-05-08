import Axios from "./axios";

const PREFIX = "auth";
const formatSuffix = (suffix) => `${PREFIX}/${suffix}`;

class AuthAPI {
  static async login(loginFormValue) {
    return Axios.post(formatSuffix("login"), loginFormValue);
  }

  static saveToken(token) {
    Axios.saveToken(token);
  }

  static async register(formValue) {
    return Axios.post(formatSuffix("register"), formValue);
  }
}

export default AuthAPI;
