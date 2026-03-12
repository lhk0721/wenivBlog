import { apiRequest } from './client.js'

function normalizeCredentials(payload) {
    const normalizedPayload = {
        username: payload?.username ?? payload?.email ?? payload?.name ?? '',
        password: payload?.password ?? '',
    }

    if (typeof payload?.email === 'string' && payload.email.trim()) {
        normalizedPayload.email = payload.email.trim()
    }

    if (typeof payload?.profileImage === 'string' && payload.profileImage.trim()) {
        normalizedPayload.profileImage = payload.profileImage.trim()
    }

    return normalizedPayload
}

export function signup(payload) {
    return apiRequest('/signup', {
        method: 'POST',
        auth: false,
        body: JSON.stringify(normalizeCredentials(payload)),
    })
}

export function login(payload) {
    return apiRequest('/login', {
        method: 'POST',
        auth: false,
        body: JSON.stringify(normalizeCredentials(payload)),
    })
}
