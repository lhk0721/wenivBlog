const DEFAULT_BASE_URL = 'https://dev.wenivops.co.kr/services/fastapi-crud/1'
const AUTH_TOKENS_STORAGE_KEY = 'winivBlog.authTokens'

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? DEFAULT_BASE_URL).replace(/\/$/, '')

function getStorage() {
    if (typeof window === 'undefined') {
        return null
    }

    return window.localStorage
}

export function getStoredAuthTokens() {
    const storage = getStorage()

    if (!storage) {
        return null
    }

    const storedValue = storage.getItem(AUTH_TOKENS_STORAGE_KEY)

    if (!storedValue) {
        return null
    }

    try {
        return JSON.parse(storedValue)
    } catch {
        storage.removeItem(AUTH_TOKENS_STORAGE_KEY)
        return null
    }
}

export function setStoredAuthTokens(tokens) {
    const storage = getStorage()

    if (!storage) {
        return
    }

    storage.setItem(AUTH_TOKENS_STORAGE_KEY, JSON.stringify(tokens))
}

export function clearStoredAuthTokens() {
    const storage = getStorage()

    if (!storage) {
        return
    }

    storage.removeItem(AUTH_TOKENS_STORAGE_KEY)
}

export function getAccessToken() {
    return getStoredAuthTokens()?.accessToken ?? ''
}

async function parseResponseBody(response) {
    const contentType = response.headers.get('content-type') ?? ''

    if (contentType.includes('application/json')) {
        return response.json()
    }

    const text = await response.text()
    return text ? { message: text } : null
}

export async function apiRequest(path, options = {}) {
    const accessToken = options.auth === false ? '' : getAccessToken()
    const response = await fetch(`${API_BASE_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            ...(options.headers ?? {}),
        },
        ...options,
    })

    const data = await parseResponseBody(response)

    if (!response.ok) {
        const error = new Error(extractErrorMessage(data, response.status))
        error.status = response.status
        error.data = data
        throw error
    }

    return data
}

function extractErrorMessage(data, status) {
    if (Array.isArray(data?.detail) && data.detail.length > 0) {
        const firstDetail = data.detail[0]
        if (typeof firstDetail?.msg === 'string') {
            return firstDetail.msg
        }
    }

    if (typeof data?.detail === 'string') {
        return data.detail
    }

    if (typeof data?.message === 'string') {
        return data.message
    }

    return status >= 500
        ? '서버 요청 처리 중 오류가 발생했습니다.'
        : '요청을 처리하지 못했습니다.'
}
