import { NavLink } from 'react-router-dom'
import { PATHS } from '../routes/paths.js'
import styles from './MainLayout.module.css'

function MainLayout({ children }) {
    return (
        <div className={styles.appShell}>
            <header className={styles.appHeader}>
                <div className={styles.brand}>Winiv Blog</div>
                <nav className={styles.mainNav} aria-label="주요 메뉴">
                    <NavLink
                        to={PATHS.HOME}
                        className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`.trim()}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to={PATHS.LOGIN}
                        className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`.trim()}
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to={PATHS.REGISTER}
                        className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`.trim()}
                    >
                        Register
                    </NavLink>
                    <NavLink
                        to={PATHS.MYPAGE}
                        className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`.trim()}
                    >
                        Mypage
                    </NavLink>
                    <NavLink
                        to={PATHS.POST_WRITE}
                        className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`.trim()}
                    >
                        Write
                    </NavLink>
                    <NavLink
                        to={PATHS.ALERT}
                        className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`.trim()}
                    >
                        Alert
                    </NavLink>
                </nav>
            </header>
            <main className={styles.appMain}>{children}</main>
        </div>
    )
}

export default MainLayout
