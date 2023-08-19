import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
   Accordion,
   AccordionBody,
   AccordionHeader,
   AccordionList,
   Button,
   TextInput,
   Title,
} from '@tremor/react'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { RiMailSendLine } from 'react-icons/ri'
import UserAPI from '../../service/UserAPI'
import toastMessage from '../../utils/toast'

const LoginModal = ({ isOpenModal, closeModal }) => {
   const [email, setEmail] = useState('')
   const [errorMessage, setErrorMessage] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   const [emailSent, setEmailSent] = useState(false)
   const onSubmit = async () => {
      setIsLoading(true)
      setErrorMessage('')
      try {
         if (!email.match(/.*@.*[.].*/)) {
            setErrorMessage('Veuillez entrer un email valide')
            return
         }

         await UserAPI.updatePasswordByMail(email)
         toastMessage('Un email vous a été envoyé.', 'success')
         setEmailSent(true)
      } catch (error) {
         console.error(error)
         if (error?.response?.data?.message === 'Email not found') {
            setErrorMessage("Cet email n'est pas associé à un compte Happy Fit")
         } else {
            toastMessage('Une erreur est survenue, veuillez réessayer plus tard', 'error')
         }
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <>
         <Transition appear show={isOpenModal} as={Fragment}>
            <Dialog as='div' className='relative z-50' onClose={closeModal}>
               <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
               >
                  <div className='fixed inset-0 bg-gray-900 bg-opacity-25' />
               </Transition.Child>
               <div className='fixed inset-0 overflow-y-auto'>
                  <div className='flex min-h-full items-center justify-center p-4 text-center'>
                     <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 scale-95'
                        enterTo='opacity-100 scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-0 scale-95'
                     >
                        <Dialog.Panel
                           className='w-full max-w-xl transform overflow-hidden ring-tremor bg-white
                                    p-6 text-left align-middle shadow-tremor transition-all rounded-xl'
                        >
                           <Title className='text-center'>Centre d'assistance</Title>
                           <AccordionList className='max-w-md mx-auto m-10'>
                              <Accordion>
                                 <AccordionHeader>J'ai oublié mon mot de passe</AccordionHeader>
                                 <AccordionBody>
                                    Pour réinitialiser votre mot de passe veuillez rentrez l'email
                                    lié à votre compte, si un compte Happy Fit est associé à cet
                                    email vous recevrez les instructions par mail. <br />
                                    <TextInput
                                       className='mt-5'
                                       placeholder='Entrez votre email'
                                       icon={MdOutlineAlternateEmail}
                                       onChange={(e) => setEmail(e.target.value)}
                                       error={errorMessage}
                                       errorMessage={errorMessage}
                                    ></TextInput>
                                    <Button
                                       disabled={!email || emailSent}
                                       icon={RiMailSendLine}
                                       onClick={() => onSubmit()}
                                       className={`mt-5`}
                                       loading={isLoading}
                                    >
                                       Envoyer
                                    </Button>
                                 </AccordionBody>
                              </Accordion>
                              <Accordion>
                                 <AccordionHeader>J'ai un autre problème</AccordionHeader>
                                 <AccordionBody>
                                    Si vous avez un autre problème, vous pouvez nous contacter à
                                    l'adresse mail suivante : <b>happyfitapp.pro@gmail.com</b>
                                 </AccordionBody>
                              </Accordion>
                           </AccordionList>
                           <Button
                              className='mt-2 w-full bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300'
                              onClick={closeModal}
                              loading={isLoading}
                           >
                              Terminer
                           </Button>
                        </Dialog.Panel>
                     </Transition.Child>
                  </div>
               </div>
            </Dialog>
         </Transition>
      </>
   )
}

export default LoginModal
