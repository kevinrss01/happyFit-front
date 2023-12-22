import React from "react";
import { Program } from "@/types/programTypes";

export interface BasicInformationsForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  sexe: "man" | "woman" | "" | string;
  confirmPassword?: string;
}

export interface ExperiencesAndGoalsForm {
  fitnessGoal: "lose weight" | "gain muscle" | "fitness" | "";
  sportExperienceInYears: 0 | 1 | 2;
  trainingPlace: "home" | "gym" | "";
  availableTimePerSessionInMinutes: number;
}

export interface WeeklySessionForm {
  numberOfSessionPerWeek: InitialNumberOfSessionPerWeek;
  exoPerformances: {
    benchPress: number | undefined;
    squat: number | undefined;
  };
}

export interface UserMetricForm {
  birthday: string;
  weightInKilos: number;
  heightInCentimeters: number;
  city: string;
  referenceSource: string;
}

export interface DefaultUserTypes
  extends BasicInformationsForm,
    ExperiencesAndGoalsForm,
    WeeklySessionForm,
    UserMetricForm {
  deviceRegistration:
    | "webLargeScreen"
    | "webMobile"
    | "mobileIOS"
    | "mobileAndroid"
    | "";
  registrationDate: string;
  isUserSubscribed: boolean;
}

type InitialNumberOfSessionPerWeek =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7";

export interface FormContextTypes {
  handlePreviousForm: () => void;
  handleNextForm: () => void;
  userData: DefaultUserTypes;
  setUserData: React.Dispatch<React.SetStateAction<DefaultUserTypes>>;
  setUserDataFormattedForServer: React.Dispatch<
    React.SetStateAction<UserDataSentToServer>
  >;
}

export interface PrimaryUserData {
  firstName: string;
  lastName: string;
  email: string;
  sexe: "man" | "woman";
  registrationDate: string;
  isUserSubscribed: boolean;
  weightInKilos: number;
  heightInCentimeters: number;
  numberOfSessionPerWeek: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  fitnessGoal: "lose weight" | "gain muscle" | "fitness";
  sportExperienceInYears: 0 | 1 | 2;
  trainingPlace: "home" | "gym";
  availableTimePerSessionInMinutes: 30 | 45 | 60 | 75 | 90;
  exoPerformances: {
    benchPress: number;
    squat: number;
  };
}

export interface UserDataSentToServer extends PrimaryUserData {
  deviceRegistration: "webLargeScreen" | "webMobile";
  birthday: string;
  city: string;
  referenceSource: string;
  password: string;
}

export interface ServerResponseRegister extends PrimaryUserData {
  id: string;
  role: "user" | "admin";
  age: number;
  programs: Program[];
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface ServerResponseLogin extends ServerResponseRegister {}

type Role = "user" | "admin";
export interface ReduxUserState extends PrimaryUserData {
  [key: string]:
    | string
    | number
    | Role
    | Program[]
    | boolean
    | {
        benchPress: number;
        squat: number;
      };
  id: string;
  role: Role;
  age: number;
  programs: Program[];
  isUserAuthenticated: boolean;
  subStatus: "free" | "paid";
}

export interface PersonalInfoSettings {
  firstName: string;
  lastName: string;
  numberOfSessionPerWeek: number;
  sportExperienceInYears: number;
  trainingPlace: string;
  heightInCentimeters: number;
  weightInKilos: number;
  availableTimePerSessionInMinutes: number;
  fitnessGoal: string;
}
