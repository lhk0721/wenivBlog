import PageContainer from '../../components/common/PageContainer.jsx'

const MY_POSTS = [
    { id: 1, title: '이번 주 회고', status: '공개' },
    { id: 2, title: 'Next.js 비교 정리', status: '임시저장' },
    { id: 3, title: 'Vite 설정 팁', status: '공개' },
]

function MyPage() {
    return (
        <PageContainer title="Mypage" subtitle="프로필과 작성 글 관리">
            <section className="profile-card">
                <h2>김위니브</h2>
                <p>Frontend Developer</p>
                <p>게시글 12개 · 팔로워 103명</p>
            </section>

            <section className="table-card">
                <h3>내 게시글</h3>
                <ul className="simple-list">
                    {MY_POSTS.map((post) => (
                        <li key={post.id}>
                            <span>{post.title}</span>
                            <strong>{post.status}</strong>
                        </li>
                    ))}
                </ul>
            </section>
        </PageContainer>
    )
}

export default MyPage
