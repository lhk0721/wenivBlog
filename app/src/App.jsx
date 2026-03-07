
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routes/AppRouter.jsx'
import Button from './components/buttons/Button.jsx'

function App() {
    return (
        <BrowserRouter>
            <AppRouter />
            <Button/>
        </BrowserRouter>
    )
}

export default App
