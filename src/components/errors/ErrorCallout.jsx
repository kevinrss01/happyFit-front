import { Callout } from '@tremor/react'
import { BiError } from 'react-icons/bi'
import React from 'react'

export const ErrorCallout = ({ title, errorMessage }) => {
   return (
      <>
         <Callout className='w-1/2 m-8' title={title} icon={BiError} color='rose'>
            {errorMessage}
         </Callout>
      </>
   )
}
