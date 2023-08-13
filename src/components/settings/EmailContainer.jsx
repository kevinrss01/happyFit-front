import { TextInput, Button, Text } from '@tremor/react'
import { useState } from 'react'

export const EmailContainer = ({ email }) => {
   const [password, setPassword] = useState('')
   const [newEmail, setNewEmail] = useState('')

   return (
      <div className='email-container'>
         <h2>Adresse email</h2>

         <div className='input-container'>
            <Text color='white'>Votre adresse mail actuelle : {email}</Text>
            <TextInput
               type='password'
               placeholder='Entrez votre mot de passe'
               onChange={(e) => setPassword(e.target.value)}
            ></TextInput>
            <TextInput
               placeholder='Entrez votre nouvel email'
               onChange={(e) => setNewEmail(e.target.value)}
            ></TextInput>
         </div>

         <Button className='w-[150px]' disabled={!(password && newEmail)}>
            Modifier mon email
         </Button>
      </div>
   )
}
