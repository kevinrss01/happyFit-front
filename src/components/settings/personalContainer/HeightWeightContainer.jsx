import { NumberInput } from '@tremor/react'
import { GiBodyHeight } from 'react-icons/gi'
import { FaWeight } from 'react-icons/fa'
import React from 'react'

const HeightWeightContainer = ({ userData, onChangeInput, yupErrors }) => {
   return (
      <div className='container-physics-inputs'>
         <div className='container-single-input'>
            <NumberInput
               defaultValue={userData?.heightInCentimeters}
               onValueChange={(number) => {
                  onChangeInput('heightInCentimeters', number)
               }}
               name='heightInCentimeters'
               min={100}
               max={250}
               placeholder='Taille en CM'
               icon={GiBodyHeight}
               error={!!yupErrors.heightInCentimeters}
               errorMessage={yupErrors.heightInCentimeters}
               className='input'
            />
            {yupErrors.heightInCentimeters ? (
               <></>
            ) : (
               <p
                  style={{
                     opacity: '0%',
                  }}
               >
                  Ceci est un texte
               </p>
            )}
         </div>
         <div className='container-single-input'>
            <NumberInput
               defaultValue={userData?.weightInKilos}
               onValueChange={(number) => {
                  onChangeInput('weightInKilos', number)
               }}
               min={40}
               max={200}
               placeholder='Poids en kilos'
               icon={FaWeight}
               error={!!yupErrors.weightInKilos}
               errorMessage={yupErrors.weightInKilos}
               name='weightInKilos'
               className='input'
            />
            {yupErrors.weightInKilos ? (
               <></>
            ) : (
               <p
                  style={{
                     opacity: '0%',
                  }}
               >
                  Ceci est un texte
               </p>
            )}
         </div>
      </div>
   )
}

export default HeightWeightContainer
