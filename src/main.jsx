import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from "react-helmet-async"; // import provider
import { BrowserRouter } from 'react-router-dom'
//import './index.css'
import App from './App.jsx'

//react-router-dom, alternative for react-router

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
