import '@/styles/globals.css'
import type { AppProps } from 'next/app'
// import { AppProvider } from '@/context/AppContext'

import { store } from '@/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

export default function App({ Component, pageProps }: AppProps) {
  const persistor = persistStore(store)
  return (
    // <AppProvider>
    //   <Component {...pageProps} />
    // </AppProvider>

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}
