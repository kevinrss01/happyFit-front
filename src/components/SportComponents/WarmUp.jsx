// we need : exerciseName, instructions, numberOfSeries, repetition, rest

import { sportTypeTextsClass } from '../../service/StringClasses'
import { computeInMinutes, handlePlural } from '../../service/utils'

const textAlign = 'center'
const centerStyle = { textAlign }

export default function WarmUp({
   exerciseNumber,
   exerciseName,
   instructions,
   numberOfSeries,
   repetition,
   rest,
}) {
   const repetitions = handlePlural(repetition, 'répétition', true)
   const repetitionsText = repetitions ? ` de ${repetitions}` : ''
   return (
      <div className={sportTypeTextsClass}>
         <h2 style={centerStyle}>
            Échauffement n°{exerciseNumber} : {exerciseName}
         </h2>
         <p style={{ ...centerStyle, padding: 25 }}>
            {instructions} <br />
            Répétez cet échauffement sur {handlePlural(numberOfSeries, 'série', true)}
            {repetitionsText} avec {computeInMinutes(rest)} de repos.
         </p>
      </div>
   )
}
