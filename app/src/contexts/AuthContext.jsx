import { createContext, useContext, useState } from 'react'
import profileImage from '../assets/images/profile.png'

const AuthContext = createContext(null)

const initialUser = {
    name: '이현규',
    profileImage,
}

export function AuthProvider({ children }) {
    const [currentUser] = useState(initialUser)

    const value = {
        currentUser,
        isLoggedIn: Boolean(currentUser),
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }

    return context
}
