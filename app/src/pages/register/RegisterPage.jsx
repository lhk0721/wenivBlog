import Account from '../../components/Account/Account.jsx'
import Seo from '../../seo/Seo.jsx'
import pageShell from '../pageShell.module.css'
import styles from './RegisterPage.module.css'

function RegisterPage() {
    return (
        <section className={`${pageShell.page} ${styles.page}`.trim()}>
            <Seo title="회원가입" description="블로그 회원가입 페이지입니다." path="/register" noindex />
            <div className={`${pageShell.slot} ${pageShell.account}`.trim()}>
                <Account type="Register" />
            </div>
        </section>
    )
}

export default RegisterPage
