import { Card, Button, Title } from "@tremor/react";
import { BiDetail } from "react-icons/bi";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/userSlice";
import { useEffect, useState } from "react";
import { Exercise, SportProgram, CardioExercise } from "@/types/programTypes";
import BreadcrumbsNavigation from "@/components/programs/BreadcrumbsNavigation";
import Link from "next/link";

const ExerciseList = () => {
  const [exercisesList, setExercisesList] = useState<
    Exercise[] | CardioExercise[]
  >([]);
  const [actualProgram, setActualProgram] = useState<SportProgram>();

  const { programId, day } = useParams();
  const { programs } = useSelector(selectUser);

  useEffect(() => {
    const actualProgram = programs.find((program) => program.id === programId);
    if (!actualProgram) return;

    const actualDay = actualProgram.sportPrograms[parseInt(day as string)];
    setActualProgram(actualDay);
    setExercisesList(actualDay?.exercises || []);
  }, [day, programId, programs]);

  return (
    <main className="page sport-type-container">
      <BreadcrumbsNavigation />
      <Title className="title-list">
        Exercices axé {actualProgram?.trainingType}
      </Title>
      <div className="flex-container">
        {exercisesList.map(({ exerciseName }, index) => (
          <Card key={`opener-forWarmUp-${index}`} className="warm-up-card">
            <Title className="title-card-list text-white">
              {index + 1} - {exerciseName}
            </Title>
            <Link href={`/programs/${programId}/${day}/exercise/${index}`}>
              <Button icon={BiDetail}>Voir en détail</Button>
            </Link>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default ExerciseList;
