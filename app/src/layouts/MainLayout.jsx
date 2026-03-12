import { matchPath, useLocation } from 'react-router-dom'
import Banner from '../components/Banner/Banner.jsx'
import Footer from '../components/footer/Footer.jsx'
import Header from '../components/header/Header.jsx'
import styles from './MainLayout.module.css'

function MainLayout({ children }) {
    const location = useLocation()
    const bannerProps = getBannerProps(location.pathname)

    return (
        <div className={styles.appShell}>
            <Header />
            <div className={styles.mainSection}>
                <Banner {...bannerProps} />
                <main className={styles.appMain}>{children}</main>
            </div>
            <Footer />
        </div>
    )
}

function getBannerProps(pathname) {
    if (pathname === '/login' || pathname === '/register') {
        return { variant: 'auth' }
    }

    if (matchPath('/post/:postId', pathname) || pathname === '/write') {
        const now = new Date('2026-03-12T12:00:00')

        return {
            variant: 'post',
            postDay: String(now.getDate()).padStart(2, '0'),
            postMonth: `${now.toLocaleString('en-US', { month: 'short' }).toUpperCase()}.`,
            postWeekday: now.toLocaleString('en-US', { weekday: 'long' }).toUpperCase(),
        }
    }

    return { variant: 'primary' }
}

export default MainLayout
