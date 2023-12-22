import React from "react";
import { ProgramCardProps } from "@/types/propsTypes";
import { Title } from "@tremor/react";
import Tilt from "react-parallax-tilt";

const getRandomNumber = (typeOfTraining: string, max: number) => {
  const number = Math.floor(Math.random() * max) + 1;
  return typeOfTraining + number;
};

const getBackgroundImage = (typeOfTraining: string) => {
  const types = [
    { keyword: "full-body", value: getRandomNumber("full-body", 3) },
    { keyword: "haut du corps", value: getRandomNumber("high-body", 2) },
    { keyword: "cardio", value: getRandomNumber("cardio", 2) },
    { keyword: "bas du corps", value: "legs" },
  ];

  for (const type of types) {
    if (typeOfTraining.includes(type.keyword)) {
      return type.value;
    }
  }

  return "full-body";
};

const ProgramCard: React.FC<ProgramCardProps> = ({ title, children, sexe }) => {
  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.4}
      glareColor="#ffffff"
      glarePosition="top"
      glareBorderRadius="20px"
    >
      <div className={`card ${sexe}-${getBackgroundImage(title)}`}>
        <div className="title-container">
          <Title className="title-card text-white">{title}</Title>
        </div>
        <div className="button-container">{children}</div>
      </div>
    </Tilt>
  );
};

export default ProgramCard;
