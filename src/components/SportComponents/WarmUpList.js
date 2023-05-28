import FlexContainer from "../Containers/FlexContainer";
import Opener from "../Opener";

export default function WarmUpList({ warmUps }) {
  if (!Array.isArray(warmUps)) return <></>;

  return (
    <FlexContainer flexDirection="column">
      {warmUps.map(({ exerciseNumber, exerciseName }, index) => (
        <button className="button-opened" key={`opener-forWarmUp-${index}`}>
          Échauffement n°{exerciseNumber} : {exerciseName}
        </button>
      ))}
    </FlexContainer>
  );
}
