import Account from '../../components/Account/Account.jsx'
import pageShell from '../pageShell.module.css'
import styles from './LoginPage.module.css'

function LoginPage() {
    return (
        <section className={`${pageShell.page} ${styles.page}`.trim()}>
            <div className={`${pageShell.slot} ${pageShell.login}`.trim()}>
                <Account type="Login" />
            </div>
        </section>
    )
}

export default LoginPage
