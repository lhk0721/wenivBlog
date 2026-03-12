import Card from './Card'
import Styles from './CardGroup.module.css'

/**
 * 기사 목록을 렌더링하는 그룹 컴포넌트입니다.
 *
 * @param {Object} props
 * @param {Array} props.articleList 렌더링할 기사 객체들의 배열
 * @returns {JSX.Element}
 */
export default function CardGroup({ articleList }) {
    const isEmpty = !Array.isArray(articleList) || articleList.length === 0

    return (
        <section className={Styles.recentPosts}>
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
