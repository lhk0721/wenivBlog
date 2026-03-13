import Button from '../../components/buttons/Button.jsx'
import Input from '../../components/inputs/Input.jsx'
import InputPassword from '../../components/inputs/InputPassword.jsx'
import Categories from '../../components/categories/Categories.jsx'
import Author from '../../components/author/Author.jsx'
import Profile from '../../components/profile/Profile.jsx'
import Header from '../../components/header/Header.jsx'
import Footer from '../../components/footer/Footer.jsx'
import Banner from '../../components/Banner/Banner.jsx'
import About from '../../components/about/About.jsx'
import Card from '../../components/card/Card.jsx'
import ContentLayout from '../../components/content-layout/ContentLayout.jsx'
import Account from '../../components/Account/Account.jsx'
import Post from '../../components/post/Post.jsx'
import Write from '../../components/write/Write.jsx'
import CardGroup from '../../components/card/CardGroup.jsx'
import PageContainer from '../../components/common/PageContainer.jsx'
import icon from '../../assets/icons/icon-save.svg'
import activeIcon from '../../assets/icons/icon-save-white.svg'
import arrowTop from '../../assets/icons/ArrowTop.svg'
import like from '../../assets/icons/icon-like.svg'
import likeWhite from '../../assets/icons/icon-like-white.svg'
import image from '../../assets/icons/icon-image.svg'
import Seo from '../../seo/Seo.jsx'
import postImg1 from '../../assets/images/post-img1.png'
import postImg2 from '../../assets/images/post-img2.png'
import postImg3 from '../../assets/images/post-img3.png'
import postImg4 from '../../assets/images/post-img4.png'
import postImg5 from '../../assets/images/post-img5.png'
import postImg6 from '../../assets/images/post-img6.png'

const categories = [
    { id: 1, name: 'Life' },
    { id: 2, name: 'Style' },
    { id: 3, name: 'Tech' },
    { id: 4, name: 'Music' },
    { id: 5, name: 'Sport' },
    { id: 6, name: 'Photo' },
    { id: 7, name: 'Develop' },
]

const postImages = [postImg1, postImg2, postImg3, postImg4, postImg5, postImg6]

const getRandomPostImage = () => {
    const randomIndex = Math.floor(Math.random() * postImages.length)
    return postImages[randomIndex]
}

const createUserContents = (title) => [
    {
        id: 1,
        type: 'text',
        content: `${title}의 도입부입니다. 본문 첫 단락이 자연스럽게 이어지는지 확인하기 위한 테스트 텍스트입니다.`,
    },
    {
        id: 2,
        type: 'image',
        src: getRandomPostImage(),
        alt: `${title} 본문 이미지`,
    },
    {
        id: 3,
        type: 'text',
        content: '이미지 아래에 이어지는 본문입니다. 텍스트와 이미지가 섞인 게시글 레이아웃을 검증하기 위한 예시 데이터입니다.',
    },
]

const mockArticle = {
    id: 1,
    dateString: '2026-03-10',
    title: 'Card 컴포넌트 CSS 테스트용 게시글 제목입니다.',
    thumbnail: getRandomPostImage(),
    Categories: [
        { id: 1, name: 'Life' },
        { id: 3, name: 'Tech' },
        { id: 7, name: 'Develop' },
    ],
    description: '카드 레이아웃, 이미지 비율, 텍스트 줄바꿈, 카테고리 간격을 확인하기 위한 테스트용 게시글입니다.',
    userContents: createUserContents('Card 컴포넌트 CSS 테스트용 게시글입니다.'),
}

const articleList = [
    mockArticle,
    {
        id: 2,
        dateString: '2026-03-09',
        title: '두 번째 카드 테스트용 게시글입니다.',
        thumbnail: getRandomPostImage(),
        Categories: [
            { id: 2, name: 'Style' },
            { id: 6, name: 'Photo' },
        ],
        description: 'CardGroup에서 3열 배치와 카드 간 간격을 확인하기 위한 두 번째 테스트 데이터입니다.',
        userContents: createUserContents('두 번째 카드 테스트용 게시글입니다.'),
    },
    {
        id: 3,
        dateString: '2026-03-08',
        title: '세 번째 카드 테스트용 게시글입니다.',
        thumbnail: getRandomPostImage(),
        Categories: [
            { id: 4, name: 'Music' },
            { id: 5, name: 'Sport' },
        ],
        description: '목록 렌더링과 key 처리, 줄바꿈 상태를 확인하기 위한 세 번째 테스트 데이터입니다.',
        userContents: createUserContents('세 번째 카드 테스트용 게시글입니다.'),
    },
    {
        id: 4,
        dateString: '2026-03-07',
        title: '네 번째 카드 테스트용 게시글입니다.',
        thumbnail: getRandomPostImage(),
        Categories: [
            { id: 1, name: 'Life' },
            { id: 4, name: 'Music' },
        ],
        description: '카드 그룹 두 번째 행 시작 지점을 확인하기 위한 네 번째 테스트 데이터입니다.',
        userContents: createUserContents('네 번째 카드 테스트용 게시글입니다.'),
    },
    {
        id: 5,
        dateString: '2026-03-06',
        title: '다섯 번째 카드 테스트용 게시글입니다.',
        thumbnail: getRandomPostImage(),
        Categories: [
            { id: 3, name: 'Tech' },
            { id: 7, name: 'Develop' },
        ],
        description: '여러 줄 카드 배치와 본문 길이 차이를 확인하기 위한 다섯 번째 테스트 데이터입니다.',
        userContents: createUserContents('다섯 번째 카드 테스트용 게시글입니다.'),
    },
    {
        id: 6,
        dateString: '2026-03-05',
        title: '여섯 번째 카드 테스트용 게시글입니다.',
        thumbnail: getRandomPostImage(),
        Categories: [
            { id: 2, name: 'Style' },
            { id: 5, name: 'Sport' },
        ],
        description: '카드 썸네일 랜덤 이미지 적용 상태를 확인하기 위한 여섯 번째 테스트 데이터입니다.',
        userContents: createUserContents('여섯 번째 카드 테스트용 게시글입니다.'),
    },
    {
        id: 7,
        dateString: '2026-03-04',
        title: '일곱 번째 카드 테스트용 게시글입니다.',
        thumbnail: getRandomPostImage(),
        Categories: [
            { id: 6, name: 'Photo' },
            { id: 7, name: 'Develop' },
        ],
        description: '마지막 카드가 단독 열에 배치될 때 레이아웃이 자연스러운지 보기 위한 일곱 번째 테스트 데이터입니다.',
        userContents: createUserContents('일곱 번째 카드 테스트용 게시글입니다.'),
    },
]

function ComponentTestPage() {
    return (
        <>
            <Seo
                title="Component Test Page"
                description="임시 테스트용 컴포넌트 샘플 페이지입니다."
                path="/component-test"
                noindex
            />
            <PageContainer
                title="Component Test Page"
                subtitle="임시 테스트용으로 분리한 컴포넌트 샘플 모음입니다."
            >
                <Account type="Mypage" />

            <Button
                variant="primary"
                size="md"
                text="Save"
                icon={icon}
                activeIcon={activeIcon}
            />

            <Button
                variant="primary"
                size="top"
                text="Top"
                icon={arrowTop}
                activeIcon={arrowTop}
            />

            <Button
                variant="negative"
                size="lg"
                text="Like"
                icon={like}
                activeIcon={likeWhite}
            />

            <Button
                variant="round"
                size="sm"
                iconHeight="2.15rem"
                icon={image}
            />

            <Button
                variant="subtle-primary"
                size="md"
                iconHeight="2.15rem"
                icon={like}
                activeIcon={likeWhite}
            />

            <Button
                variant="subtle-negative"
                size="md"
                iconHeight="2.15rem"
                icon={like}
                activeIcon={likeWhite}
            />

            <Input
                label="Email"
                type="email"
                name="email"
                placeholder="이메일을 입력해 주세요"
            />

            <Input
                label="Username"
                name="username"
                placeholder="사용자 이름을 입력해 주세요"
            />

            <InputPassword
                label="Password"
                name="password"
                placeholder="비밀번호를 입력해 주세요"
            />

            <Categories categories={categories} theme="positive" />

            <Author dateString="2022-01-01" />

            <Profile editable={true} />

            <Header />

            <Footer />

            <Banner
                variant="post"
                postDay="Apr."
                postMonth="24"
                postWeekday="Sunday"
            />

            <About />

            <Card article={mockArticle} />

            <ContentLayout>
                <Post article={mockArticle} />
            </ContentLayout>

            <ContentLayout>
                <Write />
            </ContentLayout>

                <CardGroup articleList={articleList} />
            </PageContainer>
        </>
    )
}

export default ComponentTestPage
