import { useEffect, useState } from 'react'
import About from '../../components/about/About.jsx'
import CardGroup from '../../components/card/CardGroup.jsx'
import { articles } from '../../data/mockContent.js'
import styles from './HomePage.module.css'

function HomePage() {
    const [visibleCount, setVisibleCount] = useState(6)
    const [activeCategory, setActiveCategory] = useState(null)

    const filteredArticles = activeCategory
        ? articles.filter((article) =>
              article.Categories?.some((category) => category.name === activeCategory.name),
          )
        : articles

    useEffect(() => {
        const handleScroll = () => {
            const viewportBottom = window.innerHeight + window.scrollY
            const documentHeight = document.documentElement.scrollHeight

            if (viewportBottom < documentHeight - 160) {
                return
            }

            setVisibleCount((currentCount) => {
                if (currentCount >= filteredArticles.length) {
                    return currentCount
                }

                return Math.min(currentCount + 3, filteredArticles.length)
            })
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [filteredArticles.length])

    useEffect(() => {
        setVisibleCount(6)
    }, [activeCategory])

    const handleCategorySelect = (category) => {
        setActiveCategory((currentCategory) =>
            currentCategory?.id === category.id ? null : category,
        )
    }

    return (
        <section className={styles.page}>
            <div className={styles.about}>
                <About
                    activeCategoryId={activeCategory?.id ?? null}
                    onCategorySelect={handleCategorySelect}
                />
            </div>
            <div className={styles.cards}>
                <CardGroup
                    articleList={filteredArticles.slice(0, visibleCount)}
                    activeCategoryName={activeCategory?.name ?? null}
                />
            </div>
        </section>
    )
}

export default HomePage
