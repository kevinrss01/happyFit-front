/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useContext, useState } from "react";
import { Subtitle, Title } from "@tremor/react";
import { Divider, Select, SelectItem, Input } from "@nextui-org/react";
import { FormContext } from "@/context/FormContext";
import { verifyUserPerformanceSchema } from "@/utils/yupShema";
import * as Yup from "yup";
import { numberSessionsAvailable } from "@/components/register/data/selectInputData";
import CustomNavigationBtns from "@/components/customs/CustomNavigationBtns";

const verifyInputs = async (userPerformances: {
  benchPress: number;
  squat: number;
}) => {
  await verifyUserPerformanceSchema.validate(userPerformances, {
    abortEarly: false,
  });
};

const WeeklySessionForm = () => {
  const { handlePreviousForm, handleNextForm, userData, setUserData } =
    useContext(FormContext);

  const [errorMessage, setErrorMessage] = useState<{
    [key: string]: number | string;
  }>({
    benchPress: "",
    squat: "",
  });

  const handleChangeInput = (
    value: string | React.Key,
    inputType: "benchPress" | "squat" | string
  ) => {
    setUserData((prevState) => {
      const isExercisePerformance =
        inputType === "benchPress" || inputType === "squat";
      return {
        ...prevState,
        ...(isExercisePerformance
          ? {
              exoPerformances: {
                ...prevState.exoPerformances,
                [inputType]: value,
              },
            }
          : {
              [inputType]: value,
            }),
      };
    });
  };

  const handleSubmitWeeklySession = async () => {
    try {
      if (
        userData?.exoPerformances?.benchPress ||
        userData?.exoPerformances?.squat
      ) {
        await verifyInputs({
          benchPress: userData?.exoPerformances?.benchPress,
          squat: userData?.exoPerformances?.squat,
        });
      }

      handleNextForm();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          setErrorMessage((prevState) => ({
            ...prevState,
            [err.path]: err.message,
          }));
        });
      }
    }
  };

  return (
    <div className="register-container-form">
      <Title className="title-form">Étape 3 : Sessions et performances</Title>

      <form className="form mt-3">
        <Select
          label="Combien de séance souhaitez-vous faire par semaine ?"
          labelPlacement="outside"
          value={userData?.numberOfSessionPerWeek.toString()}
          defaultSelectedKeys={"1"}
          isRequired={true}
          onChange={(e) => {
            handleChangeInput(
              parseInt(e.target.value),
              "numberOfSessionPerWeek"
            );
          }}
        >
          {numberSessionsAvailable.map((session) => (
            <SelectItem key={session.value} value={session.value}>
              {session.label}
            </SelectItem>
          ))}
        </Select>
        <Divider className="m-3" />
        <div className="w-[100%] mb-5">
          <Title className="text-white">
            Quelles sont vos performances ? (optionnel)
          </Title>
          <Subtitle className="text-gray-500 text-sm">
            Ces informations permettent à notre modèle d'IA de s'adapter à votre
            niveau
          </Subtitle>
        </div>
        <Input
          label="Poids max au développé couché (10 répétitions)"
          type="number"
          min="20"
          max="200"
          size="md"
          step={5}
          value={
            userData?.exoPerformances?.benchPress !== 0 &&
            userData?.exoPerformances?.benchPress.toString()
          }
          labelPlacement="outside"
          description="Minimum 20kg, maximum 200kg"
          className="mb-2"
          isInvalid={!!errorMessage.benchPress}
          errorMessage={errorMessage.benchPress}
          onChange={(e) => {
            handleChangeInput(parseInt(e.target.value), "benchPress");
          }}
        />
        <Input
          label="Poids max au Squat (10 répétitions)"
          type="number"
          min="20"
          max="250"
          size="md"
          step={5}
          value={
            userData?.exoPerformances?.squat !== 0 &&
            userData?.exoPerformances?.squat.toString()
          }
          labelPlacement={"outside"}
          description="Minimum 20kg, maximum 250kg"
          isInvalid={!!errorMessage.squat}
          errorMessage={errorMessage.squat}
          onChange={(e) => {
            handleChangeInput(parseInt(e.target.value), "squat");
          }}
        />
      </form>

      <CustomNavigationBtns
        handlePreviousFn={handlePreviousForm}
        handleNextFn={handleSubmitWeeklySession}
      />
    </div>
  );
};

export default WeeklySessionForm;
