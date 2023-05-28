import Link from "next/link";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import WarmUpList from "../../../../../components/SportComponents/WarmUpList";
import ExerciseList from "../../../../../components/SportComponents/ExerciseList";

const componentSelector = {
  exercices: {
    SportTypeComponent: ExerciseList,
    props: ({ exercises }) => ({ exercises }),
    sportTypeName: "Exercice",
  },
  warmUp: {
    SportTypeComponent: WarmUpList,
    props: ({ warmUp }) => ({ warmUps: warmUp }),
    sportTypeName: "Échauffement",
  },
};

export default function SportTypePage({ program, day, sportType }) {
  const { programs, isFetching } = useSelector((state) => state.sport);
  const sportTypeField = useMemo(
    () => (sportType === "exercice" ? "exercices" : "warmUp"),
    [sportType]
  );

  const { SportTypeComponent, props, sportTypeName } = useMemo(() => {
    if (sportTypeField in componentSelector)
      return componentSelector[sportTypeField];

    return {
      SportTypeComponent: () => <></>,
      props: () => ({}),
      sportTypeName: "",
    };
  }, [sportTypeField]);

  console.count("render");
  console.log("data status", programs, isFetching);

  if (!programs.length || isFetching) return <>Loading...</>;

  const currentProgram = programs.find(({ id }) => id === program);

  const currentSession = currentProgram.sportPrograms.find(
    ({ dayNumber }) => dayNumber.toString() === day
  );

  console.log("current session", currentSession);

  return (
    <div style={{ color: "white" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Link href="/">
          <i className="fa fa-arrow-circle-left" style={{ color: "white" }}></i>
        </Link>
        <h1 style={{ textAlign: "center", width: "100%" }}>
          {sportTypeName}s centrés sur le {currentSession.trainingType}
        </h1>
      </div>
      <SportTypeComponent {...props(currentSession)} />
    </div>
  );
}

export async function getServerSideProps(context) {
  return { props: context.params };
}
