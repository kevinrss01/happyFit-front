import Link from 'next/link'
import React, { useState, useMemo, useCallback, Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from '../../redux/actions/userActions'
import { useRouter } from 'next/router'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { FcLock } from 'react-icons/fc'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Button } from '@tremor/react'
import toastMessage from '../../utils/toast'
import LoginModal from './LoginModal'

const defaultFormValue = {
   email: '',
   password: '',
   visible: false,
}

function LoginForm({ windowWith }) {
   const router = useRouter()
   const [formValue, setFormValue] = useState(defaultFormValue)
   const [loading, setLoading] = useState(false)
   const [showErrorMessage, setShowErrorMessage] = useState(false)
   const [errorMessage, setErrorMessage] = useState('')
   const dispatch = useDispatch()
   const { email, password, visible } = useMemo(() => formValue, [formValue])
   const [isModalOpen, setIsModalOpen] = useState(false)

   const handleChange = useCallback(({ target }) => {
      const { value, id, checked, type } = target
      setFormValue((prevForm) => ({
         ...prevForm,
         [id]: type === 'checkbox' ? checked : value,
      }))
   }, [])

   const handleVisibleClick = useCallback(() => {
      setFormValue((prevForm) => ({
         ...prevForm,
         visible: !prevForm.visible,
      }))
   }, [])

   const closeModal = () => {
      setIsModalOpen(false)
   }

   const handleSubmit = useCallback(
      (event) => {
         event.preventDefault()
         if (formValue.email.match(/.*@.*[.].*/)) {
            setShowErrorMessage(false)
            setLoading(true)
            const { visible, ...data } = formValue
            dispatch(userLogin(data))
               .then(() => {
                  setLoading(false)
                  setFormValue(defaultFormValue)
                  router.push('/')
               })
               .catch((error) => {
                  setLoading(false)
                  console.error(error.request.response)
                  if (error.request.response.includes('Invalid credentials')) {
                     setErrorMessage('Email ou mot de passe incorrect')
                     setShowErrorMessage(true)
                  } else {
                     toastMessage(
                        'Oups ! Une erreur est survenue veuillez réessayer plus tard.',
                        'error',
                     )
                  }
               })
         } else {
            setErrorMessage('Veuillez entrer un email valide')
            setShowErrorMessage(true)
         }
      },
      [formValue],
   )

   return (
      <>
         <LoginModal closeModal={closeModal} isOpenModal={isModalOpen} />
         <form
            onSubmit={handleSubmit}
            className='login-form'
            style={{
               borderRadius: windowWith < 1400 ? '0 0 0 0' : '10px 0 0 10px',
            }}
         >
            <h2>Connexion</h2>
            <div className='input-form'>
               <MdOutlineAlternateEmail />
               <input
                  onChange={handleChange}
                  id='email'
                  type='mail'
                  placeholder='E-mail'
                  value={email}
               />
            </div>
            <div className='password-container input-form'>
               <FcLock />
               <input
                  onChange={handleChange}
                  id='password'
                  type={visible ? 'text' : 'password'}
                  placeholder='Mot de passe'
                  value={password}
               />
               {visible ? (
                  <AiFillEyeInvisible onClick={handleVisibleClick} className='icon' />
               ) : (
                  <AiFillEye onClick={handleVisibleClick} className='icon' />
               )}
            </div>
            {showErrorMessage && (
               <div className='error-container'>
                  <span className='error-message'>{errorMessage}</span>
               </div>
            )}

            <Button
               disabled={!(email.length > 4 && password.length > 7)}
               loading={loading}
               type='submit'
               className='button-submit'
            >
               <span className='text-base'>Se connecter</span>
            </Button>

            <div className='link-contaikner'>
               <div className='no-account'>
                  <span style={{ fontFamily: 'Rubik' }}>Pas encore inscrit ? </span>
                  <Link href='/registration'>
                     <p
                        style={{
                           fontFamily: 'Rubik',
                           color: '#3e8bd0',
                           textDecoration: 'underline',
                            cursor: 'pointer',

                        }}
                     >
                        Je m&lsquo;inscris
                     </p>
                  </Link>
               </div>
               <div className='login-issue'>
                  <span style={{ marginBottom: 5, fontFamily: 'Rubik' }}>
                     Problème de connexion ?
                  </span>
                  <p
                     style={{
                        fontFamily: 'Rubik',
                        color: '#3e8bd0',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                     }}
                     onClick={() => setIsModalOpen(true)}
                  >
                     Demander de l'aide
                  </p>
               </div>
            </div>
         </form>
      </>
   )
}

export default LoginForm
