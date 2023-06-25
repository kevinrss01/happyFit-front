import { Button, SelectBox, SelectBoxItem, TextInput } from '@tremor/react'
import React, { useState } from 'react'
import { BsPersonCircle } from 'react-icons/bs'
import { ImListNumbered } from 'react-icons/im'
import {
   TbSquareRoundedNumber1Filled,
   TbSquareRoundedNumber2Filled,
   TbSquareRoundedNumber3Filled,
   TbSquareRoundedNumber4Filled,
   TbSquareRoundedNumber5Filled,
   TbSquareRoundedNumber6Filled,
   TbSquareRoundedNumber7Filled,
} from 'react-icons/tb'
import { GiBodyBalance, GiBodyHeight, GiGymBag, GiMeditation } from 'react-icons/gi'
import { MdEmojiPeople, MdOutlinePlace } from 'react-icons/md'
import { IoHome } from 'react-icons/io5'
import { BiTimer } from 'react-icons/bi'
import { FaWeightHanging } from 'react-icons/fa'
import { SiLevelsdotfyi } from 'react-icons/si'
import jwtDecode from 'jwt-decode'
import UserAPI from '../../service/UserAPI'
import toastMessage from '../../utils/toast'

function convertStringsToInts(obj) {
   let newObj = {}
   Object.keys(obj).forEach((key) => {
      const intValue = parseInt(obj[key], 10)
      if (!isNaN(intValue)) {
         newObj[key] = intValue
      } else {
         newObj[key] = obj[key]
      }
   })
   return newObj
}

export const PersonalInfoContainer = ({ userData }) => {
   const [updatedData, setUpdatedData] = useState(userData)
   const {
      firstName,
      lastName,
      numberOfSessionPerWeek,
      sportExperienceInYears,
      trainingPlace,
      heightInCentimeters,
      weightInKilos,
   } = updatedData
   const [isUpdating, setIsUpdating] = useState(false)

   const getUserId = () => {
      const userToken = JSON.parse(localStorage.getItem('userTokens'))
      return jwtDecode(userToken.token).sub
   }

   const onSubmit = () => {
      // TODO : Faire la vérification des inputs
      setIsUpdating(true)

      const userId = getUserId()
      const convertedObject = convertStringsToInts(updatedData)
      UserAPI.updatePersonalUserInfo(convertedObject, userId)
         .then((res) => {
            console.log(res)
            toastMessage('Vos données ont bien été modifié.', 'success')
         })
         .catch((err) => {
            console.error(err)
            toastMessage(
               'Une erreur est survenue lors de la modification de vos informations, veuillez réessayer plus tard.',
               'error',
            )
         })
         .finally(() => {
            setIsUpdating(false)
         })
   }

   const onChangeInput = (inputName, inputValue) => {
      setUpdatedData({ ...updatedData, [inputName]: inputValue })
   }

   return (
      <div className='personal-info-container'>
         <h2>Informations personnelles</h2>
         <div className='form-input-container'>
            <TextInput
               name='firstName'
               placeholder='Prénom'
               onChange={(e) => {
                  onChangeInput('firstName', e.target.value)
               }}
               error=''
               errorMessage=''
               defaultValue={updatedData?.firstName}
               className='input'
               icon={BsPersonCircle}
            />
            <TextInput
               name='lastName'
               placeholder='nom'
               onChange={(e) => {
                  onChangeInput('lastName', e.target.value)
               }}
               error=''
               errorMessage=''
               defaultValue={updatedData?.lastName}
               className='input'
               icon={BsPersonCircle}
               tooltip='bla'
            />
            <SelectBox
               defaultValue={updatedData?.numberOfSessionPerWeek}
               name='numberOfSessionPerWeek'
               placeholder='Nombre de séances par semaine'
               icon={ImListNumbered}
               onValueChange={(value) => {
                  onChangeInput('numberOfSessionPerWeek', parseInt(value))
               }}
               className='input'
            >
               <SelectBoxItem value='1' text='1 séance' icon={TbSquareRoundedNumber1Filled} />
               <SelectBoxItem value='2' text='2 séances' icon={TbSquareRoundedNumber2Filled} />
               <SelectBoxItem value='3' text='3 séances' icon={TbSquareRoundedNumber3Filled} />
               <SelectBoxItem value='4' text='4 séances' icon={TbSquareRoundedNumber4Filled} />
               <SelectBoxItem value='5' text='5 séances' icon={TbSquareRoundedNumber5Filled} />
               <SelectBoxItem value='6' text='6 séances' icon={TbSquareRoundedNumber6Filled} />
               <SelectBoxItem value='7' text='7 séances' icon={TbSquareRoundedNumber7Filled} />
            </SelectBox>
            <SelectBox
               defaultValue={updatedData?.sportExperienceInYears}
               placeholder='Experience'
               name='sportExperienceInYears'
               icon={SiLevelsdotfyi}
               onValueChange={(value) => {
                  onChangeInput('sportExperienceInYears', value)
               }}
               className='input'
            >
               <SelectBoxItem value='0' text="Moins d'un an" icon={MdEmojiPeople} />
               <SelectBoxItem value='1' text='1 an' icon={GiBodyBalance} />
               <SelectBoxItem value='2' text='2 ans et plus' icon={GiMeditation} />
            </SelectBox>
            <SelectBox
               defaultValue={updatedData?.trainingPlace}
               name='trainingPlace'
               placeholder="Lieu d'entrainement"
               icon={MdOutlinePlace}
               className='input'
               onValueChange={(value) => {
                  onChangeInput('trainingPlace', value)
               }}
            >
               <SelectBoxItem value='home' text='À la maison' icon={IoHome} />
               <SelectBoxItem value='gym' text='À la salle de sport' icon={GiGymBag} />
            </SelectBox>
            <SelectBox
               defaultValue={updatedData?.availableTimePerSessionInMinutes}
               name='availableTimePerSessionInMinutes'
               placeholder='Temps disponible par séance'
               icon={BiTimer}
               onValueChange={(value) => {
                  onChangeInput('availableTimePerSessionInMinutes', value)
               }}
               className='input'
            >
               <SelectBoxItem value='15' text='15 minutes' />
               <SelectBoxItem value='20' text='20 minutes' />
               <SelectBoxItem value='30' text='30 minutes' />
               <SelectBoxItem value='45' text='45 minutes' />
               <SelectBoxItem value='60' text='60 minutes' />
               <SelectBoxItem value='90' text='90 minutes' />
            </SelectBox>
            <TextInput
               defaultValue={updatedData?.heightInCentimeters}
               onChange={(e) => {
                  onChangeInput('heightInCentimeters', e.target.value)
               }}
               type='number'
               name='heightInCentimeters'
               min={100}
               max={250}
               placeholder='Taille en CM'
               icon={GiBodyHeight}
               error=''
               className='input'
            />
            <TextInput
               defaultValue={updatedData?.weightInKilos}
               onChange={(e) => {
                  onChangeInput('weightInKilos', e.target.value)
               }}
               type='number'
               min={40}
               max={200}
               placeholder='Poids en kilos'
               icon={FaWeightHanging}
               error=''
               name='weightInKilos'
               className='input'
            />
         </div>
         <Button
            className='button-update-form'
            onClick={() => {
               onSubmit()
            }}
            disabled={
               !(
                  firstName &&
                  lastName &&
                  numberOfSessionPerWeek &&
                  sportExperienceInYears &&
                  heightInCentimeters &&
                  trainingPlace &&
                  weightInKilos
               )
            }
            loading={isUpdating}
         >
            Modifier
         </Button>
      </div>
   )
}
