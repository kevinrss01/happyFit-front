"use client";

import { Title } from "@tremor/react";
import { BasicInformationsForm as BasicInformationsType } from "@/types/userDataTypes";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React, { useContext, useState } from "react";
import { FormContext } from "@/context/FormContext";
import { GrNext } from "react-icons/gr";
import { verificationBasicInformationSchema } from "@/utils/yupShema";
import { YupErrorMessages } from "@/types/types";
import toastMessage from "@/utils/toastMessage";
import * as Yup from "yup";
import axios from "axios";
import { baseURLBackend } from "@/services/API/axios";

const genderOptions = [
  {
    value: "man",
    label: "Homme",
  },
  {
    value: "woman",
    label: "Femme",
  },
  {
    value: "other",
    label: "Autre",
  },
];

const verifyInputs = async (formValues: BasicInformationsType) => {
  await verificationBasicInformationSchema.validate(formValues, {
    abortEarly: false,
  });
};

const BasicInformationsForm = () => {
  const [isVerifyingForm, setIsVerifyingForm] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<YupErrorMessages>({
    firstName: "",
    lastName: "",
    email: "",
    sexe: "",
    password: "",
    confirmPassword: "",
  });

  const { handleNextForm, userData, setUserData } = useContext(FormContext);

  const handleChangeInput = (value: string, type: string) => {
    setUserData((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const handleSubmitBasicInformations = async () => {
    setErrorMessages({});

    try {
      setIsVerifyingForm(true);

      await verifyInputs({
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        email: userData?.email,
        sexe: userData?.sexe,
        password: userData?.password,
      });

      const valideEmail = await axios.get(
        `${baseURLBackend}/users/verifyEmail/${userData?.email}`,
      );

      if (valideEmail.data === true) {
        setErrorMessages((prevState) => ({
          ...prevState,
          email: "Cette adresse email est déjà utilisée",
        }));

        return;
      }

      if (userData?.password !== userData?.confirmPassword) {
        setErrorMessages((prevState) => ({
          ...prevState,
          confirmPassword: "Les mots de passe ne correspondent pas",
        }));
        return;
      }

      handleNextForm();
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          setErrorMessages((prevState) => ({
            ...prevState,
            [err.path]: err.message,
          }));
        });
      } else {
        toastMessage(
          "Oups, une erreur est survenue, veuillez réessayer plus tard",
          "error",
        );
      }
    } finally {
      setIsVerifyingForm(false);
    }
  };

  return (
    <div className="register-container-form">
      <Title className="title-form">Étape 1</Title>

      <form className="form">
        <Input
          size="md"
          type="text"
          label="Prénom"
          isRequired
          value={userData?.firstName}
          color="default"
          key="firstName"
          description="Veuillez entrer un prénom"
          labelPlacement="outside"
          isInvalid={!!errorMessages?.firstName}
          errorMessage={errorMessages?.firstName && errorMessages?.firstName}
          onChange={(e) => {
            handleChangeInput(e.target.value, "firstName");
          }}
          className="input"
        />
        <Input
          size="md"
          type="text"
          label="Nom"
          isRequired
          color="default"
          key="lastName"
          value={userData?.lastName}
          description="Veuillez entrer un nom de famille"
          labelPlacement="outside"
          isInvalid={!!errorMessages?.lastName}
          errorMessage={errorMessages?.lastName && errorMessages?.lastName}
          onChange={(e) => {
            handleChangeInput(e.target.value, "lastName");
          }}
          className="input"
        />
        <Input
          size="md"
          type="email"
          label="Email"
          isRequired
          value={userData?.email}
          color="default"
          key="email"
          description="Veuillez entrer votre email"
          labelPlacement="outside"
          isInvalid={!!errorMessages?.email}
          errorMessage={errorMessages?.email}
          onChange={(e) => {
            handleChangeInput(e.target.value, "email");
          }}
          className="input"
        />

        <Select
          label="Votre genre"
          description="Veuillez selectionner un genre pour que le programme soit le plus adapté possible"
          className="select"
          isRequired
          isInvalid={!!errorMessages?.sexe}
          errorMessage={errorMessages?.sexe}
          onChange={(e) => {
            handleChangeInput(e.target.value, "sexe");
          }}
          selectedKeys={[userData?.sexe ? userData?.sexe : "woman"]}
        >
          {genderOptions.map((option) => (
            <SelectItem key={option?.value} value={userData?.sexe}>
              {option?.label}
            </SelectItem>
          ))}
        </Select>

        <Input
          size="md"
          type="password"
          label="Votre mot de passe"
          isRequired
          color="default"
          key="password"
          description="Veuillez choisir votre mot de passe (1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial et 8 caractères minimum)"
          labelPlacement="outside"
          isInvalid={!!errorMessages?.password}
          errorMessage={errorMessages?.password}
          value={userData?.password}
          onChange={(e) => {
            handleChangeInput(e.target.value, "password");
          }}
          className="input"
        />

        <Input
          size="md"
          type="password"
          label="Confirmation du mot de passe"
          isRequired
          color="default"
          key="confirm-password"
          description="Veuillez confirmer votre mot de passe"
          labelPlacement="outside"
          className="input"
          isInvalid={!!errorMessages?.confirmPassword}
          onChange={(e) => {
            handleChangeInput(e.target.value, "confirmPassword");
          }}
          value={userData?.confirmPassword}
          errorMessage={errorMessages?.confirmPassword}
        />

        <Button
          color="primary"
          endContent={<GrNext />}
          className="next-button"
          onClick={handleSubmitBasicInformations}
          isLoading={isVerifyingForm}
        >
          Continuer
        </Button>
      </form>
    </div>
  );
};

export default BasicInformationsForm;
