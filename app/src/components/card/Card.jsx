import Author from '../author/Author'
import Categories from '../categories/Categories'
import { useNavigate } from 'react-router-dom'
import { getPostViewPath } from '../../routes/paths.js'
import fallbackThumbnail1 from '../../assets/images/post-img1.png'
import fallbackThumbnail2 from '../../assets/images/post-img2.png'
import fallbackThumbnail3 from '../../assets/images/post-img3.png'
import fallbackThumbnail4 from '../../assets/images/post-img4.png'
import fallbackThumbnail5 from '../../assets/images/post-img5.png'
import fallbackThumbnail6 from '../../assets/images/post-img6.png'
import { getHighlightPattern } from '../../utils/search.js'
import Styles from './Card.module.css'

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

function renderHighlightedText(value, keyword) {
    const normalizedValue = String(value ?? '')
    const pattern = getHighlightPattern(keyword)

    if (!pattern) {
        return normalizedValue
    }

    const tokens = normalizedValue.split(pattern)

    return tokens.map((token, index) => (
        token.search(pattern) !== -1
            ? <mark key={`${token}-${index}`} className={Styles.highlight}>{token}</mark>
            : <span key={`${token}-${index}`}>{token}</span>
    ))
}

/**
 * @typedef {Object} CardArticle
 * @property {number|string} [id]
 * @property {string} thumbnail 썸네일 이미지 경로
 * @property {string} title 게시글 제목
 * @property {string} [dateString] 게시 날짜
 * @property {{ id: number|string, name: string }[]} [Categories] 카테고리 목록
 * @property {string} [description] 게시글 요약
 */

/**
 * 게시글 카드 하나를 렌더링합니다.
 *
 * @param {{ article: CardArticle, searchQuery?: string }} props
 * @returns {JSX.Element}
 */
export default function Card({article, searchQuery = ''}){
    const navigate = useNavigate()
    const categories = Array.isArray(article?.Categories) ? article.Categories : []
    const resolvedThumbnail = article?.thumbnail || resolveFallbackThumbnail(article?.id)

    const handleOpenPost = () => {
        if (!article?.id) {
            return
        }

        navigate(getPostViewPath(article.id))
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            handleOpenPost()
        }
    }

    const handleThumbnailError = (event) => {
        if (event.currentTarget.dataset.fallbackApplied === 'true') {
            return
        }

        event.currentTarget.dataset.fallbackApplied = 'true'
        event.currentTarget.src = resolveFallbackThumbnail(article?.id)
    }

    return(
        <div
            className={Styles.container}
            role="link"
            tabIndex={0}
            onClick={handleOpenPost}
            onKeyDown={handleKeyDown}
        >
            <img 
                src={resolvedThumbnail}
                alt={article.title ?? 'thumbnail'}
                className={Styles.thumbnail}
                onError={handleThumbnailError}
            />
            <div className={Styles.contents}>
                {categories.length > 0 && (
                    <Categories
                        categories={categories}
                        theme='positive'
                        groupWidth={240} //여기선 줄넘김 없음, overflow: hidden
                        listClassName={Styles.categoryList}
                    />
                )}
                <h3 className={Styles.title}>{renderHighlightedText(article.title, searchQuery)}</h3>
                <Author
                    dateString={article.dateString}
                    authorName={article.authorName}
                    authorLabel={renderHighlightedText(article.authorName, searchQuery)}
                />
                <p className={Styles.description}>{article.description}</p>
            </div>

        </div>

    )
}
