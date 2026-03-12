import { apiRequest } from './client.js'
import { getNumericPostId, isSamePostIdentifier } from '../utils/postId.js'

function normalizeBlogPayload(payload) {
    const normalizeText = (value) => String(value ?? '')
        .replace(/\r\n/g, '\n')
        .trim()

    const normalizedPayload = {
        title: normalizeText(payload?.title),
        content: normalizeText(payload?.content),
    }

    const author = normalizeText(payload?.author)
    const email = normalizeText(payload?.email)

    if (author) {
        normalizedPayload.author = author
    }

    if (email) {
        normalizedPayload.email = email
    }

    return normalizedPayload
}

export function getBlogList() {
    return apiRequest('/blog')
}

export function getBlogDetail(postId) {
    const numericPostId = getNumericPostId(postId)

    if (numericPostId) {
        return apiRequest(`/blog/${numericPostId}`)
    }

    return getBlogList().then((blogs) => {
        const matchedBlog = Array.isArray(blogs)
            ? blogs.find((blog) => isSamePostIdentifier(blog, postId))
            : null

        if (!matchedBlog) {
            throw new Error('게시글을 찾을 수 없습니다.')
        }

        return matchedBlog
    })
}

export function createBlog(payload) {
    return apiRequest('/blog', {
        method: 'POST',
        body: JSON.stringify(normalizeBlogPayload(payload)),
    })
}

export function updateBlog(postId, payload) {
    const numericPostId = getNumericPostId(postId)

    if (!numericPostId) {
        throw new Error('이 게시글은 현재 수정 API를 지원하지 않습니다.')
    }

    return apiRequest(`/blog/${numericPostId}`, {
        method: 'PUT',
        body: JSON.stringify(normalizeBlogPayload(payload)),
    })
}

export function deleteBlog(postId) {
    const numericPostId = getNumericPostId(postId)

    if (!numericPostId) {
        throw new Error('이 게시글은 현재 삭제 API를 지원하지 않습니다.')
    }

    return apiRequest(`/blog/${numericPostId}`, {
        method: 'DELETE',
    })
}
