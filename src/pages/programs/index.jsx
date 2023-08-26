import { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import Opener from '../../components/Opener'
import ProgramNavigator from '../../components/ProgramNavigator'
import Link from 'next/link'
import { Button } from '@tremor/react'
import { BiSolidHot } from 'react-icons/bi'
import 'react-multi-carousel/lib/styles.css'
import { MdSportsScore } from 'react-icons/md'

export default function ProgrammesPage() {
   const { programs } = useSelector((state) => state.sport)
   const userSexe = useSelector((state) => state.user.userInfo.sexe)
   const [weekIndex, setWeekIndex] = useState(1)

   const goForward = useCallback(() => {
      setWeekIndex((prevIndex) => prevIndex + 1)
   }, [])

   const goBackward = useCallback(() => {
      setWeekIndex((prevIndex) => prevIndex - 1)
   }, [])

   const {
      creationDate,
      sportPrograms,
      id: programId,
   } = useMemo(
      () =>
         programs.length ? programs[weekIndex - 1] : { creationDate: '', sportPrograms: [], id: 0 },
      [programs, weekIndex],
   )

   if (programs.length === 0) return <>Loading...</>

   return (
      <div className='program-navigator-container'>
         <ProgramNavigator
            limit={programs.length}
            index={weekIndex}
            goBackward={goBackward}
            goForward={goForward}
            creationDate={creationDate}
         />
         <div className='carousel-container'>
            {sportPrograms.map((val) => (
               <Opener
                  message={`Jour ${val.dayNumber} : ${val.trainingType}`}
                  key={`day-${val.dayNumber}-program-${programId}`}
                  sexe={userSexe}
               >
                  <Link href={`/programs/${programId}/${val.dayNumber}/échauffement`}>
                     <Button className='' icon={BiSolidHot}>
                        Échauffements
                     </Button>
                  </Link>
                  <Link href={`/programs/${programId}/${val.dayNumber}/exercice`}>
                     <Button className='' icon={MdSportsScore}>
                        Exercices
                     </Button>
                  </Link>
               </Opener>
            ))}
         </div>
      </div>
   )
}
