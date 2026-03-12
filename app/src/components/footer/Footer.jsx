import Styles from './Footer.module.css'
import Button from '../buttons/Button.jsx'
import ArrowTop from '../../assets/icons/ArrowTop.svg'

/**
 * 하단 저작권 정보와 최상단 이동 버튼을 렌더링합니다.
 *
 * @returns {JSX.Element}
 */
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
