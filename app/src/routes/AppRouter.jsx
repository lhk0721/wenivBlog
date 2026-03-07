import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout.jsx'
import {
    AlertPage,
    HomePage,
    LoginPage,
    MyPage,
    PostViewPage,
    PostWritePage,
    RegisterPage,
} from '../pages/index.js'
import { PATHS } from './paths.js'

function withLayout(page) {
    return <MainLayout>{page}</MainLayout>
}

function AppRouter() {
    return (
        <Routes>
            <Route path={PATHS.HOME} element={withLayout(<HomePage />)} />
            <Route path={PATHS.LOGIN} element={withLayout(<LoginPage />)} />
            <Route path={PATHS.REGISTER} element={withLayout(<RegisterPage />)} />
            <Route path={PATHS.MYPAGE} element={withLayout(<MyPage />)} />
            <Route path={PATHS.POST_VIEW} element={withLayout(<PostViewPage />)} />
            <Route path={PATHS.POST_WRITE} element={withLayout(<PostWritePage />)} />
            <Route path={PATHS.ALERT} element={withLayout(<AlertPage />)} />
            <Route path="*" element={<Navigate to={PATHS.HOME} replace />} />
        </Routes>
    )
}

export default AppRouter
