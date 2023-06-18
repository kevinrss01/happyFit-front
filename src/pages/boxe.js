import { useState } from 'react'
import { FcApproval } from 'react-icons/fc'
import axios from 'axios'
import toastMessage from '../utils/toast'

const BoxingPage = () => {
  const [stayInTouch, setStayInTouch] = useState(false)

  //TO-DO : Get data from redux or from call api
  const email = 'test@test.com'
  const id = 'testID'

  const postInterestedUser = () => {
    axios
      .post('http://localhost:4000/program/stayintouch', {
        email: email,
        id: id,
      })
      .then(function (response) {
        console.log(response)
        setStayInTouch(true)
      })
      .catch(function (error) {
        console.log(error)
        //console.log(error?.response?.request?.response);
        toastMessage('Oups, une erreur est survenu, veuillez réessayer plus tard.', 'error')
      })
  }

  return (
    <div className='boxing-page-container'>
      <div className='boxing-text-container'>
        <h1>
          Dépassez vos limites avec un programmes de boxe
          <br /> sur-mesure qui vous ressemble.
        </h1>
        <div
          className='stay-in-touch-button'
          style={{
            backgroundColor: stayInTouch ? '#3e8bd0' : '',
            cursor: stayInTouch ? 'not-allowed' : 'pointer',
            pointerEvents: stayInTouch ? 'none' : 'auto',
          }}
          onClick={() => {
            postInterestedUser()
          }}
        >
          {stayInTouch ? (
            <h2
              style={{
                justifyContent: stayInTouch ? 'space-between' : 'center',
              }}
            >
              En liste d&lsquo;attente <br /> <FcApproval />
            </h2>
          ) : (
            <h2>Rester informé</h2>
          )}
        </div>
        <h2>Créé pour vous, par vous, et rien que pour vous.</h2>
      </div>
    </div>
  )
}

export default BoxingPage
