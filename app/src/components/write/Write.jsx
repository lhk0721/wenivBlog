import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Styles from './Write.module.css'
import Button from '../buttons/Button'
import _delete from '../../assets/icons/icon-delete-white.svg'
import activeDelete from '../../assets/icons/icon-delete-white-1.svg'
import save from '../../assets/icons/icon-save.svg'
import activeSave from '../../assets/icons/icon-save-white.svg'
import { createBlog, getBlogDetail, getBlogList, updateBlog } from '../../api/blog.js'
import { useAlert } from '../../contexts/AlertContext.jsx'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { getPostViewPath, PATHS } from '../../routes/paths.js'
import { canManagePost } from '../../utils/postAuthorization.js'
import { generateExercisePost } from '../../utils/exercisePostGenerator.js'
import { resolveRoutePostId } from '../../utils/postId.js'

/**
 * 게시글 작성용 에디터 UI를 렌더링합니다.
 *
 * @param {{ postId?: string | null }} props
 * @returns {JSX.Element}
 */
export default function Write({ postId }) {
    const navigate = useNavigate()
    const { alert, confirm } = useAlert()
    const { currentUser } = useAuth()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [summaryJson, setSummaryJson] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isGeneratingDraft, setIsGeneratingDraft] = useState(false)
    const [postAuthorName, setPostAuthorName] = useState('')
    const isEditMode = Boolean(postId)
    const isPublishEnabled = title.trim().length > 0 && content.trim().length > 0 && !isSubmitting

    const ensureEditAccess = async (authorName) => {
        const hasAccess = canManagePost({
            authorName,
            currentUser,
        })

        if (hasAccess) {
            return true
        }

        await alert({
            alertTitle: '게시글을 수정할 수 없습니다.',
            alertContents: '게시글 author와 Auth 토큰 정보가 일치하지 않습니다.',
            confirmText: '확인',
            confirmVariant: 'solid-negative',
        })
        return false
    }

    useEffect(() => {
        let isMounted = true

        const fetchPost = async () => {
            if (!postId) {
                return
            }

            try {
                const response = await getBlogDetail(postId)

                if (!isMounted) {
                    return
                }

                setTitle(response?.title ?? '')
                setContent(response?.content ?? '')
                setPostAuthorName(response?.author ?? '')

                const hasAccess = canManagePost({
                    authorName: response?.author,
                    currentUser,
                })

                if (!hasAccess) {
                    await alert({
                        alertTitle: '게시글을 수정할 수 없습니다.',
                        alertContents: '게시글 author와 Auth 토큰 정보가 일치하지 않습니다.',
                        confirmText: '확인',
                        confirmVariant: 'solid-negative',
                    })
                    navigate(getPostViewPath(postId))
                }
            } catch (error) {
                if (!isMounted) {
                    return
                }

                await alert({
                    alertTitle: '수정할 게시글을 불러오지 못했습니다.',
                    alertContents: error.message,
                    confirmText: '확인',
                    confirmVariant: 'solid-negative',
                })
                navigate(PATHS.HOME)
            }
        }

        fetchPost()

        return () => {
            isMounted = false
        }
    }, [alert, currentUser, navigate, postId])

    const handleDeleteDraft = async () => {
        const shouldReset = await confirm({
            alertTitle: isEditMode ? '수정을 취소하시겠습니까?' : '작성 중인 내용을 비울까요?',
            alertContents: isEditMode
                ? '불러온 게시글을 다시 보려면 상세 페이지에서 들어와야 합니다.'
                : '제목과 본문 입력값이 모두 초기화됩니다.',
            confirmText: '초기화',
            cancelText: '취소',
        })

        if (!shouldReset) {
            return
        }

        setTitle('')
        setContent('')
    }

    const handleSave = async () => {
        const trimmedTitle = title.trim()
        const trimmedContent = content.trim()
        const resolvedAuthor = String(currentUser?.name ?? currentUser?.username ?? '').trim()
        const resolvedEmail = String(currentUser?.email ?? '').trim()
        const blogPayload = {
            title: trimmedTitle,
            content: trimmedContent,
            author: resolvedAuthor,
            email: resolvedEmail,
        }

        if (!trimmedTitle || !trimmedContent) {
            await alert({
                alertTitle: '제목과 본문을 입력해 주세요.',
                alertContents: 'API 요청 전 필수값을 확인했습니다.',
                confirmText: '확인',
                confirmVariant: 'solid-negative',
            })
            return
        }

        if (!resolvedAuthor) {
            await alert({
                alertTitle: '로그인 사용자 정보를 확인할 수 없습니다.',
                alertContents: '다시 로그인한 뒤 게시글을 저장해 주세요.',
                confirmText: '확인',
                confirmVariant: 'solid-negative',
            })
            return
        }

        setIsSubmitting(true)

        try {
            if (isEditMode) {
                const hasAccess = await ensureEditAccess(postAuthorName)

                if (!hasAccess) {
                    return
                }

                await updateBlog(postId, blogPayload)
            } else {
                await createBlog(blogPayload)
            }

            await alert({
                alertTitle: isEditMode ? '게시글이 수정되었습니다.' : '게시글이 등록되었습니다.',
                alertContents: isEditMode
                    ? '상세 페이지로 이동합니다.'
                    : '목록 페이지로 이동합니다.',
                confirmText: '확인',
                confirmVariant: 'solid-primary',
            })

            if (isEditMode) {
                navigate(getPostViewPath(postId))
                return
            }

            const blogs = await getBlogList()
            const createdBlog = Array.isArray(blogs)
                ? [...blogs]
                    .reverse()
                    .find((blog) =>
                        String(blog?.title ?? '').trim() === trimmedTitle
                        && String(blog?.content ?? '').trim() === trimmedContent,
                    )
                : null
            const createdPostId = resolveRoutePostId(createdBlog)

            navigate(createdPostId ? getPostViewPath(createdPostId) : PATHS.HOME)
        } catch (error) {
            await alert({
                alertTitle: isEditMode ? '게시글을 수정하지 못했습니다.' : '게시글을 저장하지 못했습니다.',
                alertContents: error.message,
                confirmText: '확인',
                confirmVariant: 'solid-negative',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleGenerateDraft = async () => {
        if (!summaryJson.trim()) {
            await alert({
                alertTitle: 'summary JSON을 입력해 주세요.',
                alertContents: '운동 분석용 JSON이 있어야 초안을 생성할 수 있습니다.',
                confirmText: '확인',
                confirmVariant: 'solid-negative',
            })
            return
        }

        setIsGeneratingDraft(true)

        try {
            const draft = generateExercisePost(summaryJson)
            setTitle(draft.title)
            setContent(draft.content)

            await alert({
                alertTitle: '운동 분석 초안을 생성했습니다.',
                alertContents: '제목과 본문에 자동 반영되었습니다. 발행 전 문장을 다듬어 주세요.',
                confirmText: '확인',
                confirmVariant: 'solid-primary',
            })
        } catch (error) {
            await alert({
                alertTitle: '초안 생성에 실패했습니다.',
                alertContents: error instanceof Error ? error.message : 'JSON 형식을 다시 확인해 주세요.',
                confirmText: '확인',
                confirmVariant: 'solid-negative',
            })
        } finally {
            setIsGeneratingDraft(false)
        }
    }

    return(
        <section className={Styles.container}>
            <section className={Styles.generatorPanel}>
                <div className={Styles.generatorHeader}>
                    <div>
                        <p className={Styles.generatorEyebrow}>Exercise Summary</p>
                        <h2 className={Styles.generatorTitle}>JSON에서 종합 글 초안 생성</h2>
                    </div>
                    <Button
                        variant='solid-primary'
                        size='md'
                        text={isGeneratingDraft ? '생성 중...' : '초안 생성'}
                        onClick={handleGenerateDraft}
                        disabled={isGeneratingDraft || isSubmitting}
                    />
                </div>
                <p className={Styles.generatorDescription}>
                    `docs/backSquat/backSquat-summary.json` 같은 summary JSON을 붙여넣으면
                    분석, 요약, 역학 정보, 개선점, 위험 요인, 스트렝스/근비대 관점까지 포함한 본문 초안을 만듭니다.
                </p>
                <textarea
                    name="summaryJson"
                    className={Styles.summaryTextarea}
                    placeholder='summary JSON을 여기에 붙여넣으세요.'
                    value={summaryJson}
                    onChange={(event) => setSummaryJson(event.target.value)}
                />
            </section>
            <header className={Styles.header}>
                <input 
                    type="text" 
                    className={Styles.titleInput}
                    placeholder='Title'
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <div className={Styles.headerActions}>
                    <Button
                        size={'sm'}
                        variant={'subtle-negative'}
                        icon={_delete}
                        activeIcon={activeDelete}
                        onClick={handleDeleteDraft}
                    />
                    <Button
                        variant = 'primary'
                        size = 'md'
                        text = {isSubmitting ? '발행 중...' : '발행'}
                        icon = {save}
                        activeIcon={activeSave}
                        onClick={handleSave}
                        disabled={!isPublishEnabled}
                    />
                </div>
            </header>
            <hr className={Styles.divider} />

            <textarea 
                name="content"
                className={Styles.contentTextarea}
                placeholder='Tell your story...'
                value={content}
                onChange={(event) => setContent(event.target.value)}
            />
        </section>
    )
}
