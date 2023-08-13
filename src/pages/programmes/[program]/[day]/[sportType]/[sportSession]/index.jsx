import ArrowButton from '../../../../../../components/Icons/ArrowButton'
import Exercise from '../../../../../../components/SportComponents/Exercise'
import WarmUp from '../../../../../../components/SportComponents/WarmUp'
import useSportSession from '../../../../../../service/hooks/useSportSession'

const componentSelector = {
   exercice: Exercise,
   échauffement: WarmUp,
}

export default function sportSessionPage({ program, day, sportType, sportSession }) {
   const { currentSession, isFetching } = useSportSession(program, day, sportType, sportSession)

   if (isFetching) return <>Loading...</>

   const SportSessionComponent = componentSelector[sportType]
   return (
      <div>
         <ArrowButton
            href={`/programmes/${program}/${day}/${sportType}`}
            isLink
            className='mt-3 ml-3'
         />
         <SportSessionComponent {...currentSession} />
      </div>
   )
}

export async function getServerSideProps({ params }) {
   params.sportSession = parseInt(params.sportSession)
   return { props: params }
}
