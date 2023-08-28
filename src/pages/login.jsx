import LoginForm from '../components/login/LoginForm'
import TopBarLogo from '../components/TopBarLogo'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

function Login() {
   const [randomDivNumber, setRandomDivNumber] = useState(() => Math.floor(Math.random() * 3) + 1)
   const [windowWidth, setWindowWidth] = useState(0)

   useEffect(() => {
      const handleResize = () => {
         setWindowWidth(window.innerWidth)
      }

      window.addEventListener('resize', handleResize)

      // Appel initial
      handleResize()

      // Supprimer l'écouteur d'événements lors du nettoyage
      return () => {
         window.removeEventListener('resize', handleResize)
      }
   }, [])

   return (
      <div className='login-form-container'>
         <TopBarLogo />
         <div className='login-form-and-image-container'>
            <LoginForm windowWith={windowWidth} />
            {windowWidth > 1400 && (
               <div className={`login-form-image-container-${randomDivNumber}`}></div>
            )}
         </div>
         <div></div>
      </div>
   )
}

export default Login
