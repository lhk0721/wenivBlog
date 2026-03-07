import PageContainer from '../../components/common/PageContainer.jsx'

function RegisterPage() {
    return (
        <PageContainer title="Register" subtitle="새 계정을 생성하세요">
            <form className="form-card" onSubmit={(event) => event.preventDefault()}>
                <label htmlFor="register-name">이름</label>
                <input id="register-name" type="text" placeholder="홍길동" required />

                <label htmlFor="register-email">이메일</label>
                <input id="register-email" type="email" placeholder="email@example.com" required />

                <label htmlFor="register-password">비밀번호</label>
                <input id="register-password" type="password" placeholder="8자 이상 입력" required />

                <button type="submit">회원가입</button>
            </form>
        </PageContainer>
    )
}

export default RegisterPage
