import { useMemo, useState } from "react";
import ParamsForm from "../components/ParamsForm";
import ProfileForm from "../components/ProfileForm";
import Questions from "../components/Questions";
import Axios from "../service/axios";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../redux/actions/userActions";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.user);
  const { personal, metrics, params } = useMemo(
    () => validations,
    [validations]
  );

  const updateData = (validatedStep, updatingData) => {
    if (Object.keys(updatingData).every((key) => !!updatingData[key])) {
      if (validatedStep === "params") {
        const registerData = { ...data, ...updatingData };
        dispatch(userRegister(registerData)).then(() => {
          /* toaster d'annonce avant la redirection,
           indiquant que l'inscription a été réussie 
          indiquant qu'il faut se connecter
          */
          router.push("/connexion");
        });
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

  // priorité mineure donc j'ai mis un text en attendant de mettre un vrai loader
  if (isFetching) return <>Loading...</>;

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