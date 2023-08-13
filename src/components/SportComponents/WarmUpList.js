import { useRouter } from 'next/router'
import FlexContainer from '../Containers/FlexContainer'
import { useCallback } from 'react'
import { sportTypeButtonsClass } from '../../service/StringClasses'

export default function WarmUpList({ warmUps, path }) {
   const { push } = useRouter()
   const handleClick = useCallback((index) => () => {
      push(`${path}/${index}`)
   })

   if (!Array.isArray(warmUps)) return <></>

   return (
      <FlexContainer flexDirection='column'>
         {warmUps.map(({ exerciseNumber, exerciseName }, index) => (
            <button
               className={sportTypeButtonsClass}
               onClick={handleClick(index)}
               key={`opener-forWarmUp-${index}`}
            >
               Échauffement n°{exerciseNumber} : {exerciseName}
            </button>
         ))}
      </FlexContainer>
   )
}
