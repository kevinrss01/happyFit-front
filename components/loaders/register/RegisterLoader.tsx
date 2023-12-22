/* eslint-disable react/no-unescaped-entities */
import { Bold, Title } from "@tremor/react";
import React, { useState, useEffect, useContext } from "react";
import { sentencesForLoading } from "@/constants/sentencesForLoading";
import { RotatingLines } from "react-loader-spinner";
import TextStepProgram from "./TextStepProgram";
import { RegisterLoaderProps } from "@/types/propsTypes";
import { Button } from "@nextui-org/react";
import { GrPrevious } from "react-icons/gr";
import { FormContext } from "@/context/FormContext";
import ErrorCallout from "@/components/errors/ErrorCallout";

export const RotatingLoader = () => {
  return <RotatingLines strokeColor="#3e8bd0" width="25" />;
};

const RegisterLoader: React.FC<RegisterLoaderProps> = ({
  stepDone,
  numberOfTraining,
  isErrorDuringRegister,
}) => {
  const [sentenceToDisplay, setSentenceToDisplay] = useState<string>("");
  const [indexSentence, setIndexSentence] = useState<number>(0);

  const { handlePreviousForm } = useContext(FormContext);

  const displaySentence = () => {
    setIndexSentence(indexSentence + 1);

    if (indexSentence === sentencesForLoading.length - 1) {
      setIndexSentence(0);
    }

    setSentenceToDisplay(sentencesForLoading[indexSentence].title);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      displaySentence();
    }, 10000);

    return () => clearInterval(interval);
  }, [sentenceToDisplay]);

  return (
    <div className="loader-container gap-10">
      {isErrorDuringRegister ? (
        <>
          <ErrorCallout
            title={
              "Une erreur est survenue lors de la création de votre programme"
            }
            errorMessage="Ne vous inquiétez pas vos données ont bien été sauvegardées, vous pouvez réessayer de créer votre programme en cliquant sur le bouton ci-dessous. Si le problème persiste veuillez nous contacter a l'adresse suivante : happyfitapp.pro@gmail.com"
          />
          <Button
            color="primary"
            startContent={<GrPrevious />}
            onClick={handlePreviousForm}
          >
            Retour
          </Button>
        </>
      ) : (
        <>
          <Title className="text-white text-center mt-5">
            La magie est en train de s'opérer, cela peut prendre jusqu'à 2
            minutes...✨
            <br />
            (Merci de ne pas fermer la page)
          </Title>

          <div className="all-steps-container">
            <TextStepProgram
              text="Création de la structure du programme"
              isLoading={stepDone.length === 0}
              isDisplay={true}
            />

            {stepDone.includes("program structure done") &&
              [...Array(numberOfTraining)].map((_, index) => (
                <TextStepProgram
                  key={`text-step-program-${index}`}
                  text={`Création de la séance d'échauffement du jour N°${
                    index + 1
                  }`}
                  isLoading={stepDone.length === 1 + index}
                  isDisplay={stepDone.length >= 1 + index}
                />
              ))}

            {stepDone.length >= 1 + numberOfTraining &&
              [...Array(numberOfTraining)].map((_, index) => (
                <TextStepProgram
                  key={`text-step-program-${index}`}
                  text={`Création du programme d'entraînement N°${index + 1}`}
                  isLoading={stepDone.length === 1 + (numberOfTraining + index)}
                  isDisplay={stepDone.length >= 1 + (numberOfTraining + index)}
                />
              ))}
          </div>

          <Title className="sentence-to-wait text-white">
            {sentenceToDisplay && (
              <>
                Le saviez-vous ?{" "}
                <Bold className="text-lg">{sentenceToDisplay}</Bold>
              </>
            )}
          </Title>
        </>
      )}
    </div>
  );
};

export default RegisterLoader;
