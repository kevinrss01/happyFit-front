import Link from 'next/link'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

const capitalize = (str) => {
   const firstLetter = str.substring(0, 1).toUpperCase()
   const restOfLetter = str.substring(1, str.length)
   return `${firstLetter}${restOfLetter}`
}

export default function SportTypePage({ program, day, sportType }) {
   const { programs } = useSelector((state) => state.sport)
   const sportTypeField = useMemo(
      () => (sportType === 'exercise' ? 'exercises' : 'warmUp'),
      [sportType],
   )

   const currentProgram = programs.find(({ id }) => id === program)

   const currentSession = currentProgram.sportPrograms.find(
      ({ dayNumber }) => dayNumber.toString() === day,
   )

   return (
      <div style={{ color: 'white' }}>
         <Link href='/'>
            <i className='fa fa-arrow-circle-left' style={{ color: 'white' }}></i>
         </Link>
      </div>
   )
}

export async function getServerSideProps(context) {
   return { props: context.params }
}
