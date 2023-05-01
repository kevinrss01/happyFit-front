import Link from "next/link";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const capitalize = (str) => {
  const firstLetter = str.substring(0, 1).toUpperCase();
  const restOfLetter = str.substring(1, str.length);
  return `${firstLetter}${restOfLetter}`;
};

export default function sportTypePage({ program, day, sportType }) {
  const { programs } = useSelector((state) => state.sport);
  const sportTypeField = useMemo(() => {
    const field = sportType.replace("é", "e");
    return `${field}s`;
  }, [sportType]);

  // const currentProgram = programs.sportPrograms.find(
  //   ({ numeroJour }) => numeroJour.toString() === day
  // );
  // console.log(currentProgram[sportTypeField], currentProgram);

  const currentProgram = programs.find(({ id }) => id === program);
  const currentSession = currentProgram.sportPrograms.find(
    ({ numeroJour }) => numeroJour.toString() === day
  );

  return (
    <div style={{ color: "white" }}>
      <Link href="/">
        <i className="fa fa-arrow-circle-left"></i>
      </Link>
    </div>
  );
}

export async function getServerSideProps(context) {
  return { props: context.params };
}
