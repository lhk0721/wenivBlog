import { useEffect } from 'react'
import Styles from './AlertBox.module.css'
import Button from '../buttons/Button.jsx'
import _delete from '../../assets/icons/icon-delete-white-1.svg'
import activeDelete from '../../assets/icons/icon-delete-white.svg'

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
