import React, { useState, useCallback, useId } from "react";

const defaultQuestions = {
  sportExperienceInYears: [
    { text: "Débutant", selected: false, value: 0 },
    { text: "Intermédiaire (1 an)", selected: false, value: 1 },
    { text: "Avancé (2ans+)", selected: false, value: 2 },
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
  trainingPlace: "Vous entrainez plus souvent",
  availableTimePerSessionInMinutes:
    "Combien de temps souhaitez-vous vous entrainer par jour ?",
};

const selectedStyle = {
  backgroundColor: "white",
  color: "black",
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
        <div className="container gap-10">
          <span>Nombre de séances :</span>
          <select
            id="select-sessions-per-week"
            style={{ width: 50, textAlign: "center" }}
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
