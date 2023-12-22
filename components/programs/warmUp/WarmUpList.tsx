"use client";

import { useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import { Card, Button, Title, Text } from "@tremor/react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/userSlice";
import { WarmUpExercise, SportProgram } from "@/types/programTypes";
import Link from "next/link";
import BreadcrumbsNavigation from "@/components/programs/BreadcrumbsNavigation";
const WarmUpList = () => {
  const [warmUpList, setWarmUpList] = useState<WarmUpExercise[]>([]);
  const [actualProgram, setActualProgram] = useState<SportProgram>();

  const { programId, day } = useParams();
  const { programs } = useSelector(selectUser);

  useEffect(() => {
    const actualProgram = programs.find((program) => program.id === programId);
    if (!actualProgram) return;

    const actualDay = actualProgram.sportPrograms[parseInt(day as string)];
    setActualProgram(actualDay);
    setWarmUpList(actualDay?.warmUp || []);
  }, [day, programId, programs]);

  return (
    <main className="page sport-type-container">
      {warmUpList.length === 0 ? (
        <Title className="text-white">Aucun échauffement trouvé</Title>
      ) : (
        <>
          <BreadcrumbsNavigation />
          <Title className="title-list">
            Échauffements axé {actualProgram?.trainingType}
          </Title>
          <div className="flex-container">
            {warmUpList.map(({ exerciseNumber, exerciseName }, index) => (
              <Card key={`opener-forWarmUp-${index}`} className="warm-up-card">
                <Title className="title-card-list text-white">
                  Échauffement n°{exerciseNumber} : {exerciseName}
                </Title>
                <Link href={`/programs/${programId}/${day}/warmup/${index}`}>
                  <Button icon={BiDetail}>Voir en détail</Button>
                </Link>
              </Card>
            ))}
            <Text className="text-white">Échauffement terminé ?</Text>
            <Button icon={AiOutlineArrowRight} onClick={() => {}}>
              Commencer les exercices
            </Button>
          </div>
        </>
      )}
    </main>
  );
};

export default WarmUpList;
