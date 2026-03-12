import styles from './Button.module.css'
import { useEffect, useState } from 'react'

/**
 * @typedef {Object} ButtonProps
 * @property {'primary' | 'negative' | 'subtle-primary' | 'subtle-negative' | 'round' | 'solid-primary' | 'solid-negative'} variant 버튼 스타일 테마
 * @property {'sm' | 'md' | 'lg' | 'xlg' | 'xxlg' | 'top'} size 버튼 크기/레이아웃
 * @property {'button' | 'submit' | 'reset'} [type='button'] 버튼 타입
 * @property {string} [text] 버튼 텍스트
 * @property {string} [icon] 기본 아이콘 이미지 경로
 * @property {string} [activeIcon] 눌림 상태 아이콘 이미지 경로
 * @property {number|string} [iconWidth] 아이콘 너비 (예: 16, '2rem')
 * @property {number|string} [iconHeight] 아이콘 높이 (미지정 시 iconWidth 사용)
 * @property {boolean} [bold=false] 버튼 텍스트 Bold 여부
 * @property {() => void} [onClick] 클릭 핸들러
 * @property {string} [className] 추가 클래스 이름
 */

/**
 * 재사용 가능한 버튼 컴포넌트
 * @param {ButtonProps} props
 * @returns {JSX.Element}
 */
export default function Button({
    variant,
    size,
    type = 'button',
    text,
    icon,
    activeIcon,
    iconWidth,
    iconHeight,
    bold = false,
    onClick,
    className = ''
}) {
    const [isPressed, setIsPressed] = useState(false)

    useEffect(() => {
        if (!isPressed) return

        const releasePress = () => setIsPressed(false)

        window.addEventListener('mouseup', releasePress)
        window.addEventListener('touchend', releasePress)
        window.addEventListener('touchcancel', releasePress)

        return () => {
            window.removeEventListener('mouseup', releasePress)
            window.removeEventListener('touchend', releasePress)
            window.removeEventListener('touchcancel', releasePress)
        }
    }, [isPressed])

    const currentIcon = isPressed && activeIcon ? activeIcon : icon
    const iconClass = size === 'top'
        ? styles.topIcon
        : variant === 'round'
            ? styles.roundIcon
            : styles.icon
    const iconStyle = iconWidth !== undefined || iconHeight !== undefined
        ? { width: iconWidth, height: iconHeight ?? iconWidth, objectFit: 'contain' }
        : undefined

    return(
        <button
            type={type}
            onClick={onClick}
            className={`${styles.base} ${styles[variant]} ${styles[size]} ${bold ? styles.bold : ''} ${className}`}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onTouchStart={() => setIsPressed(true)}
            onTouchEnd={() => setIsPressed(false)}
            onTouchCancel={() => setIsPressed(false)}
        >
            {currentIcon && 
            <img 
                className={iconClass}
                style={iconStyle}
                src={currentIcon} 
                alt="" />}
            {text}
        </button>
    )
}
