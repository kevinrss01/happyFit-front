import { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProgram, getProgramSuccess } from "../redux/actions/sportActions";
import Opener from "../components/Opener";
import axios from "axios";
import ProgramNavigator from "../components/ProgramNavigator";
import Link from "next/link";

const numberFormater = (num) => `${num}${num == 1 ? "ère" : "e"}`;

export default function Home() {
  const { programs } = useSelector((state) => state.sport);
  const [weekIndex, setWeekIndex] = useState(1);
  const dispatch = useDispatch();

  const goForward = useCallback(() => {
    setWeekIndex((prevIndex) => prevIndex + 1);
  }, []);

  const goBackward = useCallback(() => {
    setWeekIndex((prevIndex) => prevIndex - 1);
  }, []);

  if (programs.length == 0) return <>Loading...</>;

  return (
    <div
      style={{
        dispaly: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
      }}
    >
      <ProgramNavigator
        limit={programs.length}
        index={weekIndex}
        goBackward={goBackward}
        goForward={goForward}
        creationDate={programs[weekIndex - 1].creationDate}
      />
      {programs[weekIndex - 1].sportPrograms.map((val) => (
        <Opener message={`Jour ${val.dayNumber} : ${val.trainingType}`}>
          <Link
            href={`/programs/${programs[weekIndex - 1].id}/${
              val.dayNumber
            }/échauffement`}
          >
            <button className="button-opener">Échauffements</button>
          </Link>
          <Link
            href={`/programs/${programs[weekIndex - 1].id}/${
              val.dayNumber
            }/exercice`}
          >
            <button className="button-opener">Exercices</button>
          </Link>
        </Opener>
      ))}
    </div>
  );
}
