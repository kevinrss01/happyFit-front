/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import React, { useState, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
//import { userLogin } from "../../redux/actions/userActions";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FcLock } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Button } from "@tremor/react";
//import toastMessage from "@/utils/toastMessage";
import LoginModal from "./LoginModal";
import { LoginFormProps } from "@/types/propsTypes";
import { LoginDefaultFormValue } from "@/types/types";
import { initializeUserState, setAuth } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";
import AuthAPI from "@/services/API/authAPI";
import toastMessage from "@/utils/toastMessage";
import AxiosCallApi from "@/services/API/axios";

const defaultFormValue: LoginDefaultFormValue = {
  email: "",
  password: "",
  visible: false,
};

const LoginForm = ({ windowWith }: LoginFormProps) => {
  const [formValue, setFormValue] =
    useState<LoginDefaultFormValue>(defaultFormValue);
  const [loading, setLoading] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { email, password, visible } = useMemo(() => formValue, [formValue]);

  const router = useRouter();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, id } = event.target;
      setFormValue((prevForm) => ({
        ...prevForm,
        [id]: value,
      }));
    },
    []
  );

  const handleVisibleClick = useCallback(() => {
    setFormValue((prevForm) => ({
      ...prevForm,
      visible: !prevForm.visible,
    }));
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (formValue.email.match(/.*@.*[.].*/)) {
        setShowErrorMessage(false);
        setLoading(true);
        const { visible, ...emailAndPassword } = formValue;

        await AuthAPI.login(emailAndPassword)
          .then((userData) => {
            setFormValue(defaultFormValue);
            dispatch(initializeUserState(userData));
            localStorage.setItem(
              "tokens",
              JSON.stringify({
                accessToken: userData?.tokens?.accessToken,
                refreshToken: userData?.tokens?.refreshToken,
                userId: userData?.id,
              })
            );

            dispatch(setAuth(true));
            AxiosCallApi.saveTokenAxios(userData?.tokens?.accessToken);
            router.push("/");
          })
          .catch((error) => {
            if (error.toString().includes("credentials")) {
              setErrorMessage("Email ou mot de passe incorrect");
              setShowErrorMessage(true);
            } else if (error.toString().includes("Too many request")) {
              setErrorMessage(
                "Trop de tentatives de connexion, veuillez réessayer plus tard"
              );
              setShowErrorMessage(true);
            } else {
              toastMessage(
                "Oups ! Une erreur est survenue veuillez réessayer plus tard.",
                "error"
              );
            }
          })
          .finally(() => setLoading(false));
      } else {
        setErrorMessage("Veuillez entrer un email valide");
        setShowErrorMessage(true);
      }
    },
    [formValue]
  );

  return (
    <>
      <LoginModal closeModal={closeModal} isOpenModal={isModalOpen} />
      <form
        onSubmit={handleSubmit}
        className="login-form font-rubik"
        style={{
          borderRadius: windowWith < 1400 ? "0 0 0 0" : "10px 0 0 10px",
        }}
      >
        <h2>Connexion</h2>
        <div className="input-form font-rubik">
          <MdOutlineAlternateEmail />
          <input
            onChange={(event) => handleChange(event)}
            id="email"
            type="mail"
            placeholder="E-mail"
            value={email}
          />
        </div>
        <div className="password-container input-form">
          <FcLock />
          <input
            onChange={handleChange}
            id="password"
            type={visible ? "text" : "password"}
            placeholder="Mot de passe"
            value={password}
          />
          {visible ? (
            <AiFillEyeInvisible onClick={handleVisibleClick} className="icon" />
          ) : (
            <AiFillEye onClick={handleVisibleClick} className="icon" />
          )}
        </div>
        {showErrorMessage && (
          <div className="error-container">
            <span className="error-message">{errorMessage}</span>
          </div>
        )}

        <Button
          disabled={!(email.length > 4 && password.length > 7)}
          loading={loading}
          type="submit"
          className="button-submit"
        >
          <span className="text-base">Se connecter</span>
        </Button>

        <div className="link-container font-rubik">
          <div className="no-account">
            <span>Pas encore inscrit ? </span>
            <Link href="/register">
              <p
                style={{
                  color: "#3e8bd0",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Je m&lsquo;inscris
              </p>
            </Link>
          </div>
          <div className="login-issue">
            <span style={{ marginBottom: 5 }}>Problème de connexion ?</span>
            <p
              style={{
                color: "#3e8bd0",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => setIsModalOpen(true)}
            >
              Demander de l'aide
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
