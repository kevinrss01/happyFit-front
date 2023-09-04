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
import io from 'socket.io-client'
import { userRegister } from '../redux/actions/userActions'

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
   city: '',
   referenceSource: '',
   deviceRegistration: '',
   registrationDate: '',
   isUserSubscribed: false,
}

const userSelector = (state) => {
   const { isFetching: isLoading, error } = state.user
   return { isLoading, error }
}

let socketServer = ''

export default function Registration() {
   const [validations, setValidations] = useState(defaultValidations)
   const [data, setData] = useState(defaultData)
   const router = useRouter()
   const dispatch = useDispatch()
   const { isLoading, error } = useSelector(userSelector)
   const { personal, metrics, params } = useMemo(() => validations, [validations])
   const [progress, setProgress] = useState(0)
   const [stepDoneInProgramCreation, setStepDoneInProgramCreation] = useState([])

   const updateData = (validatedStep, updatingData) => {
      const allValuesAreCorrect = Object.values(updatingData).every((value) => value || value === 0)
      if (allValuesAreCorrect) {
         handleUpdateOnValidatedStep(validatedStep, updatingData)
         modifyValidationState(validatedStep, true)
      }
   }

   const handleUpdateOnValidatedStep = (validatedStep, updatingData) => {
      if (validatedStep === 'params') {
         socketServer = io.connect('http://localhost:4000')

         const registerData = { ...data, ...updatingData }
         const { confirmPassword, ...rest } = registerData

         console.log(registerData)

         dispatch(userRegister(rest, setProgress, socketServer)).then(afterRegisterCallback)
      } else {
         setData((prevData) => ({
            ...prevData,
            ...updatingData,
         }))
      }
   }

   const afterRegisterCallback = useCallback(() => {
      setProgress(100)
      sessionStorage.clear()
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

   // const sendMessages = () => {
   //    socketServer.emit('newMessage', 'Hello from client')
   // }

   useEffect(() => {
      if (socketServer) {
         const numberOfProgramStructure = 1
         const barProgressionLeft = 34

         const numberOfSessionPerWeek = parseInt(data?.numberOfSessionPerWeek)
         if (isNaN(numberOfSessionPerWeek)) {
            console.error('numberOfSessionPerWeek is not a number')
         }

         const numberOfWarmup = numberOfSessionPerWeek
         const totalSteps = numberOfProgramStructure + numberOfSessionPerWeek + numberOfWarmup
         const progressionByStep =
            totalSteps === 0 ? console.error('total steps = 0') : barProgressionLeft / totalSteps

         socketServer.on(`receive_message_${data?.email}`, (message) => {
            setStepDoneInProgramCreation((prevStepDoneInProgramCreation) => [
               ...prevStepDoneInProgramCreation,
               message,
            ])
            setProgress((prevProgress) => prevProgress + progressionByStep)
         })
      }
   }, [socketServer])

   return (
      <div style={{ color: 'white' }} className='register-container'>
         <TopBarLogo />
         <ProgressBar value={progress} className='mt-3 progress-bar' />
         {personal ? (
            <>
               {metrics ? (
                  !params ? (
                     <>
                        {' '}
                        <PartieParams />
                     </>
                  ) : (
                     <>
                        {isLoading ? (
                           <>
                              <RegisterLoader
                                 stepDone={stepDoneInProgramCreation}
                                 numberOfTraining={data?.numberOfSessionPerWeek}
                              />
                           </>
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
