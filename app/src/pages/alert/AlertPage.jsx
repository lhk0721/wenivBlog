import PageContainer from '../../components/common/PageContainer.jsx'
import styles from './AlertPage.module.css'

function AlertPage() {
    return (
        <PageContainer title="Alert" subtitle="시스템 알림">
            <section className={styles.page} />
        </PageContainer>
    )
}

export default AlertPage
