import React, { useState, useCallback } from 'react'
import { IoArrowBackCircleOutline } from 'react-icons/io5'
import { Button, Title } from '@tremor/react'
import toastMessage from '../../utils/toast'
import { SecondSection } from './questions/SecondSection'
import { FirstSection } from './questions/FirstSection'

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
   fitnessGoal: 'Quel est votre objectif ?',
   trainingPlace: 'Où est-ce que vous souhaitez vous entrainer ?',
   availableTimePerSessionInMinutes: 'Combien de temps souhaitez-vous vous entrainer par jour ?',
}

function Questions({ validate, goBack }) {
   const questionsSaved = sessionStorage.getItem('questionsSaved')
   const [questions, setQuestions] = useState(
      questionsSaved ? JSON.parse(questionsSaved) : defaultQuestions,
   )
   const [numberOfSessionPerWeek, setNumberOfSessionPerWeek] = useState('')
   const [firstSectionFilled, setFirstSectionFilled] = useState(false)
   const [userExoPerf, setUserExoPerf] = useState({
      benchPress: 0,
      squat: 0,
   })

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
         sessionStorage.setItem(
            'exoPerformances',
            JSON.stringify({
               ...userExoPerf,
            }),
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
                  exoPerformances: userExoPerf,
                  numberOfSessionPerWeek: parseInt(sessionStorage.getItem('sessionsPerWeek')),
               })
            }
         } else {
            sessionStorage.setItem('sessionsPerWeek', numberOfSessionPerWeek)
            validate('metrics', {
               ...selectedAnswers,
               exoPerformances: userExoPerf,
               numberOfSessionPerWeek: parseInt(numberOfSessionPerWeek),
            })
         }
      } else {
         toastMessage('Veuillez répondre à toutes les questions', 'error')
      }
   }, [questions, numberOfSessionPerWeek, userExoPerf])

   return (
      <div className='column-container components'>
         <Title className='title-inscription-form text-2xl w-full text-center' color='white'>
            <IoArrowBackCircleOutline className='icon' onClick={goBack} />
            <span>Paramètres de séance</span>
         </Title>

         {firstSectionFilled ? (
            <SecondSection
               setNumberOfSessionPerWeek={setNumberOfSessionPerWeek}
               numberOfSessionPerWeek={numberOfSessionPerWeek}
               setUserExoPerf={setUserExoPerf}
               userExoPerf={userExoPerf}
            />
         ) : (
            <FirstSection
               questions={questions}
               setQuestions={setQuestions}
               questionsAndFields={questionsAndFields}
               setFirstSectionFilled={setFirstSectionFilled}
            />
         )}

         {firstSectionFilled && (
            <div
               style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
               }}
            >
               <Button
                  className='questions-back-and-forward-button'
                  onClick={() => setFirstSectionFilled(false)}
               >
                  Retour
               </Button>
               <Button
                  onClick={submit}
                  className='questions-back-and-forward-button'
                  disabled={
                     !Object.keys(questionsAndFields).every((key) =>
                        questions[key].some((val) => val.selected),
                     ) || numberOfSessionPerWeek === ''
                  }
               >
                  Continuer
               </Button>
            </div>
         )}
      </div>
   )
}

export default Questions
