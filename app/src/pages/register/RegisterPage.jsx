import Account from '../../components/Account/Account.jsx'
import pageShell from '../pageShell.module.css'
import styles from './RegisterPage.module.css'

function RegisterPage() {
    return (
        <section className={`${pageShell.page} ${styles.page}`.trim()}>
            <div className={`${pageShell.slot} ${pageShell.account}`.trim()}>
                <Account type="Register" />
            </div>
        </section>
    )
}

export default RegisterPage
