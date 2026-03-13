import Account from '../../components/Account/Account.jsx'
import Seo from '../../seo/Seo.jsx'
import pageShell from '../pageShell.module.css'
import styles from './LoginPage.module.css'

function LoginPage() {
    return (
        <section className={`${pageShell.page} ${styles.page}`.trim()}>
            <Seo title="로그인" description="블로그 로그인 페이지입니다." path="/login" noindex />
            <div className={`${pageShell.slot} ${pageShell.login}`.trim()}>
                <Account type="Login" />
            </div>
        </section>
    )
}

export default LoginPage
