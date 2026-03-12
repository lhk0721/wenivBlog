import { useEffect, useState } from 'react'
import About from '../../components/about/About.jsx'
import CardGroup from '../../components/card/CardGroup.jsx'
import { articles } from '../../data/mockContent.js'
import styles from './HomePage.module.css'

function HomePage() {
    const [visibleCount, setVisibleCount] = useState(6)

    useEffect(() => {
        const handleScroll = () => {
            const viewportBottom = window.innerHeight + window.scrollY
            const documentHeight = document.documentElement.scrollHeight

            if (viewportBottom < documentHeight - 160) {
                return
            }

            setVisibleCount((currentCount) => {
                if (currentCount >= articles.length) {
                    return currentCount
                }

                return Math.min(currentCount + 3, articles.length)
            })
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <section className={styles.page}>
            <div className={styles.about}>
                <About />
            </div>
            <div className={styles.cards}>
                <CardGroup articleList={articles.slice(0, visibleCount)} />
            </div>
        </section>
    )
}

export default HomePage
