import { Button, TextInput, Text } from '@tremor/react'
import { useState } from 'react'
import { PiPasswordBold, PiPasswordDuotone } from 'react-icons/pi'
import { newPasswordVerif } from '../../utils/yupSchema'
import * as Yup from 'yup'
import toastMessage from '../../utils/toast'
import AuthAPI from '../../service/API/AuthAPI'
import UserAPI from '../../service/API/UserAPI'

export const PasswordContainer = ({ email, userId }) => {
   const [actualPassword, setActualPassword] = useState('')
   const [newPassword, setNewPassword] = useState('')
   const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('')
   const [typeOfError, setTypeOfError] = useState('')
   const [errorMessage, setErrorMessage] = useState('')
   const [isLoading, setIsLoading] = useState(false)

   const verifyInputs = async (formValues) => {
      await newPasswordVerif.validate(formValues, {
         abortEarly: false,
      })
   }
   const onSubmit = async () => {
      setTypeOfError('')
      setErrorMessage('')
      try {
         if (!actualPassword || !newPassword || !newPasswordConfirmation) {
            setTypeOfError('emptyInputs')
            setErrorMessage('Veuillez remplir tous les champs')
            return
         }

         if (newPassword !== newPasswordConfirmation) {
            setTypeOfError('notSamePassword')
            setErrorMessage('Les mots de passe ne sont pas identiques')
            return
         }

         await verifyInputs({
            newPassword: newPassword,
            newPasswordConfirmation: newPasswordConfirmation,
         })

         if (newPassword === actualPassword) {
            setTypeOfError('sameAsActualPassword')
            setErrorMessage('Vous avez entré votre mot de passe actuel.')
            return
         }

         await AuthAPI.login({ email: email, password: actualPassword })
         await UserAPI.updatePassword(newPassword, userId)
         toastMessage('Votre mot de passe a bien été modifié !', 'success')
         setActualPassword('')
         setNewPassword('')
         setNewPasswordConfirmation('')
      } catch (error) {
         console.error(error)
         if (error instanceof Yup.ValidationError) {
            setTypeOfError('notValidInputs')
            setErrorMessage(error.errors[0])
         } else if (error.response.status === 401) {
            setTypeOfError('incorrectPassword')
            setErrorMessage('Mot de passe incorrect')
         } else {
            toastMessage(
               'Une erreur est survenue, veuillez recharger la page ou réeassayer plus tard.',
               'error',
            )
         }
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <div className='password-container'>
         <h2>Modifier mon mot de passe</h2>

         <div className='input-container'>
            <TextInput
               type={'password'}
               placeholder='Votre mot de passe actuel'
               onChange={(event) => setActualPassword(event.target.value)}
               value={actualPassword}
               icon={PiPasswordBold}
               error={typeOfError === 'emptyInputs' || typeOfError === 'incorrectPassword'}
            ></TextInput>
            <TextInput
               type={'password'}
               placeholder='Votre nouveau mot de passe'
               onChange={(event) => setNewPassword(event.target.value)}
               value={newPassword}
               icon={PiPasswordDuotone}
               error={
                  typeOfError === 'emptyInputs' ||
                  typeOfError === 'notSamePassword' ||
                  typeOfError === 'notValidInputs' ||
                  typeOfError === 'sameAsActualPassword'
               }
            ></TextInput>
            <TextInput
               type={'password'}
               placeholder='Confirmation de votre nouveau mot de passe'
               onChange={(event) => setNewPasswordConfirmation(event.target.value)}
               value={newPasswordConfirmation}
               icon={PiPasswordDuotone}
               error={
                  typeOfError === 'emptyInputs' ||
                  typeOfError === 'notSamePassword' ||
                  typeOfError === 'notValidInputs' ||
                  typeOfError === 'sameAsActualPassword'
               }
            ></TextInput>
            {errorMessage && <Text color='red'>{errorMessage}</Text>}
            <Button
               loading={isLoading}
               onClick={() => {
                  setIsLoading(true)
                  onSubmit()
               }}
               disabled={!(newPassword && actualPassword && newPasswordConfirmation)}
            >
               Modifier mon mot de passe
            </Button>
         </div>
      </div>
   )
}
