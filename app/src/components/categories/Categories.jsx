import CategoryChip from "./CategoryChip"
import Styles from './Categories.module.css'

/**
 * @typedef {Object} CategoryItem
 * @property {number|string} id 카테고리 식별자
 * @property {string} name 카테고리명
 */

/**
 * 카테고리 칩 목록을 렌더링합니다.
 *
 * @param {Object} props
 * @param {CategoryItem[]} [props.categories=[]] 렌더링할 카테고리 배열
 * @param {'default' | 'positive'} [props.theme='default'] 칩 테마
 * @param {number|string} [props.groupWidth] 그룹 너비
 * @param {string} [props.className=''] 그룹 래퍼 추가 클래스 이름
 * @param {string} [props.listClassName=''] 리스트 추가 클래스 이름
 * @returns {JSX.Element}
 */
export default function Categories({ categories = [], theme = 'default', groupWidth, className = '', listClassName = '' }) {
    return (
        <div className={`categoryGroup ${className}`.trim()} style={{ width: groupWidth }}>
            <ul className={`${Styles.categoryList} ${listClassName}`.trim()}>
                {categories.map((category) => (
                    <CategoryChip
                        key={category.id}
                        label={category.name}
                        theme={theme}
                    />
                ))}
            </ul>
        </div>
    )
}
