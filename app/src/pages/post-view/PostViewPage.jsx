import { Link, useParams } from 'react-router-dom'
import PageContainer from '../../components/common/PageContainer.jsx'

function PostViewPage() {
    const { postId } = useParams()

    return (
        <PageContainer title="Post View" subtitle={`게시글 #${postId}`}>
            <article className="article-card">
                <h2>React와 Node로 블로그 만들기</h2>
                <p className="meta">작성일 2026-03-02 · 조회수 128</p>
                <p>
                    이 글에서는 React 프론트엔드와 Node 백엔드를 연결해 블로그 구조를 구성하는 기본 흐름을 다룹니다.
                    라우팅, 폼 처리, 데이터 표현을 작은 단위로 나눠 구현합니다.
                </p>
                <div className="button-row">
                    <Link className="button-link" to="/write">
                        수정하기
                    </Link>
                    <Link className="button-link subtle" to="/">
                        목록으로
                    </Link>
                </div>
            </article>
        </PageContainer>
    )
}

export default PostViewPage
