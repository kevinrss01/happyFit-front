import jwtDecode from 'jwt-decode'
import AuthAPI from '../../service/AuthAPI'
import UserAPI from '../../service/UserAPI'
import {
  GET_USER_ERROR,
  GET_USER_INFO_ERROR,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REFRESH_TOKEN_ERROR,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REGISTER_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./actions";
import { getProgramRequest, getProgramSuccess } from "./sportActions";

const getUserRequest = () => ({ type: GET_USER_REQUEST })
const getUserSuccess = (data) => ({ type: GET_USER_SUCCESS, payload: data })
const getUserError = (err) => ({ type: GET_USER_ERROR, payload: err })

const loginRequest = () => ({ type: LOGIN_REQUEST })
const loginSuccess = (data) => ({ type: LOGIN_SUCCESS, payload: data })
const loginError = (err) => ({ type: LOGIN_ERROR, payload: err })

const registerRequest = () => ({ type: REGISTER_REQUEST })
const registerSuccess = (data) => ({ type: REGISTER_SUCCESS, payload: data })
const registerError = (err) => ({ type: REGISTER_ERROR, payload: err })

const getUserInfoRequest = () => ({ type: GET_USER_INFO_REQUEST })
const getUserInfoSuccess = (data) => ({
  type: GET_USER_INFO_SUCCESS,
  payload: data,
})
const getUserInfoError = (err) => ({ type: GET_USER_INFO_ERROR, payload: err })

const refreshTokenRequest = () => ({ type: REFRESH_TOKEN_REQUEST })
const refreshTokenSuccess = (data) => ({
  type: REFRESH_TOKEN_SUCCESS,
  payload: data,
})
const refreshTokenError = (err) => ({
  type: REFRESH_TOKEN_ERROR,
  payload: err,
})

/* idée d'automatisation pour les actions redondantes : 
 créer un tableau à 4 éléments (qui pourrait être le résultat d'une fonction fléchée) contenant des objets avec la forme 
  {
    method: function,
    args: tableau d'arguments de la fonction method
  }  
  les 4 éléments étant: 
  1) la request
  2) la récupération de donnée issue du call api
  3) l'update de redux en cas de succès
  4) l'update de redux en cas d'échec

  Le tout serait appliqué via l'api Reflect avec la méthode Reflect.apply
  const [request, dataFetch, success, failure] = tableauA4Elements;
  .......
*/

export const userLogin = (loginData) => async (dispatch) => {
  dispatch(loginRequest())
  try {
    const res = await AuthAPI.login(loginData)
    dispatch(getUserInfoSuccess(res.data))
    dispatch(getProgramSuccess(res.data))
    AuthAPI.saveToken(res.data.tokens)
    return Promise.resolve(res.data)
  } catch (err) {
    dispatch(loginError(err))
    return Promise.reject(err)
  }
}

export const userRegister = (registerData) => async (dispatch) => {
  dispatch(registerRequest())
  try {
    const res = await AuthAPI.register(registerData)
    return Promise.resolve()
  } catch (err) {
    dispatch(registerError(err))
    return Promise.reject()
  }
}

export const getUser = () => async (dispatch) => {
  //dispatch getUserRequest()
  //endpoint call with axios stored in a variable
  // variable value dispatched in getUserSuccess
  //catch error and dispatch it in getUserError
}

export const getUserInfo = (userId) => async (dispatch) => {
  dispatch(getProgramRequest());
  dispatch(getUserInfoRequest());
  try {
    const res = await UserAPI.getUserInfo(userId);
    dispatch(getUserInfoSuccess(res.data));
    dispatch(getProgramSuccess(res.data));
  } catch (err) {
    dispatch(getUserInfoError(err))
  }
}

export const refreshToken = (token) => async (dispatch) => {
  dispatch(refreshTokenRequest())
  try {
    const res = await AuthAPI.refreshToken(token)
    AuthAPI.saveRefreshedToken(res.data.accessToken)
    const { sub } = jwtDecode(res.data.accessToken)
    dispatch(getUserInfo(sub))
    dispatch(refreshTokenSuccess(res.data))
  } catch (err) {
    dispatch(refreshTokenError(err))
  }
}
