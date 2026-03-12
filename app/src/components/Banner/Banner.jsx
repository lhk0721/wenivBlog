import styles from './Banner.module.css'

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
export default function Banner({ variant, postDay, postMonth, postWeekday }) {
    const isPrimary = variant === 'primary'
    const isAuth = variant === 'auth'
    const isPost = variant === 'post'

    return (
        <section className={styles.banner}>
            {(isPrimary || isAuth) && (
                <div className={`${styles.bannerContent} ${isAuth ? styles.authContent : ''}`.trim()}>
                    <div className={styles.textBox}>
                        <p className={styles.divider}>React & Node</p>
                        <h2 className={styles.title}>{isAuth ? 'Welcome Back' : 'My BLOG'}</h2>
                        <p className={styles.description}>
                            {isAuth
                                ? '로그인과 회원가입 화면에서도 동일한 그리드를 유지하도록 상단 배너를 공통 레이아웃에서 렌더링합니다.'
                                : '기록과 기술, 일상의 관찰을 차곡차곡 쌓아가는 개인 블로그 레이아웃입니다.'}
                        </p>
                    </div>
                </div>
            )}
            {isPost && (
                <div className={`${styles.bannerContent} ${styles.postContent}`.trim()}>
                    <div className={styles.textBox}>
                        <p className={styles.postDay}>{postDay}</p>
                        <p className={styles.postMonth}>{postMonth}</p>
                        <p className={styles.postWeekday}>{postWeekday}</p>
                    </div>
                </div>
            )}
        </section>
    )
}
