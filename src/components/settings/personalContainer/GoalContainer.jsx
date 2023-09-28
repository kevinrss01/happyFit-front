import { Bold, Button, Flex, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react'
import { GiMuscleUp } from 'react-icons/gi'
import { IoFitnessSharp } from 'react-icons/io5'
import { BiBody } from 'react-icons/bi'
import React from 'react'

const GoalContainer = ({ userData, onChangeInput, indexGoalTab }) => {
   return (
      <div className='w-[80%] mb-8'>
         <TabGroup defaultIndex={indexGoalTab || 0}>
            <TabList className='flex items-center justify-center'>
               <Tab icon={GiMuscleUp}>Prise de muscle</Tab>
               <Tab icon={IoFitnessSharp}>Remise en forme</Tab>
               <Tab icon={BiBody}>Perte de poids</Tab>
            </TabList>
            <TabPanels>
               <TabPanel>
                  <Flex>
                     <Bold className='text-white text-center'>
                        Votre objectif principal est de prendre du poids proprement, en d'autres
                        termes, vous voulez prendre de la masse et du muscle sans trop prendre de
                        gras.
                     </Bold>
                     <Button
                        disabled={userData?.fitnessGoal === 'gain muscle'}
                        onClick={() => onChangeInput('fitnessGoal', 'gain muscle')}
                        color={'amber'}
                        className='m-3'
                        size={'xs'}
                     >
                        Je choisis cet objectif {userData?.fitnessGoal === 'gain muscle' && '✅'}
                     </Button>
                  </Flex>
               </TabPanel>
               <TabPanel>
                  <Flex>
                     <Bold className='text-white text-center'>
                        Votre objectif est simplement de vous remettre en forme, d'être en meilleure
                        santé, de vous sentir mieux physiquement et mentalement.
                     </Bold>
                     <Button
                        disabled={userData?.fitnessGoal === 'fitness'}
                        onClick={() => onChangeInput('fitnessGoal', 'fitness')}
                        color={'amber'}
                        className='m-3'
                        size={'xs'}
                     >
                        Je choisis cet objectif {userData?.fitnessGoal === 'fitness' && '✅'}
                     </Button>
                  </Flex>
               </TabPanel>
               <TabPanel>
                  <Flex>
                     <Bold className='text-white text-center'>
                        Votre priorité est la perte de poids, vous voulez perdre du gras en limitant
                        la perte de muscle au maximum. Vous voulez effectuez beaucoup de cardio et
                        de renforcement musculaire pour perdre du poids.
                     </Bold>
                     <Button
                        disabled={userData?.fitnessGoal === 'lose weight'}
                        onClick={() => onChangeInput('fitnessGoal', 'lose weight')}
                        color={'amber'}
                        className='m-3'
                        size={'xs'}
                     >
                        Je choisis cet objectif {userData?.fitnessGoal === 'lose weight' && '✅'}
                     </Button>
                  </Flex>
               </TabPanel>
            </TabPanels>
         </TabGroup>
      </div>
   )
}

export default GoalContainer
