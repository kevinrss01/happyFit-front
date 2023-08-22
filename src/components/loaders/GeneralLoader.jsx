import React from 'react'
import ContentLoader from 'react-content-loader'
import { useWindowSize } from '@react-hookz/web'

const GeneralLoader = (props) => {
   const { width } = useWindowSize()

   return (
      <div className=''>
         <ContentLoader
            speed={2}
            width={(width * 80) / 100}
            height={700}
            viewBox='0 0 420 300'
            backgroundColor='#f5f5f5'
            foregroundColor='#dbdbdb'
            {...props}
         >
            <rect x='12' y='35' rx='0' ry='0' width='6' height='246' />
            <rect x='14' y='34' rx='0' ry='0' width='408' height='6' />
            <rect x='416' y='34' rx='0' ry='0' width='6' height='246' />
            <rect x='12' y='276' rx='0' ry='0' width='408' height='6' />
            <rect x='150' y='53' rx='6' ry='6' width='127' height='15' />
            <rect x='37' y='77' rx='7' ry='7' width='361' height='139' />
            <rect x='58' y='225' rx='0' ry='0' width='316' height='8' />
            <rect x='86' y='238' rx='0' ry='0' width='267' height='8' />
            <rect x='58' y='252' rx='0' ry='0' width='316' height='8' />
         </ContentLoader>
      </div>
   )
}

export default GeneralLoader
