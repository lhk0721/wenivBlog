
import { BrowserRouter, useSearchParams } from 'react-router-dom'
import AppRouter from './routes/AppRouter.jsx'
import './assets/styles/variables.css'
import './assets/styles/global.css'

// components
import Button from './components/buttons/Button.jsx'

// icons
import icon from './assets/icons/icon-save.svg'
import activeicon from './assets/icons/icon-save-white.svg'
import ArrowTop from './assets/icons/ArrowTop.svg'
import Like from './assets/icons/icon-like.svg'
import LikeWhite from './assets/icons/icon-like-white.svg'
import Image from './assets/icons/icon-image.svg'

// input
import Input from './components/inputs/Input.jsx';
import { useState } from 'react'
const [inputValue, setInputValue] = useState('')




function App() {
    return (
        <BrowserRouter>
            <AppRouter />
            <Button
                variant = 'primary'
                size = 'md'
                text = 'Save'
                icon = {icon}
                activeIcon={activeicon}

            />
            <Button
                variant = 'primary'
                size = 'top'
                text = 'Top'
                icon={ArrowTop}
                activeIcon={ArrowTop}
            />

            <Button
                variant = 'negative'
                size = 'lg'
                text = 'Like'
                icon={Like}
                activeIcon={LikeWhite}
            />

            <Button
                variant = 'round'
                size = 'sm'
                iconHeight= '2.15rem'
                icon={Image}
            />

            <Button
                variant = 'subtle-primary'
                size = 'md'
                iconHeight= '2.15rem'
                icon={Like}
                activeIcon={LikeWhite}
            />

            <Button
                variant = 'subtle-negative'
                size = 'md'
                iconHeight= '2.15rem'
                icon={Like}
                activeIcon={LikeWhite}
            />

            <Input
                type={'password'}
                name={'PW'}
                id={'Password'}
                value={inputValue}
                placeholder={'6+ characters'}
                onChange={(e)=>setInputValue(e.target.value)}
                maxLength={8}
                autoComplete={'new-password'}
                className={`${styles.base}`}
                required={required}
            />
        </BrowserRouter>
    )
}

export default App
