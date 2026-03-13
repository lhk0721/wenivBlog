import Author from '../author/Author'
import Button from '../buttons/Button'
import Categories from '../categories/Categories'
import Styles from './Post.module.css'
import modify from '../../assets/icons/icon-modify.svg'
import activeModify from '../../assets/icons/icon-modify-white.svg'
import _delete from '../../assets/icons/icon-delete-white.svg'
import activeDelete from '../../assets/icons/icon-delete-white-1.svg'
import fallbackThumbnail1 from '../../assets/images/post-img1.png'
import fallbackThumbnail2 from '../../assets/images/post-img2.png'
import fallbackThumbnail3 from '../../assets/images/post-img3.png'
import fallbackThumbnail4 from '../../assets/images/post-img4.png'
import fallbackThumbnail5 from '../../assets/images/post-img5.png'
import fallbackThumbnail6 from '../../assets/images/post-img6.png'

const fallbackThumbnails = [
    fallbackThumbnail1,
    fallbackThumbnail2,
    fallbackThumbnail3,
    fallbackThumbnail4,
    fallbackThumbnail5,
    fallbackThumbnail6,
]

function resolveFallbackThumbnail(seedValue) {
    const seed = String(seedValue ?? '')
    const total = fallbackThumbnails.length
    const hash = Array.from(seed).reduce((sum, character) => sum + character.charCodeAt(0), 0)
    return fallbackThumbnails[hash % total]
}

/**
 * @typedef {Object} PostContentItem
 * @property {number|string} id
 * @property {'text' | 'image'} type
 * @property {string} [content]
 * @property {string} [src]
 * @property {string} [alt]
 */

/**
 * @typedef {Object} PostArticle
 * @property {number|string} [id]
 * @property {string} [dateString]
 * @property {string} [title]
 * @property {string} [authorName]
 * @property {string} [thumbnail]
 * @property {{ id: number|string, name: string }[]} [Categories]
 * @property {PostContentItem[]} [userContents]
 */

/**
 * 단일 게시글 상세 본문을 렌더링합니다.
 *
 * @param {{ article?: PostArticle, onEdit?: () => void, onDelete?: () => void, showActions?: boolean }} props
 * @returns {JSX.Element}
 */
export default function Post({ article, onEdit, onDelete, showActions = false }){
    const userContents = article?.userContents ?? []
    const categories = article?.Categories ?? []
    const dateString = article?.dateString
    const authorName = article?.authorName
    const title = article?.title ?? '제목이 없는 게시글입니다.'
    const hasArticle = Boolean(article)
    const resolvedThumbnail = article?.thumbnail || resolveFallbackThumbnail(article?.id ?? title)
    const actions = (
        <>
            <Button
                size={'sm'}
                variant={'subtle-primary'}
                icon={modify}
                activeIcon={activeModify}
                onClick={onEdit}
            />
            <Button
                size={'sm'}
                variant={'subtle-negative'}
                icon={_delete}
                activeIcon={activeDelete}
                onClick={onDelete}
            />
        </>
    )

    return(
        <article className={Styles.container}>
            <header className={Styles.header}>
                {dateString ? (
                    <Author
                        dateString={dateString}
                        authorName={authorName}
                    />
                ) : (
                    <div />
                )}
                <div className={Styles.action}>
                    {showActions && actions}
                </div>
            </header>

            {categories.length > 0 && (
                <Categories
                    categories={categories}
                    theme='positive'
                    className={Styles.categories}
                />
            )}

            <div className={Styles.main}>
                {hasArticle && (
                    <img
                        src={resolvedThumbnail}
                        alt={title}
                        className={Styles.thumbnail}
                        onError={(event) => {
                            if (event.currentTarget.dataset.fallbackApplied === 'true') {
                                return
                            }

                            event.currentTarget.dataset.fallbackApplied = 'true'
                            event.currentTarget.src = resolveFallbackThumbnail(article?.id ?? title)
                        }}
                    />
                )}
                <h1 className={Styles.title}>{title}</h1>
            </div>

            <hr className={Styles.divider} />

            {!hasArticle && (
                <p className={Styles.contentText}>
                    표시할 게시글 데이터가 아직 없습니다.
                </p>
            )}
            {hasArticle && userContents.length === 0 && (
                <p className={Styles.contentText}>
                    본문 내용이 아직 없습니다.
                </p>
            )}
            {userContents.map((content) => {
                if (content.type === 'image') {
                    return (
                        <img
                            key={content.id}
                            src={content.src}
                            alt={content.alt ?? '본문 이미지'}
                            className={Styles.contentImage}
                        />
                    )
                }

                return (
                    <p key={content.id} className={Styles.contentText}>
                        {content.content}
                    </p>
                )
            })}
        </article>
    )
}
