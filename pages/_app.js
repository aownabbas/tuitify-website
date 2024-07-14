import React from 'react';
import { store } from '../redux/store/store';
// styling imports
import '../public/styles/globals.css';
import '../public/styles/layout.css';
import '../public/styles/styles.css';
import '../redux/GlobalApiCall';
import '../public/styles/meetingStyles.css';

import Head from 'next/head';
import { Provider } from 'react-redux';

// export function reportWebVitals(metric) {
//   console.log(metric)
// }

function MyApp({ Component, pageProps }) {
  var awsLink = process.env.NEXT_PUBLIC_AWS_LINK || '';
  const localStorageData =
    typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('@GetPlatData')) || {} : {};
  const logo = localStorageData.logo || '';
  const name = localStorageData.name || '';

  return (
    <>
      <Head>
        <title>{name}</title>
        <link rel="icon" href={`${awsLink}platforms/logos/${logo}`} />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
