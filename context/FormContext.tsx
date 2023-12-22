"use client";
import { createContext } from "react";
import { DefaultUserTypes, FormContextTypes } from "@/types/userDataTypes";

export const defaultUserData: DefaultUserTypes = {
  firstName: "Arnold",
  lastName: "Schwarzenegger",
  email: "test-email-01@test.com",
  password: "Password@78180",
  confirmPassword: "Password@78180",
  birthday: "",
  weightInKilos: 80,
  heightInCentimeters: 180,
  sexe: "man",
  fitnessGoal: "lose weight",
  sportExperienceInYears: 0,
  trainingPlace: "home",
  numberOfSessionPerWeek: "1",
  availableTimePerSessionInMinutes: 45,
  city: "Paris",
  referenceSource: "",
  deviceRegistration: "",
  registrationDate: "",
  isUserSubscribed: false,
  exoPerformances: {
    benchPress: 0,
    squat: 0,
  },
};

export const FormContext = createContext<FormContextTypes>({
  handlePreviousForm: () => undefined,
  handleNextForm: () => undefined,
  userData: defaultUserData,
  setUserData: () => undefined,
  setUserDataFormattedForServer: () => undefined,
});
