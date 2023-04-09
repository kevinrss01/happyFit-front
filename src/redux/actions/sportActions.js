import {
  GET_SPORT_ERROR,
  GET_SPORT_REQUEST,
  GET_SPORT_SUCCESS,
} from "./actions";

const getProgramRequest = () => ({ type: GET_SPORT_REQUEST });
const getProgramSuccess = (data) => ({
  type: GET_SPORT_SUCCESS,
  payload: data,
});
const getProgramError = (err) => ({ type: GET_SPORT_ERROR, payload: err });

export const getProgram = () => async (dispatch) => {
  //dispatch getProgramRequest()
  //endpoint call with axios stored in a variable
  // value dispatched in getProgramSuccess
  //catch error and dispatch it in getProgramError
};
