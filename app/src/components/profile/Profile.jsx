import Styles from './Profile.module.css'
import noImg from '../../assets/images/noimg.png'
import Button from '../buttons/Button'
import imageIcon from '../../assets/icons/icon-image.svg'

export default function Profile({image, editable}){
    return(
        <div className={Styles.container}>
            <img 
                src={image || noImg} 
                alt="Profile img" 
                className={Styles.proFileImg}
            />

            {editable && 
                <Button
                    variant='round'
                    icon={imageIcon}
                    iconWidth={'2rem'}
                    size={'sm'}
                    className={Styles.editButton}
                />
            }

        </div>
    )
}
