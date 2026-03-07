import PageContainer from '../../components/common/PageContainer.jsx'

function LoginPage() {
    return (
        <PageContainer title="Login" subtitle="계정에 로그인하세요">
            <form className="form-card" onSubmit={(event) => event.preventDefault()}>
                <label htmlFor="login-email">이메일</label>
                <input id="login-email" type="email" placeholder="email@example.com" required />

                <label htmlFor="login-password">비밀번호</label>
                <input id="login-password" type="password" placeholder="비밀번호 입력" required />

                <button type="submit">로그인</button>
            </form>
        </PageContainer>
    )
}

export default LoginPage
