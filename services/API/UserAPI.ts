import Axios from "./axios";
const PREFIX = "users";
import {
  PersonalInfoSettings,
  ServerResponseLogin,
} from "@/types/userDataTypes";
import { Article } from "@/types/types";

const formatSuffix = (suffix: string) => `${PREFIX}/${suffix}`;

import { ObjectData } from "@/types/propsTypes";

class UserAPI {
  static async getUserInfo(userId: string) {
    return Axios.get<ServerResponseLogin>(formatSuffix(`userInfo/${userId}`));
  }

  static async updatePersonalUserInfo(
    userData: PersonalInfoSettings,
    userId: string
  ) {
    return Axios.patch<PersonalInfoSettings, string>(
      formatSuffix(`updateUserInfo/${userId}`),
      userData
    );
  }

  static async updateUserEmail(newEmail: string, userId: string) {
    const endpoint = formatSuffix(`updateUserEmail/${userId}`);
    return Axios.patch<{ newEmail: string }, string>(endpoint, {
      newEmail: newEmail,
    });
  }

  static async updatePasswordByMail(email: string): Promise<void> {
    return Axios.patch<{ email: string }, void>(
      formatSuffix(`updateUserPasswordWithMail`),
      {
        email: email,
      }
    );
  }

  static async updatePassword(newPassword: string, userId: string) {
    return Axios.patch(formatSuffix(`updateUserPassword/${userId}`), {
      newPassword: newPassword,
    });
  }

  static async createArticleData(formData: ObjectData) {
    return Axios.post(formatSuffix(`createArticle`), formData);
  }

  static async getAllArticles() {
    return Axios.get<Article[]>(formatSuffix("getAllArticles"));
  }
}

export default UserAPI;
