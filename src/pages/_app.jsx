import { Provider } from 'react-redux'
import store from '../redux/store'
import '../styles/sass/main.scss'
import { Fragment } from 'react'
import { useRouter } from 'next/router'
import AuthGuard from '../components/AuthGuard'
import CustomNavbar from '../components/CustomNavbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
   return (
      <Fragment>
         {/* eslint-disable-next-line react/no-unknown-property */}
         <style jsx global>{`
            html,
            body,
            div#__next {
               height: 100%;
               padding: 0;
               background-image: linear-gradient(to right, #1d1e27, #111111);
            }
         `}</style>
         <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'></link>
         <link
            href='http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css'
            rel='stylesheet'
         ></link>
         <link
            rel='stylesheet'
            href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
         />
         <Provider store={store}>
            <AuthGuard>
               <CustomNavbar component={Component}>
                  <Component {...pageProps} />
                  <ToastContainer
                     position='top-right'
                     autoClose={3000}
                     hideProgressBar={false}
                     newestOnTop={false}
                     closeOnClick
                     rtl={false}
                     pauseOnFocusLoss
                     draggable
                     pauseOnHover
                     theme='light'
                     zIndex={9999}
                  />
                  <ToastContainer />
               </CustomNavbar>
            </AuthGuard>
         </Provider>
      </Fragment>
   )
}

export default MyApp
