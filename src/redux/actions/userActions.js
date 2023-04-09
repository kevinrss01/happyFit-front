import { GET_USER_ERROR, GET_USER_REQUEST, GET_USER_SUCCESS } from "./actions";

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (data) => ({ type: GET_USER_SUCCESS, payload: data });
const getUserError = (err) => ({ type: GET_USER_ERROR, payload: err });

export const getUser = () => async (dispatch) => {
  //dispatch getUserRequest()
  //endpoint call with axios stored in a variable
  // variable value dispatched in getUserSuccess
  //catch error and dispatch it in getUserError
};
