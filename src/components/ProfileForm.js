import React, { useState, useMemo, useCallback, useEffect } from "react";
import TopBarLogo from "../components/TopBarLogo";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { BiLockAlt } from "react-icons/bi";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

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
  // const numIsInRightFormat = useCallback((num) => {
  //   const regex = /[`!@#$%^&*()_\-=\[\]{};':"\\|,.<>\/?~]| [a-z]|[A-Z]/;
  //   return !regex.test(num);
  // }, []);

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
        <MdOutlineAlternateEmail />
        <input
          id="email"
          value={email}
          type="email"
          placeholder="E-mail"
          onChange={handleChange}
          type="email"
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
          defaultValue={"Genre"}
        </select>
      </div>
      <div className="input-form">
        <BiLockAlt />
        <input
          onChange={handleChange}
          id="password"
          type={visible ? "text" : "password"}
          placeholder="Mot de passe"
          value={password}
        />
        {visible ? (
          <AiOutlineEyeInvisible
            onClick={handleVisibleClick}
            id="visible"
            className="w-6 h-6 visible"
          />
        ) : (
          <AiOutlineEye
            className="w-6 h-6 visible"
            onClick={handleVisibleClick}
          />
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
