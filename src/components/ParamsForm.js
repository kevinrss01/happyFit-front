import { useCallback, useRef, useState } from "react";

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
      <h2 className="title-inscription-form" style={{ width: "100%" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 logo"
          onClick={goBack}
          style={{ alignSelf: "center", transform: "scale(1.3)" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Paramètres personnels</span>
      </h2>
      <div className="container" style={{ flexDirection: "column", gap: 15 }}>
        <div className="input-form">
          <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="1em"
            width="1em"
          >
            <path d="M288 96c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32zm58.5 32c3.5-10 5.5-20.8 5.5-32 0-53-43-96-96-96s-96 43-96 96c0 11.2 1.9 22 5.5 32H120c-22 0-41.2 15-46.6 36.4l-72 288c-3.6 14.3-.4 29.5 8.7 41.2S33.2 512 48 512h416c14.8 0 28.7-6.8 37.8-18.5s12.3-26.8 8.7-41.2l-72-288C433.2 143 414 128 392 128h-45.5z" />
          </svg>
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
          <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
            <path d="M7 2c1.78 0 2.67 2.16 1.42 3.42C7.16 6.67 5 5.78 5 4a2 2 0 012-2M5.5 7h3a2 2 0 012 2v5.5H9V22H5v-7.5H3.5V9a2 2 0 012-2M19 8h2l-3-4-3 4h2v8h-2l3 4 3-4h-2m3-14h-8v2h8m0 16h-8v2h8" />
          </svg>
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
          <svg
            viewBox="0 0 1024 1024"
            fill="currentColor"
            height="1em"
            width="1em"
            onClick={() => calendarRef.current.showPicker()}
          >
            <path d="M112 880c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V460H112v420zm768-696H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v176h800V216c0-17.7-14.3-32-32-32z" />
          </svg>
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
      <div className="container" style={{ marginTop: 15 }}>
        <button type="submit" className="submit-button">
          Confirmer
        </button>
      </div>
    </form>
  );
}
