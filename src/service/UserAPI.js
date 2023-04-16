import Axios from "./axios";

const PREFIX = "auth";
const formatSuffix = (suffix) => `${PREFIX}/${suffix}`;

class UserAPI {
  static async login(loginFormValue) {
    return Axios.post(formatSuffix("login"), loginFormValue);
  }

  static async register(formValue) {
    return Axios.post(formatSuffix("register"), formValue);
  }
}

export default UserAPI;
