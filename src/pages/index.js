import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProgram, getProgramSuccess } from "../redux/actions/sportActions";
import Opener from "../components/Opener";
import axios from "axios";
import ProgramNavigator from "../components/ProgramNavigator";
import Link from "next/link";
import { Navbar } from "../components/Navbar";

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

  const {
    creationDate,
    sportPrograms,
    id: programId,
  } = useMemo(
    () =>
      programs.length
        ? programs[weekIndex - 1]
        : { creationDate: "", sportPrograms: [], id: 0 },
    [programs, weekIndex]
  );

  if (programs.length == 0) return <>Loading...</>;

  return (
    <Navbar>
      <div className="program-navigator-container">
        <ProgramNavigator
        limit={programs.length}
        index={weekIndex}
        goBackward={goBackward}
        goForward={goForward}
        creationDate={creationDate}
      />
      {sportPrograms.map((val) => (
        <Opener
          message={`Jour ${val.dayNumber} : ${val.trainingType}`}
          key={`day-${val.dayNumber}-program-${programId}`}
        >
          <Link href={`/programs/${programId}/${val.dayNumber}/échauffement`}>
            <button className="button-opener">Échauffements</button>
          </Link>
          <Link href={`/programs/${programId}/${val.dayNumber}/exercice`}>
            <button className="button-opener">Exercices</button>
          </Link>
        </Opener>
      ))}
      </div>
    </Navbar>
  );
}
