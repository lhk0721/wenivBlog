import styles from './Button.module.css'
import { useState } from 'react'

export default function Button({ text, icon, activeIcon, onClick, theme = 'primary' }) {
    const [isPressed, setIsPressed] = useState(false)
    const currentIcon = isPressed && activeIcon ? activeIcon : icon
    const themeClass = theme === 'negative' ? styles.negative : styles.primary

    return(
        <button
            onClick={onClick}
            className={`${styles.btn} ${themeClass}`}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            onTouchStart={() => setIsPressed(true)}
            onTouchEnd={() => setIsPressed(false)}
            onTouchCancel={() => setIsPressed(false)}
        >
            {currentIcon && <img className={styles.icon} src={currentIcon} alt="" />}
            {text}
        </button>
    )
}
