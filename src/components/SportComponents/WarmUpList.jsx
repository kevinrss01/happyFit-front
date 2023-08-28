import { useRouter } from 'next/router'
import FlexContainer from '../Containers/FlexContainer'
import { useCallback } from 'react'
import { BiDetail } from 'react-icons/bi'
import { Card, Button, Title, Text } from '@tremor/react'
import { AiOutlineArrowRight } from 'react-icons/ai'

export default function WarmUpList({ warmUps, path }) {
   const { push, asPath } = useRouter()
   const handleClick = useCallback((index) => () => {
      push(`${path}/${index}?length=${warmUps.length}`)
   })

   const programPath = asPath.split('/').slice(0, 4).join('/') + '/exercise'

   if (!Array.isArray(warmUps)) return <></>

   return (
      <FlexContainer flexDirection='column'>
         <Text>Échauffement terminé ?</Text>
         <Button icon={AiOutlineArrowRight} onClick={() => push(programPath)}>
            Commencer les exercices
         </Button>
         {warmUps.map(({ exerciseNumber, exerciseName }, index) => (
            <Card key={`opener-forWarmUp-${index}`} className='warm-up-card'>
               <Title color='white' className='title-card-list'>
                  Échauffement n°{exerciseNumber} : {exerciseName}
               </Title>
               <Button onClick={handleClick(index)} icon={BiDetail}>
                  Voir en détail
               </Button>
            </Card>
         ))}
      </FlexContainer>
   )
}
