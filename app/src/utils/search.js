const HANGUL_BASE = 0xac00
const HANGUL_LAST = 0xd7a3
const HANGUL_INITIAL_CONSONANTS = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
    'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
]

function normalizeWhitespace(value) {
    return String(value ?? '')
        .trim()
        .replace(/\s+/g, ' ')
        .toLowerCase()
}

function removeWhitespace(value) {
    return normalizeWhitespace(value).replace(/\s+/g, '')
}

function getInitialConsonants(value) {
    return Array.from(String(value ?? ''))
        .map((character) => {
            const codePoint = character.charCodeAt(0)

            if (codePoint >= HANGUL_BASE && codePoint <= HANGUL_LAST) {
                const syllableIndex = codePoint - HANGUL_BASE
                return HANGUL_INITIAL_CONSONANTS[Math.floor(syllableIndex / 588)]
            }

            return /\s/.test(character) ? '' : character.toLowerCase()
        })
        .join('')
}

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function getSearchTokens(query) {
    const normalizedQuery = normalizeWhitespace(query)

    if (!normalizedQuery) {
        return []
    }

    return Array.from(new Set(normalizedQuery.split(' ').filter(Boolean)))
}

function matchesSearchToken(target, token) {
    const normalizedTarget = normalizeWhitespace(target)
    const compactTarget = removeWhitespace(target)
    const compactToken = removeWhitespace(token)

    if (!compactToken) {
        return true
    }

    return (
        normalizedTarget.includes(token)
        || compactTarget.includes(compactToken)
        || getInitialConsonants(target).includes(compactToken)
    )
}

export function matchesSearchQuery(targets, query) {
    const tokens = getSearchTokens(query)

    if (tokens.length === 0) {
        return true
    }

    return tokens.every((token) =>
        targets.some((target) => matchesSearchToken(target, token)),
    )
}

export function getHighlightPattern(query) {
    const tokens = getSearchTokens(query)
        .filter((token) => /[a-z0-9가-힣]/i.test(token))
        .sort((left, right) => right.length - left.length)

    if (tokens.length === 0) {
        return null
    }

    return new RegExp(`(${tokens.map(escapeRegExp).join('|')})`, 'gi')
}
