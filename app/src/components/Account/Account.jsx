import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Styles from './Account.module.css'
import Profile from '../profile/Profile.jsx'
import Input from '../inputs/Input.jsx'
import InputPassword from '../inputs/InputPassword.jsx'
import Button from '../buttons/Button.jsx'
import { useAlert } from '../../contexts/AlertContext.jsx'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { PATHS } from '../../routes/paths.js'

const USERNAME_HELPER_TEXT = '2~20자, 영문과 숫자를 모두 포함하고 밑줄(_)을 사용할 수 있습니다.'

function validateUsername(value) {
    const trimmedValue = value.trim()

    if (!trimmedValue) {
        return '사용자 이름을 입력해 주세요.'
    }

    if (trimmedValue.length < 2 || trimmedValue.length > 20) {
        return USERNAME_HELPER_TEXT
    }

    if (!/^[A-Za-z0-9_]+$/.test(trimmedValue)) {
        return USERNAME_HELPER_TEXT
    }

    if (!/[A-Za-z]/.test(trimmedValue) || !/\d/.test(trimmedValue)) {
        return USERNAME_HELPER_TEXT
    }

    return ''
}

function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = () => resolve(String(reader.result ?? ''))
        reader.onerror = () => reject(new Error('이미지 파일을 읽지 못했습니다.'))
        reader.readAsDataURL(file)
    })
}

/**
 * @typedef {Object} AccountProps
 * @property {'Login' | 'Register' | 'Mypage'} [type] 계정 폼 종류
 */

/**
 * 로그인, 회원가입, 마이페이지용 계정 폼을 렌더링합니다.
 *
 * @param {AccountProps} props
 * @returns {JSX.Element}
 */
export default function Account({type}){
    const navigate = useNavigate()
    const formRef = useRef(null)
    const { alert } = useAlert()
    const { currentUser, updateCurrentUser, login, register } = useAuth()
    const [profilePreviewImage, setProfilePreviewImage] = useState(currentUser?.profileImage ?? '')
    const [isFormReady, setIsFormReady] = useState(false)
    const [submitError, setSubmitError] = useState('')
    const showUsernameInput = type === 'Register' || type === 'Mypage'
    const showLoginIdInput = type === 'Login'
    const showEmailInput = type === 'Register' || type === 'Mypage'
    const containerClassName = type === 'Mypage'
        ? `${Styles.container} ${Styles.containerMypage}`
        : Styles.container
    const titleTextMap = {
        Login: 'LOGIN',
        Register: 'REGISTER',
        Mypage: 'UPDATE ACCOUNT',
    }
    const buttonTextMap = {
        Login: 'LOGIN',
        Register: 'REGISTER',
        Mypage: 'UPDATE',
    }
    const buttonVariantMap = {
        Login: 'solid-primary',
        Register: 'solid-primary',
        Mypage: 'solid-primary',
    }
    const titleText = titleTextMap[type] ?? 'ACCOUNT'
    const buttonText = buttonTextMap[type] ?? 'SUBMIT'
    const buttonVariant = buttonVariantMap[type] ?? 'solid-primary'

    useEffect(() => {
        setProfilePreviewImage(currentUser?.profileImage ?? '')
    }, [currentUser?.profileImage])

    const evaluateFormState = () => {
        const formElement = formRef.current

        if (!formElement) {
            setIsFormReady(false)
            return
        }

        const formData = new FormData(formElement)
        const fieldsByType = {
            Login: ['loginId', 'password'],
            Register: ['username', 'email', 'password'],
            Mypage: ['username', 'email', 'password'],
        }
        const requiredFields = fieldsByType[type] ?? []
        const allFieldsFilled = requiredFields.every((fieldName) =>
            String(formData.get(fieldName) ?? '').trim().length > 0,
        )

        setIsFormReady(allFieldsFilled && formElement.checkValidity())
    }

    useEffect(() => {
        evaluateFormState()
    }, [type, currentUser])

    const fillFieldValue = (fieldName, nextValue) => {
        const formElement = formRef.current

        if (!formElement) {
            return false
        }

        const input = formElement.elements.namedItem(fieldName)

        if (!(input instanceof HTMLInputElement)) {
            return false
        }

        input.value = nextValue
        input.dispatchEvent(new Event('input', { bubbles: true }))
        input.dispatchEvent(new Event('change', { bubbles: true }))
        input.focus()
        return true
    }

    const handleRestoreSavedCredential = async () => {
        if (!window.PasswordCredential || !navigator.credentials?.get) {
            await alert({
                alertTitle: '브라우저 저장값을 불러올 수 없습니다.',
                alertContents: '현재 브라우저가 로그인 정보 읽기를 지원하지 않습니다.',
                confirmText: '확인',
                confirmVariant: 'solid-negative',
            })
            return
        }

        try {
            const credential = await navigator.credentials.get({
                password: true,
                mediation: 'optional',
            })

            const savedCredential = String(credential?.id ?? '').trim()

            if (!savedCredential) {
                await alert({
                    alertTitle: '저장된 로그인 정보가 없습니다.',
                    alertContents: '브라우저에 저장된 계정을 먼저 선택하거나 저장해 주세요.',
                    confirmText: '확인',
                    confirmVariant: 'solid-negative',
                })
                return
            }

            fillFieldValue('loginId', savedCredential)
        } catch {
            await alert({
                alertTitle: '브라우저 저장값을 불러오지 못했습니다.',
                alertContents: '브라우저 설정이나 저장된 로그인 정보를 확인해 주세요.',
                confirmText: '확인',
                confirmVariant: 'solid-negative',
            })
        }
    }

    const handleProfileImageChange = async (event) => {
        const nextFile = event.target.files?.[0]

        if (!nextFile) {
            return
        }

        if (!nextFile.type.startsWith('image/')) {
            await alert({
                alertTitle: '이미지 파일만 업로드할 수 있습니다.',
                alertContents: '프로필 이미지는 이미지 형식으로 선택해 주세요.',
                confirmText: '확인',
                confirmVariant: 'solid-negative',
            })
            event.target.value = ''
            return
        }

        try {
            const imageDataUrl = await readFileAsDataUrl(nextFile)
            setProfilePreviewImage(imageDataUrl)
        } catch {
            await alert({
                alertTitle: '이미지를 불러오지 못했습니다.',
                alertContents: '다른 이미지 파일로 다시 시도해 주세요.',
                confirmText: '확인',
                confirmVariant: 'solid-negative',
            })
        }

        event.target.value = ''
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setSubmitError('')

        const formElement = event.currentTarget
        const isValid = formElement.reportValidity()

        if (!isValid) {
            await alert({
                alertTitle: '입력값을 확인해 주세요.',
                alertContents: '유효성 검사를 통과하지 못한 항목이 있습니다.',
                confirmText: '확인',
                confirmVariant: 'solid-negative',
            })
            return
        }

        const formData = new FormData(formElement)
        const username = String(formData.get('username') ?? '').trim()
        const loginId = String(formData.get('loginId') ?? '').trim()
        const email = String(formData.get('email') ?? '').trim()
        const password = String(formData.get('password') ?? '')

        if (type === 'Mypage') {
            updateCurrentUser({
                username: username || currentUser?.username,
                name: username || currentUser?.name,
                email,
                profileImage: profilePreviewImage || currentUser?.profileImage,
            })

            await alert({
                alertTitle: '정보 수정이 완료되었습니다.',
                alertContents: '변경한 계정 정보가 반영되었습니다.',
                confirmText: '확인',
                confirmVariant: 'solid-primary',
            })
            return
        }

        if (type === 'Login') {
            try {
                await login({
                    username: loginId,
                    password,
                    name: currentUser?.name,
                })

                await alert({
                    alertTitle: '로그인되었습니다.',
                    alertContents: '홈으로 이동합니다.',
                    confirmText: '확인',
                    confirmVariant: 'solid-primary',
                })
                navigate(PATHS.HOME)
            } catch (error) {
                setSubmitError(error.message)
                await alert({
                    alertTitle: '로그인에 실패했습니다.',
                    alertContents: error.message,
                    confirmText: '확인',
                    confirmVariant: 'solid-negative',
                })
            }
            return
        }

        if (type === 'Register') {
            try {
                await register({
                    username,
                    email,
                    password,
                    name: username,
                    profileImage: profilePreviewImage,
                })

                await alert({
                    alertTitle: '회원가입이 완료되었습니다.',
                    alertContents: '등록한 정보로 로그인 상태가 적용되었습니다.',
                    confirmText: '확인',
                    confirmVariant: 'solid-primary',
                })
                navigate(PATHS.HOME)
            } catch (error) {
                setSubmitError(error.message)
                await alert({
                    alertTitle: '회원가입에 실패했습니다.',
                    alertContents: error.message,
                    confirmText: '확인',
                    confirmVariant: 'solid-negative',
                })
            }
            return
        }

        await alert({
            alertTitle: '제출이 완료되었습니다.',
            alertContents: `${titleText} 정보가 정상적으로 처리되었습니다.`,
            confirmText: '확인',
            confirmVariant: 'solid-primary',
        })
    }

    return(
        <div className={containerClassName}>
            <form
                ref={formRef}
                className={Styles.contents}
                onSubmit={handleSubmit}
                onInput={evaluateFormState}
                onChange={evaluateFormState}
            >
                <h2 className={Styles.type}>{titleText}</h2>
                {showUsernameInput && (
                    <>
                        <Profile
                            editable={true}
                            size={'lg'}
                            image={profilePreviewImage}
                            onImageChange={handleProfileImageChange}
                        />
                        <Input
                            label="Username"
                            name="username"
                            placeholder="Username"
                            autoComplete="nickname"
                            spellCheck={false}
                            defaultValue={type === 'Mypage' ? currentUser?.username ?? currentUser?.name ?? '' : ''}
                            required
                            minLength={2}
                            maxLength={20}
                            helperText={USERNAME_HELPER_TEXT}
                            validate={validateUsername}
                        />
                    </>
                )}
                {showLoginIdInput && (
                    <Input
                        label="Username"
                        name="loginId"
                        placeholder="Username"
                        autoComplete="username"
                        spellCheck={false}
                        inputClassName={Styles.emailInputWithAction}
                        trailing={(
                            <button
                                type="button"
                                className={Styles.restoreEmailButton}
                                onClick={handleRestoreSavedCredential}
                                aria-label="브라우저에 저장된 아이디 불러오기"
                            >
                                아이디 유지
                            </button>
                        )}
                        required
                    />
                )}
                {showEmailInput && (
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        inputMode="email"
                        spellCheck={false}
                        defaultValue={currentUser?.email ?? ''}
                        required
                    />
                )}
                <InputPassword
                    name="password"
                    placeholder="Password"
                    autoComplete={type === 'Login' ? 'current-password' : 'new-password'}
                    required
                />
                {submitError && <p className={Styles.submitError}>{submitError}</p>}
                <Button
                    type="button"
                    variant={buttonVariant}
                    size={"xxlg"}
                    text={buttonText}
                    bold
                    disabled={!isFormReady}
                    onClick={() => formRef.current?.requestSubmit()}
                />
            </form>
        </div>
    )
}
