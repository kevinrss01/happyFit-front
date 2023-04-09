import { Provider } from "react-redux";
import store from "../redux/store";
import "../styles/sass/main.scss";
import { Fragment } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <style jsx global>{`
        html,
        body,
        div#__next {
          height: 100%;
          padding: 0;
          overflow: hidden;
          background-image: linear-gradient(to right, #1d1e27, #111111);
        }
      `}</style>
      <link
        href="https://fonts.googleapis.com/css?family=Rubik"
        rel="stylesheet"
      ></link>
      <link
        href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
        rel="stylesheet"
      ></link>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <Provider store={store}>
        <Component {...pageProps} />;
      </Provider>
    </Fragment>
  );
}

export default MyApp;
