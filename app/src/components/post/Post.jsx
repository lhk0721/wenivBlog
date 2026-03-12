import Author from '../author/Author'
import Button from '../buttons/Button'
import Categories from '../categories/Categories'
import Styles from './Post.module.css'
import modify from '../../assets/icons/icon-modify.svg'
import activeModify from '../../assets/icons/icon-modify-white.svg'
import _delete from '../../assets/icons/icon-delete-white.svg'
import activeDelete from '../../assets/icons/icon-delete-white-1.svg'

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
 * @property {string} [dateString]
 * @property {string} [title]
 * @property {{ id: number|string, name: string }[]} [Categories]
 * @property {PostContentItem[]} [userContents]
 */

/**
 * 단일 게시글 상세 본문을 렌더링합니다.
 *
 * @param {{ article?: PostArticle }} props
 * @returns {JSX.Element}
 */
export default function Post({ article }){
    const userContents = article?.userContents ?? []
    const categories = article?.Categories ?? []
    const dateString = article?.dateString
    const title = article?.title ?? '제목이 없는 게시글입니다.'
    const hasArticle = Boolean(article)
    const actions = (
        <>
            <Button
                size={'sm'}
                variant={'subtle-primary'}
                icon={modify}
                activeIcon={activeModify}
            />
            <Button
                size={'sm'}
                variant={'subtle-negative'}
                icon={_delete}
                activeIcon={activeDelete}
            />
        </>
    )

    return(
        <div className={Styles.container}>
            <header className={Styles.header}>
                {dateString ? (
                    <Author dateString={dateString} />
                ) : (
                    <div />
                )}
                <div className={Styles.action}>
                    {actions}
                </div>
            </header>

            {categories.length > 0 && (
                <Categories
                    categories={categories}
                    theme='positive'
                    className={Styles.categories}
                />
            )}

            <main className={Styles.main}>
                <h2 className={Styles.title}>{title}</h2>
            </main>

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
        </div>
    )
}
