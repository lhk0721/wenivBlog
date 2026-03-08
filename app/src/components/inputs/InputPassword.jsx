import { useState } from 'react';
import Input from './Input.jsx';
import styles from './Input.module.css';

const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,20}$/;
const PASSWORD_HELPER_TEXT = '영문, 숫자를 포함해 8~20자(특수문자 !@#$%^&* 허용)';

function validatePassword(value) {
    if (!value) {
        return '비밀번호를 입력해 주세요.';
    }

    if (!PASSWORD_PATTERN.test(value)) {
        return PASSWORD_HELPER_TEXT + '로 입력해 주세요.';
    }

    return '';
}

/**
 * @typedef {Object} InputPasswordProps
 * @property {string} [label='Password']
 * @property {string} [name]
 * @property {string} [id]
 * @property {string} [placeholder]
 * @property {number} [maxLength]
 * @property {number} [minLength]
 * @property {boolean} [required=false]
 * @property {boolean} [disabled=false]
 * @property {boolean} [readOnly=false]
 * @property {string} [autoComplete='new-password']
 * @property {string} [value]
 * @property {string} [defaultValue='']
 * @property {(event: React.ChangeEvent<HTMLInputElement>) => void} [onChange]
 * @property {(event: React.FocusEvent<HTMLInputElement>) => void} [onBlur]
 * @property {(event: React.FocusEvent<HTMLInputElement>) => void} [onFocus]
 * @property {string} [className='']
 * @property {string} [inputClassName='']
 * @property {string} [helperText='']
 * @property {string} [errorMessage='']
 * @property {(value: string, element: HTMLInputElement) => string | void} [validate]
 */

/**
 * @param {InputPasswordProps} props
 */
export default function InputPassword({
    label = 'Password',
    autoComplete = 'new-password',
    helperText = PASSWORD_HELPER_TEXT,
    validate,
    ...props
}) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <Input
            {...props}
            label={label}
            type={isPasswordVisible ? 'text' : 'password'}
            autoComplete={autoComplete}
            helperText={helperText}
            validate={validate ?? validatePassword}
            trailing={(
                <button
                    type="button"
                    className={styles.toggleButton}
                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                    aria-label={isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
                >
                    {isPasswordVisible ? '숨김' : '보기'}
                </button>
            )}
        />
    );
}
