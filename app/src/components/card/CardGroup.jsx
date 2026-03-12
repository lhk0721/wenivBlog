import Card from './Card'
import Styles from './CardGroup.module.css'

/**
 * 기사 목록을 렌더링하는 그룹 컴포넌트입니다.
 *
 * @param {Object} props
 * @param {Array} props.articleList 렌더링할 기사 객체들의 배열
 * @param {string|null} [props.activeCategoryName=null] 선택된 카테고리 이름
 * @returns {JSX.Element}
 */
export default function CardGroup({ articleList, activeCategoryName = null }) {
    const isEmpty = !Array.isArray(articleList) || articleList.length === 0

    return (
        <section className={Styles.recentPosts}>
            {isEmpty && (
                <article className={`${Styles.cardItem} ${Styles.fallbackCard}`.trim()}>
                    <p className={Styles.fallbackEyebrow}>No Posts Yet</p>
                    <h3 className={Styles.fallbackTitle}>
                        {activeCategoryName
                            ? `${activeCategoryName} 카테고리 글을 준비 중입니다.`
                            : '표시할 글이 아직 없습니다.'}
                    </h3>
                    <p className={Styles.fallbackDescription}>
                        {activeCategoryName
                            ? '다른 카테고리를 선택하거나 잠시 후 다시 확인해 주세요.'
                            : '새 글이 추가되면 이 영역에 카드가 표시됩니다.'}
                    </p>
                </article>
            )}
            {!isEmpty &&
                articleList.map((article, index) => {
                    return (
                        <div
                            key={article.id}
                            className={Styles.cardItem}
                            style={{ animationDelay: `${index * 0.06}s` }}
                        >
                            <Card article={article} />
                        </div>
                    )
                })}
        </section>
    )
}
