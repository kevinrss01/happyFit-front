import React, { useState, useMemo, useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TopBarLogo from "../components/TopBarLogo";

const defaultFormValue = {
  firstName: "",
  lastName: "",
  email: "",
  sexe: "",
  password: "",
  visible: false,
};

function ProfileForm({ validate }) {
  const [formValue, setFormValue] = useState(defaultFormValue);

  useEffect(() => {
    if (typeof window !== undefined) {
      const prevValues = sessionStorage.getItem("personalInformations");
      prevValues && setFormValue(JSON.parse(prevValues));
    }
  }, []);

  const { firstName, lastName, email, sexe, password, visible } = useMemo(
    () => formValue,
    [formValue]
  );

  const handleChange = useCallback((event) => {
    setFormValue((prevForm) => ({
      ...prevForm,
      [event.target.id]: event.target.value,
    }));
  }, []);

  const handleVisibleClick = useCallback(() => {
    setFormValue((prevForm) => ({
      ...prevForm,
      visible: !prevForm.visible,
    }));
  }, []);

  /*
    function written in case we decide to handle the number type on our own to parse data (html number type accepts - and + which can be problematic depending on the format when want to save)
     */
  const numIsInRightFormat = useCallback((num) => {
    const regex = /[`!@#$%^&*()_\-=\[\]{};':"\\|,.<>\/?~]| [a-z]|[A-Z]/;
    return !regex.test(num);
  }, []);

  const GenderLogo = useCallback(() => {
    switch (sexe) {
      case "man":
        return <i className="fa fa-mars"></i>;
      case "woman":
        return <i className="fa fa-venus"></i>;
      default:
        return <i className="fa fa-venus-mars"></i>;
    }
  }, [formValue]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const { visible, ...formValues } = formValue;
      sessionStorage.setItem(
        "personalInformations",
        JSON.stringify({ ...formValues, visible: false })
      );
      validate("personal", formValues);
    },
    [formValue]
  );

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <TopBarLogo />
      <h2>Mon profil</h2>
      <div className="input-form">
        <input
          id="firstName"
          value={firstName}
          placeholder="Prénom"
          onChange={handleChange}
        />
      </div>
      <div className="input-form">
        <input
          id="lastName"
          value={lastName}
          placeholder="Nom"
          onChange={handleChange}
        />
      </div>
      <div className="input-form">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 logo"
        >
          <path
            strokeLinecap="round"
            d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
          />
        </svg>
        <input
          id="email"
          value={email}
          placeholder="E-mail"
          onChange={handleChange}
        />
      </div>
      <div className="input-form">
        <GenderLogo />
        <select id="sexe" onChange={handleChange} defaultValue={sexe}>
          {!sexe && (
            <option hidden selected>
              Genre
            </option>
          )}
          <option value="man">Homme</option>
          <option value="woman">Femme</option>
        </select>
      </div>
      <div className="input-form">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 logo"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
        <input
          onChange={handleChange}
          id="password"
          type={visible ? "text" : "password"}
          placeholder="Mot de passe"
          value={password}
        />
        {visible ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleVisibleClick}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 logo visible"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="visible"
            onClick={handleVisibleClick}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            // style={style}
            className="w-6 h-6 visible"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        )}
      </div>
      <button type="submit" className="submit-button">
        {" "}
        Continuer
      </button>
    </form>
  );
}

export default ProfileForm;
