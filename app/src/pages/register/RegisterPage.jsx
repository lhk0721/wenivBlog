import PageContainer from '../../components/common/PageContainer.jsx'
import styles from './RegisterPage.module.css'

function RegisterPage() {
    return (
        <PageContainer title="Register" subtitle="새 계정을 생성하세요">
            <section className={styles.page} />
        </PageContainer>
    )
}

export default RegisterPage
