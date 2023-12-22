import { createSlice, Slice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ReduxUserState } from "@/types/userDataTypes";

import { RootState } from "@/redux/store";

const initialState: ReduxUserState = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  age: 0,
  weightInKilos: 80,
  heightInCentimeters: 180,
  sexe: "man",
  fitnessGoal: "lose weight",
  sportExperienceInYears: 0,
  trainingPlace: "home",
  numberOfSessionPerWeek: 1,
  availableTimePerSessionInMinutes: 45,
  registrationDate: "",
  isUserSubscribed: false,
  exoPerformances: {
    benchPress: 0,
    squat: 0,
  },
  subStatus: "free",
  role: "user",
  programs: [],
  isUserAuthenticated: false,
};

export const userSlice: Slice<ReduxUserState> = createSlice({
  name: "user",
  initialState,
  reducers: {
    initializeUserState: (state, action: PayloadAction<ReduxUserState>) => {
      return action.payload;
    },
    updateUserState: (
      state,
      action: PayloadAction<Partial<ReduxUserState>>
    ) => {
      return { ...state, ...action.payload };
    },
    remove: () => {
      return initialState;
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isUserAuthenticated = action.payload;
    },
  },
});

export const { initializeUserState, updateUserState, setAuth } =
  userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export const selectIsUserAuthenticated = (state: RootState) =>
  state.user.isUserAuthenticated;
export default userSlice.reducer;
