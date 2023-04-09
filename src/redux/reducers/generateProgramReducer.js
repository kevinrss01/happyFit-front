import {
  GENERATE_PROGRAM_ERROR,
  GENERATE_PROGRAM_REQUEST,
  GENERATE_PROGRAM_SUCCESS,
} from "../actions/actions";
import { generateReducer } from "./reducer";

export const initialGenerationState = {
  isFetching: false,
};

export const generationComputer = {
  [GENERATE_PROGRAM_REQUEST]: (state, data = undefined) => ({
    ...state,
    isFetching: true,
  }),
  [GENERATE_PROGRAM_SUCCESS]: (state, data) => ({
    ...state,
    isFetching: false,
  }),
  [GENERATE_PROGRAM_ERROR]: (state, err) => ({
    ...state,
    isFetching: false,
  }),
};
