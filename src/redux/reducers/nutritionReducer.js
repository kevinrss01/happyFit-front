// reducer to handle all of the actions for nutrition part

import {
  GET_NUTRITION_ERROR,
  GET_NUTRITION_REQUEST,
  GET_NUTRITION_SUCCESS,
} from "../actions/actions";
import { generateReducer } from "./reducer";

export const initialNutritionState = {
  isFetching: false,
  programs: [],
};

export const nutritionComputer = {
  [GET_NUTRITION_REQUEST]: (state, data = undefined) => ({
    ...state,
    isFetching: true,
  }),
  [GET_NUTRITION_SUCCESS]: (state, data) => {
    const programs = data.programs.map(
      ({ weeklyProgramNumber, nutritionPrograms }) => ({
        number: weeklyProgramNumber,
        programs: nutritionPrograms,
      })
    );
    return {
      ...state,
      programs,
      isFetching: false,
    };
  },
  [GET_NUTRITION_ERROR]: (state, err) => ({
    ...state,
    isFetching: false,
  }),
};
