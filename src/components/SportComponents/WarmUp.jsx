// we need : exerciseName, instructions, numberOfSeries, repetition, rest

import { sportTypeTextsClass } from '../../service/StringClasses'
import { computeInMinutes, handlePlural } from '../../service/utils'
import { Bold, Text, Button } from '@tremor/react'
import { BsArrowDownSquareFill } from 'react-icons/bs'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { GiSonicBoom } from 'react-icons/gi'

export default function WarmUp({
   exerciseNumber,
   exerciseName,
   instructions,
   numberOfSeries,
   repetition,
   rest,
}) {
   const repetitions = handlePlural(repetition, 'répétition', true)
   const repetitionsText = repetitions ? ` de ${repetitions}` : ''
   const { push, asPath, query } = useRouter()

   const basePath = asPath.split('/').slice(0, 4).join('/')
   const exercisePathParam = '/exercise'
   const warmUpParam = `/warmup/${exerciseNumber}`

   const programPath = `${basePath}${exercisePathParam}`
   const nextWarmUpPath = `${basePath}${warmUpParam}?length=${query.length}`

   return (
      <div className={`details-exo-container ${sportTypeTextsClass}`}>
         <div className='details-under-container'>
            <h2 className='title-details'>
               Échauffement n°{exerciseNumber} : {exerciseName}
            </h2>
            {parseInt(query?.length) === parseInt(exerciseNumber) ? (
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

            <Bold className='mt-10'>Astuces : </Bold>
            <p className='instructions'>
               {instructions} <br />
            </p>

            <Bold className='mt-10'>Instructions : </Bold>
            <p>
               Répétez cet échauffement sur {handlePlural(numberOfSeries, 'série', true)}
               {repetitionsText} avec {computeInMinutes(rest)} de repos.
            </p>
            <BsArrowDownSquareFill className='icon' />
            <Bold className=''>{handlePlural(numberOfSeries, 'série', true)}</Bold>
            <Bold className=''>{repetitions}</Bold>
            <Bold className=''>{computeInMinutes(rest)} de repos</Bold>

            <Bold className='mt-10'>Démonstration : (image test)</Bold>
            <Image
               src='https://firebasestorage.googleapis.com/v0/b/happyfit-app.appspot.com/o/ZFTZfpWIemY7ee.gif?alt=media&token=6b2894c6-eb66-4b96-8b9e-72fa74681b77'
               width={250}
               height={250}
               alt="GIF de l'exercice"
            />
         </div>
      </div>
   )
}
