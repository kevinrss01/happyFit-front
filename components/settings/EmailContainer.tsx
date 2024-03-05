import { TextInput, Button, Text } from "@tremor/react";
import React, { useState } from "react";
import toastMessage from "@/utils/toastMessage";
import AuthAPI from "@/services/API/AuthAPI";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AiFillLock } from "react-icons/ai";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { verifNewEmail } from "@/utils/yupShema";
import { EmailContainerProps } from "@/types/propsTypes";
import { selectUser, updateUserState } from "@/redux/slices/userSlice";
import UserAPI from "@/services/API/UserAPI";

export const EmailContainer = ({ email, userId }: EmailContainerProps) => {
  const [password, setPassword] = useState<string>("");
  const [actualEmail, setActualEmail] = useState<string>(email || "");
  const [newEmail, setNewEmail] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const userDataRedux = useSelector(selectUser);

  const verifyInputs = async (formValues: { newEmail: string }) => {
    await verifNewEmail.validate(formValues, {
      abortEarly: false,
    });
  };

  console.log(userDataRedux);

  const onSubmit = async () => {
    setIsError(false);
    if (!password || !newEmail)
      return toastMessage("Veuillez remplir tous les champs", "error");
    if (newEmail === actualEmail) {
      setIsError(true);
      setErrorMessage("Vous avez entré votre email actuel.");
      return;
    }
    setIsLoading(true);

    const valideEmail = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/users/verifyEmail/${newEmail}`
    );
    if (valideEmail.data === true) {
      setIsError(true);
      setErrorMessage("Cet email est déjà utilisé.");
      setIsLoading(false);
      return;
    }

    verifyInputs({ newEmail: newEmail })
      .then(() => {
        AuthAPI.login({ email: actualEmail, password })
          .then(async () => {
            setActualEmail(newEmail);
            dispatch(
              updateUserState({
                email: newEmail,
              })
            );
            console.log(newEmail);
            console.log(userId);
            await UserAPI.updateUserEmail(newEmail, userId);
            toastMessage("Votre email a bien été modifié", "success");
          })
          .catch((err) => {
            setActualEmail(email);
            console.error(err);
            if (err?.response?.status === 401) {
              setIsError(true);
              return setErrorMessage("Mot de passe incorrect");
            }

            toastMessage(
              "Une erreur est survenue, veuillez réessayer plus tard",
              "error"
            );
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((err) => {
        setIsError(true);
        setErrorMessage(err.errors[0]);
        setIsLoading(false);
      });
  };

  return (
    <div className="email-container">
      <h2>Adresse email</h2>

      <div className="input-container">
        <Text className="text-white">
          Votre adresse email actuelle : {actualEmail}
        </Text>
        <TextInput
          icon={AiFillLock}
          type="password"
          value={password}
          placeholder="Entrez votre mot de passe"
          onChange={(e) => setPassword(e.target.value)}
          error={errorMessage === "Mot de passe incorrect"}
        ></TextInput>
        <TextInput
          value={newEmail}
          icon={MdOutlineAlternateEmail}
          placeholder="Entrez votre nouvel email"
          onChange={(e) => setNewEmail(e.target.value)}
          error={errorMessage.includes("email")}
        ></TextInput>
        {isError && (
          <Text className="text-red-500 text-base">{errorMessage}</Text>
        )}
      </div>

      <Button
        disabled={!(password && newEmail)}
        onClick={() => {
          onSubmit();
        }}
        loading={isLoading}
      >
        Modifier mon email
      </Button>
    </div>
  );
};
