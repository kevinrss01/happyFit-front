import { TextInput } from "@tremor/react";
import { BsPersonCircle } from "react-icons/bs";
import { NamesContainerProps } from "@/types/propsTypes";

const NamesContainer = ({
  userData,
  yupErrors,
  onChangeInput,
}: NamesContainerProps) => {
  return (
    <div className="container-names-input">
      <div className="container-single-input">
        <TextInput
          name="firstName"
          placeholder="Prénom"
          onChange={(e) => {
            onChangeInput("firstName", e.target.value);
          }}
          error={!!yupErrors.firstName}
          errorMessage={yupErrors.firstName}
          defaultValue={userData.firstName}
          className="input"
          icon={BsPersonCircle}
        />
        {yupErrors.firstName ? (
          <></>
        ) : (
          <p
            style={{
              opacity: "0%",
            }}
          >
            Ceci est un texte
          </p>
        )}
      </div>
      <div className="container-single-input">
        <TextInput
          name="lastName"
          placeholder="Nom"
          onChange={(e) => {
            onChangeInput("lastName", e.target.value);
          }}
          error={!!yupErrors.lastName}
          errorMessage={yupErrors.lastName}
          defaultValue={userData?.lastName}
          className="input"
          icon={BsPersonCircle}
        />
        {yupErrors.lastName ? (
          <></>
        ) : (
          <p
            style={{
              opacity: "0%",
            }}
          >
            Ceci est un texte
          </p>
        )}
      </div>
    </div>
  );
};

export default NamesContainer;
