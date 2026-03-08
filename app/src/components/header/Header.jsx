import Styles from './Header.module.css'
import Logo from '../../assets/icons/Logo.svg'
import Profile from '../Profile/Profile'
import Button from '../buttons/Button'

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
                        
                    />
                }
            </div>
        </header>
    )
}
