import Styles from './CategoryChip.module.css'

/**
 * 단일 카테고리 칩 버튼을 렌더링합니다.
 *
 * @param {Object} props
 * @param {string} props.label 버튼 라벨
 * @param {() => void} [props.onClick] 클릭 핸들러
 * @param {'default' | 'positive'} [props.theme='default'] 칩 테마
 * @param {boolean} [props.isActive=false] 활성화 여부
 * @returns {JSX.Element}
 */
export default function CategoryChip({ label, onClick, theme = 'default', isActive = false }) {
    return (
        <li className="categoryChip">
            <button
                type="button"
                className={`${Styles.chipButton} ${theme === 'positive' ? Styles.positive : ''} ${isActive ? Styles.active : ''}`.trim()}
                onClick={onClick}
            >
                {label}
            </button>
        </li>
    )
}
