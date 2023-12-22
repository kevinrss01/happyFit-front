import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";

export const ExerciseLoader = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Fonction de rappel pour mettre à jour la largeur de la page
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Ajouter un écouteur d'événement pour la taille de la fenêtre
    window.addEventListener("resize", handleResize);

    // Nettoyer l'écouteur d'événement lors du démontage du composant
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getWidth = (percentage: number) => {
    return (windowWidth * percentage) / 100;
  };

  return (
    <>
      <Skeleton height={40} width={getWidth(50)} count={1} className=" mb-5" />
      <Skeleton
        height={35}
        width={getWidth(25)}
        count={1}
        className="mt-5 mb-5"
      />
      <Skeleton count={1} height={50} width={getWidth(47)} />
      <Skeleton count={1} height={150} width={getWidth(47)} />

      <div className="w-[100%] flex items-center justify-center flex-col mb-7">
        <Skeleton height={20} width={getWidth(15)} className="mt-5 mb-5" />
        <Skeleton height={210} width={getWidth(32)} />
      </div>

      <div className="flex items-center justify-between">
        <div className="m-5 flex flex-col items-center justify-center">
          <Skeleton height={25} width={getWidth(15)} className="mt-5 mb-5" />
          <Skeleton height={250} width={getWidth(20)} />
        </div>
        <div className="m-5 flex flex-col items-center">
          <Skeleton height={25} width={getWidth(15)} className="mt-5 mb-5" />
          <Skeleton height={250} width={getWidth(20)} />
        </div>
      </div>
    </>
  );
};
