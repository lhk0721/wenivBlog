import Account from '../../components/Account/Account.jsx'
import pageShell from '../pageShell.module.css'
import styles from './MyPage.module.css'

function MyPage() {
    return (
        <section className={`${pageShell.page} ${styles.page}`.trim()}>
            <div className={`${pageShell.slot} ${pageShell.account}`.trim()}>
                <Account type="Mypage" />
            </div>
        </section>
    )
}

export default MyPage
