import { Title } from '@tremor/react'

const Opener = ({ message, children, sexe }) => {
   const getBackgroundImage = (typeOfTraining) => {
      const types = [
         { keyword: 'full-body', value: 'full-body' },
         { keyword: 'haut du corps', value: 'high-body' },
         { keyword: 'cardio', value: 'cardio' },
         { keyword: 'bas du corps', value: 'legs' },
      ]

      for (const type of types) {
         if (typeOfTraining.includes(type.keyword)) {
            return type.value
         }
      }

      return 'full-body'
   }

   return (
      <div className={`card ${sexe}-${getBackgroundImage(message)}`}>
         <div className='title-container'>
            <Title className='title-card' color='white'>
               {message}
            </Title>
         </div>
         <div className='button-container'>{children}</div>
      </div>
   )
}
export default Opener
