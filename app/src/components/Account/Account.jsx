import Styles from './Account.module.css'
import Profile from '../profile/Profile.jsx'
import Input from '../inputs/Input.jsx'
import InputPassword from '../inputs/InputPassword.jsx'
import Button from '../buttons/Button.jsx'

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
    const showUsernameInput = type === 'Register' || type === 'Mypage'
    const containerClassName = type === 'Mypage'
        ? `${Styles.container} ${Styles.containerMypage}`
        : Styles.container
    const buttonTextMap = {
        Login: 'LOGIN',
        Register: 'REGISTER',
        Mypage: 'UPDATE',
    }
    const buttonText = buttonTextMap[type] ?? 'SUBMIT'

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return(
        <div className={containerClassName}>
            <form className={Styles.contents} onSubmit={handleSubmit}>
                <h2 className={Styles.type}>{type?.toUpperCase()}</h2>
                {showUsernameInput && (
                    <>
                        <Profile
                            editable={true}
                            size={'lg'}
                        />
                        <Input
                            label="Username"
                            name="username"
                            placeholder="Username"
                        />
                    </>
                )}
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    required
                />
                <InputPassword
                    name="password"
                    placeholder="Password"
                    autoComplete={type === 'Login' ? 'current-password' : 'new-password'}
                    required
                />
                <Button
                    type="submit"
                    variant="solid"
                    size={"xxlg"}
                    text={buttonText}
                    bold
                />
            </form>
        </div>
    )
}
