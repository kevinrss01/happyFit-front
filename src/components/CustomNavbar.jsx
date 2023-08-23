import { Navbar } from './Navbar'
import { useRouter } from 'next/router'

const deniedPaths = ['/registration', '/login']

export default function CustomNavbar({ children, component }) {
   const router = useRouter()
   const isDenied = deniedPaths.includes(router.pathname)
   if (isDenied) return <>{children}</>

   return <Navbar>{children}</Navbar>
}
