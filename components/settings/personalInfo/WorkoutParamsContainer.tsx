/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Select, SelectItem } from "@tremor/react";
import {
  TbSquareRoundedNumber1Filled,
  TbSquareRoundedNumber2Filled,
  TbSquareRoundedNumber3Filled,
  TbSquareRoundedNumber4Filled,
  TbSquareRoundedNumber5Filled,
  TbSquareRoundedNumber6Filled,
  TbSquareRoundedNumber7Filled,
} from "react-icons/tb";
import { MdEmojiPeople } from "react-icons/md";
import { GiBodyBalance, GiGymBag, GiMeditation } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import { WorkoutParamsContainerProps } from "@/types/propsTypes";

const WorkoutParamsContainer = ({
  userData,
  onChangeInput,
}: WorkoutParamsContainerProps) => {
  return (
    <div className="params-workout-container">
      <Select
        defaultValue={userData?.numberOfSessionPerWeek?.toString() || "1"}
        placeholder="Nombre de séances par semaine..."
        onValueChange={(value) => {
          onChangeInput("numberOfSessionPerWeek", parseInt(value));
        }}
        className="input"
      >
        <SelectItem value="1" icon={TbSquareRoundedNumber1Filled}>
          Je veux m'entrainer 1 fois par semaine
        </SelectItem>
        <SelectItem value="2" icon={TbSquareRoundedNumber2Filled}>
          Je veux m'entrainer 2 fois par semaine
        </SelectItem>
        <SelectItem value="3" icon={TbSquareRoundedNumber3Filled}>
          Je veux m'entrainer 3 fois par semaine
        </SelectItem>
        <SelectItem value="4" icon={TbSquareRoundedNumber4Filled}>
          Je veux m'entrainer 4 fois par semaine
        </SelectItem>
        <SelectItem value="5" icon={TbSquareRoundedNumber5Filled}>
          Je veux m'entrainer 5 fois par semaine
        </SelectItem>
        <SelectItem value="6" icon={TbSquareRoundedNumber6Filled}>
          Je veux m'entrainer 6 fois par semaine
        </SelectItem>
        <SelectItem value="7" icon={TbSquareRoundedNumber7Filled}>
          Je veux m'entrainer 7 fois par semaine
        </SelectItem>
      </Select>
      <Select
        defaultValue={userData?.sportExperienceInYears?.toString() || "0"}
        placeholder="Mon exeprience sportive..."
        onValueChange={(value) => {
          onChangeInput("sportExperienceInYears", parseInt(value));
        }}
        className="input"
      >
        <SelectItem value="0" icon={MdEmojiPeople}>
          J'ai moins d'un an d'expérience
        </SelectItem>
        <SelectItem value="1" icon={GiBodyBalance}>
          J'ai un an d'expérience
        </SelectItem>
        <SelectItem value="2" icon={GiMeditation}>
          J'ai deux ans d'expérience
        </SelectItem>
      </Select>
      <Select
        defaultValue={userData?.trainingPlace || "home"}
        placeholder="Lieu d'entrainement..."
        className="input"
        onValueChange={(value) => {
          onChangeInput("trainingPlace", value);
        }}
      >
        <SelectItem value="home" icon={IoHome}>
          Je m'entraine à la maison
        </SelectItem>
        <SelectItem value="gym" icon={GiGymBag}>
          Je m'entraine à la salle de sport
        </SelectItem>
      </Select>
      <Select
        defaultValue={
          userData?.availableTimePerSessionInMinutes?.toString() || "60"
        }
        placeholder="Temps disponible par séance..."
        onValueChange={(value) => {
          onChangeInput("availableTimePerSessionInMinutes", parseInt(value));
        }}
        className="input"
      >
        <SelectItem value="15">
          J'ai 15 minutes disponibles par séance
        </SelectItem>
        <SelectItem value="30">
          J'ai 30 minutes disponibles par séance
        </SelectItem>
        <SelectItem value="45">
          J'ai 45 minutes disponibles par séance
        </SelectItem>
        <SelectItem value="60">
          J'ai 60 minutes disponibles par séance
        </SelectItem>
        <SelectItem value="90">
          J'ai 90 minutes disponibles par séance
        </SelectItem>
      </Select>
    </div>
  );
};

export default WorkoutParamsContainer;
