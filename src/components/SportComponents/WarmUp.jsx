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
} from '@tremor/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { GiSonicBoom } from 'react-icons/gi'
import { useEffect, useMemo, useState } from 'react'
import WarmUpLoader from '../loaders/SportPages/WarmUpLoader'
import axios from 'axios'

import { exercisesDataList } from '../../constants/exercisesData'

const { warmUp } = exercisesDataList

function splitExecutionIntoSteps(execution) {
   // The regex `(/(\. )(\d+\. )/g)` works as follows:
   // `(\. )`: Captures the period '.' followed by a space. This is our first capture group.
   // `(\d+\. )`: Captures one or more digits followed by a period '.' and a space. This is our second capture group.
   // These two capture groups are combined with the replacement string '$1||$2', effectively inserting the marker '||' while retaining the original periods.

   const markedText = execution.replace(/(\. )(\d+\. )/g, '$1||$2')

   return markedText.split('||').filter(Boolean)
}

export default function WarmUp({
   exerciseNumber,
   exerciseName,
   instructions,
   numberOfSeries,
   repetition,
   rest,
}) {
   const [muscleGroupImage, setMuscleGroupImage] = useState(null)
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
      return warmUp.filter((exercise) => exercise.name === exerciseName)[0]
   }, [exerciseName])

   const { traduction, muscleGroups, gif, video, execution, description } = exerciseData

   useEffect(() => {
      const { primaryMuscleGroups, secondaryMuscleGroups } = muscleGroups.english
      setIsLoading(true)
      const fetchData = async () => {
         const options = {
            method: 'GET',
            url: 'https://muscle-group-image-generator.p.rapidapi.com/getMulticolorImage',
            params: {
               primaryColor: '240,100,80',
               secondaryColor: '200,100,80',
               primaryMuscleGroups: primaryMuscleGroups,
               secondaryMuscleGroups: secondaryMuscleGroups,
               transparentBackground: '0',
            },
            responseType: 'arraybuffer',
            headers: {
               'X-RapidAPI-Key': '14b8eccabcmsha2eda835da87d52p1ce5c5jsn27276cf68176',
               'X-RapidAPI-Host': 'muscle-group-image-generator.p.rapidapi.com',
            },
         }

         try {
            const response = await axios.request(options)
            const imageFile = new Blob([response.data])
            const imageUrl = URL.createObjectURL(imageFile)
            setMuscleGroupImage(imageUrl)
            setIsLoading(false)
         } catch (error) {
            console.error(error)
         }
      }

      fetchData()
   }, [exerciseName])

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
                        {description
                           ? description
                           : 'Information indisponible veuillez nous contacter.'}
                     </AccordionBody>
                  </Accordion>
                  <Accordion defaultOpen={true}>
                     <AccordionHeader>Instruction</AccordionHeader>
                     <AccordionBody>
                        {instructions || 'Information indisponible veuillez nous contacter.'}
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
                     <Bold>Démonstration </Bold>
                     <Image
                        src='https://firebasestorage.googleapis.com/v0/b/happyfit-app.appspot.com/o/ZFTZfpWIemY7ee.gif?alt=media&token=6b2894c6-eb66-4b96-8b9e-72fa74681b77'
                        width={250}
                        height={250}
                        alt="GIF de l'exercice"
                     />
                  </div>
                  <div className='muscles-img-container'>
                     <Bold>Groupe de muscles : </Bold>
                     {muscleGroupImage && (
                        <Image
                           src={muscleGroupImage}
                           width={250}
                           height={250}
                           alt='muscles group'
                        />
                     )}
                  </div>
               </div>
            </div>
         )}
      </div>
   )
}
