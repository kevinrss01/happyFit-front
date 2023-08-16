import { TextInput, Button, Text } from '@tremor/react'
import React, { useState } from 'react'
import toastMessage from '../../utils/toast'
import AuthAPI from '../../service/AuthAPI'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserEmail } from '../../redux/actions/userActions'
import axios from 'axios'
import { AiFillLock } from 'react-icons/ai'
import { MdOutlineAlternateEmail } from 'react-icons/md'
export const EmailContainer = ({ email, userId }) => {
   const [password, setPassword] = useState('')
   const [actualEmail, setActualEmail] = useState(email || '')
   const [newEmail, setNewEmail] = useState('')
   const [isError, setIsError] = useState(false)
   const [errorMessage, setErrorMessage] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   const dispatch = useDispatch()
   const isUpdating = useSelector((state) => state.user.isUpdating)

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

      setActualEmail(newEmail)

      AuthAPI.login({ email: actualEmail, password })
         .then(() => {
            const successDispatch = dispatch(updateUserEmail(newEmail, userId))
            if (successDispatch) {
               setActualEmail(newEmail)
            }
         })
         .catch((err) => {
            setActualEmail(email)
            console.error(err)
            if (err.response.status === 401) return toastMessage('Mot de passe incorrect.', 'error')
            toastMessage('Une erreur est survenue, veuillez réessayer plus tard', 'error')
         })
         .finally(() => setIsLoading(false))
   }

   return (
      <div className='email-container'>
         <h2>Adresse email</h2>

         <div className='input-container'>
            <Text color='white'>Votre adresse email actuelle : {actualEmail}</Text>
            <TextInput
               icon={AiFillLock}
               type='password'
               placeholder='Entrez votre mot de passe'
               onChange={(e) => setPassword(e.target.value)}
            ></TextInput>
            <TextInput
               icon={MdOutlineAlternateEmail}
               placeholder='Entrez votre nouvel email'
               onChange={(e) => setNewEmail(e.target.value)}
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
