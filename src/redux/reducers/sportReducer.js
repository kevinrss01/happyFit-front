// reducer to handle all of the actions for program part

import {
  GET_SPORT_ERROR,
  GET_SPORT_REQUEST,
  GET_SPORT_SUCCESS,
} from "../actions/actions";
import { generateReducer } from "./reducer";

export const initialSportState = {
  isFetching: false,
  programs: [],
};

export const sportComputer = {
  [GET_SPORT_REQUEST]: (state, data = undefined) => ({
    ...state,
    isFetching: true,
  }),
  [GET_SPORT_SUCCESS]: (state, data) => {
    const programs = data.programs.map(
      ({ weeklyProgramNumber, sportPrograms, weekSportStructure }) => ({
        number: weeklyProgramNumber,
        programs: sportPrograms,
        structure: weekSportStructure,
      })
    );
    return {
      ...state,
      isFetching: false,
      programs,
    };
  },
  [GET_SPORT_ERROR]: (state, err) => ({
    ...state,
    isFetching: false,
  }),
};
