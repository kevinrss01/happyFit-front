import Link from 'next/link'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import WarmUpList from '../../../../../components/SportComponents/WarmUpList'
import ExerciseList from '../../../../../components/SportComponents/ExerciseList'
import ArrowButton from '../../../../../components/Icons/ArrowButton'
import useSportSession from '../../../../../service/hooks/useSportSession'

const componentSelector = {
   exercices: {
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
   console.log('this is the current session', currentSession)

   const sportTypeField = useMemo(
      () => (sportType === 'exercice' ? 'exercices' : 'warmUp'),
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
      <div style={{ color: 'white' }}>
         <div
            style={{
               display: 'flex',
               justifyContent: 'start',
               alignItems: 'center',
               padding: 10,
            }}
         >
            <ArrowButton isLink href='/programmes' direction='left' />
            <h1 style={{ textAlign: 'center', width: '100%', fontSize: '20px' }}>
               {sportTypeName}s centrés sur le {currentSession.trainingType}
            </h1>
         </div>
         <SportTypeComponent
            path={`/programmes/${program}/${day}/${sportType}`}
            {...props(currentSession)}
         />
      </div>
   )
}

export async function getServerSideProps(context) {
   return { props: context.params }
}
