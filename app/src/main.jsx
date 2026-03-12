import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AlertProvider } from './contexts/AlertContext.jsx'
import './assets/styles/global.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AlertProvider>
            <App />
        </AlertProvider>
    </StrictMode>,
)
