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

export const verificationProfilFormSchema = Yup.object().shape({
  firstName: firstNameVerif,
  lastName: lastNameVerif,
  sexe: sexeVerif,
  email: emailVerif,
  password: passwordVerif,
})
