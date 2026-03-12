import { toRoutePostId } from '../utils/postId.js'

export const PATHS = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    MYPAGE: '/mypage',
    POST_VIEW: '/post/:postId',
    POST_WRITE: '/write',
    ALERT: '/alert',
    COMPONENT_TEST: '/component-test',
}

export function getPostViewPath(postId) {
    return `/post/${toRoutePostId(postId)}`
}
