function normalizeIdentifier(value) {
    return String(value ?? '').trim()
}

export function isIntegerLike(value) {
    return /^\d+$/.test(normalizeIdentifier(value))
}

export function resolveRoutePostId(blog) {
    const candidates = [blog?.index, blog?.id, blog?._id]

    for (const candidate of candidates) {
        const normalized = normalizeIdentifier(candidate)

        if (normalized) {
            return normalized
        }
    }

    return ''
}

export function getNumericPostId(postId) {
    const normalized = normalizeIdentifier(postId)
    return isIntegerLike(normalized) ? normalized : ''
}

export function isSamePostIdentifier(blog, postId) {
    const normalizedPostId = normalizeIdentifier(postId)

    if (!normalizedPostId) {
        return false
    }

    return [blog?.index, blog?.id, blog?._id]
        .map(normalizeIdentifier)
        .some((candidate) => candidate === normalizedPostId)
}

export function toRoutePostId(postId) {
    return normalizeIdentifier(postId)
}
