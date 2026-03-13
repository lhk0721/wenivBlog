import { useEffect, useMemo, useState } from 'react'
import About from '../../components/about/About.jsx'
import CardGroup from '../../components/card/CardGroup.jsx'
import { getBlogList } from '../../api/blog.js'
import Seo from '../../seo/Seo.jsx'
import { mapBlogSummary } from '../../utils/blogAdapter.js'
import { matchesSearchQuery } from '../../utils/search.js'
import styles from './HomePage.module.css'
import { useAlert } from '../../contexts/AlertContext.jsx'

function HomePage() {
    const { alert } = useAlert()
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [visibleCount, setVisibleCount] = useState(6)
    const [activeCategory, setActiveCategory] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')

    useEffect(() => {
        let isMounted = true

        const fetchBlogs = async () => {
            try {
                const response = await getBlogList()

                if (!isMounted) {
                    return
                }

                setArticles(Array.isArray(response) ? response.map(mapBlogSummary) : [])
            } catch (error) {
                if (!isMounted) {
                    return
                }

                setArticles([])
                await alert({
                    alertTitle: '게시글 목록을 불러오지 못했습니다.',
                    alertContents: error.message,
                    confirmText: '확인',
                    confirmVariant: 'solid-negative',
                })
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        fetchBlogs()

        return () => {
            isMounted = false
        }
    }, [alert])

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setDebouncedSearchQuery(searchQuery)
        }, 200)

        return () => {
            window.clearTimeout(timeoutId)
        }
    }, [searchQuery])

    const categories = useMemo(() => {
        const map = new Map()

        articles.forEach((article) => {
            article.Categories?.forEach((category) => {
                map.set(category.id, category)
            })
        })

        return Array.from(map.values())
    }, [articles])

    const normalizedSearchQuery = debouncedSearchQuery.trim().toLowerCase()
    const filteredArticles = articles.filter((article) => {
        const matchesCategory = activeCategory
            ? article.Categories?.some((category) => category.name === activeCategory.name)
            : true
        const matchesSearch = matchesSearchQuery(
            [article.title, article.authorName, article.description],
            normalizedSearchQuery,
        )

        return matchesCategory && matchesSearch
    })

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
    }, [activeCategory, normalizedSearchQuery])

    const emptyTitle = articles.length === 0
        ? '아직 작성된 글이 없습니다.'
        : normalizedSearchQuery
            ? '검색 결과가 없습니다.'
            : '아직 작성된 글이 없습니다.'
    const emptyDescription = normalizedSearchQuery
        ? '제목, 작성자, 내용 검색어를 다시 확인해 주세요.'
        : '새 글이 추가되면 이 영역에 카드가 표시됩니다.'

    const handleCategorySelect = (category) => {
        setActiveCategory((currentCategory) =>
            currentCategory?.id === category.id ? null : category,
        )
    }

    return (
        <section className={styles.page}>
            <Seo
                title="홈"
                description="최신 게시글, 카테고리, 작성자 정보를 탐색할 수 있는 개인 블로그 메인 페이지입니다."
                path="/"
                type="website"
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'CollectionPage',
                    name: 'My BLOG',
                    description: '기록과 기술, 일상의 관찰을 차곡차곡 쌓아가는 개인 블로그입니다.',
                    inLanguage: 'ko-KR',
                }}
            />
            <h1 className="sr-only">My BLOG 홈</h1>
            <div className={styles.about}>
                <About
                    activeCategoryId={activeCategory?.id ?? null}
                    categories={categories}
                    onCategorySelect={handleCategorySelect}
                />
            </div>
            <div className={styles.cards}>
                <section className={styles.searchPanel} aria-label="게시글 검색">
                    <label className={styles.searchLabel} htmlFor="home-search">POST SEARCH</label>
                    <input
                        id="home-search"
                        type="search"
                        className={styles.searchInput}
                        placeholder="제목, 작성자, 내용으로 검색"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                    />
                </section>
                <CardGroup
                    articleList={isLoading ? [] : filteredArticles.slice(0, visibleCount)}
                    activeCategoryName={activeCategory?.name ?? null}
                    emptyTitle={emptyTitle}
                    emptyDescription={emptyDescription}
                    searchQuery={normalizedSearchQuery}
                    isLoading={isLoading}
                />
            </div>
        </section>
    )
}

export default HomePage
