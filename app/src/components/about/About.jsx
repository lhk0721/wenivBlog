import Styles from './About.module.css'
import Profile from '../Profile/Profile'
import Categories from '../categories/Categories'
import Facebook from '../../assets/icons/Facebook.svg'
import Github from '../../assets/icons/Github.svg'
import Twitter from '../../assets/icons/Twitter.svg'
import Instagram from '../../assets/icons/Instagram.svg'
import { useAlert } from '../../contexts/AlertContext.jsx'
import { useAuth } from '../../contexts/AuthContext.jsx'

/**
 * 블로그의 'About Me' 섹션을 표시하는 컴포넌트입니다.
 * 사용자의 프로필, 설명, 카테고리 목록 및 소셜 미디어 링크를 포함합니다.
 *
 * @param {Object} props
 * @param {number|string|null} [props.activeCategoryId=null] 선택된 카테고리 id
 * @param {(category: { id: number|string, name: string }) => void} [props.onCategorySelect] 카테고리 선택 핸들러
 * @returns {JSX.Element}
 */
export default function About({ activeCategoryId = null, onCategorySelect }){
    const { currentUser, isLoggedIn } = useAuth()
    const { alert } = useAlert()
    const categories = [
        { id: 1, name: "Life" },
        { id: 2, name: "Style" },
        { id: 3, name: "Tech" },
        { id: 4, name: "Music" },
        { id: 5, name: "Sport" },
        { id: 6, name: "Photo" },
        { id: 7, name: "Develop"},
    ]
    const socialLinks = currentUser?.socialLinks ?? {}
    const socialItems = [
        { id: 'Facebook', key: 'facebook', icon: Facebook, label: 'Facebook' },
        { id: 'Twitter', key: 'twitter', icon: Twitter, label: 'Twitter' },
        { id: 'Instagram', key: 'instagram', icon: Instagram, label: 'Instagram' },
        { id: 'Github', key: 'github', icon: Github, label: 'Github' },
    ]

    const handleSocialClick = async (socialLabel, href) => {
        if (href) {
            window.open(href, '_blank', 'noopener,noreferrer')
            return
        }

        await alert({
            alertTitle: '등록된 링크가 없습니다.',
            alertContents: (
                <div className={Styles.socialAlert}>
                    <img
                        className={Styles.socialAlertIcon}
                        src={socialItems.find((item) => item.label === socialLabel)?.icon}
                        alt={socialLabel}
                    />
                    <p>{socialLabel} 링크가 아직 등록되지 않았습니다.</p>
                </div>
            ),
            confirmText: '확인',
            confirmVariant: 'solid-primary',
        })
    }

    return(
        <div className={Styles.container}>
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
                activeCategoryId={activeCategoryId}
                onCategoryClick={onCategorySelect}
            />
            
            {/*===== follow =====*/}
            <h2 className={Styles.sectionTitle}>FOLLOW</h2>
            <ul className={Styles.social}>
                {socialItems.map((item) => {
                    const href = socialLinks[item.key]

                    return (
                        <li key={item.id} id={item.id}>
                            <button
                                type='button'
                                className={Styles.socialButton}
                                onClick={() => handleSocialClick(item.label, href)}
                            >
                                <img className={Styles.href} src={item.icon} alt={item.label} />
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
