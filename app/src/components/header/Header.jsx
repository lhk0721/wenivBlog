import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import Logo from '../../assets/icons/Logo.svg'
import Profile from '../profile/Profile.jsx'
import Button from '../buttons/Button.jsx'
import iconModify from '../../assets/icons/icon-modify-white.svg'
import iconLogout from '../../assets/icons/icon-logout.svg'
import iconLogin from '../../assets/icons/icon-login.svg'
import iconRegister from '../../assets/icons/icon-register.svg'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { PATHS } from '../../routes/paths.js'

/**
 * 현재 로그인 상태에 따라 헤더 액션 버튼을 렌더링합니다.
 *
 * @returns {JSX.Element}
 */
export default function Header() {
    const { isLoggedIn } = useAuth()
    const navigate = useNavigate()
    const [isVisible, setIsVisible] = useState(true)
    const lastScrollYRef = useRef(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            const isNearTop = currentScrollY < 24

            if (isNearTop) {
                setIsVisible(true)
                lastScrollYRef.current = currentScrollY
                return
            }

            const isScrollingUp = currentScrollY < lastScrollYRef.current

            setIsVisible(isScrollingUp)
            lastScrollYRef.current = currentScrollY
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <header className={`${styles.header} ${isVisible ? styles.visible : styles.hidden}`.trim()}>
            <img
                src={Logo}
                alt="My Blog"
                className={styles.logo}
                onClick={() => navigate(PATHS.HOME)}
            />
            <div className={styles.headerActions}>
                {isLoggedIn && <Profile size="sm" onClick={() => navigate(PATHS.MYPAGE)} />}
                {isLoggedIn && (
                    <Button
                        variant="solid-primary"
                        size="md"
                        iconHeight="1.6rem"
                        icon={iconModify}
                        text="Write"
                        bold
                        onClick={() => navigate(PATHS.POST_WRITE)}
                    />
                )}
                {isLoggedIn && (
                    <Button
                        variant="subtle-primary"
                        size="md"
                        iconHeight="1.6rem"
                        icon={iconLogout}
                        text="Logout"
                        bold
                        onClick={() => navigate(PATHS.LOGIN)}
                    />
                )}
                {!isLoggedIn && (
                    <Button
                        variant="subtle-primary"
                        size="md"
                        iconHeight="1.6rem"
                        icon={iconLogin}
                        text="Login"
                        bold
                        onClick={() => navigate(PATHS.LOGIN)}
                    />
                )}
                {!isLoggedIn && (
                    <Button
                        variant="subtle-primary"
                        size="md"
                        iconHeight="1.6rem"
                        icon={iconRegister}
                        text="Register"
                        bold
                        onClick={() => navigate(PATHS.REGISTER)}
                    />
                )}
            </div>
        </header>
    )
}
