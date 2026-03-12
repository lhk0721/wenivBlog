import Styles from './Author.module.css'
import defaultProfileImage from '../../assets/images/noimg.png'

/**
 * 작성자 메타 정보와 작성일을 표시합니다.
 *
 * @param {{ dateString?: string, authorName?: string, authorLabel?: React.ReactNode, profileImage?: string }} props
 * @returns {JSX.Element}
 */
export default function Author({
    dateString,
    authorName = '작성자 미정',
    authorLabel,
    profileImage,
}){
    const postDate = String(dateString ?? '')
        .trim()
        .split(/\s+/)[0]
        .replaceAll('-', '.')
    const resolvedProfileImage = profileImage || defaultProfileImage

    return(
        <div className={Styles.meta}>
            <img 
                src={resolvedProfileImage}
                alt={authorName}
                className={Styles.profileImg}
            />
            <span>{authorLabel ?? authorName}</span>
            {postDate && (
                <>
                    <span className={Styles.divider}>|</span>
                    <span>{postDate}</span>
                </>
            )}
        </div>
    )
}
