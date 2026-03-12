const API_BASE_URL = process.env.API_BASE_URL ?? 'https://dev.wenivops.co.kr/services/fastapi-crud/1'
const seedSuffix = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14)
const username = process.env.SEED_USERNAME ?? `mockwriter${seedSuffix}`
const password = process.env.SEED_PASSWORD ?? 'mock1234'

const posts = [
    {
        title: '봄비가 오던 오후의 작업 로그',
        content:
            '오후 내내 배치한 카드 간격을 다시 정리했다.\n\n여백만 바꿨을 뿐인데 첫 화면 인상이 훨씬 가벼워졌다.\n\n작은 수정이 전체 리듬을 바꾸는 순간을 기록해 둔다.',
    },
    {
        title: '헤더 액션을 줄이고 남긴 것들',
        content:
            '처음에는 버튼을 많이 두는 편이 친절하다고 생각했다.\n\n하지만 선택지가 많을수록 첫 화면에서 해야 할 판단도 함께 늘어났다.\n\n이번 정리는 가장 자주 쓰는 이동만 남기는 방향으로 진행했다.',
    },
    {
        title: '이미지 없는 글도 읽히게 만드는 법',
        content:
            '모든 글에 강한 썸네일이 필요한 것은 아니었다.\n\n제목과 첫 문단의 밀도를 올리면 이미지 없이도 충분히 시선이 머문다.\n\n결국 중요한 것은 정보의 우선순위였다.',
    },
    {
        title: '짧은 메모가 글이 되는 과정',
        content:
            '메모는 보통 아주 짧게 남긴다.\n\n한 문장씩 이어 붙이다 보면 예상하지 못한 연결이 만들어진다.\n\n이번 글도 그렇게 흩어진 기록을 모아 다듬은 결과다.',
    },
    {
        title: '카드 목록에서 정보 밀도 맞추기',
        content:
            '카드 안에 넣을 수 있는 정보는 생각보다 적다.\n\n제목, 작성자, 날짜, 요약 중 무엇을 먼저 읽게 할지 정해야 한다.\n\n우선순위를 정하고 나니 카드가 훨씬 차분해졌다.',
    },
    {
        title: '스크롤 끝에서 다음 글을 불러올 때',
        content:
            '무한 스크롤은 편하지만 리듬을 망치기 쉽다.\n\n이번에는 카드가 붙는 타이밍을 조금 늦춰 화면이 갑자기 흔들리지 않게 했다.\n\n작은 지연이 오히려 안정감을 준다.',
    },
    {
        title: '작성 화면의 버튼 문구를 다시 고른 이유',
        content:
            '저장과 발행은 비슷해 보이지만 사용자 기대가 다르다.\n\n이번 화면은 실제 공개 흐름에 가깝기 때문에 발행이라는 문구가 더 맞았다.\n\n라벨 하나가 인터랙션 해석을 바꾼다.',
    },
    {
        title: '작성자 이름 검색을 추가한 뒤 생긴 변화',
        content:
            '제목 검색만 있을 때보다 작성자 검색이 붙은 뒤 탐색 흐름이 더 빨라졌다.\n\n사람을 기준으로 글을 찾는 경우가 생각보다 많았다.\n\n검색 결과 강조도 함께 넣어 맥락을 바로 읽게 했다.',
    },
    {
        title: '상세 페이지에서 썸네일을 다시 살린 기록',
        content:
            '목록에서 보던 첫 인상을 상세에서도 이어가고 싶었다.\n\n그래서 본문 위에 썸네일을 다시 배치하고, 없는 경우를 위한 대체 이미지도 함께 처리했다.\n\n빈 영역이 줄어들자 페이지 완성도가 올라갔다.',
    },
    {
        title: '오늘의 구현 메모 열 번째',
        content:
            '요구사항 문서를 다시 읽고 화면을 대조했다.\n\n겉보기에 동작하더라도 노출 조건과 문구가 다르면 요구사항 미달이 될 수 있었다.\n\n마지막에는 실제 빌드와 서버 전송까지 확인했다.',
    },
]

async function request(path, options = {}) {
    const { headers: optionHeaders, ...restOptions } = options
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...restOptions,
        headers: {
            'Content-Type': 'application/json',
            ...(optionHeaders ?? {}),
        },
    })

    const contentType = response.headers.get('content-type') ?? ''
    const data = contentType.includes('application/json')
        ? await response.json()
        : await response.text()

    if (!response.ok) {
        const error = new Error(
            typeof data?.message === 'string'
                ? data.message
                : typeof data?.detail === 'string'
                    ? data.detail
                    : `Request failed with status ${response.status}`,
        )
        error.status = response.status
        error.data = data
        throw error
    }

    return data
}

async function ensureUser() {
    try {
        await request('/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        })
        console.log(`Created user: ${username}`)
    } catch (error) {
        if (error.message !== 'User already exists') {
            throw error
        }
        console.log(`Using existing user: ${username}`)
    }

    const loginResponse = await request('/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    })

    const accessToken = loginResponse?.access_token

    if (!accessToken) {
        throw new Error('Login did not return access_token')
    }

    return accessToken
}

async function createPosts() {
    const accessToken = await ensureUser()
    const results = []

    for (const [index, post] of posts.entries()) {
        const result = await request('/blog', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(post),
        })

        results.push({
            index: index + 1,
            title: post.title,
            result,
        })
        console.log(`Created post ${index + 1}: ${post.title}`)
    }

    return results
}

createPosts()
    .then((results) => {
        console.log('')
        console.log(`Uploaded ${results.length} mock posts to ${API_BASE_URL}`)
        console.log(`Username: ${username}`)
        console.log(`Password: ${password}`)
    })
    .catch((error) => {
        console.error('Failed to seed mock posts.')
        console.error(error.message)

        if (error.data) {
            console.error(JSON.stringify(error.data, null, 2))
        }

        process.exitCode = 1
    })
