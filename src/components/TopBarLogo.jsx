import Image from 'next/image'
import logo from '../public/images/logo-topbar-gif.gif'

function TopBarLogo() {
   return (
      <div className='topBarContainer'>
         <Image src={logo} alt='logo' height={100} width={170} />
      </div>
   )
}

export default TopBarLogo
