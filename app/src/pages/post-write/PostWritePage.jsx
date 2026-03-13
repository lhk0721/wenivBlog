import { useNavigate, useSearchParams } from 'react-router-dom'
import ContentLayout from '../../components/content-layout/ContentLayout.jsx'
import Write from '../../components/write/Write.jsx'
import Seo from '../../seo/Seo.jsx'
import pageShell from '../pageShell.module.css'
import styles from './PostWritePage.module.css'

function PostWritePage() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const postId = searchParams.get('postId')

    return (
        <section className={`${pageShell.page} ${styles.page}`.trim()}>
            <Seo
                title={postId ? '게시글 수정' : '게시글 작성'}
                description="블로그 게시글 작성 및 수정 페이지입니다."
                path="/write"
                noindex
            />
            <div className={`${pageShell.slot} ${pageShell.content}`.trim()}>
                <ContentLayout onBackClick={() => navigate(-1)}>
                    <Write postId={postId} />
                </ContentLayout>
            </div>
        </section>
    )
}

export default PostWritePage
