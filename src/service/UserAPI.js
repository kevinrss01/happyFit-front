import Axios from "./axios";

const PREFIX = "users";
const formatSuffix = (suffix) => `${PREFIX}/${suffix}`;

class UserAPI {
  static async getUserInfo(userId) {
    return Axios.get(formatSuffix(`userInfo/${userId}`));
  }
}

export default UserAPI;
