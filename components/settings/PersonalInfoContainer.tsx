import { Button } from "@tremor/react";
import React, { useState } from "react";

import toastMessage from "@/utils/toastMessage";
import { verifPersonalInfoSchema } from "@/utils/yupShema";
import * as Yup from "yup";
import NamesContainer from "./personalInfo/NamesContainer";
import WorkoutParamsContainer from "./personalInfo/WorkoutParamsContainer";
import HeightWeightContainer from "./personalInfo/HeightWeightContainer";
import GoalContainer from "./personalInfo/GoalContainer";
import { updateUserState } from "@/redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { PersonalInfoContainerProps } from "@/types/propsTypes";
import { ReduxUserState, PersonalInfoSettings } from "@/types/userDataTypes";
import { selectUser } from "@/redux/slices/userSlice";
import UserAPI from "../../services/API/UserAPI";

function convertStringsToInts(obj: { [key: string]: any }) {
  let newObj: { [key: string]: number | string } = {};
  Object.keys(obj).forEach((key) => {
    const intValue = parseInt(obj[key], 10);
    if (!isNaN(intValue)) {
      newObj[key] = intValue;
    } else {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}

export const PersonalInfoContainer = ({
  userData,
}: PersonalInfoContainerProps) => {
  const [updatedData, setUpdatedData] =
    useState<PersonalInfoSettings>(userData);
  const [yupErrors, setYupErrors] = useState<{
    [key: string]: string;
  }>({});
  const [indexGoalTab, setIndexGoalTab] = useState<0 | 1 | 2>((): 0 | 1 | 2 => {
    if (userData.fitnessGoal === "gain muscle") return 0;
    if (userData.fitnessGoal === "fitness") return 1;
    if (userData.fitnessGoal === "lose weight") return 2;
  });
  const [isUpdatingData, setIsUpdatingData] = useState<boolean>(false);

  const dispatch = useDispatch();
  const userDataRedux = useSelector(selectUser);

  const guardInputs = () => {
    const updatedDataNotEmpty = Object.values(updatedData).every(
      (value) => value !== "" && value !== null && value !== undefined
    );

    if (!updatedDataNotEmpty) {
      toastMessage("Veuillez remplir tous les champs", "error");
      return false;
    }

    const originalUserData = Object.values(userData);
    const updatedUserData = Object.values(updatedData);
    if (originalUserData.length !== updatedUserData.length) {
      toastMessage("Veuillez remplir tous les champs", "error");
      return false;
    }

    for (const key in originalUserData) {
      if (originalUserData[key] !== updatedUserData[key]) {
        return true;
      }
    }

    toastMessage(
      "Les données ne peuvent pas être identiques veuillez modifier au moins un champ.",
      "error"
    );
    return false;
  };
  const verifyInputs = async (formValues: PersonalInfoSettings) => {
    await verifPersonalInfoSchema.validate(formValues, {
      abortEarly: false,
    });
  };

  const onSubmit = async () => {
    try {
      setIsUpdatingData(true);
      setYupErrors({});

      if (!guardInputs()) {
        return;
      }

      await verifyInputs(updatedData);

      await UserAPI.updatePersonalUserInfo(updatedData, userDataRedux.id);
      dispatch(updateUserState(updatedData));
      toastMessage("Vos informations ont bien été modifiées", "success");
    } catch (error) {
      console.error(error);
      if (error instanceof Yup.ValidationError) {
        const errorMessages: {
          [key: string]: string;
        } = {};
        error.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });
        setYupErrors(errorMessages);
      } else {
        toastMessage(
          "Oups, une erreur est survenue, rechargez la page ou veuillez réessayer plus tard",
          "error"
        );
      }
    } finally {
      setIsUpdatingData(false);
    }
  };

  const onChangeInput = (inputName: string, inputValue: number | string) => {
    setUpdatedData({ ...updatedData, [inputName]: inputValue });
  };

  return (
    <div className="personal-info-container">
      <h2>Informations personnelles</h2>
      <div className="form-input-container">
        <NamesContainer
          userData={updatedData}
          yupErrors={yupErrors}
          onChangeInput={onChangeInput}
        />

        <h3>Paramètres de séance</h3>
        <WorkoutParamsContainer
          userData={updatedData}
          onChangeInput={onChangeInput}
        />

        <h3>Informations physiques</h3>
        <HeightWeightContainer
          userData={updatedData}
          onChangeInput={onChangeInput}
          yupErrors={yupErrors}
        />

        <h3 className="mt-4">Objectif</h3>
        <GoalContainer
          userData={updatedData}
          onChangeInput={onChangeInput}
          indexGoalTab={indexGoalTab}
        />
      </div>

      <Button
        className="button-update-form"
        onClick={() => {
          onSubmit();
        }}
        loading={isUpdatingData}
      >
        Modifier mes informations
      </Button>
    </div>
  );
};
