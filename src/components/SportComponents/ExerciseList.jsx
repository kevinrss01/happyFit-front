import { useRouter } from 'next/router'
import FlexContainer from '../Containers/FlexContainer'
import { useCallback } from 'react'
import { Card, Button, Title } from '@tremor/react'
import { BiDetail } from 'react-icons/bi'

export default function ExerciseList({ exercises, path }) {
   const { push } = useRouter()
   const handleClick = useCallback((index) => () => {
      push(`${path}/${index}?length=${exercises.length}`)
   })

   if (!Array.isArray(exercises)) return <></>

   return (
      <FlexContainer flexDirection='column'>
         {exercises.map(({ exerciseName }, index) => (
            <Card key={`opener-forWarmUp-${index}`} className='warm-up-card'>
               <Title color='white' className='title-card-list'>
                  {index + 1} - {exerciseName}
               </Title>
               <Button
                  onClick={handleClick(index)}
                  key={`opener-forExercise-${index}`}
                  icon={BiDetail}
               >
                  Voir en détail
               </Button>
            </Card>
         ))}
      </FlexContainer>
   )
}
