import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'

import store from './Store/Store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
    <Provider  store={store}>
        <App />
      </Provider>
    </CookiesProvider>
  </StrictMode>,
)
