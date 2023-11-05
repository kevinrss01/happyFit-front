import { Title, Select, SelectItem, Button } from '@tremor/react'
import { GiStrong } from 'react-icons/gi'
import { AiFillLike } from 'react-icons/ai'
import { FaUserInjured } from 'react-icons/fa'
import { FcFlashOn } from 'react-icons/fc'
import toastMessage from '../../utils/toast'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import BilanLoader from '../loaders/BilanLoader'

const typeOfDifficulty = ['too easy', 'perfect', 'too hard']

const guardSubmit = (difficulty, numberOfSessionPerWeek) => {
   if (!difficulty || !numberOfSessionPerWeek) {
      toastMessage('Veuillez remplir tous les champs', 'error')
      return false
   }

   if (!typeOfDifficulty.includes(difficulty)) {
      toastMessage('Veuillez fournir une difficulté correct', 'error')
      return false
   }

   if (numberOfSessionPerWeek < 1 || numberOfSessionPerWeek > 7) {
      toastMessage('Veuillez fournir un nombre de séance correct', 'error')
      return false
   }

   return true
}

const BilanContainer = () => {
   const [difficulty, setDifficulty] = useState('')
   const [numberOfSessionPerWeek, setNumberOfSessionPerWeek] = useState()
   const [fetchNewProgram, setFetchNewProgram] = useState(false)

   const { userInfo, isFetching } = useSelector((state) => state.user)
   const { programs } = useSelector((state) => state.sport)

   console.log(userInfo)
   console.log(programs)

   const handleSessionChange = (number) => {
      setNumberOfSessionPerWeek(number)
   }

   const handleDifficultyChange = (difficulty) => {
      setDifficulty(difficulty)
   }

   const handleSubmit = () => {
      if (!guardSubmit(difficulty, numberOfSessionPerWeek)) return

      console.log('submit')

      setFetchNewProgram(true)
   }

   return (
      <>
         {fetchNewProgram ? (
            <BilanLoader
               userInfo={userInfo}
               Programs={programs}
               numberOfSession={numberOfSessionPerWeek}
               difficulty={difficulty}
               setFetchNewProgram={setFetchNewProgram}
            />
         ) : (
            <div className='bilan-container'>
               <Title className='title'>
                  Bravo pour votre semaine d'entraînement, vous pouvez être fière de vous ! <br />{' '}
                  N'oubliez pas que c'est la motivation qui vous fait démarrer mais c'est l'habitude
                  qui vous fait persévérer. <i>- Jim Rohn</i>
               </Title>
               <Title className='title-2'>
                  Afin de crée votre prochain programme nous avons besoin de vous poser quelques
                  questions :
               </Title>

               <div className='questions-container'>
                  <div className='question'>
                     <label>Comment était la difficulté de votre programme ?</label>
                     <Select
                        onValueChange={(value) => handleDifficultyChange(value)}
                        value={difficulty}
                     >
                        <SelectItem value={'too easy'} icon={GiStrong}>
                           Trop facile
                        </SelectItem>
                        <SelectItem value={'perfect'} icon={AiFillLike}>
                           Parfaite
                        </SelectItem>
                        <SelectItem value={'too hard'} icon={FaUserInjured}>
                           Trop dure
                        </SelectItem>
                     </Select>
                  </div>

                  <div className='question'>
                     <label>Combien de séance souhaitez-vous faire cette semaine ?</label>
                     <Select
                        onValueChange={(value) => handleSessionChange(value)}
                        value={numberOfSessionPerWeek}
                     >
                        <SelectItem value={1}>1 séance</SelectItem>
                        <SelectItem value={2}>2 séances</SelectItem>
                        <SelectItem value={3}>3 séances</SelectItem>
                        <SelectItem value={4}>4 séances</SelectItem>
                        <SelectItem value={5}>5 séances</SelectItem>
                        <SelectItem value={6}>6 séances</SelectItem>
                        <SelectItem value={7}>7 séances</SelectItem>
                     </Select>
                  </div>

                  <Button icon={FcFlashOn} className='button' onClick={handleSubmit}>
                     Crée mon nouveau programme
                  </Button>
               </div>
            </div>
         )}
      </>
   )
}

export default BilanContainer
