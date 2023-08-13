import * as Yup from 'yup'

const firstNameVerif = Yup.string()
   .min(3, 'Le prénom doit contenir au moins 3 caractères')
   .max(50, 'Le prénom doit contenir au maximum 50 caractères')
   .matches(/^[a-zA-ZÀ-ÿ\s-]+$/, 'Le prénom ne doit contenir que des lettres')
   .required('Prénom requis')

const lastNameVerif = Yup.string()
   .min(3, 'Le nom doit contenir au moins 3 caractères')
   .max(50, 'Le nom doit contenir au maximum 50 caractères')
   .matches(/^[a-zA-ZÀ-ÿ\s-]+$/, 'Le nom ne doit contenir que des lettres')
   .required('Nom requis')

const emailVerif = Yup.string()
   .min(5, "L'email doit contenir au moins 5 caractères")
   .email('Email invalide')
   .required('Email requis')
   .matches(/[.]/, 'Email invalide')

const passwordVerif = Yup.string()
   .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
   .max(100, 'Le mot de passe doit contenir au maximum 100 caractères')
   .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule et un caractère spécial')
   .matches(
      /[^A-Za-z0-9]/,
      'Le mot de passe doit contenir au moins un caractère spécial et une majuscule',
   )
   .required('Mot de passe requis')

const sexeVerif = Yup.string()
   .oneOf(['man', 'woman'], 'Le sexe doit être "Homme" ou "Femme"')
   .required('Genre requis')

const numberOfSessionsVerif = Yup.number()
   .min(1, 'Le nombre de séances doit être supérieur à 0')
   .max(7, 'Le nombre de séances doit être inférieur à 8')
   .required('Nombre de séances requis')

const experienceVerif = Yup.number().max(3).min(0).required('Expérience requise')

const placeOfTrainingVerif = Yup.string()
   .oneOf(['home', 'gym'], 'Lieu de pratique invalide')
   .required('Lieu de pratique requis')

const timeAvailableVerif = Yup.number()
   .min(15, 'Temps disponible invalide')
   .max(90)
   .required('Temps disponible requis')

const fitnessGoalVerif = Yup.string()
   .oneOf(['lose weight', 'gain muscle', 'fitness'], 'Objectif invalide')
   .required('Objectif requis')

const heightVerif = Yup.number()
   .min(100, 'La taille doit être supérieur à 100 cm.')
   .max(250, 'La taille doit être au maximum 250 cm.')
   .required('Taille requise')

const weightVerif = Yup.number()
   .min(40, 'Le poids doit être supérieur à 40.')
   .max(200, 'Le poids maximum est 200 kilos.')
   .required('Poids requis')

export const verificationProfilFormSchema = Yup.object().shape({
   firstName: firstNameVerif,
   lastName: lastNameVerif,
   sexe: sexeVerif,
   email: emailVerif,
   password: passwordVerif,
})

export const verifPersonalInfoSchema = Yup.object().shape({
   firstName: firstNameVerif,
   lastName: lastNameVerif,
   numberOfSessionPerWeek: numberOfSessionsVerif,
   sportExperienceInYears: experienceVerif,
   trainingPlace: placeOfTrainingVerif,
   availableTimePerSessionInMinutes: timeAvailableVerif,
   fitnessGoal: fitnessGoalVerif,
   heightInCentimeters: heightVerif,
   weightInKilos: weightVerif,
})
