import styles from './PageContainer.module.css'

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
