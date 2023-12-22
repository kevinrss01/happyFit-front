import { BsCheckLg } from "react-icons/bs";
import { RotatingLoader } from "./RegisterLoader";
import { TextStepProgramProps } from "@/types/propsTypes";
import React from "react";
const TextStepProgram: React.FC<TextStepProgramProps> = ({
  text,
  isLoading,
  isDisplay,
}) => {
  return (
    <>
      <div
        className="step-text-container"
        style={{
          display: isDisplay ? "flex" : "none",
        }}
      >
        {isLoading ? <RotatingLoader /> : <BsCheckLg className="icon" />}
        <h2 className={isLoading ? "title loading" : "title"}>{text}</h2>
      </div>
    </>
  );
};

export default TextStepProgram;
