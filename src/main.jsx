import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import App from './App.jsx'
import { RequestListProvider } from './components/RequestList.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <RequestListProvider>
          <App />
        </RequestListProvider>
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>,
)
