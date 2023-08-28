import { useCallback } from 'react'
import ArrowButton from './Icons/ArrowButton'
import { Title } from '@tremor/react'

const getWeekString = (index, creationDate) => {
   const start = formatJSONDate(creationDate)
   const finish = getFinishBasedOnCreationDate(creationDate)
   return `Semaine ${index} du ${start} au ${finish}`
}

const getFinishBasedOnCreationDate = (creationDate) => {
   const finishDate = new Date(creationDate)
   finishDate.setDate(finishDate.getDate() + 7)
   const finishJSON = finishDate.toJSON().substring(0, 10)
   return formatJSONDate(finishJSON)
}

const formatJSONDate = (json) => json.split('-').reverse().join('/')

export default function ProgramNavigator({ index, limit, creationDate, goForward, goBackward }) {
   const validateCallback = useCallback(
      (condition, callback) => (condition ? callback : () => {}),
      [],
   )

   return (
      <div className='top-bar-navigation-container'>
         <div className='top-bar-navigation'>
            <ArrowButton direction='left' onClick={validateCallback(index > 1, goBackward)} />
            <Title
               color='white'
               className='title-date'
               style={{
                  fontSize: '25px',
               }}
            >
               {/* Semaine {index} du {creationDate.replaceAll(/-/g, "/")} */}
               {getWeekString(index, creationDate)}
            </Title>
            <ArrowButton direction='right' onClick={validateCallback(index < limit, goForward)} />
         </div>
      </div>
   )
}
