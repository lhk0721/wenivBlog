import Styles from './Author.module.css'

export default function Author({image, author,dateString}){
    const postDate = dateString.replaceAll('-','.');

    return(
        <div className={Styles.meta}>
            <img 
                src={image} 
                alt="Profile image" 
                className={Styles.profileImg}
            />
            <span>{author}</span>
            <span className={Styles.divider}>|</span>
            <span>{postDate}</span>
        </div>
    )
}