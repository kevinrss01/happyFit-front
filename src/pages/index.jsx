import { Title } from '@tremor/react'
import ArticleCard from '../components/general/ArticleCard'
import { useEffect, useState } from 'react'
import UserAPI from '../service/API/UserAPI'
import toastMessage from '../utils/toast'
import GeneralLoader from '../components/loaders/GeneralLoader'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@tremor/react'
import { GrArticle } from 'react-icons/gr'
import { ImStatsDots } from 'react-icons/im'

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
            console.error('Error while fetching articles', err)
         })
   }, [])

   return (
      <div className='general-main-container'>
         <Title className='title-container text-white text-[35px] m-4 text-center'>Accueil</Title>
         {!isLoading && articles.length > 0 ? (
            <>
               <TabGroup className='tab-group'>
                  <TabList className='mt-8 tab-list' variant='solid'>
                     <Tab icon={ImStatsDots}>Statistiques</Tab>
                     <Tab icon={GrArticle}>Articles</Tab>
                  </TabList>
                  <TabPanels>
                     <TabPanel>
                        <div className='stats-tab-container'>
                           <h2 className='text-white'>Page des statistiques</h2>
                        </div>
                     </TabPanel>
                     <TabPanel>
                        <div className='article-tab-container'>
                           {articles.map((article, index) => {
                              return <ArticleCard key={index} data={article} />
                           })}
                        </div>
                     </TabPanel>
                  </TabPanels>
               </TabGroup>
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
