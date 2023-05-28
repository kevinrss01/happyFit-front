import FlexContainer from "../Containers/FlexContainer";

export default function ExerciseList({ exercises }) {
  return (
    <FlexContainer flexDirection="column">
      {exercises.map(({ exerciseName }, index) => (
        <button className="button-opened" key={`opener-forExercise-${index}`}>
          {exerciseName}
        </button>
      ))}
    </FlexContainer>
  );
}
