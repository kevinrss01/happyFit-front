"use client";
import { Title, Callout } from "@tremor/react";
import { Select, SelectItem, Input, Divider } from "@nextui-org/react";
import React, { useContext, useState } from "react";
import { FormContext } from "@/context/FormContext";
import CustomNavigationBtns from "@/components/customs/CustomNavigationBtns";
import { metricSchema } from "@/utils/yupShema";
import { typeOfReferenceSource } from "@/components/register/data/selectInputData";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaCity } from "react-icons/fa";
import * as Yup from "yup";
import { useWindowSize } from "@react-hookz/web";
import { UserDataSentToServer } from "@/types/userDataTypes";

const setDeviceRegistration = (windowWidth: number) => {
  if (windowWidth < 640) {
    return "webMobile";
  } else {
    return "webLargeScreen";
  }
};

const handleIfOtherGender = (gender: string) => {
  if (gender === "other") {
    return "man";
  }

  return gender;
};

const isAgeInRange = (birthDate: string): boolean => {
  const minAge = 16;
  const maxAge = 100;

  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDifference = today.getMonth() - birthDateObj.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
  ) {
    age--;
  }

  return age >= minAge && age <= maxAge;
};

const verifyInputs = async (formValues: {
  weightInKilos: number;
  heightInCentimeters: number;
  city: string;
  referenceSource: string;
  birthday: string;
}) => {
  await metricSchema.validate(formValues, {
    abortEarly: false,
  });
};

const PhysicalMetricsForm = () => {
  const {
    handlePreviousForm,
    handleNextForm,
    userData,
    setUserData,
    setUserDataFormattedForServer,
  } = useContext(FormContext);
  const [errorMessage, setErrorMessage] = useState<{
    [key: string]: number | string;
  }>({
    weightInKilos: "",
    heightInCentimeters: "",
    birthday: "",
  });

  const { width } = useWindowSize();

  const handleChangeInput = (value: string | React.Key, type: string) => {
    setUserData((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const handleSubmitMetrics = async () => {
    setErrorMessage({});
    try {
      await verifyInputs({
        weightInKilos: userData?.weightInKilos,
        heightInCentimeters: userData?.heightInCentimeters,
        city: userData?.city,
        referenceSource: userData?.referenceSource,
        birthday: userData?.birthday,
      });

      if (!isAgeInRange(userData?.birthday)) {
        setErrorMessage((prevState) => ({
          ...prevState,
          birthday:
            "Vous devez avoir au moins 16 ans pour vous inscrire et moins de 100 ans. 👴🏻",
        }));
        return;
      }

      const date = new Date();
      const formattedDate = date.toISOString().split("T")[0];

      const formattedUserData = {
        ...userData,
        heightInCentimeters: parseInt(userData?.heightInCentimeters.toString()),
        weightInKilos: parseInt(userData?.weightInKilos.toString()),
        sportExperienceInYears: parseInt(
          userData?.sportExperienceInYears.toString()
        ),
        registrationDate: formattedDate,
        deviceRegistration: setDeviceRegistration(width),
        sexe: handleIfOtherGender(userData.sexe),
        numberOfSessionPerWeek: parseInt(
          userData?.numberOfSessionPerWeek.toString()
        ),
        availableTimePerSessionInMinutes: parseInt(
          userData?.availableTimePerSessionInMinutes.toString()
        ),
      };

      const { confirmPassword, ...rest } = formattedUserData;

      setUserDataFormattedForServer(rest as UserDataSentToServer);

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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prevState) => ({
      ...prevState,
      birthday: e.target.value,
    }));
  };

  return (
    <div className="register-container-form">
      <Title className="title-form">Partie 4 : Metrics</Title>

      <form className="form">
        <Callout title="Information importante" color="blue" className="mt-5">
          Vos informations personnelles restent confidentielles et ne seront
          jamais partagées ou vendues à des tiers.
        </Callout>
        <Input
          isRequired={true}
          type="number"
          label="Votre poids en kg"
          labelPlacement="outside"
          min={40}
          max={250}
          className="input"
          value={
            userData?.weightInKilos !== 0 && userData?.weightInKilos.toString()
          }
          onChange={(e) => {
            handleChangeInput(e?.target?.value, "weightInKilos");
          }}
          isInvalid={!!errorMessage?.weightInKilos}
          errorMessage={errorMessage?.weightInKilos}
        />
        <Input
          isRequired={true}
          type="number"
          label="Votre taille en cm"
          labelPlacement="outside"
          min={40}
          max={250}
          className="input"
          value={
            userData?.heightInCentimeters !== 0 &&
            userData?.heightInCentimeters.toString()
          }
          onChange={(e) => {
            handleChangeInput(e?.target?.value, "heightInCentimeters");
          }}
          isInvalid={!!errorMessage?.heightInCentimeters}
          errorMessage={errorMessage?.heightInCentimeters}
        />
        <div className="w-[100%] pt-[30px]">
          <label>Quelle est votre date de naissance ?</label>
          <Input
            isRequired={true}
            type="date"
            size="sm"
            description="Cette date est importante pour calculer votre âge."
            onChange={(e) => {
              handleDateChange(e);
            }}
            value={userData?.birthday}
            isInvalid={!!errorMessage?.birthday}
            errorMessage={errorMessage?.birthday}
          />
        </div>
        <Divider className="mt-5"></Divider>
        <div className="w-[100%] mt-2">
          <span>Pour améliorer constamment nos services</span>
        </div>
        <Input
          label="Votre ville"
          isRequired={true}
          labelPlacement="inside"
          value={userData?.city}
          startContent={<FaCity />}
          placeholder="Dans quelle ville est-ce vous vous entrainez ?"
          className="mt-5"
          onChange={(e) => {
            handleChangeInput(e?.target?.value, "city");
          }}
          isInvalid={!!errorMessage?.city}
          errorMessage={errorMessage?.city}
        />

        <Select
          isRequired={true}
          label="Où avez-vous entendu parler de nous ?"
          startContent={<IoShareSocialOutline />}
          placeholder="Source de référence"
          className="mt-5"
          onChange={(e) => {
            handleChangeInput(e.target.value, "referenceSource");
          }}
          isInvalid={!!errorMessage?.referenceSource}
          errorMessage={errorMessage?.referenceSource}
          selectedKeys={[
            userData?.referenceSource ? userData?.referenceSource : "other",
          ]}
        >
          {typeOfReferenceSource.map((source) => (
            <SelectItem
              key={source.value}
              value={source.value}
              startContent={<source.icon />}
            >
              {source.text}
            </SelectItem>
          ))}
        </Select>
      </form>

      <CustomNavigationBtns
        handlePreviousFn={handlePreviousForm}
        handleNextFn={handleSubmitMetrics}
      />
    </div>
  );
};

export default PhysicalMetricsForm;
