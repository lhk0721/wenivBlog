import Styles from './Banner.module.css'
/**
 * 상단 배너를 렌더링합니다.
 *
 * @param {Object} props
 * @param {'primary' | 'auth' | 'post'} props.variant 배너 종류
 * @param {string} [props.postDay] 게시글 배너의 일 표시
 * @param {string} [props.postMonth] 게시글 배너의 월 표시
 * @param {string} [props.postWeekday] 게시글 배너의 요일 표시
 * @returns {JSX.Element}
 */
export default function Banner({variant, postDay, postMonth, postWeekday}){
    const primary = variant === 'primary';
    const post = variant === 'post'

    return(
        <div className={Styles.banner}>
            {primary&& 
            <div className={Styles.bannerContent}>
                <div className={Styles.textBox}>
                    <p className={Styles.divider}>
                    React & Node
                    </p>
                    <h2 className={Styles.title}>My BLOG</h2>
                    <p className={Styles.description}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit!</p>
                </div>
            </div>}
            {post && 
            <div className={Styles.bannerContent}>
                <div className={Styles.textBox}>
                    <p className={Styles.postDay}>{postDay}</p>
                    <p className={Styles.postMonth}>{postMonth}</p>
                    <p className={Styles.postWeekday}>{postWeekday}</p>
                </div>
            </div>}
        </div>

    )
}
