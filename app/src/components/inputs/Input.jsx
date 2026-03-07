import styles from './Input.module.css'

/**
 * @typedef {Object} InputProps
 * @property {string} [label]
 * @property {string} [type="text"]
 * @property {string} [name]
 * @property {string} [id]
 * @property {string} [placeholder]
 * @property {number} [maxLength]
 * @property {string} [className]
 * @property {boolean} [required]
 * @property {string} [autoComplete]
 * @property {string | number} [value]
 * @property {(event: React.ChangeEvent<HTMLInputElement>) => void} [onChange]
 */

/**
 * @param {InputProps} props
 */

/* autoComplete
- on
- off
- name
- email
- username
- current-password
- new-password
- tel
- address-line1
- postal-code
- cc-number
*/
export default function Input({
    label,
    type = "text",
    name,
    id,
    placeholder,
    maxLength,
    required,
    autoComplete,
    value,
    onChange,
    className ='',
}) {
    return (
        <div className="input-container">
            {label && <label 
                htmlFor={id}
                className='input-label'
            >
                    {label}
                </label>}

            <input
                type={type}
                name={name}
                id={id}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                maxLength={maxLength}
                autoComplete={autoComplete}
                className={`${styles.base}`}
                required={required}
            />
        </div>
    );
}
