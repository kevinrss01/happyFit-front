/* eslint-disable react/no-unescaped-entities */
"use client";
import { Title } from "@tremor/react";
import { Divider } from "@nextui-org/react";
import React, { useContext } from "react";
import { FormContext } from "@/context/FormContext";
import CustomTabs from "@/components/customs/CustomTabs";
import {
  tabs,
  goalsTabs,
  placeTabs,
  timeAvailableTabs,
} from "@/components/register/data/CustomDataTabs";
import CustomNavigationBtns from "@/components/customs/CustomNavigationBtns";

const ExperienceAndGoalsForm = () => {
  const { handlePreviousForm, handleNextForm, userData, setUserData } =
    useContext(FormContext);

  const handleChangeInput = (value: string | React.Key, type: string) => {
    setUserData((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const handleSubmitExperienceAndGoals = async () => {
    try {
      handleNextForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register-container-form">
      <Title className="title-form">Étape 2 : Vos objectifs</Title>

      <div className="form">
        <CustomTabs
          label="Quel est votre niveau ?"
          ariaLabel="Experience"
          color="primary"
          variant="bordered"
          selectedKey={userData?.sportExperienceInYears.toString() || "0"}
          onKeyChange={handleChangeInput}
          typeKey="sportExperienceInYears"
          className="tabs"
          tabs={tabs}
        />
        <Divider className="m-3" />
        <CustomTabs
          label="Quel est votre Objectif ?"
          ariaLabel="Goal"
          color="primary"
          variant="bordered"
          selectedKey={userData?.fitnessGoal || "lose weight"}
          onKeyChange={handleChangeInput}
          typeKey="fitnessGoal"
          className="tabs"
          tabs={goalsTabs}
        />
        <Divider className="m-3" />
        <CustomTabs
          label="Où est-ce que vous souhaitez vous entrainez ?"
          ariaLabel="place"
          color="primary"
          variant="bordered"
          selectedKey={userData?.trainingPlace || "home"}
          onKeyChange={handleChangeInput}
          typeKey="trainingPlace"
          className="tabs"
          tabs={placeTabs}
        />
        <Divider className="mt-5 mb-3" />
        <CustomTabs
          label="Combien de temps est-ce que vous souhaitez vous entrainer par jour ?"
          ariaLabel="time available"
          color="primary"
          variant="bordered"
          selectedKey={
            userData?.availableTimePerSessionInMinutes.toString() || "45"
          }
          onKeyChange={handleChangeInput}
          typeKey="availableTimePerSessionInMinutes"
          className="tabs"
          tabs={timeAvailableTabs}
        />
      </div>

      <CustomNavigationBtns
        handlePreviousFn={handlePreviousForm}
        handleNextFn={handleSubmitExperienceAndGoals}
      />
    </div>
  );
};

export default ExperienceAndGoalsForm;
