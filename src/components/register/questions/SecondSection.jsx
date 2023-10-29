import { NumberInput, Select, SelectItem } from '@tremor/react'
import { ImListNumbered } from 'react-icons/im'
import {
   TbSquareRoundedNumber1Filled,
   TbSquareRoundedNumber2Filled,
   TbSquareRoundedNumber3Filled,
   TbSquareRoundedNumber4Filled,
   TbSquareRoundedNumber5Filled,
   TbSquareRoundedNumber6Filled,
   TbSquareRoundedNumber7Filled,
} from 'react-icons/tb'
import { useEffect } from 'react'

export const SecondSection = ({
   setNumberOfSessionPerWeek,
   numberOfSessionPerWeek,
   setUserExoPerf,
   userExoPerf,
}) => {
   useEffect(() => {
      if (sessionStorage.getItem('sessionsPerWeek')) {
         setNumberOfSessionPerWeek(sessionStorage.getItem('sessionsPerWeek'))
      }
      if (sessionStorage.getItem('exoPerformances')) {
         setUserExoPerf(JSON.parse(sessionStorage.getItem('exoPerformances')))
      }
   }, [])

   const handleNumberInputChange = (field, value) => {
      setUserExoPerf((prevState) => ({ ...prevState, [field]: value }))
   }

   return (
      <>
         <div className='container-column' style={{ marginBottom: 10 }}>
            <h2>Combien de séances voulez-vous faire par semaine ?</h2>
            <div className='container gap-10' style={{ marginTop: '20px' }}>
               <Select
                  id='select-sessions-per-week'
                  placeholder='Nombre de séances par semaine'
                  icon={ImListNumbered}
                  onValueChange={(value) => setNumberOfSessionPerWeek(value)}
                  value={numberOfSessionPerWeek}
               >
                  <SelectItem value='1' icon={TbSquareRoundedNumber1Filled}>
                     1 séances
                  </SelectItem>
                  <SelectItem value='2' icon={TbSquareRoundedNumber2Filled}>
                     2 séances
                  </SelectItem>
                  <SelectItem value='3' icon={TbSquareRoundedNumber3Filled}>
                     3 séances
                  </SelectItem>
                  <SelectItem value='4' icon={TbSquareRoundedNumber4Filled}>
                     4 séances
                  </SelectItem>
                  <SelectItem value='5' icon={TbSquareRoundedNumber5Filled}>
                     5 séances
                  </SelectItem>
                  <SelectItem value='6' icon={TbSquareRoundedNumber6Filled}>
                     6 séances
                  </SelectItem>
                  <SelectItem value='7' icon={TbSquareRoundedNumber7Filled}>
                     7 séances
                  </SelectItem>
               </Select>
            </div>
            <div className='perf-container'>
               <h2>
                  Quelles sont vos performances au développé couché et au squat ?<br /> (Cliquer sur
                  "Continuer" si vous ne savez pas)
               </h2>
               <NumberInput
                  placeholder='Développé couché (10 répétitions en kg)'
                  className='input'
                  max={150}
                  step={5}
                  onValueChange={(value) => handleNumberInputChange('benchPress', value)}
                  value={userExoPerf.benchPress || ''}
               />
               <NumberInput
                  placeholder={'Squat (10 répétitions en kg)'}
                  className='input'
                  max={200}
                  step={5}
                  onValueChange={(value) =>
                     setUserExoPerf((prevState) => ({ ...prevState, squat: value }))
                  }
                  value={userExoPerf.squat || ''}
               />
            </div>
         </div>
      </>
   )
}
