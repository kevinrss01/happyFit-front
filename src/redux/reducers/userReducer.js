import {
  GET_USER_ERROR,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
} from "../actions/actions";
import { generateReducer } from "./reducer";

export const initialUserState = {
  isFetching: false,
  email: "",
  firstName: "",
  id: "",
  age: 0,
  sexe: "",
  weightInKilos: 0,
};

export const userComputer = {
  [GET_USER_REQUEST]: (state, data = undefined) => ({
    ...state,
    isFetching: true,
  }),
  [GET_USER_SUCCESS]: (state, data) => {
    const { email, firstName, age, sexe, weightInKilos, id } = data;
    return {
      ...state,
      isFetching: false,
      email,
      firstName,
      age,
      sexe,
      weightInKilos,
      id,
    };
  },
  [GET_USER_ERROR]: (state, err) => ({
    ...state,
    isFetching: false,
  }),
};
