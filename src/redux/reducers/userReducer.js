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
   UPDATE_USER_FIELD_ERROR,
   UPDATE_USER_FIELD_REQUEST,
   UPDATE_USER_FIELD_SUCCESS,
   UPDATE_USER_INFO_ERROR,
   UPDATE_USER_INFO_REQUEST,
   UPDATE_USER_INFO_SUCCESS,
} from '../actions/actions'
import { generateReducer } from './reducer'

export const initialUserState = {
   isFetching: false,
   isUpdating: false,
   userInfo: {},
   error: '',
}

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
}

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
}

const userInfoComputer = {
   [GET_USER_INFO_REQUEST]: (state, payload = undefined) => ({
      ...state,
      isFetching: true,
   }),
   [GET_USER_INFO_SUCCESS]: (state, payload) => {
      const {
         email,
         firstName,
         lastName,
         weightInKilos,
         heightInCentimeters,
         availableTimePerSessionInMinutes,
         fitnessGoal,
         trainingPlace,
      } = payload
      return {
         ...state,
         isFetching: false,
         userInfo: {
            email,
            firstName,
            lastName,
            weightInKilos,
            heightInCentimeters,
            availableTimePerSessionInMinutes,
            fitnessGoal,
            trainingPlace,
         },
      }
   },
   [GET_USER_INFO_ERROR]: (state, error) => ({
      ...state,
      isFetching: false,
      error,
   }),
}

const refreshTokenComputer = {
   [REFRESH_TOKEN_REQUEST]: (state, payload = undefined) => ({
      ...state,
      isFetching: true,
   }),
   [REFRESH_TOKEN_SUCCESS]: (state, payload) => ({
      ...state,
      isFetching: false,
   }),
   [REFRESH_TOKEN_ERROR]: (state, error) => ({
      ...state,
      isFetching: false,
      error,
   }),
}

const updateUserComputer = {
   [UPDATE_USER_INFO_REQUEST]: (state, payload = undefined) => ({
      ...state,
      isUpdating: true,
   }),
   [UPDATE_USER_INFO_SUCCESS]: (state, payload) => ({
      ...state,
      isUpdating: false,
      userInfo: { ...state.userInfo, ...payload },
   }),
   [UPDATE_USER_INFO_ERROR]: (state, error) => ({
      ...state,
      isUpdating: false,
      error,
   }),
}

const updateUserFieldComputer = {
   [UPDATE_USER_FIELD_REQUEST]: (state, payload = undefined) => ({
      ...state,
      isUpdating: true,
   }),
   [UPDATE_USER_FIELD_SUCCESS]: (state, payload) => ({
      ...state,
      isUpdating: false,
      userInfo: {
         ...state.userInfo,
         [payload.field]: payload.data,
      },
   }),
   [UPDATE_USER_FIELD_ERROR]: (state, error) => ({
      ...state,
      isUpdating: false,
      error,
   }),
}

export const userComputer = {
   ...loginComputer,
   ...registerComputer,
   ...userInfoComputer,
   ...refreshTokenComputer,
   ...updateUserComputer,
   ...updateUserFieldComputer,
}
