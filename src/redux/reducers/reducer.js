import { combineReducers } from "@reduxjs/toolkit";
import {
  generationComputer,
  initialGenerationState,
} from "./generateProgramReducer";
import {
  initialNutritionState,
  nutritionComputer,
  nutritionReducer,
} from "./nutritionReducer";
import { initialSportState, sportComputer, sportReducer } from "./sportReducer";
import { initialUserState, userComputer, userReducer } from "./userReducer";

const generateReducer =
  (computer, initialState) =>
  (state = initialState, action) => {
    const { type } = action;
    return type in computer ? computer[type](state, action.payload) : state;
  };

export const rootReducer = combineReducers({
  sport: generateReducer(sportComputer, initialSportState),
  nutrition: generateReducer(nutritionComputer, initialNutritionState),
  user: generateReducer(userComputer, initialUserState),
  generation: generateReducer(generationComputer, initialGenerationState),
});
