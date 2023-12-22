"use client";

import { Subtitle, Title } from "@tremor/react";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/userSlice";
import { Pagination } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import CustomNavigationBtns from "@/components/Customs/CustomNavigationBtns";
import { handlePlural } from "@/utils/utilsFunctions";
import Carousel from "@/components/Customs/Carousel";
import ProgramCard from "@/components/programs/ProgramCard";
import { Button } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { convertToFrenchDateFormat } from "@/utils/utilsFunctions";
import { Program } from "@/types/programTypes";
import Link from "next/link";

const Programs = () => {
  const [currentIndexProgram, setCurrentIndexProgram] = useState<number>(0);
  const [currentProgram, setCurrentProgram] = useState<Program | null>(null);

  const { programId } = useParams();
  const { push } = useRouter();

  const { programs, isUserAuthenticated, sexe } = useSelector(selectUser);

  useEffect(() => {
    if (!isUserAuthenticated) return;
    if (programs.length === 0) return;

    setCurrentProgram(
      programs.find((program) => program.id === programId) || null
    );
    setCurrentIndexProgram(
      programs.findIndex((program) => program.id === programId)
    );
  }, [programId, programs, isUserAuthenticated]);

  const handleNextProgram = () => {
    if (currentIndexProgram === programs.length + 1) return;

    const nextProgramId = programs[currentIndexProgram + 1].id;
    push(`/programs/${nextProgramId}`);
  };
  const handlePreviousProgram = () => {
    if (currentIndexProgram === 0) return;
    const previousProgramId = programs[currentIndexProgram - 1].id;
    push(`/programs/${previousProgramId}`);
  };

  const handleChangePagination = (page: number) => {
    const currentIndexProgram = page - 1;

    const programId = programs[currentIndexProgram].id;
    push(`/programs/${programId}`);
  };

  return (
    <main className="font-rubik page programs-main-container">
      {!isUserAuthenticated ? (
        <></>
      ) : (
        <>
          {programs.length === 0 || !programs || !currentProgram ? (
            <Title className="h-[100%] w-[100%] text-white text-center flex items-center text-2xl justify-center">
              Aucun programme trouvé
            </Title>
          ) : (
            <>
              <div className="title-container">
                <Title className="main-title">
                  Votre entraînement de cette semaine
                </Title>
                <Subtitle>
                  Créé le{" "}
                  {convertToFrenchDateFormat(currentProgram?.creationDate)} |{" "}
                  {handlePlural(
                    currentProgram?.sportPrograms.length,
                    "entraînement",
                    true
                  )}
                </Subtitle>
              </div>
              <div className="navigation-buttons-container">
                <CustomNavigationBtns
                  handlePreviousFn={handlePreviousProgram}
                  handleNextFn={handleNextProgram}
                  showNextButton={currentIndexProgram + 1 < programs.length}
                  showPreviousButton={currentIndexProgram > 0}
                  textNext={"Programme suivant"}
                  textPrevious={"Programme précédent"}
                />
              </div>

              <div className="program-navigator-container">
                <Carousel
                  arrowTopPosition="50%"
                  carouselHeight={450}
                  carouselWidth={450}
                >
                  {currentProgram.sportPrograms.map((sportProgram, day) => {
                    return (
                      <ProgramCard
                        title={`Jour ${day + 1} : ${sportProgram.trainingType}`}
                        sexe={sexe}
                        key={`day_${day}`}
                      >
                        <Link href={`/programs/${programId}/${day}/warmup`}>
                          <Button color="primary">Échauffement</Button>
                        </Link>
                        <Link href={`/programs/${programId}/${day}/workout`}>
                          <Button color="primary">Exercices</Button>
                        </Link>
                      </ProgramCard>
                    );
                  })}
                </Carousel>
              </div>

              <Pagination
                loop
                showControls
                total={programs.length}
                page={currentIndexProgram + 1}
                variant="bordered"
                onChange={handleChangePagination}
                className="mt-3"
              />
            </>
          )}
        </>
      )}
    </main>
  );
};

export default Programs;
