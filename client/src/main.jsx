import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SEarchContextProvider } from './context/SearchContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <SEarchContextProvider>
    <App />
    </SEarchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
