// we need : exerciseName, instructions, numberOfSeries, repetition, rest

import { computeInMinutes, handlePlural } from "../../service/utils";

const textAlign = "center";
const centerStyle = { textAlign };

export default function WarmUp({
  exerciseNumber,
  exerciseName,
  instructions,
  numberOfSeries,
  repetition,
  rest,
}) {
  return (
    <div>
      <h2 style={centerStyle}>
        Échauffement n°{exerciseNumber} : {exerciseName}
      </h2>
      <p style={{ ...centerStyle, padding: 25 }}>
        {instructions} <br />
        Répétez cet échauffement sur{" "}
        {handlePlural(numberOfSeries, "série", true)} de{" "}
        {handlePlural(repetition, "répétition", true)} avec{" "}
        {computeInMinutes(rest)} de repos.
      </p>
    </div>
  );
}
