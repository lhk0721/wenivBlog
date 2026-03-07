import PageContainer from '../../components/common/PageContainer.jsx'
import styles from './MyPage.module.css'

function MyPage() {
    return (
        <PageContainer title="Mypage" subtitle="프로필과 작성 글 관리">
            <section className={styles.page} />
        </PageContainer>
    )
}

export default MyPage
