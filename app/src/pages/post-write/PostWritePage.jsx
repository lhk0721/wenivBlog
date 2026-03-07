import PageContainer from '../../components/common/PageContainer.jsx'

function PostWritePage() {
    return (
        <PageContainer title="Post Write" subtitle="게시글 작성">
            <form className="form-card" onSubmit={(event) => event.preventDefault()}>
                <label htmlFor="post-title">제목</label>
                <input id="post-title" type="text" placeholder="제목을 입력하세요" required />

                <label htmlFor="post-category">카테고리</label>
                <select id="post-category" defaultValue="frontend">
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="etc">Etc</option>
                </select>

                <label htmlFor="post-content">내용</label>
                <textarea id="post-content" rows="10" placeholder="본문을 입력하세요" required />

                <div className="button-row">
                    <button type="submit">발행하기</button>
                    <button type="button" className="subtle-button">
                        임시저장
                    </button>
                </div>
            </form>
        </PageContainer>
    )
}

export default PostWritePage
