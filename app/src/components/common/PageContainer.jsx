import styles from './PageContainer.module.css'

/**
 * 페이지 제목, 부제목, 본문 영역을 감싸는 공통 컨테이너입니다.
 *
 * @param {Object} props
 * @param {string} [props.title] 페이지 제목
 * @param {string} [props.subtitle] 페이지 부제목
 * @param {React.ReactNode} [props.children] 페이지 본문
 * @returns {JSX.Element}
 */
function PageContainer({ title, subtitle, children }) {
    return (
        <section className={styles.pageContainer}>
            {(title || subtitle) && (
                <header className={styles.pageHeader}>
                    {title && <h1>{title}</h1>}
                    {subtitle && <p>{subtitle}</p>}
                </header>
            )}
            {children}
        </section>
    )
}

export default PageContainer
