import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'
import Axios from '../service/axios'
import { getUserInfo } from '../redux/actions/userActions'
import { useSecuredDispatch } from '../service/hooks/useSecuredDispatch'
import { useRouter } from 'next/router'
import toastMessage from '../utils/toast'

export default function AuthGuard({ children }) {
   const dispatch = useSecuredDispatch()
   const userId = useSelector(state => state.user.userInfo.id);
   const { push } = useRouter()

   useEffect(() => {
      try {
         if(userId) {
            dispatch(getUserInfo(userId));
         } else {
            const token = Axios.getToken();
            if(token) {
               const {sub: id} = jwtDecode(token);
               dispatch(getUserInfo(id))
            } else {
               push("/connexion");
            }
         }
      } catch(error) {
         toastMessage("Une erreur est survenue, veuillez vous reconnecter.", error)
         push("/connexion")
      }
   }, [])

   return <>{children}</>
}
