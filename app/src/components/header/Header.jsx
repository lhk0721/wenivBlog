import Styles from './Header.module.css'
import Logo from '../../assets/icons/Logo.svg'
import Profile from '../Profile/Profile'
import Button from '../buttons/Button'
import iconModify from '../../assets/icons/icon-modify-white.svg'
import iconLogout from '../../assets/icons/icon-logout.svg'
import iconLogin from '../../assets/icons/icon-login.svg'
import iconRegister from '../../assets/icons/icon-register.svg'


export default function Header({isLoggedIn}){
    return(
        <header className={Styles.header}>
            <img 
                src={Logo} 
                alt="My Blog"
                className={Styles.logo}
            />
            <div className={Styles.headerActions}>
                {isLoggedIn&&<Profile size='sm'/>} {/*prop*/}
                {isLoggedIn&&
                    <Button
                        variant='solid'
                        size='md'
                        iconHeight='1.6rem'
                        icon={iconModify}
                        text='Write'
                        bold={true}
                    />
                }
                {isLoggedIn&&
                    <Button
                        variant='subtle-primary'
                        size='md'
                        iconHeight='1.6rem'
                        icon={iconLogout}
                        text='Logout'
                        bold={true}
                    />
                }
                {!isLoggedIn&&
                    <Button
                        variant='subtle-primary'
                        size='md'
                        iconHeight='1.6rem'
                        icon={iconLogin}
                        text='Login'
                        bold={true}
                    />
                }
                {!isLoggedIn&&
                    <Button
                        variant='subtle-primary'
                        size='md'
                        iconHeight='1.6rem'
                        icon={iconRegister}
                        text='Register'
                        bold={true}
                    />
                }
                
            </div>
        </header>
    )
}
