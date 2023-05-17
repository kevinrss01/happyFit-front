import { Navbar } from "../components/Navbar";
import { Formik, Form, Field } from "formik";
import { verificationUpdatePersonalInfoSchema } from "../utils/yupSchema";
//Test commit 2
export default function Reglages() {
  const onSubmit = (values) => {
    console.log(values);
  };

  const personalInfoValues = [
    {
      inputName: "Prénom",
      name: "firstName",
      initialValue: "",
    },
    {
      inputName: "Nom",
      name: "lastName",
      initialValue: "",
    },
    {
      inputName: "Nombre de séances par semaine",
      name: "numberOfSessionPerWeek",
      initialValue: "",
    },
    {
      inputName: "Expérience en années",
      name: "sportExperienceInYears",
      initialValue: "",
    },
    {
      inputName: "Lieu d'entrainement",
      name: "trainingPlace",
      initialValue: "",
    },
    {
      inputName: "Temps disponible par séance",
      name: "availableTimePerSessionInMinutes",
      initialValue: "",
    },
    {
      inputName: "Taille",
      name: "heightInCentimeters",
      initialValue: "",
    },
    {
      inputName: "Poids",
      name: "weightInKilos",
      initialValue: "",
    },
    {
      inputName: "Objectif",
      name: "fitnessGoal",
      initialValue: "",
    },
  ];

  return (
    <Navbar>
      <div className="setting-container">
        <h1>Paramètres</h1>
        <div className="personal-info-container">
          <h2>Informations personnelles</h2>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              numberOfSessionPerWeek: "",
              sportExperienceInYears: "",
              trainingPlace: "",
              availableTimePerSessionInMinutes: "",
              heightInCentimeters: "",
              weightInKilos: "",
              fitnessGoal: "",
            }}
            validationSchema={verificationUpdatePersonalInfoSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="input-container">
                  <div className="input-and-label">
                    <label>Prénom</label>
                    <Field name="firstName" placeholder="Prénom" />
                    {errors.firstName && touched.firstName ? (
                      <div style={{ color: "red" }}>{errors.firstName}</div>
                    ) : (
                      <div style={{ height: "20px", width: "10px" }}> </div>
                    )}
                  </div>

                  <div className="input-and-label">
                    <label>Nom</label>
                    <Field component="" name="lastName" placeholder="Nom" />
                    {errors.lastName && touched.lastName ? (
                      <div style={{ color: "red" }}>{errors.lastName}</div>
                    ) : (
                      <div style={{ height: "20px", width: "10px" }}> </div>
                    )}
                  </div>

                  <Field
                    component="select"
                    name="test"
                    muliple="true"
                    style={{ color: "black" }}
                  >
                    <option value="NY">New York</option>
                    <option value="SF">San Francisco</option>
                    <option value="CH">Chicago</option>
                    <option value="OTHER">Other</option>
                  </Field>
                </div>
                <button className="update-button" type="submit">
                  Modifier
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="email-container">
          <h2>Adresse email</h2>
        </div>
        <div className="password-container">
          <h2>Mot de passe</h2>
        </div>
      </div>
    </Navbar>
  );
}
