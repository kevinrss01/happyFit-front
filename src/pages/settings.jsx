import { PersonalInfoContainer } from '../components/settings/PersonalInfoContainer'
import { EmailContainer } from '../components/settings/EmailContainer'
import { PasswordContainer } from '../components/settings/PasswordContainer'
import { useSelector } from 'react-redux'

export default function Settings() {
   const { userInfo, isFetching } = useSelector((state) => state.user)

   return (
      <div className='setting-container'>
         <h1 className='text-3xl mt-6'>Paramètres</h1>
         <PersonalInfoContainer userData={userInfo} />
         <EmailContainer userData={userInfo} />
         <PasswordContainer userData={userInfo} />
      </div>
   )
}
