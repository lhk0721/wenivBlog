import { useEffect } from 'react'
import Styles from './AlertBox.module.css'
import Button from '../buttons/Button.jsx'
import _delete from '../../assets/icons/icon-delete-white-1.svg'
import activeDelete from '../../assets/icons/icon-delete-white.svg'

/**
 * @typedef {Object} AlertBoxProps
 * @property {boolean} [isOpen] 모달 노출 여부
 * @property {React.ReactNode} [alertTitle] 알림 제목
 * @property {React.ReactNode} [alertContents] 알림 본문
 * @property {string} [confirmText='확인'] 확인 버튼 라벨
 * @property {string} [cancelText='취소'] 취소 버튼 라벨
 * @property {boolean} [showCancel=false] 취소 버튼 노출 여부
 * @property {() => void} [onConfirm] 확인 버튼 클릭 핸들러
 * @property {() => void} [onCancel] 취소 버튼 클릭 핸들러
 * @property {() => void} [onClose] 오버레이 또는 ESC 닫기 핸들러
 * @property {boolean} [closeOnOverlayClick=true] 배경 클릭 닫기 여부
 * @property {'solid-primary' | 'solid-negative' | 'primary' | 'negative' | 'subtle-primary' | 'subtle-negative' | 'round'} [confirmVariant='solid-negative'] 확인 버튼 스타일
 */

/**
 * 전역 알림/확인 모달 UI를 렌더링합니다.
 *
 * @param {AlertBoxProps} props
 * @returns {JSX.Element | null}
 */
export default function AlertBox({
    isOpen,
    alertTitle,
    alertContents,
    confirmText = '확인',
    cancelText = '취소',
    showCancel = false,
    onConfirm,
    onCancel,
    onClose,
    closeOnOverlayClick = true,
    confirmVariant = 'solid-negative',
}) {
    useEffect(() => {
        if (!isOpen) {
            return undefined
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose?.()
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onClose])

    if (!isOpen) {
        return null
    }

    const handleOverlayClick = () => {
        if (!closeOnOverlayClick) {
            return
        }

        onClose?.()
    }

    const isNegativeAction = confirmVariant === 'solid-negative'

    return(
        <div
            className={Styles.overlay}
            onClick={handleOverlayClick}
            role='presentation'
        >
            <div
                className={Styles.container}
                onClick={(event) => event.stopPropagation()}
                role='alertdialog'
                aria-modal='true'
                aria-labelledby='alertbox-title'
                aria-describedby='alertbox-contents'
            >
                <h2
                    id='alertbox-title'
                    className={Styles.alertTitle}
                >
                    {alertTitle}
                </h2>
                <div
                    id='alertbox-contents'
                    className={Styles.alertContents}
                >
                    {alertContents}
                </div>
                <div className={Styles.action}>
                    {showCancel && (
                        <Button
                            variant='subtle-primary'
                            size='md'
                            text={cancelText}
                            onClick={onCancel}
                        />
                    )}
                    <Button
                        variant={confirmVariant}
                        size='md'
                        text={confirmText}
                        iconHeight={isNegativeAction ? '2.15rem' : undefined}
                        icon={isNegativeAction ? _delete : undefined}
                        activeIcon={isNegativeAction ? activeDelete : undefined}
                        onClick={onConfirm}
                    />
                </div>
            </div>
        </div>
    )
}
