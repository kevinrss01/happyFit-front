/* eslint-disable react/no-unescaped-entities */
import React, { Fragment, useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionList,
  Button,
  TextInput,
  Title,
} from "@tremor/react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiMailSendLine } from "react-icons/ri";
import UserAPI from "@/services/API/UserAPI";
import toastMessage from "@/utils/toastMessage";
import { ModalTremor } from "../modals/ModalTremor";
import { LoginModalContentProps, LoginModalProps } from "@/types/propsTypes";

export const LoginModalContent: React.FC<LoginModalContentProps> = ({
  errorMessage,
  setEmail,
  email,
  isLoading,
  onSubmit,
  emailSent,
}) => {
  return (
    <>
      <Title className="text-center">Centre d'assistance</Title>
      <AccordionList className="max-w-md mx-auto m-10">
        <Accordion>
          <AccordionHeader>J'ai oublié mon mot de passe</AccordionHeader>
          <AccordionBody>
            Pour réinitialiser votre mot de passe veuillez rentrer l’e-mail lié
            à votre compte, si un compte Happy Fit est associé à cet e-mail vous
            recevrez les instructions par mail.
            <br />
            <TextInput
              className="mt-5"
              placeholder="Entrez votre e-mail"
              icon={MdOutlineAlternateEmail}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errorMessage}
              errorMessage={errorMessage}
            ></TextInput>
            <Button
              disabled={!email || emailSent}
              icon={RiMailSendLine}
              onClick={() => onSubmit()}
              className={`mt-5`}
              loading={isLoading}
            >
              Envoyer
            </Button>
          </AccordionBody>
        </Accordion>
        <Accordion>
          <AccordionHeader>J'ai un autre problème</AccordionHeader>
          <AccordionBody>
            Si vous avez un autre problème, vous pouvez nous contacter à
            l'adresse mail suivante : <b>happyfitapp.pro@gmail.com</b>
          </AccordionBody>
        </Accordion>
      </AccordionList>
    </>
  );
};

const LoginModal: React.FC<LoginModalProps> = ({ isOpenModal, closeModal }) => {
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const onSubmit = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      if (!email.match(/.*@.*[.].*/)) {
        setErrorMessage("Veuillez entrer un email valide");
        return;
      }

      await UserAPI.updatePasswordByMail(email);
      toastMessage("Un email vous a été envoyé.", "success");
      setEmailSent(true);
    } catch (error: any) {
      console.error(error);
      if (error?.response?.data?.message === "Email not found") {
        setErrorMessage("Cet email n'est pas associé à un compte Happy Fit");
      } else {
        toastMessage(
          "Une erreur est survenue, veuillez réessayer plus tard",
          "error"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ModalTremor
        isOpenModalState={isOpenModal}
        closeModal={closeModal}
        isLoadingButtonState={isLoading}
      >
        <LoginModalContent
          errorMessage={errorMessage}
          setEmail={setEmail}
          emailSent={emailSent}
          isLoading={isLoading}
          email={email}
          onSubmit={onSubmit}
        />
      </ModalTremor>
    </>
  );
};

export default LoginModal;
