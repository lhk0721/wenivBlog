import Styles from './Author.module.css'

export default function Author({image, author,publishDate}){

    return(
        <div className={Styles.meta}>
            <img 
                src={image} 
                alt="Profile image" 
                className={Styles.profileImg}
            />
            <span>{author}</span>
            <span className={Styles.divider}>|</span>
            <span>{publishDate}</span>
        </div>
    )
}