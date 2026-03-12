import { createContext, useContext, useMemo, useState } from 'react'
import { login as loginRequest, signup as signupRequest } from '../api/auth.js'
import {
    clearStoredAuthTokens,
    setStoredAuthTokens,
} from '../api/client.js'
import profileImage from '../assets/images/profile.png'

const AuthContext = createContext(null)
const AUTH_STORAGE_KEY = 'winivBlog.currentUser'

const defaultUser = {
    username: 'neighbor1',
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

function normalizeStoredUser(user) {
    if (!user) {
        return null
    }

    return {
        ...defaultUser,
        ...user,
        username: user.username ?? user.name ?? '',
        name: user.name ?? user.username ?? defaultUser.name,
    }
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
        return normalizeStoredUser(JSON.parse(storedValue))
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

    const login = async ({ username, password, name }) => {
        const nextUsername = username?.trim?.() || name?.trim?.() || ''
        const response = await loginRequest({ username, password })
        const nextUser = {
            ...defaultUser,
            username: response?.username ?? nextUsername,
            email: response?.email ?? '',
            name: response?.username ?? nextUsername ?? defaultUser.name,
            profileImage: response?.profileImage ?? defaultUser.profileImage,
        }

        setStoredAuthTokens({
            accessToken: response?.access_token ?? '',
            refreshToken: response?.refresh_token ?? '',
        })
        setCurrentUser(nextUser)
        persistUser(nextUser)
        return response
    }

    const register = async ({ email, password, name, profileImage: nextProfileImage, username }) => {
        const nextUsername = username?.trim?.() || email?.trim?.() || name?.trim?.() || ''
        const signupResponse = await signupRequest({
            username: nextUsername,
            password,
        })
        const loginResponse = await loginRequest({
            username: nextUsername,
            password,
        })
        const nextUser = {
            ...defaultUser,
            username: loginResponse?.username ?? nextUsername,
            email: loginResponse?.email ?? email ?? '',
            name: loginResponse?.username ?? nextUsername ?? defaultUser.name,
            profileImage: loginResponse?.profileImage ?? (nextProfileImage || defaultUser.profileImage),
        }

        setStoredAuthTokens({
            accessToken: loginResponse?.access_token ?? '',
            refreshToken: loginResponse?.refresh_token ?? '',
        })
        setCurrentUser(nextUser)
        persistUser(nextUser)
        return {
            ...signupResponse,
            access_token: loginResponse?.access_token,
            refresh_token: loginResponse?.refresh_token,
        }
    }

    const logout = () => {
        setCurrentUser(null)
        persistUser(null)
        clearStoredAuthTokens()
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
