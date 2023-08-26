import { useRouter } from 'next/router'
import FlexContainer from '../Containers/FlexContainer'
import { useCallback } from 'react'
import { sportTypeButtonsClass } from '../../service/StringClasses'

export default function ExerciseList({ exercises, path }) {
   const { push } = useRouter()
   const handleClick = useCallback((index) => () => {
      push(`${path}/${index}`)
   })

   if (!Array.isArray(exercises)) return <></>

   return (
      <FlexContainer flexDirection='column'>
         {exercises.map(({ exerciseName }, index) => (
            <button
               className={sportTypeButtonsClass}
               onClick={handleClick(index)}
               key={`opener-forExercise-${index}`}
            >
               {exerciseName}
            </button>
         ))}
      </FlexContainer>
   )
}
