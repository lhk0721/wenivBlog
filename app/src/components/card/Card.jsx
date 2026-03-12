import Author from '../author/Author'
import Categories from '../categories/Categories'
import { useAuth } from '../../contexts/AuthContext.jsx'
import Styles from './Card.module.css'

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
 * @param {{ article: CardArticle }} props
 * @returns {JSX.Element}
 */
export default function Card({article}){
    const { isLoggedIn } = useAuth()

    return(
        <div className={Styles.container}>
            <img 
                src={article.thumbnail} alt="thumbnail" 
                className={Styles.thumbnail}
            />
            <div className={Styles.contents}>
                <Categories
                    categories={article.Categories}
                    theme='positive'
                    groupWidth={240} //여기선 줄넘김 없음, overflow: hidden
                    listClassName={Styles.categoryList}
                />
                <h3 className={Styles.title}>{article.title}</h3>
                {isLoggedIn && <Author dateString={article.dateString} />}
                <p className={Styles.description}>{article.description}</p>
            </div>

        </div>

    )
}
