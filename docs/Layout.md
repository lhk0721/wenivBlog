## 페이지 구성
- Home
- Mypage
- Login
- Register
- Post-View
- Post-Write

## 헤더
전역 Auth의 로그인/비로그인 상태에 따름.
## 푸터

## 배너
각 페이지 main섹션 최상단에 배경처럼 들어감. z-index 제일 작게 해서 뒤로 배치할 것.

배너의 상태
- 'primary' 
- 'auth' 
- 'post'의 상태가 있는데, 페이지가 상태를 prop으로 내려줌.

- 'primary' -> Home, Mypage일 때
- 'auth' -> Login, Register일 때
- 'post' -> Post-View, Post-Write일 때

## 각 페이지별 렌더링

### Home
About 컴포넌트가 main섹션 Top:32rem Left 10.8rem에 렌더링됨.
CardGroup 컴포넌트가 Top:32rem Left 42rem에 렌더링됨. 너비는 91.2rem으로, 스크롤되면 카드를 더 불러와서 렌더링함. 페이지에서 스크롤바는 안씀.

### Login
LoginPage 컴포넌트가 main섹션 Top 18.6rem Left:42rem에 렌더링됨.

### Register
Account 컴포넌트에게 Register prop을 내려주어 main섹션 Top 10rem Left:42rem에 렌더링됨.

### Mypage
Account 컴포넌트에게 Mypage prop을 내려주어 main섹션 Top 10rem Left:42rem에 렌더링됨.

### Post-View
ContentLayout 컴포넌트가 main섹션 Top 12rem Left:42rem에 렌더링됨.
ContentLayout는 Post 컴포넌트를 렌더링함.

### Post-Write
ContentLayout 컴포넌트가 main섹션 Top 12rem Left:42rem에 렌더링됨.
ContentLayout는 Write 컴포넌트를 렌더링함.

