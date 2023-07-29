import { PersonalInfoContainer } from '../components/settings/PersonalInfoContainer'
import { EmailContainer } from '../components/settings/EmailContainer'
import { PasswordContainer } from '../components/settings/PasswordContainer'

export default function Reglages() {
   // TODO : Récupérer les données Redux et les passer aux composant
   const userData = {}

   return (
      <div className='setting-container'>
         <h1>Paramètres</h1>
         <PersonalInfoContainer userData={userData} />
         <EmailContainer userData={userData} />
         <PasswordContainer userData={userData} />
      </div>
   )
}
