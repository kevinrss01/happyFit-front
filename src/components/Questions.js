import React, { useState, useCallback, useId } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import TopBarLogo from "./TopBarLogo";

const defaultQuestions = {
  sportExperienceInYears: [
    { text: "Débutant", selected: false, value: 0 },
    { text: "Intermédiaire (1 an)", selected: false, value: 1 },
    { text: "Avancé (2 ans et plus)", selected: false, value: 2 },
  ],
  fitnessGoal: [
    { text: "Perte de poids", selected: false, value: "lose weight" },
    { text: "Prise de masse", selected: false, value: "gain muscle" },
    { text: "Remise en forme", selected: false, value: "fitness" },
  ],
  availableTimePerSessionInMinutes: [
    { text: "15 minutes", selected: false, value: 15 },
    { text: "30 minutes", selected: false, value: 30 },
    { text: "45 minutes", selected: false, value: 45 },
    { text: "1 heure", selected: false, value: 60 },
    { text: "1h15", selected: false, value: 75 },
    { text: "1h30", selected: false, value: 90 },
  ],
  "Combien de session voulez-vous faire par semaines ?": [
    { text: "option 1", selected: false, value: "" },
    { text: "option 2", selected: false, value: "" },
    { text: "option 3", selected: false, value: "" },
    { text: "option 4", selected: false, value: "" },
  ],
  trainingPlace: [
    { text: "À la maison/Au streetworkout", selected: false, value: "home" },
    { text: "En salle de sport", selected: false, value: "gym" },
  ],
};

const questionsAndFields = {
  sportExperienceInYears: "Quel est votre niveau actuel ?",
  fitnessGoal: "Quels est votre objectifs ?",
  trainingPlace: "Où est-ce que vous souhaitez vous entrainer ?",
  availableTimePerSessionInMinutes:
    "Combien de temps souhaitez-vous vous entrainer par jour ?",
};

const selectedStyle = {
  backgroundColor: "#3e8bd0",
  color: "white",
  border: "1px solid #3e8bd0",
};

const defaultStyle = {
  backgroundColor: "inherit",
  color: "inherit",
};

const generateKey = (key) => `${key}_${new Date().getTime()}`;

function Questions({ validate, goBack }) {
  const questionsSaved = sessionStorage.getItem("questionsSaved");
  const [questions, setQuestions] = useState(
    questionsSaved ? JSON.parse(questionsSaved) : defaultQuestions
  );

  const handleClick = useCallback(
    (question, textValue) => {
      setQuestions((prevQuestions) => ({
        ...prevQuestions,
        [question]: prevQuestions[question].map(
          ({ text, selected, value }) => ({
            text,
            selected: !selected && text === textValue,
            value,
          })
        ),
      }));
    },
    [questions]
  );

  const submit = useCallback(() => {
    if (
      Object.keys(questionsAndFields).every((key) =>
        questions[key].some((val) => val.selected)
      )
    ) {
      sessionStorage.setItem("questionsSaved", JSON.stringify(questions));
      const selectedAnswers = Object.keys(questionsAndFields).reduce(
        (obj, key) => ({
          ...obj,
          [key]: questions[key].find((value) => value.selected).value,
        }),
        {}
      );
      const { value } = document.getElementById("select-sessions-per-week");
      sessionStorage.setItem("sessionsPerWeek", value);
      validate("metrics", {
        ...selectedAnswers,
        numberOfSessionPerWeek: parseInt(value),
      });
      // setQuestions(defaultQuestions);
    }
  }, [questions]);

  const keyId = useId();
  const keyIdBis = useId();

  return (
    <div className="column-container">
      <TopBarLogo />
      <h2
        className="title-inscription-form"
        style={{ width: "100%", marginTop: "20px" }}
      >
        <IoArrowBackCircleOutline className="icon" onClick={goBack} />
        <span>Paramètres de séance</span>
      </h2>

      {Object.keys(questionsAndFields).map((key) => {
        return (
          <div key={generateKey(key)}>
            <h2 style={{ textAlign: "center" }}>{questionsAndFields[key]}</h2>
            <div className="container gap-10">
              {questions[key].map(({ text, selected }) => {
                return (
                  <button
                    className="selection-button"
                    key={generateKey(text)}
                    onClick={() => handleClick(key, text)}
                    style={selected ? selectedStyle : defaultStyle}
                  >
                    {text}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="container-column" style={{ marginBottom: 10 }}>
        <h2>Combien de séances pouvez-vous faire par semaine ?</h2>
        <div className="container gap-10" style={{ marginTop: "20px" }}>
          <span>Nombre de séances :</span>
          <select
            id="select-sessions-per-week"
            style={{ width: 50, textAlign: "center", cursor: "pointer" }}
            defaultValue={sessionStorage.getItem("sessionsPerWeek") || 2}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
          </select>
        </div>
      </div>
      <button className="submit-button" onClick={submit}>
        Continuer
      </button>
    </div>
  );
}

export default Questions;
