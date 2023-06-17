import { sportTypeTextsClass } from '../../service/StringClasses'
import { computeInMinutes, handlePlural } from '../../service/utils'

const SetRenderer = ({ weight, seriesNumber, rest, repetition }) => (
   <p>
      Serie n°{seriesNumber} : {handlePlural(repetition, 'répétition', true)} à{' '}
      {handlePlural(parseInt(weight), 'kilo')} avec {computeInMinutes(rest)} de récupération.
   </p>
)

const Series = ({ series }) => {
   if (!series) return <></>
   const sortedSeries = [...series].sort((a, b) => a.seriesNumber - b.seriesNumber)
   const rendererOfSeries = sortedSeries.map((set) => <SetRenderer {...set} />)
   return <div>{rendererOfSeries}</div>
}

const Exercise = ({ exerciseName, instructions, muscleGroup, series }) => (
   <div className={sportTypeTextsClass}>
      <h1>
         {muscleGroup && `Séance ${muscleGroup} : `} {exerciseName}
      </h1>
      <p>{instructions}</p>
      <Series series={series} />
   </div>
)

export default Exercise
