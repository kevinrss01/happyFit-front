import { Callout } from "@tremor/react";
import { BiError } from "react-icons/bi";
import React from "react";
import { ErrorCalloutProps } from "@/types/propsTypes";

const ErrorCallout: React.FC<ErrorCalloutProps> = ({ title, errorMessage }) => {
  return (
    <>
      <Callout
        className="w-1/2 m-8 mt-14"
        title={title}
        icon={BiError}
        color="rose"
      >
        {errorMessage}
      </Callout>
    </>
  );
};

export default ErrorCallout;
