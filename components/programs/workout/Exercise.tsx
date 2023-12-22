"use client";
import React, { useEffect, useMemo, useState } from "react";

//ICONS
import { BsQuestionLg } from "react-icons/bs";
import { FcClock } from "react-icons/fc";
//

import { computeInMinutes, handlePlural } from "@/utils/utilsFunctions";
import {
  Bold,
  Card,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionList,
  Text,
  Icon,
  Title,
} from "@tremor/react";
import Image from "next/image";
import Carousel from "@/components/customs/Carousel";

import { exercisesDataList } from "@/constants/exercisesData";
import fetchMusclesGroupImg from "@/services/API/ExternalAPI";
import { ExerciseLoader } from "@/components/loaders/programs/ExerciseLoader";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/userSlice";
import { useParams, useRouter } from "next/navigation";
import { Exercise, CardioExercise } from "@/types/programTypes";
import {
  CardioInstructionCardProps,
  SeriesProps,
  SetRendererProps,
} from "@/types/propsTypes";
import BreadcrumbsNavigation from "@/components/programs/BreadcrumbsNavigation";
import CustomNavigationBtns from "@/components/customs/CustomNavigationBtns";

const { workout, cardio } = exercisesDataList.training;
const SetRenderer = ({
  weight,
  seriesNumber,
  rest,
  repetition,
}: SetRendererProps) => {
  return (
    <Card className="exercise-card">
      <Title className="title-card text-white">Série n°{seriesNumber}</Title>
      <Text className="text-card text-white">
        {handlePlural(repetition, "répétition", true)}
        {weight === "0" ? <></> : <> à </>}
        {handlePlural(parseInt(weight), "kilo", true)} avec{" "}
        {computeInMinutes(rest)} de récupération.
      </Text>
      <p></p>
    </Card>
  );
};

const Series = ({ series }: SeriesProps) => {
  if (!series) return <></>;
  const sortedSeries = [...series].sort(
    (a, b) => a.seriesNumber - b.seriesNumber
  );
  return (
    <Carousel arrowTopPosition="30%" carouselHeight={260} carouselWidth={400}>
      {sortedSeries.map((set, index) => (
        <SetRenderer key={`set n°${index}`} {...set} />
      ))}
    </Carousel>
  );
};

const CardioInstructionCard = ({
  instructions,
  totalTime,
}: CardioInstructionCardProps) => {
  return (
    <Card className="exercise-card">
      <Text className="text-white text-cardio">{instructions}</Text>
      <Text className="text-white text-cardio flex">
        <FcClock className="mr-1 scale-125" />
        Temps total : {handlePlural(totalTime, "minute", true)}
      </Text>
      <p></p>
    </Card>
  );
};

const isExercise = (
  exercise: Exercise | CardioExercise
): exercise is Exercise => {
  return (exercise as Exercise).series !== undefined;
};

const Exercise = () => {
  const [muscleGroupImage, setMuscleGroupImage] = useState<string | null>(null);
  const [musclesList, setMusclesList] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [setExerciseList, setSetExerciseList] = useState();

  const { programs, isUserAuthenticated } = useSelector(selectUser);
  const { programId, day, step, index } = useParams();
  const { push } = useRouter();

  const actualProgram = useMemo(() => {
    if (!isUserAuthenticated) return null;
    const actualProgram = programs.find((program) => program.id === programId);
    return actualProgram || null;
  }, [isUserAuthenticated, programId, programs]);

  const actualExercise = useMemo(() => {
    if (!isUserAuthenticated) return null;
    if (!actualProgram) return null;

    const actualDay = actualProgram?.sportPrograms[parseInt(day as string)];
    const actualExercise = actualDay?.exercises[parseInt(index as string)];

    return actualExercise || null;
  }, [isUserAuthenticated, actualProgram, day, index]);

  const isTypeTrainingCardio =
    actualProgram?.sportPrograms[parseInt(day as string)]?.trainingType ===
    "cardio";
  const exerciseLength =
    actualProgram?.sportPrograms[parseInt(day as string)].exercises.length;

  const exerciseData = useMemo(() => {
    //If there is no muscleGroup so type training is CARDIO
    if (isTypeTrainingCardio) {
      return (
        cardio.filter(
          (exercise) => exercise.name === actualExercise.exerciseName
        )[0] || undefined
      );
    }

    return (
      workout.filter(
        (exercise) => exercise.name === actualExercise.exerciseName
      )[0] || undefined
    );
  }, [actualExercise.exerciseName, isTypeTrainingCardio]);

  useEffect(() => {
    if (!exerciseData) return;

    const { muscleGroups } = exerciseData;

    const { primaryMuscleGroups, secondaryMuscleGroups } = muscleGroups.english;
    setIsLoading(true);

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [exerciseData]);

  const handleNextExercise = () => {
    const nextWarmUpPath = `/programs/${programId}/${day}/${step}/${
      parseInt(index as string) + 1
    }`;

    push(nextWarmUpPath);
  };

  const handlePreviousExercise = () => {
    const previousWarmUpPath = `/programs/${programId}/${day}/${step}/${
      parseInt(index as string) - 1
    }`;

    push(previousWarmUpPath);
  };

  return (
    <div className={`details-exo-container text-white`}>
      {!isLoading ? (
        <div className="details-under-container">
          {!exerciseData ? (
            <h1 className="width-[100%] text-center text-white text-2xl">
              Exercice introuvable
            </h1>
          ) : (
            <>
              <h2 className="title-details">
                Exercice n°{parseInt(index as string) + 1} :{" "}
                {actualExercise.exerciseName}
              </h2>
              <BreadcrumbsNavigation />
              <CustomNavigationBtns
                handlePreviousFn={handlePreviousExercise}
                handleNextFn={handleNextExercise}
                showNextButton={parseInt(index as string) < exerciseLength - 1}
                showPreviousButton={parseInt(index as string) > 0}
                textNext={"Exercice suivant"}
                textPrevious={"Échauffement précédent"}
              />
              <AccordionList className="w-[100%] mt-10">
                <Accordion>
                  <AccordionHeader>Description</AccordionHeader>
                  <AccordionBody>
                    {exerciseData?.description ||
                      "Description indisponible, veuillez nous contacter"}
                  </AccordionBody>
                </Accordion>
                <Accordion defaultOpen={true}>
                  <AccordionHeader>Conseils</AccordionHeader>
                  <AccordionBody>
                    {exerciseData?.execution ||
                      "Execution indisponible, veuillez nous contacter."}
                  </AccordionBody>
                </Accordion>
              </AccordionList>

              {!isTypeTrainingCardio && isExercise(actualExercise) && (
                <>
                  <Title className="mt-10 mb-4 text-xl text-white">
                    Séries :
                  </Title>
                  <Series series={actualExercise?.series} />
                </>
              )}

              {isTypeTrainingCardio && !isExercise(actualExercise) && (
                <>
                  <Title className="mt-10 mb-4 text-white text-xl">
                    Instructions pour cet exercice :
                  </Title>
                  <div>
                    <CardioInstructionCard
                      instructions={actualExercise.instructions}
                      totalTime={actualExercise.totalTime}
                    />
                  </div>
                </>
              )}

              <div className="gif-and-muscles-img-container">
                <div className="gif-container">
                  <div className="title">
                    <Bold>Démonstration : </Bold>
                  </div>

                  {exerciseData?.gif ? (
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
                    <Bold>Groupe de muscles : </Bold>
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
                    // eslint-disable-next-line react/jsx-no-undef
                    <Text className="flex items-center">
                      Image indisponible pour le moment.
                    </Text>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <ExerciseLoader />
      )}
    </div>
  );
};

export default Exercise;
