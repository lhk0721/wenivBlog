import Account from '../../components/Account/Account.jsx'
import Seo from '../../seo/Seo.jsx'
import pageShell from '../pageShell.module.css'
import styles from './MyPage.module.css'

function MyPage() {
    return (
        <section className={`${pageShell.page} ${styles.page}`.trim()}>
            <Seo title="마이페이지" description="내 계정 정보를 관리하는 페이지입니다." path="/mypage" noindex />
            <div className={`${pageShell.slot} ${pageShell.account}`.trim()}>
                <Account type="Mypage" />
            </div>
        </section>
    )
}

export default MyPage
