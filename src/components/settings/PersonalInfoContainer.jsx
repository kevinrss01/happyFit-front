import {
   Button,
   Select,
   SelectItem,
   TextInput,
   Icon,
   NumberInput,
   TabGroup,
   Tab,
   TabList,
   TabPanel,
   Flex,
   TabPanels,
   Bold,
} from '@tremor/react'
import React, { useState } from 'react'
import { BsPersonCircle } from 'react-icons/bs'
import {
   TbSquareRoundedNumber1Filled,
   TbSquareRoundedNumber2Filled,
   TbSquareRoundedNumber3Filled,
   TbSquareRoundedNumber4Filled,
   TbSquareRoundedNumber5Filled,
   TbSquareRoundedNumber6Filled,
   TbSquareRoundedNumber7Filled,
} from 'react-icons/tb'
import { GiBodyBalance, GiBodyHeight, GiGymBag, GiMeditation, GiMuscleUp } from 'react-icons/gi'
import { MdEmojiPeople } from 'react-icons/md'
import { IoHome, IoFitnessSharp } from 'react-icons/io5'
import { FaWeight } from 'react-icons/fa'
import jwtDecode from 'jwt-decode'
import UserAPI from '../../service/UserAPI'
import toastMessage from '../../utils/toast'
import { BsFillPencilFill } from 'react-icons/bs'
import { BiBody } from 'react-icons/bi'
import { verifPersonalInfoSchema } from '../../utils/yupSchema'
import * as Yup from 'yup'

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
   const [isUpdating, setIsUpdating] = useState(false)
   const [isUpdateAvailable, setIsUpdateAvailable] = useState(false)

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
         setIsUpdating(true)

         if (!guardInputs()) {
            return
         }

         const userId = getUserId()
         const { birthday, id, email, ...rest } = updatedData
         const convertedObject = convertStringsToInts(rest)

         await verifyInputs(convertedObject)

         await UserAPI.updatePersonalUserInfo(convertedObject, userId)
         toastMessage('Vos informations personnelles ont bien été mises à jour', 'success')
      } catch (error) {
         console.error(error)
         if (error instanceof Yup.ValidationError) {
            const errorMessages = {}
            error.inner.forEach((error) => {
               errorMessages[error.path] = error.message
            })
            setYupErrors(errorMessages)
         } else {
            toastMessage('Oups, une erreur est survenue, veuillez réessayer plus tard', 'error')
         }
      } finally {
         setIsUpdating(false)
      }
   }

   const onChangeInput = (inputName, inputValue) => {
      setUpdatedData({ ...updatedData, [inputName]: inputValue })
   }

   return (
      <div className='personal-info-container'>
         {!isUpdateAvailable ? (
            <div className='min-h-[300px] flex flex-col items-center justify-center'>
               <h2 className='text-2xl'>Modifier mes informations personnelles</h2>
               <Icon
                  icon={BsFillPencilFill}
                  size='md'
                  variant='solid'
                  style={{
                     cursor: 'pointer',
                  }}
                  onClick={() => {
                     setIsUpdateAvailable(true)
                  }}
               ></Icon>
            </div>
         ) : (
            <>
               <h2>Informations personnelles</h2>
               <div className='form-input-container'>
                  <div className='container-names-input'>
                     <div className='container-single-input'>
                        <TextInput
                           name='firstName'
                           placeholder='Prénom'
                           onChange={(e) => {
                              onChangeInput('firstName', e.target.value)
                           }}
                           error={!!yupErrors.firstName}
                           errorMessage={yupErrors.firstName}
                           defaultValue={firstName}
                           className='input'
                           icon={BsPersonCircle}
                        />
                        {yupErrors.firstName ? (
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
                        <TextInput
                           name='lastName'
                           placeholder='Nom'
                           onChange={(e) => {
                              onChangeInput('lastName', e.target.value)
                           }}
                           error={!!yupErrors.lastName}
                           errorMessage={yupErrors.lastName}
                           defaultValue={updatedData?.lastName}
                           className='input'
                           icon={BsPersonCircle}
                        />
                        {yupErrors.lastName ? (
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

                  <h3>Paramètres de séance</h3>

                  <div className='params-workout-container'>
                     <Select
                        defaultValue={numberOfSessionPerWeek?.toString() || '1'}
                        name='numberOfSessionPerWeek'
                        placeholder='Nombre de séances par semaine...'
                        onValueChange={(value) => {
                           onChangeInput('numberOfSessionPerWeek', parseInt(value))
                        }}
                        className='input'
                     >
                        <SelectItem value='1' text='1 séance' icon={TbSquareRoundedNumber1Filled}>
                           1 séance par semaine
                        </SelectItem>
                        <SelectItem value='2' icon={TbSquareRoundedNumber2Filled}>
                           2 séances par semaine
                        </SelectItem>
                        <SelectItem value='3' icon={TbSquareRoundedNumber3Filled}>
                           3 séances par semaine
                        </SelectItem>
                        <SelectItem value='4' icon={TbSquareRoundedNumber4Filled}>
                           4 séances par semaine
                        </SelectItem>
                        <SelectItem value='5' icon={TbSquareRoundedNumber5Filled}>
                           5 séances par semaine
                        </SelectItem>
                        <SelectItem value='6' icon={TbSquareRoundedNumber6Filled}>
                           6 séances par semaine
                        </SelectItem>
                        <SelectItem value='7' icon={TbSquareRoundedNumber7Filled}>
                           7 séances par semaine
                        </SelectItem>
                     </Select>
                     <Select
                        defaultValue={sportExperienceInYears?.toString() || '0'}
                        placeholder='Mon exeprience sportive...'
                        name='sportExperienceInYears'
                        onValueChange={(value) => {
                           onChangeInput('sportExperienceInYears', value)
                        }}
                        className='input'
                     >
                        <SelectItem value='0' icon={MdEmojiPeople}>
                           J'ai moins d'un an d'expérience
                        </SelectItem>
                        <SelectItem value='1' icon={GiBodyBalance}>
                           J'ai un an d'expérience
                        </SelectItem>
                        <SelectItem value='2' icon={GiMeditation}>
                           J'ai deux ans d'expérience
                        </SelectItem>
                     </Select>
                     <Select
                        defaultValue={updatedData?.trainingPlace || 'home'}
                        name='trainingPlace'
                        placeholder="Lieu d'entrainement..."
                        className='input'
                        onValueChange={(value) => {
                           onChangeInput('trainingPlace', value)
                        }}
                     >
                        <SelectItem value='home' icon={IoHome}>
                           Je m'entraine à la maison
                        </SelectItem>
                        <SelectItem value='gym' icon={GiGymBag}>
                           Je m'entraine à la salle de sport
                        </SelectItem>
                     </Select>
                     <Select
                        defaultValue={availableTimePerSessionInMinutes?.toString() || '60'}
                        name='availableTimePerSessionInMinutes'
                        placeholder='Temps disponible par séance...'
                        onValueChange={(value) => {
                           onChangeInput('availableTimePerSessionInMinutes', value)
                        }}
                        className='input'
                     >
                        <SelectItem value='15'>15 minutes disponibles par séance</SelectItem>
                        <SelectItem value='30'>30 minutes disponibles par séance</SelectItem>
                        <SelectItem value='45'>45 minutes disponibles par séance</SelectItem>
                        <SelectItem value='60'>60 minutes disponibles par séance</SelectItem>
                        <SelectItem value='90'>90 minutes disponibles par séance</SelectItem>
                     </Select>
                  </div>

                  <h3>Informations physiques</h3>

                  <div className='container-physics-inputs'>
                     <div className='container-single-input'>
                        <NumberInput
                           defaultValue={updatedData?.heightInCentimeters}
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
                           defaultValue={updatedData?.weightInKilos}
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

                  <h3 className='mt-4'>Objectif</h3>

                  <div className='w-[80%] mb-8'>
                     <TabGroup>
                        <TabList className='flex items-center justify-center'>
                           <Tab icon={GiMuscleUp}>Prise de muscle</Tab>
                           <Tab icon={IoFitnessSharp}>Remise en forme</Tab>
                           <Tab icon={BiBody}>Perte de poids</Tab>
                        </TabList>
                        <TabPanels>
                           <TabPanel>
                              <Flex>
                                 <Bold className='text-white text-center'>
                                    Votre objectif principal est de prendre du poids proprement, en
                                    d'autres termes, vous voulez prendre de la masse et du muscle
                                    sans trop prendre de gras.
                                 </Bold>
                                 <Button
                                    disabled={fitnessGoal === 'gain muscle'}
                                    onClick={() => onChangeInput('fitnessGoal', 'gain muscle')}
                                    color={'amber'}
                                 >
                                    Je choisis cet objectif {fitnessGoal === 'gain muscle' && '✅'}
                                 </Button>
                              </Flex>
                           </TabPanel>
                           <TabPanel>
                              <Flex>
                                 <Bold className='text-white text-center'>
                                    Votre objectif est simplement de vous remettre en forme, d'être
                                    en meilleure santé, de vous sentir mieux dans votre corps et
                                    dans votre tête.
                                 </Bold>
                                 <Button
                                    disabled={fitnessGoal === 'fitness'}
                                    onClick={() => onChangeInput('fitnessGoal', 'fitness')}
                                    color={'amber'}
                                 >
                                    Je choisis cet objectif {fitnessGoal === 'fitness' && '✅'}
                                 </Button>
                              </Flex>
                           </TabPanel>
                           <TabPanel>
                              <Flex>
                                 <Bold className='text-white text-center'>
                                    Votre priorité est la perte de poids, vous voulez perdre du gras
                                    en limitant la perte de muscle au maximum. Vous voulez effectuez
                                    beaucoup de cardio et de renforcement musculaire pour perdre du
                                    poids.
                                 </Bold>
                                 <Button
                                    disabled={fitnessGoal === 'lose weight'}
                                    onClick={() => onChangeInput('fitnessGoal', 'lose weight')}
                                    color={'amber'}
                                 >
                                    Je choisis cet objectif {fitnessGoal === 'lose weight' && '✅'}
                                 </Button>
                              </Flex>
                           </TabPanel>
                        </TabPanels>
                     </TabGroup>
                  </div>
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
                  Modifier mes informations
               </Button>
            </>
         )}
      </div>
   )
}
