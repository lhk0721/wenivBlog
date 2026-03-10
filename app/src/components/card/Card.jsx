import Author from '../author/Author'
import Categories from '../categories/Categories'
import { useAuth } from '../../contexts/AuthContext.jsx'
import Styles from './Card.module.css'

/* id에 해당하는 글 정보를 객체로 넘겨준다.
글 객체 하나의 구조는 다음과 같다.
article {
id: number
dateString: string
title: string
thumbnail: string(src)
categoty: [{ id: num, name: "string" },...]
description: string
}


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
