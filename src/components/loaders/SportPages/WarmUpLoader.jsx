import Skeleton from 'react-loading-skeleton'

const WarmUpLoader = (props) => (
   <>
      <Skeleton height={40} width={500} count={1} className='mt-10 mb-5' />
      <Skeleton height={35} width={300} count={1} className='mt-5 mb-5' />
      <Skeleton count={1} height={50} width={700} />
      <Skeleton count={1} height={150} width={700} />
      <Skeleton count={1} height={50} width={700} />

      <div className='flex items-center justify-between'>
         <div className='m-5 flex flex-col items-center justify-center'>
            <Skeleton height={25} width={250} className='mt-5 mb-5' />
            <Skeleton height={250} width={300} />
         </div>
         <div className='m-5 flex flex-col items-center'>
            <Skeleton height={25} width={250} className='mt-5 mb-5' />
            <Skeleton height={250} width={300} />
         </div>
      </div>
   </>
)

export default WarmUpLoader
