import { useMemo } from 'react'
import WarmUpList from '../../../../../components/SportComponents/WarmUpList'
import ExerciseList from '../../../../../components/SportComponents/ExerciseList'
import ArrowButton from '../../../../../components/Icons/ArrowButton'
import useSportSession from '../../../../../service/hooks/useSportSession'

const componentSelector = {
   exercises: {
      SportTypeComponent: ExerciseList,
      props: ({ exercises }) => ({ exercises }),
      sportTypeName: 'Exercice',
   },
   warmUp: {
      SportTypeComponent: WarmUpList,
      props: ({ warmUp }) => ({ warmUps: warmUp }),
      sportTypeName: 'Échauffement',
   },
}

export default function SportTypePage({ program, day, sportType }) {
   const { currentSession, isFetching } = useSportSession(program, day)

   const sportTypeField = useMemo(
      () => (sportType === 'exercise' ? 'exercises' : 'warmUp'),
      [sportType],
   )

   const { SportTypeComponent, props, sportTypeName } = useMemo(() => {
      if (sportTypeField in componentSelector) return componentSelector[sportTypeField]

      return {
         SportTypeComponent: () => <></>,
         props: () => ({}),
         sportTypeName: '',
      }
   }, [sportTypeField])

   if (isFetching) return <>Loading...</>

   return (
      <div style={{ color: 'white' }} className='sport-type-container'>
         <div
            style={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               padding: 10,
            }}
         >
            <ArrowButton isLink href='/programs' direction='left' />
            <h1 style={{ textAlign: 'center', fontSize: '25px', margin: '0 10px' }}>
               {sportTypeName}s centrés sur le {currentSession.trainingType}
            </h1>
         </div>
         <SportTypeComponent
            path={`/programs/${program}/${day}/${sportType}`}
            {...props(currentSession)}
         />
      </div>
   )
}

export async function getServerSideProps(context) {
   return { props: context.params }
}
