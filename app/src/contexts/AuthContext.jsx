import { createContext, useContext, useMemo, useState } from 'react'
import profileImage from '../assets/images/profile.png'

const AuthContext = createContext(null)
const AUTH_STORAGE_KEY = 'winivBlog.currentUser'

const defaultUser = {
    name: '이현규',
    email: 'neighbor@example.com',
    profileImage,
    socialLinks: {
        facebook: '',
        twitter: '',
        instagram: '',
        github: '',
    },
}

function getStoredUser() {
    if (typeof window === 'undefined') {
        return null
    }

    const storedValue = window.localStorage.getItem(AUTH_STORAGE_KEY)

    if (!storedValue) {
        return null
    }

    try {
        return JSON.parse(storedValue)
    } catch {
        window.localStorage.removeItem(AUTH_STORAGE_KEY)
        return null
    }
}

function persistUser(user) {
    if (typeof window === 'undefined') {
        return
    }

    if (user) {
        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
        return
    }

    window.localStorage.removeItem(AUTH_STORAGE_KEY)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(() => getStoredUser())

    const updateCurrentUser = (nextUserFields) => {
        setCurrentUser((prevUser) => {
            if (!prevUser) {
                return prevUser
            }

            const nextUser = {
                ...prevUser,
                ...nextUserFields,
            }

            persistUser(nextUser)
            return nextUser
        })
    }

    const login = ({ email, name }) => {
        const nextUser = {
            ...defaultUser,
            email,
            name: name || defaultUser.name,
        }

        setCurrentUser(nextUser)
        persistUser(nextUser)
    }

    const register = ({ email, name, profileImage: nextProfileImage }) => {
        const nextUser = {
            ...defaultUser,
            email,
            name: name || defaultUser.name,
            profileImage: nextProfileImage || defaultUser.profileImage,
        }

        setCurrentUser(nextUser)
        persistUser(nextUser)
    }

    const logout = () => {
        setCurrentUser(null)
        persistUser(null)
    }

    const value = useMemo(() => ({
        currentUser,
        isLoggedIn: Boolean(currentUser),
        updateCurrentUser,
        login,
        register,
        logout,
    }), [currentUser])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }

    return context
}
