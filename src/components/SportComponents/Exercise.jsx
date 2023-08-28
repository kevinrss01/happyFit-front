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
   console.log(series)
   return (
      <Carousel arrowTopPosition='20%' carouselHeight={400} carouselWidth={400}>
         {sortedSeries.map((set, index) => (
            <SetRenderer key={`set n°${index}`} {...set} />
         ))}
      </Carousel>
   )
}

const Exercise = ({ exerciseName, instructions, muscleGroup, series }) => {
   const { push, asPath, query } = useRouter()

   const nextWarmUpPath =
      asPath.split('/').slice(0, 5).join('/') +
      `/${(parseInt(query?.sportSession) + 1).toString()}?length=${query.length}`

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
            <Bold className='mt-10'>Astuces : </Bold>
            <p className='instructions'>
               {instructions} <br />
            </p>
            <Bold className='mt-10'>Démonstration :</Bold>
            <Image
               src='https://api.exercisedb.io/image/MWrgkcrpK2XxJv'
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
