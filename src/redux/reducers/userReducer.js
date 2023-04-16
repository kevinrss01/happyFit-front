import {
  GET_USER_ERROR,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../actions/actions";
import { generateReducer } from "./reducer";

export const initialUserState = {
  isFetching: false,
  userInfo: {},
  error: "",
};

const loginComputer = {
  [LOGIN_REQUEST]: (state, payload = undefined) => ({
    ...state,
    isFetching: true,
  }),
  [LOGIN_SUCCESS]: (state, payload) => ({
    ...state,
    isFetching: false,
    userInfo: payload,
  }),
  [LOGIN_ERROR]: (state, error) => ({
    ...state,
    isFetching: false,
    error,
  }),
};

const registerComputer = {
  [REGISTER_REQUEST]: (state, payload = undefined) => ({
    ...state,
    isFetching: true,
  }),
  [REGISTER_SUCCESS]: (state, payload) => ({
    ...state,
    isFetching: false,
    userInfo: payload,
  }),
  [REGISTER_ERROR]: (state, error) => ({
    ...state,
    isFetching: false,
    error,
  }),
};

export const userComputer = {
  ...loginComputer,
  ...registerComputer,
};
