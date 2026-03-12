import Card from './Card'
import Styles from './CardGroup.module.css'

/**
 * 기사 목록을 렌더링하는 그룹 컴포넌트입니다.
 *
 * @param {Object} props
 * @param {Array} props.articleList 렌더링할 기사 객체들의 배열
 * @param {string|null} [props.activeCategoryName=null] 선택된 카테고리 이름
 * @param {string} [props.emptyTitle]
 * @param {string} [props.emptyDescription]
 * @param {string} [props.searchQuery]
 * @param {boolean} [props.isLoading=false]
 * @returns {JSX.Element}
 */
export default function CardGroup({
    articleList,
    activeCategoryName = null,
    emptyTitle = '아직 작성된 글이 없습니다.',
    emptyDescription = '새 글이 추가되면 이 영역에 카드가 표시됩니다.',
    searchQuery = '',
    isLoading = false,
}) {
    const isEmpty = !Array.isArray(articleList) || articleList.length === 0

    return (
        <section className={Styles.recentPosts}>
            {isLoading && (
                <article className={`${Styles.cardItem} ${Styles.fallbackCard}`.trim()}>
                    <p className={Styles.fallbackEyebrow}>Loading</p>
                    <h3 className={Styles.fallbackTitle}>게시글을 불러오는 중입니다.</h3>
                    <p className={Styles.fallbackDescription}>잠시만 기다려 주세요.</p>
                </article>
            )}
            {!isLoading && isEmpty && (
                <article className={`${Styles.cardItem} ${Styles.fallbackCard}`.trim()}>
                    <p className={Styles.fallbackEyebrow}>No Posts Yet</p>
                    <h3 className={Styles.fallbackTitle}>
                        {activeCategoryName
                            ? `${activeCategoryName} 카테고리 글을 준비 중입니다.`
                            : emptyTitle}
                    </h3>
                    <p className={Styles.fallbackDescription}>
                        {activeCategoryName
                            ? '다른 카테고리를 선택하거나 잠시 후 다시 확인해 주세요.'
                            : emptyDescription}
                    </p>
                </article>
            )}
            {!isLoading && !isEmpty &&
                articleList.map((article, index) => {
                    return (
                        <div
                            key={article.id}
                            className={Styles.cardItem}
                            style={{ animationDelay: `${index * 0.06}s` }}
                        >
                            <Card article={article} searchQuery={searchQuery} />
                        </div>
                    )
                })}
        </section>
    )
}
