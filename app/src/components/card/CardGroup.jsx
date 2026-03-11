import Card from './Card'
import Styles from './CardGroup.module.css'

export default function CardGroup({ articleList }) {
    const isEmpty = !Array.isArray(articleList) || articleList.length === 0

    return (
        <section className={Styles.recentPosts}>
            {!isEmpty &&
                articleList.map((article) => {
                    return (
                        <Card
                            key={article.id}
                            article={article}
                        />
                    )
                })}
        </section>
    )
}
