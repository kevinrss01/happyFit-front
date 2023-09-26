import {
   Button,
   Icon,
   Tab,
   TabGroup,
   TabList,
   TabPanel,
   TabPanels,
   Title,
   Text,
} from '@tremor/react'
import { MdEmojiPeople } from 'react-icons/md'
import { GiBodyBalance, GiGymBag, GiMeditation, GiMuscleFat, GiWeight } from 'react-icons/gi'
import { BiRun, BiTimer } from 'react-icons/bi'
import { IoHome } from 'react-icons/io5'
import { AiFillQuestionCircle } from 'react-icons/ai'
import { useCallback, useReducer } from 'react'
import { ModalTremor } from '../../Modals/ModalTremor'
import toastMessage from '../../../utils/toast'

export const HowToChooseGoalComponent = () => {
   return (
      <div className='goal-container'>
         <Title>Comment choisir son objectif ? </Title>
         <TabGroup className='tab-group'>
            <TabList className='mt-8 tab-list'>
               <Tab icon={GiWeight}>Perte de poids</Tab>
               <Tab icon={GiMuscleFat}>Prise de masse</Tab>
               <Tab icon={BiRun}>Remise en forme</Tab>
            </TabList>
            <TabPanels>
               <TabPanel>
                  <Text className='m-5'>
                     Votre objectif principal est de perdre du poids et de vous débarrasser de la
                     mauvaise graisse. <br /> <br />
                     Si vous n'êtes pas à l'aise dans votre peau et que vous aspirez à vous affiner
                     tout en perdant des kilos sur la balance, cet objectif est fait pour vous.
                  </Text>
               </TabPanel>
               <TabPanel>
                  <Text className='m-5'>
                     Votre objectif principal est de prendre de la masse. En d'autres termes, vous
                     voulez développer vos muscles tout en minimisant la prise de gras. <br />{' '}
                     <br /> Le cardio est moins important pour vous ; ce qui compte vraiment, c'est
                     de bien remplir votre t-shirt. Si vous vous trouvez trop maigre ou que vous
                     rêvez d'avoir les biceps de Popeye, cet objectif vous conviendra parfaitement.
                  </Text>
               </TabPanel>
               <TabPanel>
                  <Text className='m-5'>
                     Optez pour cet objectif si vous cherchez à améliorer votre condition physique
                     globale : vous affiner, perdre un peu de poids, gagner un peu de muscle et
                     booster votre santé. <br /> <br />
                     En ce moment, l'une de vos priorités est votre bien-être. Vous en avez assez
                     d'être essoufflé après seulement 20 marches d'escalier. Si votre idéal corporel
                     se rapproche plus de Bruce Lee que d'Arnold Schwarzenegger, cet objectif est
                     taillé sur mesure pour vous.
                  </Text>
               </TabPanel>
            </TabPanels>
         </TabGroup>
      </div>
   )
}

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

const generateKey = (key) => `${key}_${new Date().getTime()}`

const modalReducer = (state, action) => {
   switch (action.type) {
      case 'OPEN_CLOSE_MODAL':
         return { ...state, isOpenModal: !state.isOpenModal }
      case 'SET_MODAL_CHILD':
         return { ...state, modalChild: action.payload }
      default:
         toastMessage('Une erreur est survenue', 'error')
         console.error('wrong action type')
         return state
   }
}

export const FirstSection = ({
   questions,
   setQuestions,
   questionsAndFields,
   setFirstSectionFilled,
}) => {
   const [state, dispatch] = useReducer(modalReducer, {
      isOpenModal: false,
      modalChild: null,
   })

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

   const handleOpenModal = () => {
      console.log('open modal')
      dispatch({
         type: 'SET_MODAL_CHILD',
         payload: <HowToChooseGoalComponent />,
      })
      dispatch({ type: 'OPEN_CLOSE_MODAL' })
   }

   return (
      <>
         {state.isOpenModal && (
            <ModalTremor
               isOpenModalState={state.isOpenModal}
               closeModal={() => dispatch({ type: 'OPEN_CLOSE_MODAL' })}
            >
               {state.modalChild}
            </ModalTremor>
         )}

         {Object.keys(questionsAndFields).map((key) => {
            return (
               <div key={generateKey(key)} className='question-container'>
                  {questionsAndFields[key] === 'Quel est votre objectif ?' ? (
                     <div className='title-and-icon-container'>
                        <h2 style={{ textAlign: 'center' }}>{questionsAndFields[key]}</h2>
                        <Icon
                           icon={AiFillQuestionCircle}
                           tooltip={'Voir comment bien determiner son objectif'}
                           className='icon'
                           onClick={handleOpenModal}
                        />
                     </div>
                  ) : (
                     <h2 style={{ textAlign: 'center' }}>{questionsAndFields[key]}</h2>
                  )}

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

         <Button
            className='submit-button'
            style={{ margin: '40px 0', height: '45px' }}
            onClick={() => setFirstSectionFilled(true)}
            disabled={
               !Object.keys(questionsAndFields).every((key) =>
                  questions[key].some((val) => val.selected),
               )
            }
         >
            Paramètres suivants
         </Button>
      </>
   )
}
