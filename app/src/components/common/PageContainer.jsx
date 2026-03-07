function PageContainer({ title, subtitle, children }) {
    return (
        <section className="page-container">
            {(title || subtitle) && (
                <header className="page-header">
                    {title && <h1>{title}</h1>}
                    {subtitle && <p>{subtitle}</p>}
                </header>
            )}
            {children}
        </section>
    )
}

export default PageContainer
