const base = 'flex justify-center items-center'
const columnFlex = `${base} flex-col`

const flexClass = {
   inline: base,
   column: columnFlex,
}

export default function FlexContainer({ flexDirection = 'inline', className = '', children }) {
   const flexClassName = `flex-container ${flexClass[flexDirection]} ${className}`
   return <div className={flexClassName}>{children}</div>
}
