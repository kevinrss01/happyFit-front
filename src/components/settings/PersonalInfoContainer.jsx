import { Button } from '@tremor/react'
import React, { useState } from 'react'

import jwtDecode from 'jwt-decode'
import toastMessage from '../../utils/toast'
import { verifPersonalInfoSchema } from '../../utils/yupSchema'
import * as Yup from 'yup'
import NamesContainer from './personalContainer/NamesContainer'
import WorkoutParamsContainer from './personalContainer/WorkoutParamsContainer'
import HeightWeightContainer from './personalContainer/HeightWeightContainer'
import GoalContainer from './personalContainer/GoalContainer'
import { updateUserInfo } from '../../redux/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

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
   const [yupErrors, setYupErrors] = useState({})
   const [indexGoalTab, setIndexGoalTab] = useState(() => {
      if (userData.fitnessGoal === 'gain muscle') return 0
      if (userData.fitnessGoal === 'fitness') return 1
      if (userData.fitnessGoal === 'lose weight') return 2
   })

   const isUpdating = useSelector((state) => state.user.isUpdating)

   const dispatch = useDispatch()

   const {
      firstName,
      lastName,
      numberOfSessionPerWeek,
      sportExperienceInYears,
      trainingPlace,
      heightInCentimeters,
      weightInKilos,
      availableTimePerSessionInMinutes,
      fitnessGoal,
   } = updatedData

   const getUserId = () => {
      const userToken = JSON.parse(localStorage.getItem('userTokens'))
      return jwtDecode(userToken.token).sub
   }

   const guardInputs = () => {
      Object.keys(updatedData).forEach((key) => {
         if (!updatedData[key]) {
            toastMessage('Veuillez remplir tous les champs', 'error')
            return false
         }
      })

      const originalUserData = Object.values(userData)
      const updatedUserData = Object.values(updatedData)
      if (originalUserData.length !== updatedUserData.length) {
         toastMessage('Veuillez remplir tous les champs', 'error')
         return false
      }

      for (const key in originalUserData) {
         if (originalUserData[key] !== updatedUserData[key]) {
            return true
         }
      }

      toastMessage(
         'Les données ne peuvent pas être identiques veuillez modifier au moins un champ.',
         'error',
      )
      return false
   }
   const verifyInputs = async (formValues) => {
      await verifPersonalInfoSchema.validate(formValues, {
         abortEarly: false,
      })
   }

   const onSubmit = async () => {
      try {
         setYupErrors({})

         if (!guardInputs()) {
            return
         }

         const userId = getUserId()
         const { birthday, id, email, sexe, exoPerformances, ...rest } = updatedData
         const convertedObject = convertStringsToInts(rest)

         await verifyInputs(convertedObject)

         dispatch(updateUserInfo(convertedObject, userId))
      } catch (error) {
         console.error(error)
         if (error instanceof Yup.ValidationError) {
            const errorMessages = {}
            error.inner.forEach((error) => {
               errorMessages[error.path] = error.message
            })
            setYupErrors(errorMessages)
         } else {
            toastMessage(
               'Oups, une erreur est survenue, rechargez la page ou veuillez réessayer plus tard',
               'error',
            )
         }
      }
   }

   const onChangeInput = (inputName, inputValue) => {
      setUpdatedData({ ...updatedData, [inputName]: inputValue })
   }

   return (
      <div className='personal-info-container'>
         <h2>Informations personnelles</h2>
         <div className='form-input-container'>
            <NamesContainer
               userData={updatedData}
               yupErrors={yupErrors}
               onChangeInput={onChangeInput}
            />

            <h3>Paramètres de séance</h3>
            <WorkoutParamsContainer userData={updatedData} onChangeInput={onChangeInput} />

            <h3>Informations physiques</h3>
            <HeightWeightContainer
               userData={updatedData}
               onChangeInput={onChangeInput}
               yupErrors={yupErrors}
            />

            <h3 className='mt-4'>Objectif</h3>
            <GoalContainer
               userData={updatedData}
               onChangeInput={onChangeInput}
               indexGoalTab={indexGoalTab}
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
                  weightInKilos &&
                  fitnessGoal &&
                  availableTimePerSessionInMinutes
               )
            }
            loading={isUpdating}
         >
            Modifier mes informations
         </Button>
      </div>
   )
}
