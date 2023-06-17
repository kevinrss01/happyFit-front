import React, { useCallback, useRef, useState } from 'react'
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import { FaWeightHanging, FaBirthdayCake } from 'react-icons/fa'
import { GiBodyHeight } from 'react-icons/gi'
import { FcFlashOn } from 'react-icons/fc'
import { Bold, Button, DateRangePicker, TextInput, Title } from '@tremor/react'
import { es, fr } from 'date-fns/locale'
import toastMessage from '../../utils/toast'

function removePureYears(years) {
   this.setFullYear(this.getFullYear() - years)
   this.setHours(1)
   this.setMinutes(0)
   return this
}

const minimumBirthDayToBeMajor = Reflect.apply(removePureYears, new Date(), [16])

const defaultData = {
   heightInCentimeters: 0,
   weightInKilos: 0,
   birthday: '',
}

export default function ParamsForm({ validate, goBack }) {
   const [formValue, setFormValue] = useState(defaultData)
   const { heightInCentimeters, weightInKilos, birthday } = formValue
   const calendarRef = useRef()
   const [invalidInput, setInvalidInput] = useState(false)

   function isValidDate(d) {
      return !isNaN(Date.parse(d))
   }

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
         const date = new Date(birthday)
         if (date.getTime() > minimumBirthDayToBeMajor.getTime()) {
            event.nativeEvent.returnValue = false
            toastMessage('Vous devez avoir au moins 16 ans pour vous inscrire', 'error')
            return
         }
         if (Object.keys(formValue).every((key) => !!formValue[key])) {
            validate('params', formValue)
         } else {
            console.log(formValue)
            setInvalidInput(true)
         }
      },
      [formValue],
   )

   return (
      <form onSubmit={handleSubmit} className='container-column w-2/5 max-w-xl'>
         <Title color='white' className='text-2xl flex w-full justify-center items-center m-5 mb-7'>
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
            />

            <TextInput
               type='date'
               name='birthday'
               icon={FaBirthdayCake}
               onChange={handleChange}
               id='birthday'
               maxDate={minimumBirthDayToBeMajor}
               defaultValue={minimumBirthDayToBeMajor.toJSON().substring(0, 10)}
               error={invalidInput && !isValidDate(birthday)}
            />
            {invalidInput && (
               <Bold className='text-red-600'>Veuillez remplir correctement tous les champs</Bold>
            )}

            <Button type='submit' className='flex w-full' icon={FcFlashOn}>
               Créer mon programme personnalisé
            </Button>
         </div>
      </form>
   )
}
