import Axios from './axios'
import { refreshTokenOnLocalStorage, saveTokensOnLocalStorage } from './utils'

const PREFIX = 'auth'
const formatSuffix = (suffix) => `${PREFIX}/${suffix}`

class AuthAPI {
  static async login(loginFormValue) {
    return Axios.post(formatSuffix('login'), loginFormValue)
  }

  static saveToken(tokens) {
    const { accessToken: token, refreshToken } = tokens
    Axios.saveToken(token)
    saveTokensOnLocalStorage(token, refreshToken)
  }

  static saveRefreshedToken(token) {
    Axios.saveToken(token)
    refreshTokenOnLocalStorage(token)
  }

  static async refreshToken(refreshToken) {
    return Axios.post(formatSuffix('refreshToken'), { refreshToken })
  }

  static async register(formValue) {
    return Axios.post(formatSuffix('register'), formValue)
  }
}

export default AuthAPI
