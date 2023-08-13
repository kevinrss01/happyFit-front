import { Fragment } from "react"

const CustomTabList = ({ tabs, actualState, updateState, size }) => {
   return (
      <div className='tabs-container'>
         {tabs.map((tab, index) => {
            return (
               <Fragment key={`custom tab n°${index}`}>
                  <div
                     className={actualState === tab ? 'tab clicked' : 'tab'}
                     onClick={() => {
                        updateState(tab)
                     }}
                     key={`tab-${index}`}
                     style={{
                        height: size === 'small' ? 40 : 50,
                        minWidth: size === 'small' ? 190 : 200,
                     }}
                  >
                     {tab}
                  </div>
               </Fragment>
            )
         })}
      </div>
   )
}

export default CustomTabList
