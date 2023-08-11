import { PersonalInfoContainer } from '../components/settings/PersonalInfoContainer'
import { EmailContainer } from '../components/settings/EmailContainer'
import { PasswordContainer } from '../components/settings/PasswordContainer'
import { useSelector } from 'react-redux'
import { TabList, Tab, TabGroup, TabPanels, TabPanel } from '@tremor/react'
import { BiSolidUserDetail } from 'react-icons/bi'
import { MdOutlineAlternateEmail, MdPassword } from 'react-icons/md'

export default function Settings() {
   const { userInfo, isFetching } = useSelector((state) => state.user)

   //TODO: Trouver pourquoi les données se perdent lors du refresh
   //TODO: Modifier l'état de l'utilisateur dans le store lors de la modification de ses données

   return (
      <div className='setting-container'>
         <h1 className='text-3xl mt-6'>Paramètres</h1>

         <TabGroup defaultIndex={0} className='flex flex-col items-center justify-center mt-5'>
            <TabList className='mt-8 flex items-center justify-center' variant={'solid'}>
               <Tab icon={BiSolidUserDetail}>Information personnelle & programmes</Tab>
               <Tab icon={MdOutlineAlternateEmail}>Email</Tab>
               <Tab icon={MdPassword}>Mot de passe</Tab>
            </TabList>
            <TabPanels className='flex items-center justify-center'>
               <TabPanel>
                  <div className='mt-10 flex items-center justify-center'>
                     <PersonalInfoContainer userData={userInfo} />
                  </div>
               </TabPanel>
               <TabPanel>
                  <div className='mt-10 flex items-center justify-center'>
                     <EmailContainer userData={userInfo} />
                  </div>
               </TabPanel>
               <TabPanel>
                  <div className='mt-10 flex items-center justify-center'>
                     <PasswordContainer userData={userInfo} />
                  </div>
               </TabPanel>
            </TabPanels>
         </TabGroup>
      </div>
   )
}
