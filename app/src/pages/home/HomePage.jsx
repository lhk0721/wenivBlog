import { Link } from 'react-router-dom'
import PageContainer from '../../components/common/PageContainer.jsx'

const POSTS = [
    { id: 1, title: 'React 라우팅 패턴 정리', excerpt: '프로젝트에서 자주 쓰는 라우트 패턴을 정리했습니다.', date: '2026-03-01' },
    { id: 2, title: 'Node API 에러 핸들링', excerpt: '실무 기준으로 분기한 에러 처리 방법을 공유합니다.', date: '2026-02-25' },
    { id: 3, title: '프론트엔드 접근성 체크리스트', excerpt: '버튼, 라벨, 포커스 관점에서 기본 점검 항목입니다.', date: '2026-02-20' },
]

function HomePage() {
    return (
        <PageContainer title="Home" subtitle="최근 게시글">
            <div className="post-list">
                {POSTS.map((post) => (
                    <article key={post.id} className="post-card">
                        <h2>
                            <Link to={`/post/${post.id}`}>{post.title}</Link>
                        </h2>
                        <p>{post.excerpt}</p>
                        <time dateTime={post.date}>{post.date}</time>
                    </article>
                ))}
            </div>
        </PageContainer>
    )
}

export default HomePage
