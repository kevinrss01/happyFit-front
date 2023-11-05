import { calculateAge } from '../../utils/utilsFunctions'
import { useEffect, useState } from 'react'
import ProgramAPI from '../../service/API/programAPI'
import { ErrorCallout } from '../errors/ErrorCallout'
import { Button } from '@tremor/react'
import io from 'socket.io-client'

let socketServer = ''

const BilanLoader = ({ userInfo, Programs, numberOfSession, difficulty, setFetchNewProgram }) => {
   const [isFetching, setIsFetching] = useState(true)
   const [isError, setIsError] = useState(false)
   const [stepDoneInProgramCreation, setStepDoneInProgramCreation] = useState([])

   const age = calculateAge(userInfo.birthday)
   const latestProgram = Programs[Programs.length - 1]

   const data = {
      weightInKilos: userInfo.weightInKilos,
      heightInCentimeters: userInfo.heightInCentimeters,
      availableTimePerSessionInMinutes: userInfo.availableTimePerSessionInMinutes,
      fitnessGoal: userInfo.fitnessGoal,
      trainingPlace: userInfo.trainingPlace,
      numberOfSessionPerWeek: numberOfSession,
      sportExperienceInYears: userInfo.sportExperienceInYears,
      id: userInfo.id,
      age,
      sexe: userInfo.sexe,
      difficulty,
      exoPerformances: userInfo.exoPerformances,
      program: latestProgram,
   }

   const fetchNewProgram = async () => {
      try {
         const response = await ProgramAPI.getNewSportProgram(data)
         console.log(response)
      } catch (e) {
         setIsError(true)
      } finally {
         setIsFetching(false)
      }
   }

   useEffect(() => {
      socketServer = io.connect('http://localhost:4000')

      if (socketServer) {
         socketServer.on(`receive_message_${data?.email}`, (message) => {
            setStepDoneInProgramCreation((prevStepDoneInProgramCreation) => [
               ...prevStepDoneInProgramCreation,
               message,
            ])
         })
      }
   }, [socketServer])

   useEffect(() => {
      if (Object.values(data).every((value) => value || value === 0)) {
         fetchNewProgram()
      } else {
         setIsError(true)
      }
   }, [])

   return (
      <div className='bilan-loader-container'>
         {isError && (
            <div className='error-container'>
               <ErrorCallout
                  title={'Une erreur est survenue'}
                  errorMessage={
                     "Une erreur est survenue pendant la récupération de votre nouveau programme, veuillez cliquer sur le bouton retour et recommencer. Si le problème persiste veuillez nous contacter à l'adresse suivante : happyfitapp.pro@gmail.com"
                  }
               />
               <Button onClick={() => setFetchNewProgram(false)}>Retour</Button>
            </div>
         )}
         {isFetching && !isError && <p>Chargement...</p>}
      </div>
   )
}

export default BilanLoader
