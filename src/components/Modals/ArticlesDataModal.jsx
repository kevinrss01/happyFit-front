import { useState, useEffect, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Button, Title } from '@tremor/react'
import FlexContainer from '../Containers/FlexContainer'
import axios from 'axios'
import toastMessage from '../../utils/toast'

const defaultObject = {
   title: '',
   text: '',
   file: undefined,
}

const style = {
   width: '100%',
   height: 'auto',
   display: 'flex',
   alignItems: 'center',
   flexDirection: 'column',
   gap: 15,
   marginTop: 30,
}

const ModalBody = ({ handleChange, handleButtonFileClick, handleInputFileChange, objectData }) => {
   const { title, text, file } = objectData
   return (
      <>
         <label htmlFor='title' className='modal-label'>
            <input
               className='modal-input'
               value={title}
               onChange={handleChange}
               id='title'
               placeholder='Titre'
            />
         </label>
         <label htmlFor='text' className='modal-label'>
            <textarea
               className='modal-text-area'
               value={text}
               onChange={handleChange}
               id='text'
               placeholder='Texte'
            />
         </label>
         <label htmlFor='imgSelector' className='modal-label'>
            <Button
               className='mb-3 mr-2 w-25 bg-white border-gray-200 text-gray-500 hover:text-white bg-gray-50 hover:border-gray-300'
               type='button'
               onClick={handleButtonFileClick}
            >
               Sélectionner un fichier
            </Button>
            <input
               className='modal-input'
               onChange={handleInputFileChange}
               accept='image/png, image/jpeg, image/webp'
               id='imgSelector'
               type='file'
            />
            {file && <span>{file.name}</span>}
         </label>
      </>
   )
}

export default function ArticlesDataModal({ visible, showModal, closeModal }) {
   const [objectData, setObjectData] = useState(defaultObject)
   const [isLoading, setIsLoading] = useState(false)

   useEffect(() => {
      !visible && setObjectData(defaultObject)
   }, [visible])

   const handleChange = (event) => {
      const { id, value } = event.target
      setObjectData((prevData) => ({
         ...prevData,
         [id]: value,
      }))
   }

   const handleInputFileChange = (event) => {
      const { files } = event.target
      const file = files.length ? files[0] : undefined
      setObjectData((prevData) => ({
         ...prevData,
         file: file,
      }))
   }

   const handleButtonFileClick = () => {
      const inputFile = document.getElementById('imgSelector')
      inputFile.click()
   }

   const handleSubmit = (event) => {
      event.preventDefault()
      if (objectData.file && objectData.title && objectData.text) {
         setIsLoading(true)
         const formData = new FormData()
         const entries = Object.entries(objectData)
         entries.forEach(([key, value]) => {
            formData.append(key, value)
         })

         axios
            .post('http://localhost:4000/users/createArticle', formData)
            .then(() => {
               setObjectData(defaultObject)
               toastMessage('Article créé avec succès', 'success')
            })
            .catch((err) => {
               console.log(err)
               return toastMessage(
                  "Une erreur est survenue lors de la création de l'article",
                  'error',
               )
            })
            .finally(() => {
               setIsLoading(false)
            })
      } else {
         toastMessage('Veuillez remplir tous les champs', 'error')
      }
   }

   const modalBodyProps = { handleChange, handleButtonFileClick, handleInputFileChange, objectData }

   if (!visible) return <button onClick={showModal}>Créer un article</button>

   return (
      <Transition show={visible} as={Fragment}>
         <Dialog as='div' className='relative z-50' onClose={closeModal}>
            <Transition.Child
               as={Fragment}
               enter='ease-out duration-300'
               enterFrom='opacity-0'
               enterTo='opacity-100'
               leave='ease-in duration-200'
               leaveFrom='opacity-100'
               leaveTo='opacity-0'
            >
               <div className='fixed inset-0 bg-gray-900 bg-opacity-25' />
            </Transition.Child>
            <div className='fixed inset-0 overflow-y-auto'>
               <div className='flex min-h-full items-center justify-center p-4 text-center'>
                  <Transition.Child
                     as={Fragment}
                     enter='ease-out duration-300'
                     enterFrom='opacity-0 scale-95'
                     enterTo='opacity-100 scale-100'
                     leave='ease-in duration-200'
                     leaveFrom='opacity-100 scale-100'
                     leaveTo='opacity-0 scale-95'
                  >
                     <Dialog.Panel
                        className='w-full max-w-xl transform overflow-hidden ring-tremor bg-white
                            p-6 text-left align-middle shadow-tremor transition-all rounded-xl'
                     >
                        <Title className='text-center'>
                           Ajout de données pour création d'articles
                        </Title>
                        <form style={style} onSubmit={handleSubmit}>
                           <ModalBody {...modalBodyProps} />
                           <FlexContainer className='gap-2'>
                              <Button className='mt-2 w-25 ' type='submit' loading={isLoading}>
                                 Valider
                              </Button>
                              <Button className='mt-2 w-25' type='button' onClick={closeModal}>
                                 Fermer
                              </Button>
                           </FlexContainer>
                        </form>
                     </Dialog.Panel>
                  </Transition.Child>
               </div>
            </div>
         </Dialog>
      </Transition>
   )
}
