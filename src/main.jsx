import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import './index.css'
import './animations.css'
import RootProviderWrapper from './context/RootProviderWraper.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootProviderWrapper>
      <App />
    </RootProviderWrapper>
  </StrictMode>,
)
