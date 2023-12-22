"use client";

import React, { useCallback, useEffect, useState } from "react";
import BasicInformationsForm from "@/components/register/forms/BasicInformationsForm";
import ProfileForm from "@/components/register/forms/ExperienceAndGoalsForm";
import WeeklySessionForm from "@/components/register/forms/WeeklySessionForm";
import PhysicalMetricsForm from "@/components/register/forms/PhysicalMetricsForm";
import { useRouter } from "next/navigation";
import TopBarLogo from "@/components/TopBarLogo";
import { Progress } from "@nextui-org/react";
import { DefaultUserTypes, UserDataSentToServer } from "@/types/userDataTypes";
//import { ErrorCallout } from "../components/errors/ErrorCallout";
///import { RegisterLoader } from "../components/loaders/RegisterLoader";
import io from "socket.io-client";
import ErrorCallout from "@/components/Errors/ErrorCallout";
import { FormContext } from "@/context/FormContext";
import { defaultUserData } from "@/context/FormContext";
import RegisterLoader from "@/components/loaders/register/RegisterLoader";
import AuthAPI from "@/services/API/authAPI";
import { useDispatch } from "react-redux";
import { initializeUserState } from "@/redux/slices/userSlice";
import { baseURLBackend } from "@/services/API/axios";

let socketServer = "";

interface FormList {
  [key: string]: React.ReactNode;
}

const getPourcentageProgressionByStep = (
  numberOfSessionToGenerate: number
): number => {
  // Handle the poucentage of progression for each step
  const numberOfProgramStructure = 1;
  const barProgressionLeft = 20;

  const numberOfSessionPerWeek = numberOfSessionToGenerate;

  const numberOfWarmup = numberOfSessionPerWeek;
  const totalSteps =
    numberOfProgramStructure + numberOfSessionPerWeek + numberOfWarmup;
  const progressionByStep = barProgressionLeft / totalSteps;

  return progressionByStep;
};

export default function Registration() {
  const [userData, setUserData] = useState<DefaultUserTypes>(defaultUserData);
  const [userDataFormattedForServer, setUserDataFormattedForServer] =
    useState<UserDataSentToServer>();
  const [progress, setProgress] = useState<number>(0);
  const [formIndex, setFormIndex] = useState<number>(1);
  const [stepDoneInProgramCreation, setStepDoneInProgramCreation] = useState<
    string[]
  >([]);
  const [isErrorDuringRegistration, setIsErrorDuringRegistration] =
    useState<boolean>(false);
  const [formList, setFormList] = useState<FormList>();

  const { push } = useRouter();
  const dispatch = useDispatch();

  const handleNextForm = useCallback(() => {
    setFormIndex(formIndex + 1);
    setProgress((prevProgress) => prevProgress + 20);
  }, [formIndex]);

  const handlePreviousForm = useCallback(() => {
    setFormIndex(formIndex - 1);
    setProgress((prevProgress) => prevProgress - 20);
  }, [formIndex]);

  const values = {
    handlePreviousForm,
    handleNextForm,
    userData,
    setUserData,
    setUserDataFormattedForServer,
  };

  useEffect(() => {
    {
      /*Using this use effect to avoid hydratation bug because of NextUI library*/
    }
    setFormList({
      1: <BasicInformationsForm />,
      2: <ProfileForm />,
      3: <WeeklySessionForm />,
      4: <PhysicalMetricsForm />,
    });
  }, []);

  useEffect(() => {
    setIsErrorDuringRegistration(false);
    const userRegistration = async () => {
      try {
        //@ts-ignore
        socketServer = io.connect(baseURLBackend);
        console.log(userDataFormattedForServer);

        const serverResponse = await AuthAPI.register(
          userDataFormattedForServer
        );

        console.log(serverResponse);

        const { tokens, id, ...rest } = serverResponse;

        localStorage.setItem(
          "tokens",
          JSON.stringify({
            accessToken: tokens?.accessToken,
            refreshToken: tokens?.refreshToken,
            userId: id,
          })
        );
        dispatch(initializeUserState({ isUserAuthenticated: true, ...rest }));
        push("/");
      } catch (err) {
        console.error(err);
        setIsErrorDuringRegistration(true);
      } finally {
        //@ts-ignore
        socketServer.close();
      }
    };

    if (formIndex === 5) {
      userRegistration();
    }
  }, [formIndex, userDataFormattedForServer, push]);

  useEffect(() => {
    if (socketServer && userDataFormattedForServer?.email) {
      const { numberOfSessionPerWeek, email } = userDataFormattedForServer;

      const progressionByStep = getPourcentageProgressionByStep(
        numberOfSessionPerWeek
      );

      //@ts-ignore
      socketServer.on(`receive_message_${email}`, (message: string) => {
        setStepDoneInProgramCreation((prevStepDoneInProgramCreation) => [
          ...prevStepDoneInProgramCreation,
          message,
        ]);
        setProgress((prevProgress) => prevProgress + progressionByStep);
      });
    }
  }, [formIndex, userDataFormattedForServer]);

  return (
    <>
      <div style={{ color: "white" }} className="register-container">
        <TopBarLogo />
        <Progress
          aria-label="Progression"
          size="md"
          value={progress}
          color="primary"
          showValueLabel={true}
          className="max-w-md"
        />

        <FormContext.Provider value={values}>
          {formList && (
            <>
              {formIndex < 5 ? (
                <>{formList[formIndex]}</>
              ) : (
                <RegisterLoader
                  stepDone={stepDoneInProgramCreation}
                  numberOfTraining={parseInt(
                    userData.numberOfSessionPerWeek.toString()
                  )}
                  isErrorDuringRegister={isErrorDuringRegistration}
                />
              )}
            </>
          )}
        </FormContext.Provider>
      </div>
    </>
  );
}
