import { TextInput, Button, Text } from '@tremor/react'
import React, { useState } from 'react'
import toastMessage from '../../utils/toast'
import AuthAPI from '../../service/AuthAPI'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserEmail } from '../../redux/actions/userActions'
import axios from 'axios'
import { AiFillLock } from 'react-icons/ai'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { verifNewEmail } from '../../utils/yupSchema'

export const EmailContainer = ({ email, userId }) => {
   const [password, setPassword] = useState('')
   const [actualEmail, setActualEmail] = useState(email || '')
   const [newEmail, setNewEmail] = useState('')
   const [isError, setIsError] = useState(false)
   const [errorMessage, setErrorMessage] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   const dispatch = useDispatch()
   const isUpdating = useSelector((state) => state.user.isUpdating)

   const verifyInputs = async (formValues) => {
      await verifNewEmail.validate(formValues, {
         abortEarly: false,
      })
   }

   const onSubmit = async () => {
      setIsError(false)
      if (!password || !newEmail) return toastMessage('error', 'Veuillez remplir tous les champs')
      if (newEmail === actualEmail) {
         setIsError(true)
         setErrorMessage('Vous avez entré votre email actuel.')
         return
      }
      setIsLoading(true)

      const valideEmail = await axios.get(`http://localhost:4000/users/verifyEmail/${newEmail}`)
      if (valideEmail.data === true) {
         setIsError(true)
         setErrorMessage('Cet email est déjà utilisé.')
         setIsLoading(false)
         return
      }

      verifyInputs({ newEmail: newEmail })
         .then(() => {
            AuthAPI.login({ email: actualEmail, password })
               .then(() => {
                  setActualEmail(newEmail)
                  const successDispatch = dispatch(updateUserEmail(newEmail, userId))
                  if (successDispatch) {
                     setActualEmail(newEmail)
                     setNewEmail('')
                     setPassword('')
                  }
               })
               .catch((err) => {
                  setActualEmail(email)
                  console.error(err)
                  if (err.response.status === 401) {
                     setIsError(true)
                     return setErrorMessage('Mot de passe incorrect')
                  }

                  toastMessage('Une erreur est survenue, veuillez réessayer plus tard', 'error')
               })
               .finally(() => {
                  setIsLoading(false)
               })
         })
         .catch((err) => {
            setIsError(true)
            setErrorMessage(err.errors[0])
            setIsLoading(false)
         })
   }

   return (
      <div className='email-container'>
         <h2>Adresse email</h2>

         <div className='input-container'>
            <Text color='white'>Votre adresse email actuelle : {actualEmail}</Text>
            <TextInput
               icon={AiFillLock}
               type='password'
               value={password}
               placeholder='Entrez votre mot de passe'
               onChange={(e) => setPassword(e.target.value)}
               error={errorMessage === 'Mot de passe incorrect'}
            ></TextInput>
            <TextInput
               value={newEmail}
               icon={MdOutlineAlternateEmail}
               placeholder='Entrez votre nouvel email'
               onChange={(e) => setNewEmail(e.target.value)}
               error={errorMessage.includes('email')}
            ></TextInput>
            {isError && <Text className='text-red-500 text-base'>{errorMessage}</Text>}
         </div>

         <Button
            disabled={!(password && newEmail)}
            onClick={() => {
               onSubmit()
            }}
            loading={isLoading || isUpdating}
         >
            Modifier mon email
         </Button>
      </div>
   )
}
