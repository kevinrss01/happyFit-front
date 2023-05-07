import { Fragment, useCallback, useEffect, useState } from "react";
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
  const [tempState, setTempState] = useState({ programs: [] });
  const [weekIndex, setWeekIndex] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProgram());
    axios.get("/api/hello").then((data) => {
      setTempState(data.data);
      dispatch(getProgramSuccess(data.data));
    });
  }, [dispatch]);

  console.log("state", programs);

  const goForward = useCallback(() => {
    setWeekIndex((prevIndex) => prevIndex + 1);
  }, []);

  const goBackward = useCallback(() => {
    setWeekIndex((prevIndex) => prevIndex - 1);
  }, []);

  if (tempState.programs.length == 0) return <>Loading...</>;

  return (
    <Navbar>
      <div className="program-navigator-container">
        <ProgramNavigator
          limit={tempState.programs.length}
          index={weekIndex}
          goBackward={goBackward}
          goForward={goForward}
          creationDate={tempState.programs[weekIndex - 1].creationDate}
        />
        {tempState.programs[weekIndex - 1].sportPrograms.map((val) => (
          <Opener message={`Jour ${val.dayNumber} : ${val.trainingType}`}>
            <Link
              href={`/programs/${tempState.programs[weekIndex - 1].id}/${
                val.day
              }/échauffement`}
            >
              <button className="button-opener">Échauffements</button>
            </Link>
            <Link
              href={`/programs/${tempState.programs[weekIndex - 1].id}/${
                val.day
              }/exercice`}
            >
              <button className="button-opener">Exercices</button>
            </Link>
          </Opener>
        ))}
      </div>
    </Navbar>
  );
}
