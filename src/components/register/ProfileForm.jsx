import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { BiLockAlt } from 'react-icons/bi'
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai'
import { TextInput, Title, Select, SelectItem, Text } from '@tremor/react'
import { Button } from '@tremor/react'
import { verificationProfilFormSchema } from '../../utils/yupSchema'
import * as Yup from 'yup'
import toastMessage from '../../utils/toast'
import axios from 'axios'

const defaultFormValue = {
   firstName: '',
   lastName: '',
   email: '',
   sexe: '',
   password: '',
   confirmPassword: '',
   visible: false,
}

function ProfileForm({ validate }) {
   const [formValue, setFormValue] = useState(defaultFormValue)
   const [yupErrors, setYupErrors] = useState({})
   const [passwordsDontMatch, setPasswordsDontMatch] = useState(false)
   const [isLoadingButton, setIsLoadingButton] = useState(false)
   const [emailTaken, setEmailTaken] = useState(false)

   useEffect(() => {
      if (typeof window !== 'undefined') {
         const prevValues = sessionStorage.getItem('personalInformations')
         prevValues && setFormValue(JSON.parse(prevValues))
      }
   }, [])

   const { firstName, lastName, email, sexe, password, visible, confirmPassword } = useMemo(
      () => formValue,
      [formValue],
   )

   const handleChange = useCallback((event) => {
      setFormValue((prevForm) => ({
         ...prevForm,
         [event.target.id]: event.target.value,
      }))
   }, [])

   const handleVisibleClick = useCallback(() => {
      setFormValue((prevForm) => ({
         ...prevForm,
         visible: !prevForm.visible,
      }))
   }, [])

   /*
    function written in case we decide to handle the number type on our own to parse data (html number type accepts - and + which can be problematic depending on the format when want to save)
     */
   // const numIsInRightFormat = useCallback((num) => {
   //   const regex = /[`!@#$%^&*()_\-=\[\]{};':"\\|,.<>\/?~]| [a-z]|[A-Z]/;
   //   return !regex.test(num);
   // }, []);

   const verifyInputs = async (formValues) => {
      await verificationProfilFormSchema.validate(formValues, {
         abortEarly: false,
      })
   }

   const handleSubmit = useCallback(
      async (event) => {
         event.preventDefault()
         try {
            setIsLoadingButton(true)
            setYupErrors({})
            setPasswordsDontMatch(false)
            setEmailTaken(false)

            const valideEmail = await axios.get(`http://localhost:4000/users/verifyEmail/${email}`)
            if (valideEmail.data === true) {
               setEmailTaken(true)
               return
            }
            setIsLoadingButton(false)
            await verifyInputs(formValue)

            if (password !== confirmPassword) {
               setPasswordsDontMatch(true)
               return
            }
            const { visible, ...formValues } = formValue
            sessionStorage.setItem(
               'personalInformations',
               JSON.stringify({ ...formValues, visible: false }),
            )
            validate('personal', formValues)
         } catch (error) {
            console.error('error', error)
            if (error instanceof Yup.ValidationError) {
               const errorMessages = {}
               error.inner.forEach((error) => {
                  errorMessages[error.path] = error.message
               })
               setYupErrors(errorMessages)
            } else {
               console.error(error)
               toastMessage('Oups, une erreur est survenue, veuillez réessayer plus tard', 'error')
            }
         } finally {
            setIsLoadingButton(false)
         }
      },
      [formValue],
   )

   return (
      <div className='form-container components'>
         <Title className='text-3xl m-5' color='white'>
            Mon profil
         </Title>

         <form className='form' onSubmit={handleSubmit}>
            <TextInput
               id='firstName'
               name='firstName'
               placeholder='Prénom'
               onChange={handleChange}
               error={yupErrors.firstName}
               errorMessage={yupErrors.firstName ? yupErrors.firstName : null}
               defaultValue={firstName}
               className='input'
            />

            <TextInput
               id='lastName'
               name='lastName'
               placeholder='Nom'
               onChange={handleChange}
               defaultValue={lastName}
               error={yupErrors.lastName}
               errorMessage={yupErrors.lastName ? yupErrors.lastName : null}
               className='input'
            />

            <TextInput
               id='email'
               name='email'
               placeholder='E-mail'
               icon={MdOutlineAlternateEmail}
               onChange={handleChange}
               defaultValue={email}
               error={yupErrors.email}
               errorMessage={yupErrors.email ? yupErrors.email : null}
               className='input'
            />
            {emailTaken && (
               <Text className='text-red-500 text-base'>Cet email est déjà utilisé</Text>
            )}
            <Select
               onValueChange={(value) => {
                  setFormValue((prevForm) => ({
                     ...prevForm,
                     sexe: value,
                  }))
               }}
               placeholder='Votre genre'
               id='sexe'
               name='sexe'
               //icon={BsGenderAmbiguous}
               className='input'
               value={sexe}
            >
               <SelectItem value='man' icon={AiOutlineMan}>
                  Homme
               </SelectItem>
               <SelectItem value='woman' icon={AiOutlineWoman}>
                  Femme
               </SelectItem>
            </Select>
            {yupErrors.sexe && <p className='text-red-500 text-xs'>{yupErrors.sexe}</p>}
            <TextInput
               id='password'
               type='password'
               placeholder='Mot de passe'
               icon={BiLockAlt}
               name='password'
               onChange={handleChange}
               defaultValue={password}
               error={yupErrors.password || passwordsDontMatch}
               errorMessage={yupErrors.password ? yupErrors.password : null}
               className='input'
            />
            <TextInput
               id='confirmPassword'
               type='password'
               placeholder='Confirmation du mot de passe'
               icon={BiLockAlt}
               name='confirmPassword'
               onChange={handleChange}
               defaultValue={confirmPassword}
               error={passwordsDontMatch}
               errorMessage={passwordsDontMatch ? 'Les mots de passe ne correspondent pas' : null}
               className='input'
            />
            <Button
               type='submit'
               className='submit-button width-100'
               disabled={!(firstName, lastName, email, sexe, password, confirmPassword)}
               loading={isLoadingButton}
            >
               <span className='text-base'>Continuer</span>
            </Button>
         </form>
      </div>
   )
}

export default ProfileForm
