"use client";
import React from "react";
import { NavigationButtonsProps } from "@/types/propsTypes";
import { Button } from "@nextui-org/react";
import { GrNext, GrPrevious } from "react-icons/gr";

const CustomNavigationBtns: React.FC<NavigationButtonsProps> = ({
  handlePreviousFn,
  handleNextFn,
  showNextButton = true,
  showPreviousButton = true,
  textPrevious = "Retour",
  textNext = "Suivant",
}) => {
  return (
    <div className="next-previous-btn">
      {showPreviousButton && (
        <Button
          color="primary"
          startContent={<GrPrevious />}
          onClick={handlePreviousFn}
        >
          {textPrevious}
        </Button>
      )}
      {showNextButton && (
        <Button color="primary" endContent={<GrNext />} onClick={handleNextFn}>
          {textNext}
        </Button>
      )}
    </div>
  );
};

export default CustomNavigationBtns;
