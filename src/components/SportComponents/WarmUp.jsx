// we need : exerciseName, instructions, numberOfSeries, repetition, rest

import { sportTypeTextsClass } from '../../service/StringClasses'
import { handlePlural } from '../../service/utils'
import {
   Accordion,
   AccordionBody,
   AccordionHeader,
   AccordionList,
   Bold,
   Button,
   Text,
   Icon,
} from '@tremor/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { GiSonicBoom } from 'react-icons/gi'
import { useEffect, useMemo, useState } from 'react'
import WarmUpLoader from '../loaders/SportPages/WarmUpLoader'
import fetchMusclesGroupImg from '../../service/API/ExternalAPI'
import { exercisesDataList } from '../../constants/exercisesData'
import { BsQuestionLg } from 'react-icons/bs'

const { warmUp } = exercisesDataList

function splitExecutionIntoSteps(execution) {
   // The regex `(/(\. )(\d+\. )/g)` works as follows:
   // `(\. )`: Captures the period '.' followed by a space. This is our first capture group.
   // `(\d+\. )`: Captures one or more digits followed by a period '.' and a space. This is our second capture group.
   // These two capture groups are combined with the replacement string '$1||$2', effectively inserting the marker '||' while retaining the original periods.

   const markedText = execution.replace(/(\. )(\d+\. )/g, '$1||$2')

   return markedText.split('||').filter(Boolean)
}

export default function WarmUp({ exerciseNumber, exerciseName, instructions, repetition }) {
   const [muscleGroupImage, setMuscleGroupImage] = useState(null)
   const [musclesList, setMusclesList] = useState('')
   const [isLoading, setIsLoading] = useState(true)

   const repetitions = handlePlural(repetition, 'répétition', true)
   const repetitionsText = repetitions ? ` de ${repetitions}` : ''
   const { push, asPath, query } = useRouter()

   const basePath = asPath.split('/').slice(0, 4).join('/')
   const exercisePathParam = '/exercise'
   const warmUpParam = `/warmup/${exerciseNumber}`

   const programPath = `${basePath}${exercisePathParam}`
   const nextWarmUpPath = `${basePath}${warmUpParam}?length=${query.length}`

   const isLastWarmUp = parseInt(query?.length) === parseInt(exerciseNumber)

   const exerciseData = useMemo(() => {
      return warmUp.filter((exercise) => exercise.name === exerciseName)[0] || undefined
   }, [exerciseName])

   useEffect(() => {
      if (!exerciseData) return

      const { primaryMuscleGroups, secondaryMuscleGroups } = muscleGroups.english
      const frenchGroupMusclesList = [
         ...muscleGroups.french.primaryMuscleGroups.split(','),
         ...muscleGroups.french.secondaryMuscleGroups.split(','),
      ].join(', ')
      setIsLoading(true)

      const fetchData = async () => {
         try {
            const musclesImgUrl = await fetchMusclesGroupImg(
               primaryMuscleGroups,
               secondaryMuscleGroups,
            )
            setMuscleGroupImage(musclesImgUrl)
            setMusclesList(frenchGroupMusclesList)
         } catch (error) {
            console.error(error)
         } finally {
            setIsLoading(false)
         }
      }

      fetchData()
   }, [exerciseName])

   if (!exerciseData)
      return (
         <>
            <h1 className='width-[100%] text-center text-white text-2xl'>Exercice introuvable</h1>
         </>
      )

   const { traduction, muscleGroups, gif, video, execution, description } = exerciseData

   return (
      <div className={`details-exo-container ${sportTypeTextsClass}`}>
         {isLoading ? (
            <WarmUpLoader />
         ) : (
            <div className='details-under-container'>
               <h2 className='title-details'>
                  Échauffement n°{exerciseNumber} : {exerciseName}
               </h2>
               {isLastWarmUp ? (
                  <>
                     <Text className='mt-5'>Échauffement terminé ?</Text>
                     <Button icon={GiSonicBoom} onClick={() => push(programPath)}>
                        Commencer les exercices
                     </Button>
                  </>
               ) : (
                  <>
                     <Button
                        className='mt-5'
                        icon={AiOutlineArrowRight}
                        onClick={() => push(nextWarmUpPath)}
                     >
                        Passer à l'échauffement suivant
                     </Button>
                  </>
               )}

               <AccordionList className='w-[100%] mt-10'>
                  <Accordion>
                     <AccordionHeader>Description</AccordionHeader>
                     <AccordionBody>
                        {description || 'Information indisponible, veuillez nous contacter.'}
                     </AccordionBody>
                  </Accordion>
                  <Accordion defaultOpen={true}>
                     <AccordionHeader>Instruction</AccordionHeader>
                     <AccordionBody>
                        {instructions || 'Information indisponible, veuillez nous contacter.'}
                     </AccordionBody>
                  </Accordion>
                  <Accordion defaultOpen={false}>
                     <AccordionHeader>Aide pour l'exécution</AccordionHeader>
                     <AccordionBody>
                        {splitExecutionIntoSteps(execution).map((execution) => {
                           return (
                              <>
                                 {execution} <br />
                              </>
                           )
                        })}
                     </AccordionBody>
                  </Accordion>
               </AccordionList>

               <div className='gif-and-muscles-img-container'>
                  <div className='gif-container'>
                     <div className='title'>
                        <Bold>Démonstration : </Bold>
                     </div>
                     {gif ? (
                        <Image src={gif} width={250} height={250} alt="GIF de l'exercice" />
                     ) : (
                        <Text className='flex items-center'>
                           Image indisponible pour le moment.
                        </Text>
                     )}
                  </div>
                  <div className='muscles-img-container'>
                     <div className='title-and-icon'>
                        <Bold>Groupe de muscles : </Bold>{' '}
                        <Icon
                           variant='light'
                           size='xs'
                           icon={BsQuestionLg}
                           className='icon'
                           tooltip={`Cet exercice sollicite : ${musclesList}`}
                        />
                     </div>

                     {muscleGroupImage ? (
                        <Image
                           src={muscleGroupImage}
                           width={250}
                           height={250}
                           alt='muscles group'
                        />
                     ) : (
                        <Text className='flex items-center'>
                           Image indisponible pour le moment.
                        </Text>
                     )}
                  </div>
               </div>
            </div>
         )}
      </div>
   )
}
