import { useDispatch } from 'react-redux'
import { assessTokenValidity } from '../utils'
import { refreshToken } from '../../redux/actions/userActions'
import { useRouter } from 'next/router'
import toastMessage from '../../utils/toast'

const REDIRECT_ERROR = "Une erreur s'est produite, veuillez vous reconnecter."

export const useSecuredDispatch = () => {
   const dispatch = useDispatch()
   const { push } = useRouter()

   const redirect = () => {
      toastMessage(REDIRECT_ERROR, 'error')
      localStorage.removeItem('userTokens')
      push('/login')
   }

   return (actionObject) => {
      const tokenStatus = assessTokenValidity()
      if (tokenStatus) {
         if (tokenStatus.refresh) {
            dispatch(refreshToken(tokenStatus.token))
               .then(() => {
                  dispatch(actionObject)
               })
               .catch(() => {
                  redirect()
               })
         } else {
            dispatch(actionObject)
         }
      } else {
         redirect()
      }
   }
}
