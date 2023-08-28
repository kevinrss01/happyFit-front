import { Title } from '@tremor/react'
import Tilt from 'react-parallax-tilt'

function getRandomOneOrTwo(typeOfTraining) {
   const number = Math.floor(Math.random() * 2) + 1
   return typeOfTraining + number
}

function getRandomOneOrTwoOrThree(typeOfTraining) {
   const number = Math.floor(Math.random() * 3) + 1
   return typeOfTraining + number
}

const getBackgroundImage = (typeOfTraining) => {
   const types = [
      { keyword: 'full-body', value: getRandomOneOrTwoOrThree('full-body') },
      { keyword: 'haut du corps', value: getRandomOneOrTwo('high-body') },
      { keyword: 'cardio', value: getRandomOneOrTwo('cardio') },
      { keyword: 'bas du corps', value: 'legs' },
   ]

   for (const type of types) {
      if (typeOfTraining.includes(type.keyword)) {
         return type.value
      }
   }

   return 'full-body'
}

const Opener = ({ message, children, sexe }) => {
   return (
      <Tilt
         glareEnable={true}
         glareMaxOpacity={0.4}
         glareColor='#ffffff'
         glarePosition='top'
         glareBorderRadius='20px'
      >
         <div className={`card ${sexe}-${getBackgroundImage(message)}`}>
            <div className='title-container'>
               <Title className='title-card' color='white'>
                  {message}
               </Title>
            </div>
            <div className='button-container'>{children}</div>
         </div>
      </Tilt>
   )
}
export default Opener
