import { API_BASE_URL } from '../api/client.js'
import { resolveRoutePostId } from './postId.js'

function splitContentParagraphs(content) {
    return String(content ?? '')
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
}

function resolveThumbnailUrl(thumbnail) {
    if (typeof thumbnail !== 'string' || thumbnail.trim() === '') {
        return ''
    }

    try {
        return new URL(thumbnail, `${API_BASE_URL}/`).toString()
    } catch {
        return ''
    }
}

export function mapBlogSummary(blog) {
    const description = splitContentParagraphs(blog?.content)[0] ?? '본문 요약이 없습니다.'
    const dateString = [blog?.date, blog?.time].filter(Boolean).join(' ').trim() || String(blog?.date ?? '')

    return {
        id: resolveRoutePostId(blog),
        thumbnail: resolveThumbnailUrl(blog?.thumbnail),
        title: blog?.title ?? '제목이 없는 게시글입니다.',
        description,
        dateString,
        authorName: blog?.author ?? '작성자 미정',
        Categories: [],
    }
}

export function mapBlogDetail(blog) {
    return {
        ...mapBlogSummary(blog),
        userContents: splitContentParagraphs(blog?.content).map((paragraph, index) => ({
            id: `paragraph-${index + 1}`,
            type: 'text',
            content: paragraph,
        })),
        viewsCount: blog?.views_count ?? '',
        email: blog?.email ?? '',
    }
}
