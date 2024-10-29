import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import RootProvider from './context/RootProvider'
import './index.css'
import './animations.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootProvider>
    <App />
    </RootProvider>
  </StrictMode>,
)
