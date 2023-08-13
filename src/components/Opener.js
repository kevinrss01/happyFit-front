import { useCallback, useMemo, useState } from 'react'

const Opener = ({ message, children }) => {
  const [isOpened, setIsOpened] = useState(false)

  const handleClick = useCallback(() => {
    setIsOpened((prev) => !prev)
  }, [])

  const icone = useMemo(
    () => <i className={`fa fa-angle-${isOpened ? 'up' : 'down'}`} style={{ marginRight: 5 }}></i>,
    [isOpened],
  )

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <button className='button-opener' onClick={handleClick}>
        {icone}
        {message}
      </button>
      {isOpened && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 5,
            marginBottom: 10,
            width: 200,
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default Opener
