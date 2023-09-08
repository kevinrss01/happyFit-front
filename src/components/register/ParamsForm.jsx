import React, { useCallback, useEffect, useRef, useState } from 'react'
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import { FaWeightHanging, FaBirthdayCake, FaCity } from 'react-icons/fa'
import { GiBodyHeight, GiUnfriendlyFire } from 'react-icons/gi'
import { FcFlashOn } from 'react-icons/fc'
import { Bold, Button, TextInput, Title } from '@tremor/react'
import toastMessage from '../../utils/toast'
import { IoShareSocialOutline } from 'react-icons/io5'
import { Select, SelectItem } from '@tremor/react'
import {
   AiFillLinkedin,
   AiFillFacebook,
   AiFillTwitterSquare,
   AiFillYoutube,
   AiOutlineInstagram,
   AiFillGoogleCircle,
} from 'react-icons/ai'
import { GiThreeFriends, GiBrain } from 'react-icons/gi'
import { BiWorld } from 'react-icons/bi'
import { GrAppleAppStore, GrGooglePlay } from 'react-icons/gr'

const typeOfReferenceSource = [
   { text: 'Linkedin', value: 'linkedin', icon: AiFillLinkedin },
   { text: 'Facebook', value: 'facebook', icon: AiFillFacebook },
   { text: 'Twitter', value: 'twitter', icon: AiFillTwitterSquare },
   { text: 'Instagram', value: 'instagram', icon: AiOutlineInstagram },
   { text: 'Youtube', value: 'youtube', icon: AiFillYoutube },
   { text: 'Ami/Famille/collègue', value: 'family-friends-colleague', icon: GiThreeFriends },
   { text: 'Moteur de recherche', value: 'search-engine', icon: AiFillGoogleCircle },
   { text: 'Discord', value: 'discord', icon: GiBrain },
   { text: 'App Store', value: 'app-store', icon: GrAppleAppStore },
   { text: 'Google Play', value: 'google-play', icon: GrGooglePlay },
   { text: 'Autres', value: 'other', icon: BiWorld },
]

function removePureYears(years) {
   this.setFullYear(this.getFullYear() - years)
   this.setHours(1)
   this.setMinutes(0)
   return this
}

const minimumBirthDayToBeMajor = Reflect.apply(removePureYears, new Date(), [16])

const setDeviceRegistration = (windowWidth) => {
   if (windowWidth < 640) {
      return 'webMobile'
   } else {
      return 'webLargeScreen'
   }
}

const defaultData = {
   heightInCentimeters: undefined,
   weightInKilos: undefined,
   birthday: '',
   city: '',
   referenceSource: 'other',
   registrationDate: new Date().toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
   }),
   deviceRegistration: '',
}

export default function ParamsForm({ validate, goBack }) {
   const [formValue, setFormValue] = useState(defaultData)
   const { heightInCentimeters, weightInKilos, birthday, city, referenceSource } = formValue
   const calendarRef = useRef()
   const [invalidInput, setInvalidInput] = useState(false)
   const [invalidAge, setInvalidAge] = useState(false)

   function isValidDate(d) {
      return !isNaN(Date.parse(d))
   }

   useEffect(() => {
      if (sessionStorage.getItem('metrics')) {
         setFormValue(JSON.parse(sessionStorage.getItem('metrics')))
      }
   }, [])

   const handleChange = useCallback((event) => {
      const { id, value, type } = event.target

      setFormValue((prevForm) => ({
         ...prevForm,
         [id]: type === 'number' ? parseInt(value) : value,
      }))
   }, [])

   const handleSubmit = useCallback(
      (event) => {
         event.preventDefault()
         setInvalidAge(false)

         sessionStorage.setItem('metrics', JSON.stringify(formValue))

         setFormValue((prevForm) => ({
            ...prevForm,
            deviceRegistration: setDeviceRegistration(window.innerWidth),
         }))

         const date = new Date(birthday)
         if (date.getTime() > minimumBirthDayToBeMajor.getTime()) {
            event.nativeEvent.returnValue = false
            setInvalidAge(true)
            toastMessage('Vous devez avoir au moins 16 ans pour vous inscrire', 'error')
            return
         }
         if (Object.keys(formValue).every((key) => !!formValue[key])) {
            validate('params', formValue)
         } else {
            setInvalidInput(true)
         }
      },
      [formValue],
   )

   return (
      <form onSubmit={handleSubmit} className='container-column w-2/5 max-w-xl components'>
         <Title color='white' className='text-2xl flex w-full justify-center items-center mb-7'>
            <IoArrowBackCircleOutline className='icon mr-2' onClick={goBack} />
            Paramètres personnels
         </Title>

         <div className='container flex flex-col gap-6'>
            <TextInput
               id='weightInKilos'
               onChange={handleChange}
               type='number'
               min={40}
               max={200}
               placeholder='Poids en kilos'
               icon={FaWeightHanging}
               error={invalidInput && !weightInKilos}
               value={formValue.weightInKilos}
            />

            <TextInput
               id='heightInCentimeters'
               onChange={handleChange}
               type='number'
               min={100}
               max={250}
               placeholder='Taille en cm'
               icon={GiBodyHeight}
               error={invalidInput && !heightInCentimeters}
               value={formValue.heightInCentimeters}
            />

            <TextInput
               type='date'
               name='birthday'
               icon={FaBirthdayCake}
               onChange={handleChange}
               id='birthday'
               maxDate={minimumBirthDayToBeMajor}
               defaultValue={minimumBirthDayToBeMajor.toJSON().substring(0, 10)}
               error={(invalidInput && !isValidDate(birthday)) || invalidAge}
               value={formValue.birthday}
            />

            <Title
               color='white'
               className='text-2xl flex w-full justify-center items-center text-center'
            >
               Pour améliorer constamment nos services :
            </Title>

            <TextInput
               name='city'
               placeholder='Dans quelle ville habitez-vous ?'
               icon={FaCity}
               onChange={handleChange}
               id='city'
               error={invalidInput && !city}
               value={formValue.city}
            />

            <Select
               placeholder='Où avez-vous entendu parler de nous ?'
               icon={IoShareSocialOutline}
               onValueChange={(value) =>
                  setFormValue((prevForm) => ({ ...prevForm, referenceSource: value }))
               }
               id='referenceSource'
               value={formValue.referenceSource}
            >
               {typeOfReferenceSource.map(({ text, value, icon }) => (
                  <SelectItem key={value} value={value} icon={icon}>
                     {text}
                  </SelectItem>
               ))}
            </Select>

            <Button type='submit' className='flex w-full' icon={FcFlashOn}>
               Créer mon programme personnalisé
            </Button>

            {invalidInput && (
               <Bold className='text-red-600'>Veuillez remplir correctement tous les champs</Bold>
            )}
         </div>
      </form>
   )
}
