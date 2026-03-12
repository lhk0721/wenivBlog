import { useNavigate } from 'react-router-dom'
import ContentLayout from '../../components/content-layout/ContentLayout.jsx'
import Write from '../../components/write/Write.jsx'
import pageShell from '../pageShell.module.css'
import styles from './PostWritePage.module.css'

function PostWritePage() {
    const navigate = useNavigate()

    return (
        <section className={`${pageShell.page} ${styles.page}`.trim()}>
            <div className={`${pageShell.slot} ${pageShell.content}`.trim()}>
                <ContentLayout onBackClick={() => navigate(-1)}>
                    <Write />
                </ContentLayout>
            </div>
        </section>
    )
}

export default PostWritePage
