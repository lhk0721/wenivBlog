import { useId, useState } from 'react';
import styles from './Input.module.css';

/**
 * @callback InputValidate
 * @param {string} value
 * @param {HTMLInputElement} element
 * @returns {string | void}
 */

/**
 * @typedef {Object} InputProps
 * @property {string} [label]
 * @property {string} [type='text']
 * @property {string} [name]
 * @property {string} [id]
 * @property {string} [placeholder]
 * @property {number} [maxLength]
 * @property {number} [minLength]
 * @property {boolean} [required=false]
 * @property {boolean} [disabled=false]
 * @property {boolean} [readOnly=false]
 * @property {string} [autoComplete]
 * @property {string} [value]
 * @property {string} [defaultValue='']
 * @property {(event: React.ChangeEvent<HTMLInputElement>) => void} [onChange]
 * @property {(event: React.FocusEvent<HTMLInputElement>) => void} [onBlur]
 * @property {(event: React.FocusEvent<HTMLInputElement>) => void} [onFocus]
 * @property {string} [className='']
 * @property {string} [inputClassName='']
 * @property {string} [helperText='']
 * @property {string} [errorMessage='']
 * @property {InputValidate} [validate]
 * @property {React.ReactNode} [trailing]
 */

function joinClassNames(...classNames) {
    return classNames.filter(Boolean).join(' ');
}

/**
 * @param {InputProps} props
 * @returns {JSX.Element}
 */
export default function Input({
    label,
    type = 'text',
    name,
    id,
    placeholder,
    maxLength,
    minLength,
    required = false,
    disabled = false,
    readOnly = false,
    autoComplete,
    value,
    defaultValue = '',
    onChange,
    onBlur,
    onFocus,
    className = '',
    inputClassName = '',
    helperText = '',
    errorMessage = '',
    validate,
    trailing,
    ...inputProps
}) {
    const generatedId = useId();
    const inputId = id ?? `${generatedId}-input`;
    const helpId = `${inputId}-description`;
    const isControlled = value !== undefined;
    const [innerValue, setInnerValue] = useState(defaultValue);
    const [localErrorMessage, setLocalErrorMessage] = useState('');
    const [isTouched, setIsTouched] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    const currentValue = isControlled ? value : innerValue;

    const visibleErrorMessage = errorMessage || (isTouched ? localErrorMessage : '');
    const hasValue = String(currentValue ?? '').trim().length > 0;
    const isValidState = hasInteracted && hasValue && !localErrorMessage && !errorMessage;
    const visibleHelperText = isValidState ? '' : helperText;
    const describedBy = visibleErrorMessage || visibleHelperText ? helpId : undefined;

    const runValidation = (target) => {
        const nextValue = target.value;
        let nextErrorMessage = '';

        target.setCustomValidity('');

        if (typeof validate === 'function') {
            const customMessage = validate(nextValue, target);
            nextErrorMessage = customMessage || '';
        } else if (!target.validity.valid) {
            nextErrorMessage = target.validationMessage || '입력값을 확인해주세요.';
        }

        target.setCustomValidity(nextErrorMessage);
        setLocalErrorMessage(nextErrorMessage);
    };

    const handleChange = (event) => {
        setHasInteracted(true);

        if (!isControlled) {
            setInnerValue(event.target.value);
        }

        runValidation(event.target);

        if (onChange) {
            onChange(event);
        }
    };

    const handleInput = (event) => {
        if (!isControlled) {
            setInnerValue(event.target.value);
        }
    };

    const handleBlur = (event) => {
        setHasInteracted(true);
        setIsTouched(true);
        runValidation(event.target);

        if (onBlur) {
            onBlur(event);
        }
    };

    const handleFocus = (event) => {
        if (onFocus) {
            onFocus(event);
        }
    };

    const handleInvalid = (event) => {
        setHasInteracted(true);
        setIsTouched(true);
        runValidation(event.target);
    };

    const wrapperClassName = joinClassNames(styles.inputContainer, className);

    const inputClasses = joinClassNames(
        styles.base,
        visibleErrorMessage ? styles.error : '',
        isValidState ? styles.valid : '',
        inputClassName
    );

    return (
        <div className={wrapperClassName}>
            {label && (
                <label htmlFor={inputId} className={styles.inputLabel}>
                    {label}
                </label>
            )}

            <div className={joinClassNames(styles.inputRow, isValidState ? styles.validRow : '')}>
                <input
                    type={type}
                    name={name}
                    id={inputId}
                    {...(isControlled
                        ? { value: currentValue }
                        : { defaultValue })}
                    placeholder={placeholder}
                    onInput={handleInput}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    onInvalid={handleInvalid}
                    maxLength={maxLength}
                    minLength={minLength}
                    autoComplete={autoComplete}
                    className={inputClasses}
                    required={required}
                    disabled={disabled}
                    readOnly={readOnly}
                    {...inputProps}
                    aria-invalid={Boolean(visibleErrorMessage)}
                    aria-describedby={describedBy}
                />
                {trailing}
            </div>

            {(visibleErrorMessage || visibleHelperText) && (
                <p
                    id={helpId}
                    className={
                        visibleErrorMessage
                            ? styles.errorText
                            : styles.helperText
                    }
                >
                    {visibleErrorMessage || visibleHelperText}
                </p>
            )}
        </div>
    );
}
