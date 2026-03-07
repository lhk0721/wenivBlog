import PageContainer from '../../components/common/PageContainer.jsx'
import styles from './HomePage.module.css'

function HomePage() {
    return (
        <PageContainer title="Home" subtitle="최근 게시글">
            <section className={styles.page} />
        </PageContainer>
    )
}

export default HomePage
