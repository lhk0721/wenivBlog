import Styles from './Author.module.css'
import { useAuth } from '../../contexts/AuthContext.jsx'

export default function Author({ dateString }){
    const { currentUser } = useAuth()
    const postDate = dateString.replaceAll('-','.');

    return(
        <div className={Styles.meta}>
            <img 
                src={currentUser?.profileImage} 
                alt="Profile image" 
                className={Styles.profileImg}
            />
            <span>{currentUser?.name}</span>
            <span className={Styles.divider}>|</span>
            <span>{postDate}</span>
        </div>
    )
}
