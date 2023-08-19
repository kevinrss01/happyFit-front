import { useState } from 'react'

const defaultObject = {
   title: '',
   text: '',
   img: undefined,
}

const style = {
   width: '100%',
   height: 'auto',
   display: 'flex',
   alignItems: 'center',
   flexDirection: 'column',
}
export default function AddArticles() {
   const [objectData, setObjectData] = useState(defaultObject)
   console.log('this is the object data', objectData)

   const { title, text, img } = objectData

   const handleChange = (event) => {
      const { id, value } = event.target
      console.log('changing ', id, value)
      setObjectData((prevData) => ({
         ...prevData,
         [id]: value,
      }))
   }

   const handleInputFileChange = (event) => {
      const { files } = event.target
      const file = files.length ? files[0] : undefined
      console.log('this is the file', file)
      setObjectData((prevData) => ({
         ...prevData,
         img: file,
      }))
   }

   const handleButtonFileClick = (event) => {
      const inputFile = document.getElementById('imgSelector')
      inputFile.click()
   }

   const handleSubmit = (event) => {
      event.preventDefault()
      const formData = new FormData()
      const entries = Object.entries(objectData)
      entries.forEach(([key, value]) => {
         console.log('appending ', key, value)
         formData.append(key, value)
      })
      // axios send the data
   }

   return (
      <div style={style}>
         <form style={style} onSubmit={handleSubmit}>
            <label htmlFor='title' className='modal-label'>
               Titre
               <input
                  className='modal-input'
                  value={title}
                  onChange={handleChange}
                  id='title'
                  placeholder=''
               />
            </label>
            <label htmlFor='text' className='modal-label'>
               Texte
               <input
                  className='modal-input'
                  value={text}
                  onChange={handleChange}
                  id='text'
                  placeholder=''
               />
            </label>
            <label htmlFor='imgSelector' className='modal-label'>
               <button type='button' onClick={handleButtonFileClick}>
                  Sélectionner un fichier
               </button>
               <input
                  className='modal-input'
                  onChange={handleInputFileChange}
                  accept='image/png, image/jpeg, image/webp'
                  id='imgSelector'
                  type='file'
               />
               {img && <span>{img.name}</span>}
            </label>
            <button type='submit'>Valider</button>
         </form>
      </div>
   )
}
