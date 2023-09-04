import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'
import Axios from '../service/axios'
import { getUserInfo } from '../redux/actions/userActions'
import { useSecuredDispatch } from '../service/hooks/useSecuredDispatch'
import { useRouter } from 'next/router'

const allowedPaths = ['/login', '/registration']

export default function AuthGuard({ children }) {
   const dispatch = useSecuredDispatch()
   const userId = useSelector((state) => state.user.userInfo.id)
   const { push, pathname } = useRouter()

   useEffect(() => {
      try {
         if (userId) {
            dispatch(getUserInfo(userId))
         } else {
            const token = Axios.getToken()
            if (token) {
               const { sub: id } = jwtDecode(token)
               dispatch(getUserInfo(id))
            } else {
               console.error('no token')
               if (allowedPaths.includes(pathname)) return
               throw new Error('No token found')
            }
         }
      } catch (error) {
         console.error(error)
         localStorage.clear('token')
         localStorage.clear('userTokens')
         push('login')
      }
   }, [])

   return <>{children}</>
}
