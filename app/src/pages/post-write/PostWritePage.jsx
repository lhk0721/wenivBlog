import PageContainer from '../../components/common/PageContainer.jsx'
import styles from './PostWritePage.module.css'

function PostWritePage() {
    return (
        <PageContainer title="Post Write" subtitle="게시글 작성">
            <section className={styles.page} />
        </PageContainer>
    )
}

export default PostWritePage
