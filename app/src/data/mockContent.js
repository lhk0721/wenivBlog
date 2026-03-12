import postBackground1 from '../assets/images/post-background1.png'
import postBackground2 from '../assets/images/post-background2.png'
import postBackground3 from '../assets/images/post-background3.png'
import postBackground4 from '../assets/images/post-background4.png'
import postBackground5 from '../assets/images/post-background5.png'
import postBackground6 from '../assets/images/post-background6.png'
import postImage1 from '../assets/images/post-img1.png'
import postImage2 from '../assets/images/post-img2.png'
import postImage3 from '../assets/images/post-img3.png'

const categorySets = [
    [
        { id: 'life', name: 'Life' },
        { id: 'essay', name: 'Essay' },
    ],
    [
        { id: 'tech', name: 'Tech' },
        { id: 'react', name: 'React' },
    ],
    [
        { id: 'photo', name: 'Photo' },
        { id: 'travel', name: 'Travel' },
    ],
]

export const articles = [
    {
        id: 1,
        thumbnail: postBackground1,
        title: '빌드 시간을 줄이기 위해 먼저 한 일',
        dateString: '2026-03-01',
        Categories: categorySets[1],
        description: '측정부터 캐시 정리, 번들 분리까지 실제로 효과가 있던 순서대로 정리했습니다.',
    },
    {
        id: 2,
        thumbnail: postBackground2,
        title: '집중이 안 되는 날의 기록 방식',
        dateString: '2026-02-27',
        Categories: categorySets[0],
        description: '짧은 기록으로 흐름을 끊지 않으면서도 하루를 남기는 방법을 적었습니다.',
    },
    {
        id: 3,
        thumbnail: postBackground3,
        title: '사진 한 장이 글의 분위기를 바꾸는 순간',
        dateString: '2026-02-22',
        Categories: categorySets[2],
        description: '배경 이미지와 본문 이미지의 역할을 나눠서 화면 밀도를 조절한 사례입니다.',
    },
    {
        id: 4,
        thumbnail: postBackground4,
        title: '컴포넌트 경계를 다시 나눈 이유',
        dateString: '2026-02-19',
        Categories: categorySets[1],
        description: '레이아웃 책임과 도메인 책임을 분리하면서 유지보수가 쉬워졌습니다.',
    },
    {
        id: 5,
        thumbnail: postBackground5,
        title: '좋아하는 것들을 오래 남기는 블로그',
        dateString: '2026-02-14',
        Categories: categorySets[0],
        description: '짧은 메모가 글이 되고, 글이 다시 취향의 지도처럼 쌓이는 경험을 기록했습니다.',
    },
    {
        id: 6,
        thumbnail: postBackground6,
        title: '스크롤이 긴 화면에서 밀도를 유지하는 법',
        dateString: '2026-02-08',
        Categories: categorySets[2],
        description: '카드 간격, 최대 너비, 배너 높이 세 가지를 기준으로 화면 리듬을 맞췄습니다.',
    },
    {
        id: 7,
        thumbnail: postBackground1,
        title: '작은 유틸리티 CSS보다 중요한 것',
        dateString: '2026-02-03',
        Categories: categorySets[1],
        description: '공통 클래스보다 먼저 합의해야 할 것은 간격과 레이아웃 규칙이었습니다.',
    },
    {
        id: 8,
        thumbnail: postBackground2,
        title: '주말 오후에 적는 생활 로그',
        dateString: '2026-01-28',
        Categories: categorySets[0],
        description: '생산성보다 관찰을 우선할 때 기록이 훨씬 오래 남는다는 이야기를 담았습니다.',
    },
    {
        id: 9,
        thumbnail: postBackground3,
        title: '디자인 시안 없이 화면을 맞출 때의 기준',
        dateString: '2026-01-21',
        Categories: categorySets[2],
        description: '문서에 적힌 좌표와 폭을 기준으로 먼저 큰 구조를 고정한 뒤 세부를 다듬었습니다.',
    },
    {
        id: 10,
        thumbnail: postBackground4,
        title: '작은 상태 변화가 큰 화면 차이를 만들 때',
        dateString: '2026-01-18',
        Categories: categorySets[1],
        description: '로그인 상태 하나만 바뀌어도 헤더와 본문 흐름이 어떻게 달라지는지 정리했습니다.',
    },
    {
        id: 11,
        thumbnail: postBackground5,
        title: '겨울 오후에 정리한 메모 습관',
        dateString: '2026-01-14',
        Categories: categorySets[0],
        description: '짧은 메모를 버리지 않고 이어 붙여서 글로 발전시키는 과정을 기록했습니다.',
    },
    {
        id: 12,
        thumbnail: postBackground6,
        title: '이미지 비율이 카드 인상에 미치는 영향',
        dateString: '2026-01-10',
        Categories: categorySets[2],
        description: '같은 카드 레이아웃이라도 썸네일 비율에 따라 읽히는 속도가 크게 달라졌습니다.',
    },
    {
        id: 13,
        thumbnail: postBackground1,
        title: '레이아웃 기준선을 먼저 정하는 이유',
        dateString: '2026-01-06',
        Categories: categorySets[1],
        description: '간격과 시작 좌표를 먼저 정해두면 이후 페이지 추가가 훨씬 쉬워집니다.',
    },
    {
        id: 14,
        thumbnail: postBackground2,
        title: '일상 기록을 오래 남기는 가장 단순한 방법',
        dateString: '2026-01-03',
        Categories: categorySets[0],
        description: '형식을 줄이고 부담을 낮추면 기록은 생각보다 더 오래 지속됩니다.',
    },
    {
        id: 15,
        thumbnail: postBackground3,
        title: '사진과 문장을 같은 리듬으로 배치하기',
        dateString: '2025-12-29',
        Categories: categorySets[2],
        description: '본문 이미지와 텍스트 블록 길이를 맞춰 읽는 호흡을 일정하게 유지했습니다.',
    },
    {
        id: 16,
        thumbnail: postBackground4,
        title: '헤더 액션 구성을 다시 단순하게 만든 이유',
        dateString: '2025-12-22',
        Categories: categorySets[1],
        description: '버튼 수를 줄이고 핵심 이동만 남기면 첫 화면의 판단 비용이 낮아집니다.',
    },
    {
        id: 17,
        thumbnail: postBackground5,
        title: '연말에 돌아본 블로그 카테고리 정리',
        dateString: '2025-12-18',
        Categories: categorySets[0],
        description: '주제 분류를 줄였더니 오히려 글의 성격이 더 선명하게 드러났습니다.',
    },
    {
        id: 18,
        thumbnail: postBackground6,
        title: '여백만으로 카드 밀도를 조절한 사례',
        dateString: '2025-12-12',
        Categories: categorySets[2],
        description: '폰트 크기보다도 카드 내부 여백이 전체 인상에 더 직접적인 영향을 줬습니다.',
    },
    {
        id: 19,
        thumbnail: postBackground1,
        title: '페이지 문서를 코드로 옮길 때 놓치기 쉬운 것',
        dateString: '2025-12-08',
        Categories: categorySets[1],
        description: '고정 좌표, 반응형 전환 지점, 공통 레이아웃 책임을 먼저 구분해야 했습니다.',
    },
    {
        id: 20,
        thumbnail: postBackground2,
        title: '한 해 동안 쌓인 짧은 기록들',
        dateString: '2025-12-01',
        Categories: categorySets[0],
        description: '짧은 문장과 캡처 몇 장만으로도 나중에 충분한 맥락이 남는다는 걸 확인했습니다.',
    },
]

export const featuredPost = {
    id: 1,
    dateString: '2026-03-12',
    title: '레이아웃 문서를 구현으로 옮길 때 필요한 기준',
    Categories: [
        { id: 'frontend', name: 'Frontend' },
        { id: 'layout', name: 'Layout' },
    ],
    userContents: [
        {
            id: 'p-1',
            type: 'text',
            content: '문서의 좌표 값을 그대로 코드로 옮길 때는 공통 구조를 먼저 고정하고, 페이지별 차이는 최소한의 슬롯으로 분리하는 편이 안전합니다.',
        },
        {
            id: 'img-1',
            type: 'image',
            src: postImage1,
            alt: '에디터 화면 예시',
        },
        {
            id: 'p-2',
            type: 'text',
            content: '배너, 헤더, 푸터처럼 모든 페이지에 반복되는 요소는 레이아웃 컴포넌트에서 처리하고, 각 페이지는 실제 본문만 책임지도록 정리해야 변경 범위가 작아집니다.',
        },
        {
            id: 'img-2',
            type: 'image',
            src: postImage2,
            alt: '카드 목록 예시',
        },
        {
            id: 'p-3',
            type: 'text',
            content: '홈 화면처럼 카드가 더 붙는 페이지는 내부 스크롤을 만들지 말고 문서 스크롤에 반응하도록 구현해야 요구사항과 더 잘 맞습니다.',
        },
        {
            id: 'img-3',
            type: 'image',
            src: postImage3,
            alt: '상세 페이지 예시',
        },
    ],
}
