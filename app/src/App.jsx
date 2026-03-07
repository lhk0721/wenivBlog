
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routes/AppRouter.jsx'
import './assets/styles/variables.css'
import './assets/styles/global.css'

import Button from './components/buttons/Button.jsx'
import { saveIcon, saveWhiteIcon } from './assets/icons'

function App() {
    return (
        <BrowserRouter>
            <AppRouter />
            <Button
                text = "Save"
                activeIcon={saveWhiteIcon}
            />
        </BrowserRouter>
    )
}

export default App
