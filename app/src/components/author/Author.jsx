import Styles from './Author.module.css'
import { useAuth } from '../../contexts/AuthContext.jsx'
import defaultProfileImage from '../../assets/images/noimg.png'

export default function Author({ dateString }){
    const { currentUser } = useAuth()
    const postDate = dateString ? dateString.replaceAll('-', '.') : '날짜 미정'
    const authorName = currentUser?.name ?? '작성자 미정'
    const profileImage = currentUser?.profileImage || defaultProfileImage

    return(
        <div className={Styles.meta}>
            <img 
                src={profileImage}
                alt={authorName}
                className={Styles.profileImg}
            />
            <span>{authorName}</span>
            <span className={Styles.divider}>|</span>
            <span>{postDate}</span>
        </div>
    )
}
