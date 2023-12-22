/* eslint-disable react/no-unescaped-entities */
"use client";
// we need : exerciseName, instructions, numberOfSeries, repetition, rest

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionList,
  Bold,
  Text,
  Icon,
} from "@tremor/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import WarmUpLoader from "@/components/loaders/programs/WarmupLoader";
import fetchMusclesGroupImg from "@/services/API/ExternalAPI";
import { exercisesDataList } from "@/constants/exercisesData";
import { BsQuestionLg } from "react-icons/bs";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/userSlice";
import { useParams, useRouter } from "next/navigation";
import { WarmUpExercise } from "@/types/programTypes";
import CustomNavigationBtns from "@/components/customs/CustomNavigationBtns";
import BreadcrumbsNavigation from "@/components/programs/BreadcrumbsNavigation";

const { warmUp } = exercisesDataList;

function splitExecutionIntoSteps(execution: string) {
  // The regex `(/(\. )(\d+\. )/g)` works as follows:
  // `(\. )`: Captures the period '.' followed by a space. This is our first capture group.
  // `(\d+\. )`: Captures one or more digits followed by a period '.' and a space. This is our second capture group.
  // These two capture groups are combined with the replacement string '$1||$2', effectively inserting the marker '||' while retaining the original periods.

  const markedText = execution.replace(/(\. )(\d+\. )/g, "$1||$2");

  return markedText.split("||").filter(Boolean);
}

const WarmUp = () => {
  const [muscleGroupImage, setMuscleGroupImage] = useState(null);
  const [musclesList, setMusclesList] = useState("");
  const [warmUpList, setWarmUpList] = useState<WarmUpExercise[]>([]);

  const { programs, isUserAuthenticated } = useSelector(selectUser);
  const { programId, day, step, index } = useParams();
  const { push } = useRouter();

  const actualWarmUp = useMemo(() => {
    if (!isUserAuthenticated) return null;
    const actualProgram = programs.find((program) => program.id === programId);
    if (!actualProgram) return null;

    const actualDay = actualProgram.sportPrograms[parseInt(day as string)];
    const actualWarmUp = actualDay?.warmUp[parseInt(index as string)];

    setWarmUpList(actualDay?.warmUp || []);

    return actualWarmUp || null;
  }, [isUserAuthenticated, programs, day, index, programId]);

  const isLastWarmUp = parseInt(index as string) === warmUpList.length - 1;

  const handleNextWarmUp = () => {
    const nextWarmUpPath = `/programs/${programId}/${day}/${step}/${
      parseInt(index as string) + 1
    }`;

    if (isLastWarmUp) return push(`/programs/${programId}/${day}/workout`);
    push(nextWarmUpPath);
  };

  const handlePreviousWarmUp = () => {
    const previousWarmUpPath = `/programs/${programId}/${day}/${step}/${
      parseInt(index as string) - 1
    }`;

    push(previousWarmUpPath);
  };

  const exerciseData = useMemo(() => {
    return (
      warmUp.filter(
        (exercise) => exercise?.name === actualWarmUp?.exerciseName
      )[0] || undefined
    );
  }, [actualWarmUp]);

  useEffect(() => {
    if (!exerciseData) return;
    const { traduction, muscleGroups, gif, video, execution, description } =
      exerciseData;

    const { primaryMuscleGroups, secondaryMuscleGroups } = muscleGroups.english;
    const frenchGroupMusclesList = [
      ...muscleGroups.french.primaryMuscleGroups.split(","),
      ...muscleGroups.french.secondaryMuscleGroups.split(","),
    ].join(", ");

    const fetchData = async () => {
      try {
        const musclesImgUrl = await fetchMusclesGroupImg(
          primaryMuscleGroups,
          secondaryMuscleGroups
        );
        setMuscleGroupImage(musclesImgUrl);
        setMusclesList(frenchGroupMusclesList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [actualWarmUp, exerciseData, isUserAuthenticated]);

  return (
    <main className="details-exo-container text-white page">
      <div className="details-under-container">
        {!exerciseData ? (
          <h1 className="width-[100%] text-center text-white text-2xl">
            Exercice introuvable
          </h1>
        ) : (
          <>
            <BreadcrumbsNavigation />

            <h2 className="title-details">
              Échauffement n°{actualWarmUp?.exerciseNumber} :{" "}
              {actualWarmUp.exerciseName}
            </h2>

            <CustomNavigationBtns
              handlePreviousFn={handlePreviousWarmUp}
              handleNextFn={handleNextWarmUp}
              showNextButton={true}
              showPreviousButton={parseInt(index as string) > 0}
              textNext={
                isLastWarmUp
                  ? "Commencer les exercices"
                  : "Échauffement suivant"
              }
              textPrevious={"Échauffement précédent"}
            />

            <AccordionList className="w-[100%] mt-10">
              <Accordion>
                <AccordionHeader>Description</AccordionHeader>
                <AccordionBody>
                  {exerciseData?.description ||
                    "Information indisponible, veuillez nous contacter."}
                </AccordionBody>
              </Accordion>
              <Accordion defaultOpen={true}>
                <AccordionHeader>Instruction</AccordionHeader>
                <AccordionBody>
                  {actualWarmUp?.instructions ||
                    "Information indisponible, veuillez nous contacter."}
                </AccordionBody>
              </Accordion>
              <Accordion defaultOpen={false}>
                <AccordionHeader>Aide pour l'exécution</AccordionHeader>
                <AccordionBody>
                  {splitExecutionIntoSteps(exerciseData?.execution).map(
                    (execution) => {
                      return (
                        <>
                          {execution} <br />
                        </>
                      );
                    }
                  )}
                </AccordionBody>
              </Accordion>
            </AccordionList>

            <div className="gif-and-muscles-img-container">
              <div className="gif-container">
                <div className="title">
                  <Bold>Démonstration : </Bold>
                </div>
                {exerciseData.gif ? (
                  <Image
                    src={exerciseData?.gif}
                    width={250}
                    height={250}
                    alt="GIF de l'exercice"
                  />
                ) : (
                  <Text className="flex items-center">
                    Image indisponible pour le moment.
                  </Text>
                )}
              </div>
              <div className="muscles-img-container">
                <div className="title-and-icon">
                  <Bold>Groupe de muscles : </Bold>{" "}
                  <Icon
                    variant="light"
                    size="xs"
                    icon={BsQuestionLg}
                    className="icon"
                    tooltip={`Cet exercice sollicite : ${musclesList}`}
                  />
                </div>

                {muscleGroupImage ? (
                  <Image
                    src={muscleGroupImage}
                    width={250}
                    height={250}
                    alt="muscles group"
                  />
                ) : (
                  <Text className="flex items-center">
                    Image indisponible pour le moment.
                  </Text>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default WarmUp;
