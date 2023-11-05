import { Button, Title } from '@tremor/react'
import { BiLandscape } from 'react-icons/bi'
import { useState } from 'react'
import BilanContainer from '../components/bilan/BilanContainer'

export default function Bilan() {
   const [showBilanContainer, setShowBilanContainer] = useState(false)

   const handleShowBilanContainer = () => {
      setShowBilanContainer(!showBilanContainer)
   }

   return (
      <div className='bilan-main-container'>
         {showBilanContainer ? (
            <BilanContainer />
         ) : (
            <div className='question-container'>
               <Title className={'title'}>
                  Vous avez fini votre semaine d'entraînement ou vous souhaitez crée un nouveau
                  programme ?
               </Title>
               <Button icon={BiLandscape} onClick={handleShowBilanContainer}>
                  Faire le bilan de la semaine
               </Button>
            </div>
         )}
      </div>
   )
}
