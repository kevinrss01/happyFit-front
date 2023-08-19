import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ParamsForm from '../components/register/ParamsForm'
import ProfileForm from '../components/register/ProfileForm'
import Questions from '../components/register/Questions'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import TopBarLogo from '../components/TopBarLogo'
import { Button, ProgressBar } from '@tremor/react'
import { AiOutlineRollback } from 'react-icons/ai'
import { ErrorCallout } from '../components/errors/ErrorCallout'
import { RegisterLoader } from '../components/loaders/RegisterLoader'
import toastMessage from '../utils/toast'
import { userLogin, userRegister } from '../redux/actions/userActions'

const defaultValidations = {
   personal: false,
   metrics: false,
   params: false,
}

const defaultData = {
   firstName: '',
   lastName: '',
   email: '',
   password: '',
   birthday: '',
   weightInKilos: 0,
   heightInCentimeters: 0,
   sexe: '',
   fitnessGoal: '',
   sportExperienceInYears: 0,
   trainingPlace: '',
   numberOfSessionPerWeek: 0,
   availableTimePerSessionInMinutes: '',
}

const userSelector = (state) => {
   const { isFetching: isLoading, error } = state.user
   return { isLoading, error }
}

export default function Inscription() {
   const [validations, setValidations] = useState(defaultValidations)
   const [data, setData] = useState(defaultData)
   const router = useRouter()
   const dispatch = useDispatch()
   const { isLoading, error } = useSelector(userSelector)
   const { personal, metrics, params } = useMemo(() => validations, [validations])
   const [progress, setProgress] = useState(0)

   const updateData = (validatedStep, updatingData) => {
      const allValuesAreCorrect = Object.values(updatingData).every((value) => value || value === 0)
      if (allValuesAreCorrect) {
         handleUpdateOnValidatedStep(validatedStep, updatingData)
         modifyValidationState(validatedStep, true)
      }
   }

   const handleUpdateOnValidatedStep = (validatedStep, updatingData) => {
      if (validatedStep === 'params') {
         const registerData = { ...data, ...updatingData }
         const { confirmPassword, ...rest } = registerData
         dispatch(userRegister(rest, setProgress)).then(afterRegisterCallback)
      } else {
         setData((prevData) => ({
            ...prevData,
            ...updatingData,
         }))
      }
   }

   const afterRegisterCallback = useCallback(() => {
      setProgress(100)
      sessionStorage.removeItem('sessionsPerWeek')
      sessionStorage.removeItem('questionsSaved')
      setTimeout(() => {
         router.push('/')
      }, 900)
   }, [router])

   useEffect(() => {
      if (personal && metrics) {
         setProgress(66)
      } else if (personal) {
         setProgress(33)
      } else {
         setProgress(1)
      }
   }, [metrics, personal])

   const modifyValidationState = (step, isValidated) => {
      setValidations((prevValidations) => ({
         ...prevValidations,
         [step]: isValidated,
      }))
   }

   const validatePersonalStep = () => {
      modifyValidationState('personal', true)
   }

   const validateMetricsStep = () => {
      modifyValidationState('metrics', true)
   }
   const validateParamsStep = () => {
      modifyValidationState('params', true)
      sessionStorage.removeItem('sessionsPerWeek')
      sessionStorage.removeItem('questionsSaved')
   }

   const goBackToPersonalStep = () => {
      modifyValidationState('personal', false)
   }

   const goBackToMetricsStep = () => {
      modifyValidationState('metrics', false)
   }

   const PartiePerso = () => <ProfileForm validate={updateData} />
   const PartieMetrics = () => <Questions validate={updateData} goBack={goBackToPersonalStep} />
   const PartieParams = () => <ParamsForm goBack={goBackToMetricsStep} validate={updateData} />

   return (
      <div style={{ color: 'white' }} className='register-container'>
         <TopBarLogo />
         <ProgressBar value={progress} className='mt-3 progress-bar' />
         {personal ? (
            <>
               {metrics ? (
                  !params ? (
                     <PartieParams />
                  ) : (
                     <>
                        {isLoading ? (
                           <RegisterLoader />
                        ) : (
                           <>
                              {error && (
                                 <>
                                    <ErrorCallout
                                       title='Une erreur est survenue pendant la création de votre compte'
                                       errorMessage="Veuillez nous excuser, une erreur est survenue. Ne vous
                                       inquiétez pas, vos données ont été sauvegardées. Veuillez
                                       simplement cliquer sur le bouton retour et réessayer plus tard. Si le problème persiste,
                                       veuillez nous contacter à l'adresse suivante : happyfitapp.pro@gmail.com "
                                    />

                                    <Button
                                       onClick={() => modifyValidationState('params', false)}
                                       icon={AiOutlineRollback}
                                    >
                                       Retour
                                    </Button>
                                 </>
                              )}
                           </>
                        )}
                     </>
                  )
               ) : (
                  <PartieMetrics />
               )}
            </>
         ) : (
            <PartiePerso />
         )}
      </div>
   )
}
