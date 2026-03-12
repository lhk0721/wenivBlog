import { useNavigate, useParams } from 'react-router-dom'
import ContentLayout from '../../components/content-layout/ContentLayout.jsx'
import Post from '../../components/post/Post.jsx'
import { featuredPost } from '../../data/mockContent.js'
import pageShell from '../pageShell.module.css'
import styles from './PostViewPage.module.css'

function PostViewPage() {
    const { postId } = useParams()
    const navigate = useNavigate()

    return (
        <section className={`${pageShell.page} ${styles.page}`.trim()}>
            <div className={`${pageShell.slot} ${pageShell.content}`.trim()}>
                <ContentLayout onBackClick={() => navigate(-1)}>
                    <Post article={{ ...featuredPost, id: postId ?? featuredPost.id }} />
                </ContentLayout>
            </div>
        </section>
    )
}

export default PostViewPage
