import { CgMenuGridO } from 'react-icons/cg'
import { MdAutoGraph, MdSportsMma } from 'react-icons/md'
import { GiWeightLiftingUp } from 'react-icons/gi'
import { AiOutlineSetting } from 'react-icons/ai'
import { useRouter } from 'next/router'
import logo from '../public/images/HappyFit-logo.png'
import Image from 'next/image'
import ArticlesDataModal from './Modals/ArticlesDataModal'
import { ADMIN_ROLE } from '../service/constants'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Icon, Text, Bold } from '@tremor/react'
import { BiLogOutCircle } from 'react-icons/bi'
import { MdGeneratingTokens } from 'react-icons/md'

const roleSelector = (state) => {
   const { role } = state.user
   return role === ADMIN_ROLE
}

const links = [
   {
      name: 'Général',
      icon: <CgMenuGridO />,
      path: '/',
   },
   {
      name: 'Programmes',
      icon: <GiWeightLiftingUp />,
      path: '/programs',
   },
   {
      name: 'Bilan',
      icon: <MdAutoGraph />,
      path: '/bilan',
   },
   {
      name: 'Boxe',
      icon: <MdSportsMma />,
      path: '/boxe',
      button: true,
   },
   {
      name: 'Paramètres',
      icon: <AiOutlineSetting />,
      path: '/settings',
   },
]

export const Navbar = ({ children }) => {
   const router = useRouter()
   const { asPath } = useRouter()
   const isAdmin = useSelector(roleSelector)
   const [visible, setVisible] = useState(false)
   const [numberOfTokens, setNumberOfTokens] = useState(9999)

   const closeModal = () => {
      setVisible(false)
   }

   const showModal = () => {
      setVisible(true)
   }

   const handleLogout = () => {
      localStorage.removeItem('userTokens')
      router.push('/login')
   }

   return (
      <div className='navbar-parent'>
         <div className='navbar-container'>
            <div className='logo-container'>
               <Image src={logo} height={80} width={80} alt='logo-happy-fit' />
            </div>
            <div className='link-container'>
               {links.map((link, index) => {
                  return (
                     <div
                        key={`link n°${index}: ${link.name}`}
                        className={
                           asPath === link.path
                              ? 'icon-container icon-container-selected'
                              : 'icon-container'
                        }
                        onClick={() => {
                           router.push(link.path)
                        }}
                     >
                        {link.icon}
                        <span style={{ width: link.button ? '28%' : '70%' }}>{link.name}</span>
                        {link.button && <button className='custom-btn btn-3'>Bientôt</button>}
                     </div>
                  )
               })}
               {isAdmin && <ArticlesDataModal {...{ visible, showModal, closeModal }} />}
            </div>
         </div>
         <div className='children'>{children}</div>
         <div className='icons-container'>
            <div className='token-container'>
               <Icon
                  size='lg'
                  className='token'
                  tooltip={`Nombre de jeton disponible : ${
                     numberOfTokens === 9999 ? 'Illimité' : `${numberOfTokens} jetons`
                  }`}
                  icon={MdGeneratingTokens}
                  onClick={() => handleLogout()}
               />
               <Bold className='flex items-center justify-center text-white'>Illimité</Bold>
            </div>

            <Icon
               size='lg'
               className='logout'
               tooltip='Se deconnecter'
               icon={BiLogOutCircle}
               onClick={() => handleLogout()}
            />
         </div>
      </div>
   )
}
