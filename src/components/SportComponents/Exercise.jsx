import { sportTypeTextsClass } from '../../service/StringClasses'
import { computeInMinutes, handlePlural } from '../../service/utils'
import { Button, Bold, Card } from '@tremor/react'
import Image from 'next/image'
import Carousel from '../Containers/Carousel'
import { useRouter } from 'next/router'
import { AiOutlineArrowRight } from 'react-icons/ai'

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
      <Carousel arrowTopPosition='20%' carouselHeight={400} carouselWidth={400}>
         {sortedSeries.map((set, index) => (
            <SetRenderer key={`set n°${index}`} {...set} />
         ))}
      </Carousel>
   )
}

const Exercise = ({ exerciseName, instructions, muscleGroup, series, totalTime }) => {
   const { push, asPath, query } = useRouter()

   const basePath = asPath.split('/').slice(0, 5).join('/')
   const nextSportSession = parseInt(query?.sportSession) + 1
   const nextWarmUpPath = `${basePath}/${nextSportSession}?length=${query.length}`

   return (
      <div className={`details-exo-container ${sportTypeTextsClass}`}>
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
            <Bold className='mt-10'>Instructions : </Bold>
            <p className='instructions'>
               {instructions} <br />
            </p>

            {totalTime && <p>Temps total : {totalTime} minutes</p>}

            <Bold className='mt-10'>Démonstration : (image test)</Bold>
            <Image
               src='https://firebasestorage.googleapis.com/v0/b/happyfit-app.appspot.com/o/ZFTZfpWIemY7ee.gif?alt=media&token=6b2894c6-eb66-4b96-8b9e-72fa74681b77'
               width={250}
               height={250}
               alt="GIF de l'exercice"
            />
            {series && (
               <>
                  <Bold className='mt-10 mb-4'>Séries :</Bold>
                  <Series series={series} />
               </>
            )}
         </div>
      </div>
   )
}

export default Exercise
