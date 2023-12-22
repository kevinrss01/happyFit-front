import Axios from "./axios";
//import { refreshTokenOnLocalStorage, saveTokensOnLocalStorage } from '../utils'
import {
  UserDataSentToServer,
  ServerResponseRegister,
  ServerResponseLogin,
} from "@/types/userDataTypes";
import { VerifyTokenResponse } from "@/types/authTypes";
import { LoginFormValue } from "@/types/authTypes";

const PREFIX = "auth";
const formatSuffix = (suffix: string) => `${PREFIX}/${suffix}`;

class AuthAPI {
  static async login(loginFormValue: LoginFormValue) {
    return Axios.post<LoginFormValue, ServerResponseLogin>(
      formatSuffix("login"),
      loginFormValue
    );
  }
  //
  // static saveToken(tokens) {
  //     const { accessToken: token, refreshToken } = tokens
  //     Axios.saveToken(token)
  //     saveTokensOnLocalStorage(token, refreshToken)
  // }
  //
  // static saveRefreshedToken(token) {
  //     Axios.saveToken(token)
  //     refreshTokenOnLocalStorage(token)
  // }

  static async refreshToken(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    return Axios.post(formatSuffix("refreshToken"), { refreshToken });
  }

  static async verifyToken(accessToken: string) {
    return Axios.post<{ accessToken: string }, VerifyTokenResponse>(
      formatSuffix("verifyToken"),
      { accessToken }
    );
  }

  static async register(formValue: UserDataSentToServer) {
    return Axios.post<UserDataSentToServer, ServerResponseRegister>(
      formatSuffix("register"),
      formValue
    );
  }
}

export default AuthAPI;
