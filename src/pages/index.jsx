import { Title } from '@tremor/react'
import ArticleCard from '../components/general/ArticleCard'
import { useEffect, useState } from 'react'
import UserAPI from '../service/UserAPI'
import toastMessage from '../utils/toast'
import GeneralLoader from '../components/loaders/GeneralLoader'

export default function Home() {
   const [articles, setArticles] = useState([])
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      UserAPI.getAllArticles()
         .then((res) => {
            setArticles(res.data)
            setIsLoading(false)
         })
         .catch((err) => {
            toastMessage('Une erreur est survenue, veuillez réessayer plus tard', 'error')
            console.log(err)
         })
   }, [])

   return (
      <div className='general-main-container'>
         <Title className='title-container text-white text-[35px] m-4 text-center'>
            Les derniers articles
         </Title>
         {!isLoading && articles.length > 0 ? (
            <>
               {articles.map((article, index) => {
                  return <ArticleCard key={index} data={article} />
               })}
            </>
         ) : (
            <>
               <GeneralLoader />
               <GeneralLoader />
            </>
         )}
      </div>
   )
}
