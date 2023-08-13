import LoginForm from '../components/login/LoginForm'
import TopBarLogo from '../components/TopBarLogo'
import { useState } from 'react'

export default function Connexion() {
   const [randomDivNumber, setRandomDivNumber] = useState(() => Math.floor(Math.random() * 3) + 1)

   return (
      <div className='login-form-container'>
         <TopBarLogo />
         <div className='login-form-and-image-container'>
            <LoginForm />
            <div className={`login-form-image-container-${randomDivNumber}`}></div>
         </div>
         <div></div>
      </div>
   )
}
