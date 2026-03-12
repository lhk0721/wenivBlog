function normalizeIdentity(value) {
    return String(value ?? '').trim().toLowerCase()
}

export function canManagePost({ authorName, currentUser }) {
    const normalizedAuthor = normalizeIdentity(authorName)

    if (!normalizedAuthor) {
        return false
    }

    const candidates = [
        currentUser?.username,
        currentUser?.name,
        currentUser?.email,
    ]

    return candidates.some((candidate) => normalizeIdentity(candidate) === normalizedAuthor)
}
