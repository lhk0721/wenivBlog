
import { BrowserRouter } from 'react-router-dom'
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
import InputPassword from './components/inputs/InputPassword.jsx'

// categories
import Categories from './components/categories/Categories.jsx'

const categories = [
    { id: 1, name: "Life" },
    { id: 2, name: "Style" },
    { id: 3, name: "Tech" },
    { id: 4, name: "Music" },
    { id: 5, name: "Sport" },
    { id: 6, name: "Photo" },
    { id: 7, name: "Develop" }
]

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
                label='Email'
                type='email'
                name='email'
                placeholder='이메일을 입력해 주세요'
            />

            <Input
                label='Username'
                name='username'
                placeholder='사용자 이름을 입력해 주세요'
            />

            <InputPassword
                label='Password'
                name='password'
                placeholder='비밀번호를 입력해 주세요'
            />

            <Categories
                categories={categories}
                theme='positive'
            />

        </BrowserRouter>
    )
}

export default App
