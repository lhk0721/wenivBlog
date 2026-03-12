import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ContentLayout from '../../components/content-layout/ContentLayout.jsx'
import Post from '../../components/post/Post.jsx'
import { deleteBlog, getBlogDetail } from '../../api/blog.js'
import { useAlert } from '../../contexts/AlertContext.jsx'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { PATHS } from '../../routes/paths.js'
import { mapBlogDetail } from '../../utils/blogAdapter.js'
import { canManagePost } from '../../utils/postAuthorization.js'
import pageShell from '../pageShell.module.css'
import styles from './PostViewPage.module.css'

function PostViewPage() {
    const { postId } = useParams()
    const navigate = useNavigate()
    const { alert, confirm } = useAlert()
    const { currentUser } = useAuth()
    const [article, setArticle] = useState(null)
    const canEditPost = canManagePost({
        authorName: article?.authorName,
        currentUser,
    })

    const ensurePostAccess = async () => {
        const hasAccess = canManagePost({
            authorName: article?.authorName,
            currentUser,
        })

        if (hasAccess) {
            return true
        }

        await alert({
            alertTitle: '수정/삭제 권한이 없습니다.',
            alertContents: '게시글 author와 Auth 토큰 정보가 일치할 때만 수정하거나 삭제할 수 있습니다.',
            confirmText: '확인',
            confirmVariant: 'solid-negative',
        })
        return false
    }

    useEffect(() => {
        let isMounted = true

        const fetchPost = async () => {
            try {
                const response = await getBlogDetail(postId)

                if (!isMounted) {
                    return
                }

                setArticle(mapBlogDetail(response))
            } catch (error) {
                if (!isMounted) {
                    return
                }

                setArticle(null)
                await alert({
                    alertTitle: '게시글을 불러오지 못했습니다.',
                    alertContents: error.message,
                    confirmText: '확인',
                    confirmVariant: 'solid-negative',
                })
            }
        }

        if (postId) {
            fetchPost()
        }

        return () => {
            isMounted = false
        }
    }, [alert, postId])

    const handleEdit = () => {
        if (!postId) {
            return
        }

        ensurePostAccess().then((hasAccess) => {
            if (!hasAccess) {
                return
            }

            navigate(`${PATHS.POST_WRITE}?postId=${postId}`)
        })
    }

    const handleDelete = async () => {
        if (!postId) {
            return
        }

        const hasAccess = await ensurePostAccess()

        if (!hasAccess) {
            return
        }

        const shouldDelete = await confirm({
            alertTitle: '게시글을 삭제하시겠습니까?',
            alertContents: '삭제 후에는 복구할 수 없습니다.',
            confirmText: '삭제',
            cancelText: '취소',
        })

        if (!shouldDelete) {
            return
        }

        try {
            await deleteBlog(postId)
            await alert({
                alertTitle: '게시글이 삭제되었습니다.',
                alertContents: '목록 페이지로 이동합니다.',
                confirmText: '확인',
                confirmVariant: 'solid-primary',
            })
            navigate(PATHS.HOME)
        } catch (error) {
            await alert({
                alertTitle: '게시글을 삭제하지 못했습니다.',
                alertContents: error.message,
                confirmText: '확인',
                confirmVariant: 'solid-negative',
            })
        }
    }

    return (
        <section className={`${pageShell.page} ${styles.page}`.trim()}>
            <div className={`${pageShell.slot} ${pageShell.content}`.trim()}>
                <ContentLayout onBackClick={() => navigate(-1)}>
                    <Post
                        article={article}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        showActions={canEditPost}
                    />
                </ContentLayout>
            </div>
        </section>
    )
}

export default PostViewPage
