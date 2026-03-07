import { NavLink } from 'react-router-dom'
import { PATHS } from '../routes/paths.js'

function MainLayout({ children }) {
    return (
        <div className="app-shell">
            <header className="app-header">
                <div className="brand">Winiv Blog</div>
                <nav className="main-nav" aria-label="주요 메뉴">
                    <NavLink to={PATHS.HOME}>Home</NavLink>
                    <NavLink to={PATHS.LOGIN}>Login</NavLink>
                    <NavLink to={PATHS.REGISTER}>Register</NavLink>
                    <NavLink to={PATHS.MYPAGE}>Mypage</NavLink>
                    <NavLink to={PATHS.POST_WRITE}>Write</NavLink>
                    <NavLink to={PATHS.ALERT}>Alert</NavLink>
                </nav>
            </header>
            <main className="app-main">{children}</main>
        </div>
    )
}

export default MainLayout
