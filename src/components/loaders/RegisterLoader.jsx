import { Bold, Title } from '@tremor/react'
import { useState, useEffect } from 'react'
import { sentencesForLoading } from '../../constants/sentencesForLoading'
import { RotatingLines } from 'react-loader-spinner'
import TextStepProgram from '../register/TextStepProgram'

export const RotatingLoader = () => {
   return <RotatingLines strokeColor='#3e8bd0' width='25' />
}

export const RegisterLoader = ({ stepDone, numberOfTraining }) => {
   const [sentenceToDisplay, setSentenceToDisplay] = useState('')
   const [indexSentence, setIndexSentence] = useState(0)

   // TO-DO : Ajouter le local storage avec authAPI

   const displaySentence = () => {
      setIndexSentence(indexSentence + 1)

      if (indexSentence === sentencesForLoading.length - 1) {
         setIndexSentence(0)
      }

      setSentenceToDisplay(sentencesForLoading[indexSentence].title)
   }

   useEffect(() => {
      const interval = setInterval(() => {
         displaySentence()
      }, 5000)

      return () => clearInterval(interval)
   }, [sentenceToDisplay])

   return (
      <div className='loader-container gap-10'>
         <Title
            color='white'
            style={{
               textAlign: 'center',
            }}
         >
            Votre programme est en train d'être créé, cela peut prendre jusqu'à 2 minutes...
            <br />
            (Merci de ne pas fermer la page)
         </Title>

         <div className='all-steps-container'>
            <TextStepProgram
               text='Création de la structure du programme'
               isLoading={stepDone.length === 0}
               isDisplay={true}
            />

            {stepDone.includes('program structure done') &&
               [...Array(numberOfTraining)].map((_, index) => (
                  <TextStepProgram
                     key={`text-step-program-${index}`}
                     text={`Création de la séance d'échauffement du jour N°${index + 1}`}
                     isLoading={stepDone.length === 1 + index}
                     isDisplay={stepDone.length >= 1 + index}
                  />
               ))}

            {stepDone.length >= 1 + numberOfTraining &&
               [...Array(numberOfTraining)].map((_, index) => (
                  <TextStepProgram
                     key={`text-step-program-${index}`}
                     text={`Création du programme d'entraînement N°${index + 1}`}
                     isLoading={stepDone.length === 1 + (numberOfTraining + index)}
                     isDisplay={stepDone.length >= 1 + (numberOfTraining + index)}
                  />
               ))}
         </div>

         <Title className='sentence-to-wait' color='white'>
            {sentenceToDisplay && (
               <>
                  Le saviez-vous ? <Bold className='text-lg'>{sentenceToDisplay}</Bold>
               </>
            )}
         </Title>
      </div>
   )
}
