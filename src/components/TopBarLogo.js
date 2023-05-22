import Image from 'next/image'
import logo from '../public/images/HappyFit-logo.svg'

function TopBarLogo() {
  return (
    <div className='topBarContainer'>
      <Image src={logo} alt='logo' width={70} height={70} />
      <h2 className='text-2xl'>Happy Fit</h2>
    </div>
  )
}

export default TopBarLogo
