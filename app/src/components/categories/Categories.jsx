import CategoryChip from "./CategoryChip"
import Styles from './Categories.module.css'

/*부모 컴포넌트에서 categories를 배열로 넘긴다.
예시
const categories = [
    { id: 1, name: "전체" },
    { id: 2, name: "개발" },
    { id: 3, name: "디자인" },
    { id: 4, name: "AI" }
]
*/

/*구조
Categories
    ├ CategoryChip
    ├ CategoryChip
    └ CategoryChip
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
