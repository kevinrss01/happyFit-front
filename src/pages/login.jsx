import LoginForm from '../components/login/LoginForm'
import TopBarLogo from '../components/TopBarLogo'
import { useState } from 'react'
import { useWindowSize } from '@react-hookz/web'

export default function Login() {
   const [randomDivNumber, setRandomDivNumber] = useState(() => Math.floor(Math.random() * 3) + 1)
   const size = useWindowSize()

   return (
      <div className='login-form-container'>
         <TopBarLogo />
         <div className='login-form-and-image-container'>
            <LoginForm />
            {size.width > 1400 && (
               <div className={`login-form-image-container-${randomDivNumber}`}></div>
            )}
         </div>
         <div></div>
      </div>
   )
}
