import Button from '../buttons/Button'
import styles from './ContentLayout.module.css'
import arrowLeft from '../../assets/icons/ArrowLeft.svg'
import activeArrowLeft from '../../assets/icons/ArrowLeft-white.svg'

export default function ContentLayout({
    children,
    onBackClick,
    bodyClassName = '',
}) {
    return (
        <div className={styles.container}>
            <Button
                size={'sm'}
                variant={'subtle-primary'}
                icon={arrowLeft}
                activeIcon={activeArrowLeft}
                className={styles.backButton}
                onClick={onBackClick}
            />
            <div className={`${styles.body} ${bodyClassName}`.trim()}>
                {children}
            </div>
        </div>
    )
}
