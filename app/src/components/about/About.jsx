import Styles from './About.module.css'
import Profile from '../Profile/Profile'
import Categories from '../categories/Categories'
import Facebook from '../../assets/icons/Facebook.svg'
import Github from '../../assets/icons/Github.svg'
import Twitter from '../../assets/icons/Twitter.svg'
import Instagram from '../../assets/icons/Instagram.svg'

// 이미지는 스트링
export default function About({name, img,}){
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
            {/* ===== aboutME ===== */}
            <h2>ABOUT ME</h2>
            <Profile
                image={img}
                size='md'
                className={Styles.profileImg}
            />
            <p className={Styles.name}>{name}</p>
            <p className={Styles.description}>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>

            {/*===== categories =====*/}
            <h2>CATEGORIES</h2>
            <Categories
                categories = {categories}
                groupWidth = {288}
                className={Styles._categories}
            />
            
            {/*===== follow =====*/}
            <h2>FOLLOW</h2>
            <ul className={Styles.social}>
                <li id='Facebook'><a href="https://facebook.com"><img className={Styles.href} src={Facebook} alt=""></img></a></li>
                <li id='Twitter'><a href="https://twitter.com"><img className={Styles.href} src={Twitter} alt=""></img></a></li>
                <li id='Instagram'><a href="https://instagram.com"><img className={Styles.href} src={Instagram} alt=""></img></a></li>
                <li id='Github'><a href="https://github.com"><img className={Styles.href} src={Github} alt=""></img></a></li>
            </ul>
        </div>
    )
}
