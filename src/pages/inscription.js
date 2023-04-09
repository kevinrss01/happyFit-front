import { useMemo, useState } from "react";
import ParamsForm from "../components/ParamsForm";
import ProfileForm from "../components/ProfileForm";
import Questions from "../components/Questions";
import Axios from "../service/axios";

const defaultValidations = {
  personal: false,
  metrics: false,
  params: false,
};

const defaultData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  birthday: "",
  weightInKilos: 0,
  heightInCentimeters: 0,
  sexe: "",
  fitnessGoal: "",
  sportExperienceInYears: 0,
  trainingPlace: "",
  numberOfSessionPerWeek: 0,
  availableTimePerSessionInMinutes: "",
};

export default function Inscription() {
  const [validations, setValidations] = useState(defaultValidations);
  const [data, setData] = useState(defaultData);
  const { personal, metrics, params } = useMemo(
    () => validations,
    [validations]
  );

  const updateData = (validatedStep, updatingData) => {
    if (Object.keys(updatingData).every((key) => !!updatingData[key])) {
      if (validatedStep === "params") {
        Axios.post("http://localhost:4000/auth/register", {
          ...data,
          ...updatingData,
        }).then(({ data }) => console.log("the data has been sent ! ", data));
      }
      setData((prevData) => ({
        ...prevData,
        ...updatingData,
      }));
      modifyValidationState(validatedStep, true);
    }
  };

  const modifyValidationState = (step, isValidated) => {
    setValidations((prevValidations) => ({
      ...prevValidations,
      [step]: isValidated,
    }));
  };

  const validatePersonalStep = () => {
    modifyValidationState("personal", true);
  };

  const validateMetricsStep = () => {
    modifyValidationState("metrics", true);
  };
  const validateParamsStep = () => {
    modifyValidationState("params", true);
    sessionStorage.removeItem("sessionsPerWeek");
    sessionStorage.removeItem("questionsSaved");
  };

  const goBackToPersonalStep = () => {
    modifyValidationState("personal", false);
  };

  const goBackToMetricsStep = () => {
    modifyValidationState("metrics", false);
  };

  const PartiePerso = () => <ProfileForm validate={updateData} />;

  const PartieMetrics = () => (
    <Questions validate={updateData} goBack={goBackToPersonalStep} />
  );

  const PartieParams = () => (
    <ParamsForm goBack={goBackToMetricsStep} validate={updateData} />
  );

  return (
    <div style={{ color: "white" }}>
      {personal ? (
        <>
          {metrics ? (
            !params ? (
              <PartieParams />
            ) : (
              <button onClick={() => modifyValidationState("params", false)}>
                Retour
              </button>
            )
          ) : (
            <PartieMetrics />
          )}
        </>
      ) : (
        <PartiePerso />
      )}
    </div>
  );
}
