import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routes/AppRouter.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import './assets/styles/variables.css'
import './assets/styles/global.css'

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
