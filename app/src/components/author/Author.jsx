import Styles from './Author.module.css'
import { useAuth } from '../../contexts/AuthContext.jsx'
import defaultProfileImage from '../../assets/images/noimg.png'

/**
 * 작성자 메타 정보와 게시 날짜를 표시합니다.
 *
 * @param {{ dateString?: string }} props
 * @returns {JSX.Element}
 */
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
