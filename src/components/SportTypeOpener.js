export default function SportTypeOpener({ program, isExercice }) {
  const sportSession = program[isExercice ? "exercices" : "echauffements"];
}
