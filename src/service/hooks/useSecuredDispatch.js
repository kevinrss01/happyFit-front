import { useDispatch } from 'react-redux'
import { assessTokenValidity } from '../utils'
import { refreshToken } from '../../redux/actions/userActions'
import { useRouter } from 'next/router'
import toastMessage from '../../utils/toast'
import Axios from '../axios'

const REDIRECT_ERROR = "Une erreur s'est produite, veuillez vous reconnecter."

const refreshAxionToken = (token) => {
   if (!Axios.tokenSaved()) {
      Axios.saveToken(token)
   }
}

export const useSecuredDispatch = () => {
   const dispatch = useDispatch()
   const { pathname, push } = useRouter()

   const redirect = () => {
      toastMessage(REDIRECT_ERROR, 'error')
      localStorage.removeItem('userTokens')
      push('/connexion')
   }

   const refreshTokenForActionOrRedirect = (actionObject, tokenStatus) => {
      if (tokenStatus) {
         if (tokenStatus.refresh) {
            dispatch(refreshToken(tokenStatus.token))
               .then(() => {
                  dispatch(actionObject)
               })
               .catch(redirect)
         } else {
            refreshAxionToken(tokenStatus.token)
            dispatch(actionObject)
         }
      } else {
         redirect()
      }
   }

   return (actionObject) => {
      const tokenStatus = assessTokenValidity()
      if (!pathname.includes('inscription')) {
         refreshTokenForActionOrRedirect(actionObject, tokenStatus)
      }
   }
}
