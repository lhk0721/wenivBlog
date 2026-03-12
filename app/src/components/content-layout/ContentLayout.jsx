import Button from '../buttons/Button'
import styles from './ContentLayout.module.css'
import arrowLeft from '../../assets/icons/ArrowLeft.svg'
import activeArrowLeft from '../../assets/icons/ArrowLeft-white.svg'

/**
 * @typedef {Object} ContentLayoutProps
 * @property {React.ReactNode} children 내부 콘텐츠
 * @property {() => void} [onBackClick] 뒤로가기 버튼 클릭 핸들러
 * @property {string} [bodyClassName=''] 본문 래퍼 추가 클래스 이름
 */

/**
 * 공통 뒤로가기 버튼과 본문 영역 레이아웃을 제공합니다.
 *
 * @param {ContentLayoutProps} props
 * @returns {JSX.Element}
 */
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
