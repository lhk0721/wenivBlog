import Styles from './Footer.module.css'
import Button from '../buttons/Button.jsx'
import ArrowTop from '../../assets/icons/ArrowTop.svg'

export default function Footer(){
    return(
        <div className={Styles.footer}>
            <p className={Styles.copyright}>©Wenaiv Corp.</p>
            <Button
                variant = 'primary'
                size = 'top'
                text = 'Top'
                icon={ArrowTop}
                activeIcon={ArrowTop}
                className={Styles.top}
            />
        </div>
    )
}