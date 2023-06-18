import React, { useEffect, useMemo, useState } from 'react'
import ParamsForm from '../components/register/ParamsForm'
import ProfileForm from '../components/register/ProfileForm'
import Questions from '../components/register/Questions'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import TopBarLogo from '../components/TopBarLogo'
import { Button, ProgressBar, Title } from '@tremor/react'
import { AiOutlineRollback } from 'react-icons/ai'
import { ErrorCallout } from '../components/errors/ErrorCallout'

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

export default function Inscription() {
   const [validations, setValidations] = useState(defaultValidations)
   const [data, setData] = useState(defaultData)
   const router = useRouter()
   const dispatch = useDispatch()
   const { isFetching } = useSelector((state) => state.user)
   const { personal, metrics, params } = useMemo(() => validations, [validations])
   const [progress, setProgress] = useState(0)
   const [finalData, setFinalData] = useState()
   const [isLoading, setIsLoading] = useState(true)
   const [isRegistered, setIsRegistered] = useState(false)
   const [isErrorDuringFetch, setIsErrorDuringFetch] = useState(false)

   const updateData = (validatedStep, updatingData) => {
      if (Object.keys(updatingData).every((key) => !!updatingData[key])) {
         if (validatedStep === 'params') {
            const registerData = { ...data, ...updatingData }
            const { confirmPassword, ...rest } = registerData

            setIsLoading(true)

            // console.log(rest)
            // dispatch(userRegister(rest))
            //    .then(() => {
            //       setProgress(100)
            //       setIsLoading(false)
            //       /* toaster d'annonce avant la redirection,
            //       indiquant que l'inscription a été réussie
            //         indiquant qu'il faut se connecter
            //       */
            //       router.push('/connexion')
            //    })
            //    .catch((err) => {
            //       setIsLoading(false)
            //       setIsErrorDuringFetch(true)
            //       console.log(err)
            //       toastMessage("Une erreur est survenue lors de l'inscription", 'error')
            //    })
         }
         setData((prevData) => ({
            ...prevData,
            ...updatingData,
         }))
         modifyValidationState(validatedStep, true)
      }
   }

   useEffect(() => {
      if (personal) {
         setProgress(33)
      } else {
         setProgress(1)
      }

      if (metrics) {
         setProgress(66)
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
         <ProgressBar percentageValue={progress} className='mt-3 progress-bar' />
         {personal ? (
            <>
               {metrics ? (
                  !params ? (
                     <PartieParams />
                  ) : (
                     <>
                        {isLoading ? (
                           <>
                              <Title className='text-3xl text-white'>Loading...</Title>
                           </>
                        ) : (
                           <>
                              {isErrorDuringFetch && (
                                 <>
                                    <ErrorCallout
                                       title='Une erreur est survenue pendant lors de la création de votre compte'
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
