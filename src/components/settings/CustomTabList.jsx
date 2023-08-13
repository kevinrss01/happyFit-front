const CustomTabList = ({ tabs, actualState, updateState, size }) => {
   return (
      <div className='tabs-container'>
         {tabs.map((tab, index) => {
            return (
               <>
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
               </>
            )
         })}
      </div>
   )
}

export default CustomTabList
