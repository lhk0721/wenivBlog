import { useParams } from 'react-router-dom'
import PageContainer from '../../components/common/PageContainer.jsx'
import styles from './PostViewPage.module.css'

function PostViewPage() {
    const { postId } = useParams()

    return (
        <PageContainer title="Post View" subtitle={`게시글 #${postId}`}>
            <section className={styles.page} />
        </PageContainer>
    )
}

export default PostViewPage
