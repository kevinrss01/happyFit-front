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
} from '@tremor/react'
import Image from 'next/image'
import Carousel from '../Containers/Carousel'
import { useRouter } from 'next/router'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { useEffect, useMemo, useState } from 'react'

import { exercisesDataList } from '../../constants/exercisesData'
import fetchMusclesGroupImg from '../../service/API/ExternalAPI'
import { BsQuestionLg } from 'react-icons/bs'
const { workout } = exercisesDataList.training

const SetRenderer = ({ weight, seriesNumber, rest, repetition }) => (
   <Card className='exercise-card'>
      <h2 className='title-card'>Serie n°{seriesNumber}</h2>
      <p>
         {handlePlural(repetition, 'répétition', true)} à{' '}
         {handlePlural(parseInt(weight), 'kilo', true)} avec {computeInMinutes(rest)} de
         récupération.
      </p>
   </Card>
)

const Series = ({ series }) => {
   if (!series) return <></>
   const sortedSeries = [...series].sort((a, b) => a.seriesNumber - b.seriesNumber)
   return (
      <Carousel arrowTopPosition='20%' carouselHeight={260} carouselWidth={400}>
         {sortedSeries.map((set, index) => (
            <SetRenderer key={`set n°${index}`} {...set} />
         ))}
      </Carousel>
   )
}

const Exercise = ({ exerciseName, instructions, muscleGroup, series, totalTime }) => {
   const [muscleGroupImage, setMuscleGroupImage] = useState(null)
   const [musclesList, setMusclesList] = useState('')
   const [isLoading, setIsLoading] = useState(false)

   const { push, asPath, query } = useRouter()

   const exerciseData = useMemo(() => {
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
                     <AccordionHeader>Execution</AccordionHeader>
                     <AccordionBody>
                        {execution || 'Execution indisponible, veuillez nous contacter.'}
                     </AccordionBody>
                  </Accordion>
               </AccordionList>

               {series && (
                  <>
                     <Bold className='mt-10 mb-4'>Séries :</Bold>
                     <Series series={series} />
                  </>
               )}
               {totalTime && <p>Temps total : {totalTime} minutes</p>}

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
            <>
               <p>Chargement...</p>
            </>
         )}
      </div>
   )
}

export default Exercise
