import { PersonalInfoContainer } from '../components/settings/PersonalInfoContainer'

export default function Reglages() {
   // TODO : Récupérer les données Redux et les passer aux composant
   // TODO : Sinon les récupérer via l'API
   const userData = {}

   return (
      <div className='setting-container'>
         <h1>Paramètres</h1>
         <PersonalInfoContainer userData={userData} />
         <div className='email-container'>
            <h2>Adresse email</h2>
         </div>
         <div className='password-container'>
            <h2>Mot de passe</h2>
         </div>
      </div>
   )
}
