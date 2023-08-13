import { Bold, Title } from '@tremor/react'
import Image from 'next/image'
import gif from '../../public/images/gif-loader-register.gif'
import { useState, useEffect } from 'react'
import { sentencesForLoading } from '../../data/sentencesForLoading'
import Lottie from 'lottie-react'
import animationData from '../../public/animations/girl-running-on-treadmill.json'

export const RegisterLoader = () => {
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
         {/* <Image src={gif} height={350} width={450} /> */}
         <Lottie animationData={animationData} />

         <Title className='sentence-to-wait' color='white'>
            {sentenceToDisplay && (
               <>
                  Saviez-vous que : <Bold className='text-lg'>{sentenceToDisplay}</Bold>
               </>
            )}
         </Title>
      </div>
   )
}
