import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'
import Axios from '../service/axios'
import { getUserInfo } from '../redux/actions/userActions'
import { useSecuredDispatch } from '../service/hooks/useSecuredDispatch'

export default function AuthGuard({ children }) {
   const dispatch = useSecuredDispatch()
   const userId = useSelector(state => state.user.userInfo.id);

   useEffect(() => {
      if(userId) {
         dispatch(getUserInfo(userId));
      } else {
         const token = Axios.getToken();
         if(token) {
            const {sub: id} = jwtDecode(token);
            dispatch(getUserInfo(id));
         }
      }
   }, [])

   return <>{children}</>
}
