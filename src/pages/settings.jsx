import { PersonalInfoContainer } from '../components/settings/PersonalInfoContainer'
import { EmailContainer } from '../components/settings/EmailContainer'
import { PasswordContainer } from '../components/settings/PasswordContainer'
import { useSelector } from 'react-redux'
import { TabList, Tab, TabGroup, TabPanels, TabPanel, Title } from '@tremor/react'
import { BiSolidUserDetail } from 'react-icons/bi'
import { MdOutlineAlternateEmail, MdPassword } from 'react-icons/md'
import { useState } from 'react'
import CustomTabList from '../components/settings/CustomTabList'

export default function Settings() {
   const { userInfo, isFetching } = useSelector((state) => state.user)
   const [isClickedSettingsPage, setIsClickedSettingsPage] = useState('Paramètres')
   //TODO: Modifier l'état de l'utilisateur dans le store lors de la modification de ses données

   const { email, id } = userInfo

   return (
      <>
         {userInfo.email && !isFetching ? (
            <>
               <div className='setting-container'>
                  <CustomTabList
                     tabs={['Paramètres', 'Facturation']}
                     actualState={isClickedSettingsPage}
                     updateState={setIsClickedSettingsPage}
                     size=''
                  />

                  {isClickedSettingsPage === 'Facturation' ? (
                     <>
                        <Title>Cette page n'est pas encore disponible.</Title>
                     </>
                  ) : (
                     <>
                        <TabGroup
                           defaultIndex={0}
                           className='flex flex-col items-center justify-center mt-5'
                        >
                           <TabList
                              className='mt-8 flex items-center justify-center'
                              variant={'solid'}
                           >
                              <Tab
                                 icon={BiSolidUserDetail}
                                 className='w-[190px] flex items-center justify-center'
                              >
                                 Nom et programmes
                              </Tab>
                              <Tab
                                 icon={MdOutlineAlternateEmail}
                                 className='w-[190px] flex items-center justify-center'
                              >
                                 Email
                              </Tab>
                              <Tab
                                 icon={MdPassword}
                                 className='w-[190px] flex items-center justify-center'
                              >
                                 Mot de passe
                              </Tab>
                           </TabList>
                           <TabPanels className='flex items-center justify-center'>
                              <TabPanel>
                                 <div className='mt-10 flex items-center justify-center'>
                                    <PersonalInfoContainer userData={userInfo} />
                                 </div>
                              </TabPanel>
                              <TabPanel>
                                 <div className='mt-10 flex items-center justify-center'>
                                    <EmailContainer email={email} userId={id} />
                                 </div>
                              </TabPanel>
                              <TabPanel>
                                 <div className='mt-10 flex items-center justify-center'>
                                    <PasswordContainer email={email} userId={id} />
                                 </div>
                              </TabPanel>
                           </TabPanels>
                        </TabGroup>
                     </>
                  )}
               </div>
            </>
         ) : (
            <>
               <h1>Loading...</h1>
            </>
         )}
      </>
   )
}
