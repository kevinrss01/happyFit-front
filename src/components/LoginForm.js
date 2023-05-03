import Link from "next/link";
import React, { useState, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/actions/userActions";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FcLock } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import TopBarLogo from "./TopBarLogo";

const defaultFormValue = {
  email: "",
  password: "",
  visible: false,
};

const style = { width: 20, height: "auto" };

function LoginForm() {
  const [formValue, setFormValue] = useState(defaultFormValue);
  const dispatch = useDispatch();
  const { email, password, visible } = useMemo(() => formValue, [formValue]);

  const handleChange = useCallback(({ target }) => {
    const { value, id, checked, type } = target;
    setFormValue((prevForm) => ({
      ...prevForm,
      [id]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleVisibleClick = useCallback(() => {
    setFormValue((prevForm) => ({
      ...prevForm,
      visible: !prevForm.visible,
    }));
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const { visible, ...data } = formValue;
      dispatch(userLogin(data));
      setFormValue(defaultFormValue);
    },
    [formValue]
  );

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Connexion</h2>
      <div className="input-form">
        <MdOutlineAlternateEmail />
        <input
          onChange={handleChange}
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

      <button type="submit" className="button-login-form submit-button">
        {" "}
        Connexion
      </button>
      <div className="no-account">
        <span style={{ marginBottom: 5, fontFamily: "Rubik" }}>
          Pas encore inscrit ?{" "}
        </span>
        <Link href="/inscription">
          <a style={{ fontFamily: "Rubik", color: "#3e8bd0" }}>
            Je m&lsquo;inscris
          </a>
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
