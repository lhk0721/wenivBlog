import Styles from './CategoryChip.module.css'

export default function CategoryChip({ label, onClick, theme = 'default' }) {
    return (
        <li className="categoryChip">
            <button
                type="button"
                className={`${Styles.chipButton} ${theme === 'positive' ? Styles.positive : ''}`}
                onClick={onClick}
            >
                {label}
            </button>
        </li>
    )
}
