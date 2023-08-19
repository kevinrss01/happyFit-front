import React, { useState, useCallback } from 'react'
import { IoArrowBackCircleOutline } from 'react-icons/io5'

import {
   TbSquareRoundedNumber1Filled,
   TbSquareRoundedNumber2Filled,
   TbSquareRoundedNumber3Filled,
   TbSquareRoundedNumber4Filled,
   TbSquareRoundedNumber5Filled,
   TbSquareRoundedNumber6Filled,
   TbSquareRoundedNumber7Filled,
} from 'react-icons/tb'
import { GiMeditation, GiBodyBalance, GiWeight, GiMuscleFat, GiGymBag } from 'react-icons/gi'
import { IoHome } from 'react-icons/io5'
import { BiRun, BiTimer } from 'react-icons/bi'
import { MdEmojiPeople } from 'react-icons/md'
import { ImListNumbered } from 'react-icons/im'
import { Button, Select, SelectItem, Title } from '@tremor/react'
import toastMessage from '../../utils/toast'

const icons = {
   beginner: MdEmojiPeople,
   intermediate: GiBodyBalance,
   advanced: GiMeditation,
   loseWeight: GiWeight,
   gainMuscle: GiMuscleFat,
   fitness: BiRun,
   time: BiTimer,
   home: IoHome,
   gym: GiGymBag,
}

const defaultQuestions = {
   'sportExperienceInYears': [
      { text: 'Débutant', selected: false, value: 0, icon: 'beginner' },
      {
         text: 'Intermédiaire (1 an)',
         selected: false,
         value: 1,
         icon: 'intermediate',
      },
      {
         text: 'Avancé (2 ans et plus)',
         selected: false,
         value: 2,
         icon: 'advanced',
      },
   ],
   'fitnessGoal': [
      {
         text: 'Perte de poids',
         selected: false,
         value: 'lose weight',
         icon: 'loseWeight',
      },
      {
         text: 'Prise de masse',
         selected: false,
         value: 'gain muscle',
         icon: 'gainMuscle',
      },
      { text: 'Remise en forme', selected: false, value: 'fitness', icon: 'fitness' },
   ],
   'availableTimePerSessionInMinutes': [
      { text: '30 minutes', selected: false, value: 30, icon: 'time' },
      { text: '45 minutes', selected: false, value: 45, icon: 'time' },
      { text: '1 heure', selected: false, value: 60, icon: 'time' },
      { text: '1h15', selected: false, value: 75, icon: 'time' },
      { text: '1h30', selected: false, value: 90, icon: 'time' },
   ],
   'Combien de session voulez-vous faire par semaines ?': [
      { text: 'option 1', selected: false, value: '' },
      { text: 'option 2', selected: false, value: '' },
      { text: 'option 3', selected: false, value: '' },
      { text: 'option 4', selected: false, value: '' },
   ],
   'trainingPlace': [
      { text: 'À la maison', selected: false, value: 'home', icon: 'home' },
      {
         text: 'En salle de sport',
         selected: false,
         value: 'gym',
         icon: 'gym',
      },
   ],
}

const questionsAndFields = {
   sportExperienceInYears: 'Quel est votre niveau actuel ?',
   fitnessGoal: 'Quels est votre objectifs ?',
   trainingPlace: 'Où est-ce que vous souhaitez vous entrainer ?',
   availableTimePerSessionInMinutes: 'Combien de temps souhaitez-vous vous entrainer par jour ?',
}

const generateKey = (key) => `${key}_${new Date().getTime()}`

function Questions({ validate, goBack }) {
   const questionsSaved = sessionStorage.getItem('questionsSaved')
   const [questions, setQuestions] = useState(
      questionsSaved ? JSON.parse(questionsSaved) : defaultQuestions,
   )
   const [numberOfSessionPerWeek, setNumberOfSessionPerWeek] = useState('')

   const handleClick = useCallback(
      (question, textValue) => {
         setQuestions((prevQuestions) => ({
            ...prevQuestions,
            [question]: prevQuestions[question].map(({ text, selected, value, icon }) => ({
               text,
               selected: !selected && text === textValue,
               value,
               icon,
            })),
         }))
      },
      [questions],
   )

   const submit = useCallback(() => {
      if (
         Object.keys(questionsAndFields).every((key) => questions[key].some((val) => val.selected))
      ) {
         sessionStorage.setItem('questionsSaved', JSON.stringify(questions))
         const selectedAnswers = Object.keys(questionsAndFields).reduce(
            (obj, key) => ({
               ...obj,
               [key]: questions[key].find((value) => value.selected).value,
            }),
            {},
         )
         if (!numberOfSessionPerWeek) {
            if (!sessionStorage.getItem('sessionsPerWeek')) {
               toastMessage(
                  'Veuillez sélectionner le nombre de séance que vous souhaitez faire par semaine',
                  'error',
               )
            } else {
               validate('metrics', {
                  ...selectedAnswers,
                  numberOfSessionPerWeek: parseInt(sessionStorage.getItem('sessionsPerWeek')),
               })
            }
         } else {
            sessionStorage.setItem('sessionsPerWeek', numberOfSessionPerWeek)
            validate('metrics', {
               ...selectedAnswers,
               numberOfSessionPerWeek: parseInt(numberOfSessionPerWeek),
            })
         }
      } else {
         toastMessage('Veuillez répondre à toutes les questions', 'error')
      }
   }, [questions, numberOfSessionPerWeek])

   return (
      <div className='column-container components'>
         <Title className='title-inscription-form text-2xl w-full text-center' color='white'>
            <IoArrowBackCircleOutline className='icon' onClick={goBack} />
            <span>Paramètres de séance</span>
         </Title>

         {Object.keys(questionsAndFields).map((key) => {
            return (
               <div key={generateKey(key)} className='question-container'>
                  <h2 style={{ textAlign: 'center' }}>{questionsAndFields[key]}</h2>
                  <div className='container gap-10'>
                     {questions[key].map(({ text, selected, icon }) => {
                        return (
                           <Button
                              className='selection-button'
                              key={generateKey(text)}
                              onClick={() => handleClick(key, text)}
                              variant={selected ? 'primary' : 'secondary'}
                              disabled={selected && true}
                              style={{ transform: selected && 'scale(1)' }}
                              icon={icon ? icons[icon] : undefined}
                           >
                              {text}
                           </Button>
                        )
                     })}
                  </div>
               </div>
            )
         })}
         <div className='container-column' style={{ marginBottom: 10 }}>
            <h2>Combien de séances pouvez-vous faire par semaine ?</h2>
            <div className='container gap-10' style={{ marginTop: '20px' }}>
               <Select
                  id='select-sessions-per-week'
                  defaultValue={
                     sessionStorage.getItem('sessionsPerWeek')
                        ? sessionStorage.getItem('sessionsPerWeek')
                        : '1'
                  }
                  placeholder='Nombre de séances par semaine'
                  icon={ImListNumbered}
                  onValueChange={(value) => setNumberOfSessionPerWeek(value)}
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
         </div>
         <Button
            className='submit-button'
            onClick={submit}
            style={{ margin: '80px 0', height: '45px' }}
            disabled={
               !Object.keys(questionsAndFields).every((key) =>
                  questions[key].some((val) => val.selected),
               )
            }
         >
            Continuer
         </Button>
      </div>
   )
}

export default Questions
