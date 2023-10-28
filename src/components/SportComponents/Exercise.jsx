//ICONS
import { AiOutlineArrowRight } from 'react-icons/ai'
import { BsQuestionLg } from 'react-icons/bs'
import { FcClock } from 'react-icons/fc'
//

import { sportTypeTextsClass } from '../../service/StringClasses'
import { computeInMinutes, handlePlural } from '../../service/utils'
import {
   Button,
   Bold,
   Card,
   Accordion,
   AccordionBody,
   AccordionHeader,
   AccordionList,
   Text,
   Icon,
   Title,
} from '@tremor/react'
import Image from 'next/image'
import Carousel from '../Containers/Carousel'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { exercisesDataList } from '../../constants/exercisesData'
import fetchMusclesGroupImg from '../../service/API/ExternalAPI'
import { ExerciseLoader } from '../loaders/SportPages/ExerciseLoader'

const { workout, cardio } = exercisesDataList.training
const SetRenderer = ({ weight, seriesNumber, rest, repetition }) => {
   return (
      <Card className='exercise-card'>
         <Title color='white' className='title-card'>
            Série n°{seriesNumber}
         </Title>
         <Text color='white' className='text-card'>
            {handlePlural(repetition, 'répétition', true)}
            {weight.toString() === '0' ? <></> : <> à </>}
            {handlePlural(parseInt(weight), 'kilo', true)} avec {computeInMinutes(rest)} de
            récupération.
         </Text>
         <p></p>
      </Card>
   )
}

const Series = ({ series }) => {
   if (!series) return <></>
   const sortedSeries = [...series].sort((a, b) => a.seriesNumber - b.seriesNumber)
   return (
      <Carousel arrowTopPosition='30%' carouselHeight={260} carouselWidth={400}>
         {sortedSeries.map((set, index) => (
            <SetRenderer key={`set n°${index}`} {...set} />
         ))}
      </Carousel>
   )
}

const CardioInstructionCard = ({ instructions, totalTime }) => {
   return (
      <Card className='exercise-card'>
         <Text className='text-white text-cardio'>{instructions}</Text>
         <Text className='text-white text-cardio flex'>
            <FcClock className='mr-1 scale-125' />
            Temps total : {handlePlural(parseInt(totalTime), 'minute', true)}
         </Text>
         <p></p>
      </Card>
   )
}

const Exercise = ({ exerciseName, instructions, muscleGroup, series, totalTime }) => {
   const [muscleGroupImage, setMuscleGroupImage] = useState(null)
   const [musclesList, setMusclesList] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   const [isTypeTrainingCardio, setIsTypeTrainingCardio] = useState(!muscleGroup)

   const { push, asPath, query } = useRouter()

   const exerciseData = useMemo(() => {
      //If there is no muscleGroup so type training is CARDIO
      if (isTypeTrainingCardio) {
         return cardio.filter((exercise) => exercise.name === exerciseName)[0] || undefined
      }

      return workout.filter((exercise) => exercise.name === exerciseName)[0] || undefined
   }, [exerciseName])

   useEffect(() => {
      if (!exerciseData) return

      const { primaryMuscleGroups, secondaryMuscleGroups } = muscleGroups.english
      setIsLoading(true)

      const frenchGroupMusclesList = [
         ...muscleGroups.french.primaryMuscleGroups.split(','),
         ...muscleGroups.french.secondaryMuscleGroups.split(','),
      ].join(', ')

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

   const basePath = asPath.split('/').slice(0, 5).join('/')
   const nextSportSession = parseInt(query?.sportSession) + 1
   const nextWarmUpPath = `${basePath}/${nextSportSession}?length=${query.length}`

   if (!exerciseData)
      return (
         <>
            <h1 className='width-[100%] text-center text-white text-2xl'>Exercice introuvable</h1>
         </>
      )

   const { traduction, muscleGroups, gif, video, execution, description } = exerciseData

   return (
      <div className={`details-exo-container ${sportTypeTextsClass}`}>
         {!isLoading ? (
            <div className='details-under-container'>
               <h2 className='title-details'>
                  {muscleGroup && `Séance ${muscleGroup} : `} {exerciseName}
               </h2>

               {parseInt(query?.length) !== parseInt(query?.sportSession) + 1 && (
                  <Button
                     className='mt-5'
                     icon={AiOutlineArrowRight}
                     onClick={() => push(nextWarmUpPath)}
                  >
                     Passer à l'exercice suivant
                  </Button>
               )}

               <AccordionList className='w-[100%] mt-10'>
                  <Accordion>
                     <AccordionHeader>Description</AccordionHeader>
                     <AccordionBody>
                        {description || 'Description indisponible, veuillez nous contacter'}
                     </AccordionBody>
                  </Accordion>
                  <Accordion defaultOpen={true}>
                     <AccordionHeader>Conseils</AccordionHeader>
                     <AccordionBody>
                        {execution || 'Execution indisponible, veuillez nous contacter.'}
                     </AccordionBody>
                  </Accordion>
               </AccordionList>

               {!isTypeTrainingCardio ? (
                  <>
                     <Title className='mt-10 mb-4 text-xl text-white'>Séries :</Title>
                     <Series series={series} />
                  </>
               ) : (
                  <>
                     <Title className='mt-10 mb-4 text-white text-xl'>
                        Instruction pour cet exercice :
                     </Title>
                     <div>
                        <CardioInstructionCard instructions={instructions} totalTime={totalTime} />
                     </div>
                  </>
               )}

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
                        <Bold>Groupe de muscles : </Bold>
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
                        // eslint-disable-next-line react/jsx-no-undef
                        <Text className='flex items-center'>
                           Image indisponible pour le moment.
                        </Text>
                     )}
                  </div>
               </div>
            </div>
         ) : (
            <ExerciseLoader />
         )}
      </div>
   )
}

export default Exercise
