import { createContext, useContext, useRef, useState } from 'react'
import AlertBox from '../components/alertbox/AlertBox.jsx'

const AlertContext = createContext(null)

const initialAlertState = {
    isOpen: false,
    alertTitle: '',
    alertContents: '',
    confirmText: '확인',
    cancelText: '취소',
    showCancel: false,
    closeOnOverlayClick: true,
    confirmVariant: 'solid-primary',
}

export function AlertProvider({ children }) {
    const [alertState, setAlertState] = useState(initialAlertState)
    const resolverRef = useRef(null)

    const closeAlert = (result = false) => {
        setAlertState((prevState) => ({
            ...prevState,
            isOpen: false,
        }))

        if (resolverRef.current) {
            resolverRef.current(result)
            resolverRef.current = null
        }
    }

    const openAlert = (options = {}) => {
        setAlertState({
            ...initialAlertState,
            ...options,
            isOpen: true,
        })

        return new Promise((resolve) => {
            resolverRef.current = resolve
        })
    }

    const alert = (options = {}) => {
        return openAlert({
            ...options,
            showCancel: false,
            confirmVariant: options.confirmVariant ?? 'solid-primary',
        })
    }

    const confirm = (options = {}) => {
        return openAlert({
            ...options,
            showCancel: true,
            confirmVariant: options.confirmVariant ?? 'solid-negative',
        })
    }

    const handleConfirm = () => {
        alertState.onConfirm?.()
        closeAlert(true)
    }

    const handleCancel = () => {
        alertState.onCancel?.()
        closeAlert(false)
    }

    return (
        <AlertContext.Provider
            value={{
                openAlert,
                closeAlert,
                alert,
                confirm,
            }}
        >
            {children}
            <AlertBox
                {...alertState}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                onClose={handleCancel}
            />
        </AlertContext.Provider>
    )
}

export function useAlert() {
    const context = useContext(AlertContext)

    if (!context) {
        throw new Error('useAlert must be used within AlertProvider')
    }

    return context
}
