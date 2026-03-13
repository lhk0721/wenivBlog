const SITE_NAME = 'My BLOG'
const DEFAULT_DESCRIPTION = '기록과 기술, 일상의 관찰을 차곡차곡 쌓아가는 개인 블로그입니다.'

function normalizeSiteUrl(value) {
    if (typeof value !== 'string' || value.trim() === '') {
        return ''
    }

    try {
        return new URL(value).toString().replace(/\/$/, '')
    } catch {
        return ''
    }
}

export function getSiteOrigin() {
    const envSiteUrl = normalizeSiteUrl(import.meta.env.VITE_SITE_URL)

    if (envSiteUrl) {
        return envSiteUrl
    }

    if (typeof window !== 'undefined' && window.location?.origin) {
        return window.location.origin
    }

    return ''
}

export function buildCanonicalUrl(pathname = '/') {
    const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`
    const origin = getSiteOrigin()

    if (!origin) {
        return normalizedPath
    }

    return new URL(normalizedPath, `${origin}/`).toString()
}

export function buildPageTitle(title) {
    const normalizedTitle = String(title ?? '').trim()

    if (!normalizedTitle || normalizedTitle === SITE_NAME) {
        return SITE_NAME
    }

    return `${normalizedTitle} | ${SITE_NAME}`
}

export function getSeoDefaults() {
    return {
        siteName: SITE_NAME,
        defaultDescription: DEFAULT_DESCRIPTION,
    }
}
