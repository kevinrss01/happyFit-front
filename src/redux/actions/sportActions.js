import ProgramAPI from "../../service/ProgramAPI";
import {
  GET_SPORT_ERROR,
  GET_SPORT_REQUEST,
  GET_SPORT_SUCCESS,
} from "./actions";

const getProgramRequest = () => ({ type: GET_SPORT_REQUEST });
export const getProgramSuccess = (data) => ({
  type: GET_SPORT_SUCCESS,
  payload: data,
});
const getProgramError = (err) => ({ type: GET_SPORT_ERROR, payload: err });

export const getProgram = () => async (dispatch) => {
  dispatch(getProgramRequest());
  try {
    const res = await ProgramAPI.findSportProgram();
    dispatch(getProgramSuccess(res.data));
  } catch (err) {
    dispatch(getProgramError(err));
  }
};
