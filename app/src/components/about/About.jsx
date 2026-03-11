import Styles from './About.module.css'
import Profile from '../Profile/Profile'
import Categories from '../categories/Categories'
import Facebook from '../../assets/icons/Facebook.svg'
import Github from '../../assets/icons/Github.svg'
import Twitter from '../../assets/icons/Twitter.svg'
import Instagram from '../../assets/icons/Instagram.svg'
import { useAuth } from '../../contexts/AuthContext.jsx'

// 이미지는 스트링
/**
 * 블로그의 'About Me' 섹션을 표시하는 컴포넌트입니다.
 * 사용자의 프로필, 설명, 카테고리 목록 및 소셜 미디어 링크를 포함합니다.
 * 
 * @returns {JSX.Element}
 */
export default function About(){
    const { currentUser, isLoggedIn } = useAuth()
    const categories = [
        { id: 1, name: "Life" },
        { id: 2, name: "Style" },
        { id: 3, name: "Tech" },
        { id: 4, name: "Music" },
        { id: 5, name: "Sport" },
        { id: 6, name: "Photo" },
        { id: 7, name: "Develop"},
    ]

    return(
        <div className={Styles.container}>
            <h1>Hello World</h1>
            {/* ===== aboutME ===== */}
            <h2 className={Styles.sectionTitle}>ABOUT ME</h2>
            <Profile
                size='md'
                className={Styles.profileImg}
            />
            <p className={Styles.name}>{isLoggedIn ? currentUser?.name : 'Guest'}</p>
            <p className={Styles.description}>
                {isLoggedIn
                    ? `${currentUser?.name}님의 블로그입니다.`
                    : '로그인하면 프로필 정보를 볼 수 있습니다.'}
            </p>

            {/*===== categories =====*/}
            <h2 className={Styles.sectionTitle}>CATEGORIES</h2>
            <Categories
                categories = {categories}
                groupWidth = {288}
                className={Styles._categories}
            />
            
            {/*===== follow =====*/}
            <h2 className={Styles.sectionTitle}>FOLLOW</h2>
            <ul className={Styles.social}>
                <li id='Facebook'><a href="https://facebook.com"><img className={Styles.href} src={Facebook} alt=""></img></a></li>
                <li id='Twitter'><a href="https://twitter.com"><img className={Styles.href} src={Twitter} alt=""></img></a></li>
                <li id='Instagram'><a href="https://instagram.com"><img className={Styles.href} src={Instagram} alt=""></img></a></li>
                <li id='Github'><a href="https://github.com"><img className={Styles.href} src={Github} alt=""></img></a></li>
            </ul>
        </div>
    )
}
