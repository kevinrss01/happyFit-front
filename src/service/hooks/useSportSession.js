import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export default function useSportSession(programId, dayIndex, sportType, index) {
   const { programs, isFetching } = useSelector((state) => state.sport)

   const sportTypeField = useMemo(
      () => (sportType === 'exercise' ? 'exercises' : 'warmUp'),
      [sportType],
   )

   if (isFetching) return { isFetching, currentSession: {} }

   const currentProgram = programs.find(({ id }) => id === programId)

   const currentSession = currentProgram.sportPrograms.find(
      ({ dayNumber }) => dayNumber.toString() === dayIndex,
   )

   if (sportType && Number.isInteger(index))
      return { isFetching, currentSession: currentSession[sportTypeField][index] }

   return { isFetching, currentSession }
}
