import Styles from './Profile.module.css'
import noImg from '../../assets/images/noimg.png'
import Button from '../buttons/Button'
import imageIcon from '../../assets/icons/icon-image.svg'
import activeImageIcon from '../../assets/icons/icon-image-primary.svg'
import { useAuth } from '../../contexts/AuthContext.jsx'

/**
 * 프로필 이미지를 표시하고, 편집 가능 시 편집 버튼을 노출합니다.
 * `size`가 `sm`이면 자동으로 편집 버튼이 비활성화됩니다.(헤더용)
 *
 * @param {Object} props
 * @param {string} [props.image] 프로필 이미지 URL
 * @param {boolean} [props.editable=false] 편집 버튼 노출 여부
 * @param {'lg'| 'md' | 'sm'} [props.size='lg'] 프로필 크기
 * @param {string} [props.className=''] 추가 클래스 이름
 * @param {() => void} [props.onClick] 클릭 핸들러
 * @returns {JSX.Element}
 */
export default function Profile({ image, editable = false, size = 'lg', className = '', onClick }){
    const { currentUser } = useAuth()
    const isSm = size === 'sm'
    const isEditable = isSm ? false : editable
    const resolvedImage = image || currentUser?.profileImage || noImg
    const isClickable = typeof onClick === 'function'
    const containerClass =
        size === 'sm'
            ? Styles.containerSm
            : size === 'md'
              ? Styles.containerMd
              : Styles.containerLg
    const imageClass =
        size === 'sm'
            ? Styles.profileImgSm
            : size === 'md'
              ? Styles.profileImgMd
              : Styles.profileImgLg

    return(
        <div
            className={`${Styles.container} ${containerClass} ${isClickable ? Styles.clickable : ''} ${className}`}
            onClick={onClick}
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : undefined}
            onKeyDown={
                isClickable
                    ? (event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault()
                              onClick()
                          }
                      }
                    : undefined
            }
        >
            <img 
                src={resolvedImage} 
                alt="Profile img" 
                className={`${Styles.proFileImg} ${imageClass}`}
            />

            {isEditable && 
                <Button
                    variant='round'
                    icon={imageIcon}
                    activeIcon={activeImageIcon}
                    iconWidth={'2rem'}
                    size={'sm'}
                    className={Styles.editButton}
                />
            }

        </div>
    )
}
