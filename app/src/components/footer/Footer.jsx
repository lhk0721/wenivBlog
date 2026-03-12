import { useEffect, useState } from 'react'
import styles from './Footer.module.css'
import Button from '../buttons/Button.jsx'
import ArrowTop from '../../assets/icons/ArrowTop.svg'

/**
 * 하단 저작권 정보와 최상단 이동 버튼을 렌더링합니다.
 *
 * @returns {JSX.Element}
 */
export default function Footer() {
    const [isTopVisible, setIsTopVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const bannerHeight = window.innerWidth <= 1439 ? 280 : 420

            setIsTopVisible(window.scrollY >= bannerHeight)
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <footer className={styles.footer}>
            <p className={styles.copyright}>©Wenaiv Corp.</p>
            <div className={`${styles.topWrap} ${isTopVisible ? styles.visible : styles.hidden}`.trim()}>
                <Button
                    variant="primary"
                    size="top"
                    text="Top"
                    icon={ArrowTop}
                    activeIcon={ArrowTop}
                    className={styles.top}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                />
            </div>
        </footer>
    )
}
