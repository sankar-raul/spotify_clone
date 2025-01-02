import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import './animations.css'
import RootProviderWrapper from './context/RootProviderWraper.jsx'
import Miniplayer from './components/pip/miniplayer.jsx'
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
    <RootProviderWrapper>
      <App />
      <Miniplayer/>
    </RootProviderWrapper>
    </Router>
    <Analytics />
  </StrictMode>,
)
