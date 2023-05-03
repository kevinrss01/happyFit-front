import React, { useCallback, useRef, useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaWeightHanging, FaBirthdayCake } from "react-icons/fa";
import { GiBodyHeight } from "react-icons/gi";
import { FcFlashOn } from "react-icons/fc";
import TopBarLogo from "./TopBarLogo";
function removePureYears(years) {
  this.setFullYear(this.getFullYear() - years);
  this.setHours(1);
  this.setMinutes(0);
  return this;
}

const minimumBirthDayToBeMajor = Reflect.apply(removePureYears, new Date(), [
  16,
]);

const defaultData = {
  heightInCentimeters: 0,
  weightInKilos: 0,
  birthday: "",
};

export default function ParamsForm({ validate, goBack }) {
  const [formValue, setFormValue] = useState(defaultData);
  const { heightInCentimeters, weightInKilos, birthday } = formValue;
  const calendarRef = useRef();

  const handleChange = useCallback((event) => {
    const { id, value, type } = event.target;
    if (id === "birthday") {
      const date = new Date(value);
      if (date.getTime() > minimumBirthDayToBeMajor.getTime()) {
        event.nativeEvent.returnValue = false;
        return;
      }
    }
    setFormValue((prevForm) => ({
      ...prevForm,
      [id]: type === "number" ? parseInt(value) : value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (Object.keys(formValue).every((key) => !!formValue[key])) {
        validate("params", formValue);
      }
    },
    [formValue]
  );

  return (
    <form onSubmit={handleSubmit} className="container-column">
      <TopBarLogo />
      <h2
        className="title-inscription-form"
        style={{ width: "100%", margin: "20px 0" }}
      >
        <IoArrowBackCircleOutline className="icon" onClick={goBack} />
        <span>Paramètres personnels</span>
      </h2>
      <div className="container" style={{ flexDirection: "column", gap: 15 }}>
        <div className="input-form">
          <FaWeightHanging />
          <input
            id="weightInKilos"
            onChange={handleChange}
            type="number"
            min={40}
            max={200}
            placeholder="Poids en kilos"
            className=""
          />
        </div>
        <div className="input-form">
          <GiBodyHeight />
          <input
            id="heightInCentimeters"
            onChange={handleChange}
            type="number"
            min={100}
            max={250}
            placeholder="Taille en cm"
            className=""
          />
        </div>
        <div className="input-form">
          <FaBirthdayCake />
          <input
            ref={calendarRef}
            id="birthday"
            type="date"
            defaultValue={minimumBirthDayToBeMajor.toJSON().substring(0, 10)}
            max={minimumBirthDayToBeMajor}
            onChange={handleChange}
            placeholder="Date de naissance"
            style={{ textAlign: "center" }}
          />
        </div>
      </div>
      <div
        className="container"
        style={{
          marginTop: 15,
        }}
      >
        <button
          type="submit"
          className="submit-button"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Créer mon programme personnalisé{" "}
          <FcFlashOn style={{ fontSize: "20px" }} />
        </button>
      </div>
    </form>
  );
}
