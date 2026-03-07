import PageContainer from '../../components/common/PageContainer.jsx'
import styles from './LoginPage.module.css'

function LoginPage() {
    return (
        <PageContainer title="Login" subtitle="계정에 로그인하세요">
            <section className={styles.page} />
        </PageContainer>
    )
}

export default LoginPage
