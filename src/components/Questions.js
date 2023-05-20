import React, { useState, useCallback } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import {
  TbSquareRoundedNumber1Filled,
  TbSquareRoundedNumber2Filled,
  TbSquareRoundedNumber3Filled,
  TbSquareRoundedNumber4Filled,
  TbSquareRoundedNumber5Filled,
  TbSquareRoundedNumber6Filled,
  TbSquareRoundedNumber7Filled,
} from "react-icons/tb";
import {
  GiMeditation,
  GiBodyBalance,
  GiWeight,
  GiMuscleFat,
  GiGymBag,
} from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import { BiRun, BiTimer } from "react-icons/bi";
import { MdEmojiPeople } from "react-icons/md";
import { ImListNumbered } from "react-icons/im";
import { Button, SelectBox, SelectBoxItem } from "@tremor/react";
import toastMessage from "../utils/toast";

const icon = GiMeditation;

const defaultQuestions = {
  sportExperienceInYears: [
    { text: "Débutant", selected: false, value: 0, icon: MdEmojiPeople },
    {
      text: "Intermédiaire (1 an)",
      selected: false,
      value: 1,
      icon: GiBodyBalance,
    },
    {
      text: "Avancé (2 ans et plus)",
      selected: false,
      value: 2,
      icon: GiMeditation,
    },
  ],
  fitnessGoal: [
    {
      text: "Perte de poids",
      selected: false,
      value: "lose weight",
      icon: GiWeight,
    },
    {
      text: "Prise de masse",
      selected: false,
      value: "gain muscle",
      icon: GiMuscleFat,
    },
    { text: "Remise en forme", selected: false, value: "fitness", icon: BiRun },
  ],
  availableTimePerSessionInMinutes: [
    { text: "15 minutes", selected: false, value: 15, icon: BiTimer },
    { text: "30 minutes", selected: false, value: 30, icon: BiTimer },
    { text: "45 minutes", selected: false, value: 45, icon: BiTimer },
    { text: "1 heure", selected: false, value: 60, icon: BiTimer },
    { text: "1h15", selected: false, value: 75, icon: BiTimer },
    { text: "1h30", selected: false, value: 90, icon: BiTimer },
  ],
  "Combien de session voulez-vous faire par semaines ?": [
    { text: "option 1", selected: false, value: "" },
    { text: "option 2", selected: false, value: "" },
    { text: "option 3", selected: false, value: "" },
    { text: "option 4", selected: false, value: "" },
  ],
  trainingPlace: [
    { text: "À la maison", selected: false, value: "home", icon: IoHome },
    {
      text: "En salle de sport",
      selected: false,
      value: "gym",
      icon: GiGymBag,
    },
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
  const [numberOfSessionPerWeek, setNumberOfSessionPerWeek] = useState("");

  const handleClick = useCallback(
    (question, textValue) => {
      console.log("question", question);
      console.log("textValue", textValue);
      setQuestions((prevQuestions) => ({
        ...prevQuestions,
        [question]: prevQuestions[question].map(
          ({ text, selected, value, icon }) => ({
            text,
            selected: !selected && text === textValue,
            value,
            icon,
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
      console.log("numberOfSessionPerWeek", numberOfSessionPerWeek);
      sessionStorage.setItem("sessionsPerWeek", numberOfSessionPerWeek);
      console.log("selectedAnswers", selectedAnswers);
      validate("metrics", {
        ...selectedAnswers,
        numberOfSessionPerWeek: parseInt(numberOfSessionPerWeek),
      });
    } else {
      toastMessage("Veuillez répondre à toutes les questions", "error");
    }
  }, [questions, numberOfSessionPerWeek]);

  return (
    <div className="column-container">
      <h2
        className="title-inscription-form"
        style={{ width: "100%", marginTop: "20px", fontSize: "1.5rem" }}
      >
        <IoArrowBackCircleOutline className="icon" onClick={goBack} />
        <span>Paramètres de séance</span>
      </h2>

      {Object.keys(questionsAndFields).map((key) => {
        return (
          <div key={generateKey(key)} className="question-container">
            <h2 style={{ textAlign: "center" }}>{questionsAndFields[key]}</h2>
            <div className="container gap-10">
              {questions[key].map(({ text, selected, icon }) => {
                return (
                  <Button
                    className="selection-button"
                    key={generateKey(text)}
                    onClick={() => handleClick(key, text)}
                    variant={selected ? "primary" : "secondary"}
                    disabled={selected && true}
                    style={{ transform: selected && "scale(1)" }}
                    icon={icon ? icon : undefined}
                  >
                    {text}
                  </Button>
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="container-column" style={{ marginBottom: 10 }}>
        <h2>Combien de séances pouvez-vous faire par semaine ?</h2>
        <div className="container gap-10" style={{ marginTop: "20px" }}>
          <SelectBox
            id="select-sessions-per-week"
            defaultValue={
              sessionStorage.getItem("sessionsPerWeek")
                ? sessionStorage.getItem("sessionsPerWeek")
                : "1"
            }
            placeholder="Nombre de séances par semaine"
            icon={ImListNumbered}
            onValueChange={(value) => setNumberOfSessionPerWeek(value)}
          >
            <SelectBoxItem
              value="1"
              text="1 séance"
              icon={TbSquareRoundedNumber1Filled}
            />
            <SelectBoxItem
              value="2"
              text="2 séances"
              icon={TbSquareRoundedNumber2Filled}
            />
            <SelectBoxItem
              value="3"
              text="3 séances"
              icon={TbSquareRoundedNumber3Filled}
            />
            <SelectBoxItem
              value="4"
              text="4 séances"
              icon={TbSquareRoundedNumber4Filled}
            />
            <SelectBoxItem
              value="5"
              text="5 séances"
              icon={TbSquareRoundedNumber5Filled}
            />
            <SelectBoxItem
              value="6"
              text="6 séances"
              icon={TbSquareRoundedNumber6Filled}
            />
            <SelectBoxItem
              value="7"
              text="7 séances"
              icon={TbSquareRoundedNumber7Filled}
            />
          </SelectBox>
        </div>
      </div>
      <Button
        className="submit-button"
        onClick={submit}
        style={{ margin: "80px 0", height: "45px" }}
        disabled={
          !Object.keys(questionsAndFields).every((key) =>
            questions[key].some((val) => val.selected)
          )
        }
      >
        Continuer
      </Button>
    </div>
  );
}

export default Questions;
