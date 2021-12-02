import { useEffect } from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { store } from 'state/store';

import { Header, Layout } from 'components';

export const getLibrary = (provider: any) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Header />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Web3ReactProvider>
      <div id="modal" />
    </Provider>
  );
}
export default MyApp;
