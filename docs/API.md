# Winiv Blog API Specification

## 1. Overview

- Base URL: `https://dev.wenivops.co.kr/services/fastapi-crud/1`
- Content-Type: `application/json`
- 현재 문서는 기존 `API.md`에 명시된 정보만 기준으로 정리했다.
- `signup`, `login`은 엔드포인트 존재만 확인되며, 요청/응답 스키마 상세는 원문에 없어 별도 추정하지 않았다.

## 2. Endpoint Summary

| 기능 | 메서드 | 엔드포인트 | 설명 |
| --- | --- | --- | --- |
| 회원가입 | `POST` | `/signup` | 상세 명세 미제공 |
| 로그인 | `POST` | `/login` | 상세 명세 미제공 |
| 게시글 목록 조회 | `GET` | `/blog` | 전체 게시글 목록 조회 |
| 게시글 상세 조회 | `GET` | `/blog/{id}` | 특정 게시글 조회 |
| 게시글 작성 | `POST` | `/blog` | 새 게시글 생성 |
| 게시글 수정 | `PUT` | `/blog/{id}` | 기존 게시글 수정 |
| 게시글 삭제 | `DELETE` | `/blog/{id}` | 기존 게시글 삭제 |

## 3. Data Schema

### 3.1 Blog Object

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| `_id` | `string` | 게시글 ID |
| `index` | `string` | 게시글 인덱스 |
| `thumbnail` | `string` | 썸네일 이미지 경로 |
| `title` | `string` | 게시글 제목 |
| `content` | `string` | 게시글 내용 |
| `date` | `string` | 작성일 |
| `time` | `string` | 작성 시간 |
| `author` | `string` | 작성자 |
| `email` | `string` | 작성자 이메일 |
| `views_count` | `string` | 조회수 |

### 3.2 Validation Error Object

`POST /blog`, `PUT /blog/{id}` 요청 실패 시 아래 형태의 유효성 에러가 반환될 수 있다.

| 필드 | 타입 | 설명 |
| --- | --- | --- |
| `detail` | `array` | 에러 목록 |
| `detail[].input` | `any` | 전송한 값 |
| `detail[].loc` | `array` | 에러 발생 위치 |
| `detail[].msg` | `string` | 에러 메시지 |
| `detail[].type` | `string` | 에러 타입 |
| `detail[].url` | `string` | 추가 설명 URL |

## 4. API Detail

### 4.1 회원가입

- Method: `POST`
- Endpoint: `/signup`
- 설명: 엔드포인트 존재만 확인됨
- 요청/응답 명세: 원문 미제공

### 4.2 로그인

- Method: `POST`
- Endpoint: `/login`
- 설명: 엔드포인트 존재만 확인됨
- 요청/응답 명세: 원문 미제공

### 4.3 게시글 목록 조회

- Method: `GET`
- Endpoint: `/blog`

#### Response

```json
[
  {
    "_id": "string",
    "index": "string",
    "thumbnail": "string",
    "title": "string",
    "content": "string",
    "date": "string",
    "time": "string",
    "author": "string",
    "email": "string",
    "views_count": "string"
  }
]
```

#### Example

```js
fetch("https://dev.wenivops.co.kr/services/fastapi-crud/1/blog")
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((error) => console.error(error));
```

### 4.4 게시글 상세 조회

- Method: `GET`
- Endpoint: `/blog/{id}`

#### Path Parameter

| 이름 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `id` | `string` | `Y` | 조회할 게시글 ID |

#### Success Response

```json
{
  "_id": "string",
  "index": "string",
  "thumbnail": "string",
  "title": "string",
  "content": "string",
  "date": "string",
  "time": "string",
  "author": "string",
  "email": "string",
  "views_count": "string"
}
```

#### Error Response

```json
{
  "detail": "Blog data not found"
}
```

#### Example

```js
fetch("https://dev.wenivops.co.kr/services/fastapi-crud/1/blog/1")
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((error) => console.error(error));
```

### 4.5 게시글 작성

- Method: `POST`
- Endpoint: `/blog`

#### Header

```json
{
  "Content-Type": "application/json"
}
```

#### Request Body

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `title` | `string` | `Y` | 게시글 제목 |
| `content` | `string` | `Y` | 게시글 내용 |

```json
{
  "title": "string",
  "content": "string"
}
```

#### Success Response

```json
{
  "message": "Blog created successfully"
}
```

#### Error Response

필수값 누락:

```json
{
  "detail": [
    {
      "input": {
        "title": "value"
      },
      "loc": ["body", "content"],
      "msg": "Field required",
      "type": "missing",
      "url": "https://errors.pydantic.dev/2.6/v/missing"
    }
  ]
}
```

잘못된 타입:

```json
{
  "detail": [
    {
      "input": "value",
      "loc": ["body", "title"],
      "msg": "Input should be a valid string",
      "type": "string_type",
      "url": "https://errors.pydantic.dev/2.4/v/string_type"
    }
  ]
}
```

잘못된 JSON:

```json
{
  "detail": [
    {
      "ctx": {
        "errors": "Expecting value"
      },
      "input": {},
      "loc": ["body", 1],
      "msg": "JSON decode error",
      "type": "json_invalid"
    }
  ]
}
```

#### Example

```js
fetch("https://dev.wenivops.co.kr/services/fastapi-crud/1/blog", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "test",
    content: "test",
  }),
})
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((error) => console.error(error));
```

### 4.6 게시글 수정

- Method: `PUT`
- Endpoint: `/blog/{id}`

#### Path Parameter

| 이름 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `id` | `string` | `Y` | 수정할 게시글 ID |

#### Header

```json
{
  "Content-Type": "application/json"
}
```

#### Request Body

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `title` | `string` | `Y` | 게시글 제목 |
| `content` | `string` | `Y` | 게시글 내용 |

```json
{
  "title": "string",
  "content": "string"
}
```

#### Success Response

```json
{
  "message": "Blog updated successfully"
}
```

#### Error Response

게시글 없음:

```json
{
  "detail": "Blog data not found"
}
```

필수값 누락:

```json
{
  "detail": [
    {
      "input": {
        "title": "value"
      },
      "loc": ["body", "content"],
      "msg": "Field required",
      "type": "missing",
      "url": "https://errors.pydantic.dev/2.6/v/missing"
    }
  ]
}
```

잘못된 타입:

```json
{
  "detail": [
    {
      "input": "value",
      "loc": ["body", "title"],
      "msg": "Input should be a valid string",
      "type": "string_type",
      "url": "https://errors.pydantic.dev/2.4/v/string_type"
    }
  ]
}
```

잘못된 JSON:

```json
{
  "detail": [
    {
      "ctx": {
        "errors": "Expecting value"
      },
      "input": {},
      "loc": ["body", 1],
      "msg": "JSON decode error",
      "type": "json_invalid"
    }
  ]
}
```

#### Example

```js
fetch("https://dev.wenivops.co.kr/services/fastapi-crud/1/blog/1", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "test put",
    content: "test put",
  }),
})
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((error) => console.error(error));
```

### 4.7 게시글 삭제

- Method: `DELETE`
- Endpoint: `/blog/{id}`

#### Path Parameter

| 이름 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `id` | `string` | `Y` | 삭제할 게시글 ID |

#### Success Response

```json
{
  "message": "Blog deleted successfully"
}
```

#### Error Response

```json
{
  "detail": "Blog data not found"
}
```

#### Example

```js
fetch("https://dev.wenivops.co.kr/services/fastapi-crud/1/blog/1", {
  method: "DELETE",
})
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((error) => console.error(error));
```

## 5. Notes

- `id` 경로 파라미터는 원문에 `blog_id` 또는 정수 형태 예시로 표기되어 있었지만, 실제 표기 혼용이 있어 본 문서에서는 `{id}`로 통일했다.
- `signup`, `login`의 상세 명세가 필요하면 별도 요청/응답 예시를 추가로 확보해 문서를 확장해야 한다.

## 6. Authorization
Authorization
1. 회원가입
요청(Request)

https://dev.wenivops.co.kr/services/fastapi-crud/1/signup 으로 회원 가입 정보를 전송하는 POST 요청을 보냅니다.

POST /1/signup
요청 헤더(Header)

{
  "Content-Type": "application/json"
}
요청 바디(Body)

필수값: username, password
body: JSON.stringify({
  username: string*,
  password: string*
})
응답(Response)

// 회원가입 성공했을 경우
{
  message: "User created successfully";
}
 
// 이미 가입된 사용자의 경우
{
  message: "User already exists";
}
 
// 필수값이 누락되었을 경우(누락된 값만큼 detail value 배열에 추가됨)
{
  detail: [
    {
      input: { username: value }, // 전송한 값
      loc: ["body", "password"], // 에러가 발생한 필드(누락된 값)
      msg: "Field required", // 에러 메시지
      type: "missing", // 에러 타입
      url: "https://errors.pydantic.dev/2.6/v/missing", // 에러 설명
    },
  ];
}
 
// 잘못된 타입의 값을 전송했을 경우
{
  detail: [
    {
      input: value, // 전송한 값
      loc: ["body", "username"], // 에러가 발생한 필드
      msg: "Input should be a valid string", // 에러 메시지
      type: "string_type", // 에러 타입
      url: "https://errors.pydantic.dev/2.4/v/string_type", // 에러 설명
    },
  ];
}
 
// json 형식이 아닌 값으로 전송했을 경우
{
  detail: [
    {
      ctx: { errors: "Expecting value" },
      input: {},
      loc: ["body", 1],
      msg: "JSON decode error",
      type: "json_invalid",
    },
  ];
}
예제

fetch("https://dev.wenivops.co.kr/services/fastapi-crud/1/signup", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "test1",
    password: "test1234",
  }),
})
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((error) => console.error(error));
2. 로그인
요청(Request) https://dev.wenivops.co.kr/services/fastapi-crud/1/login 으로 로그인을 하기 위해 계정 정보를 전송하는 POST 요청을 보냅니다.

POST / 1 / login
요청 헤더(Header)

{
  "Content-Type": "application/json"
}
요청 바디(Body)

필수값: username, password
body: JSON.stringify({
  username: string*,
  password: string*
})
응답(Response)

// 로그인 성공했을 경우
{
  message: 'Login success',
  access_token: 'eyJhbGciOi.weniv.h8t7NJKEiWCh7G3',
  refresh_token: 'eyJhbGciOi.weniv.h8t7NJKEiWCh7G3'
}
 
// 로그인 실패했을 경우
{message: 'Login failed'}
 
// 필수값이 누락되었을 경우(누락된 값만큼 detail value 배열에 추가됨)
{
  detail:[
  {
    input: {username: value}, // 전송한 값
    loc: ['body', 'password'], // 에러가 발생한 필드(누락된 값)
    msg: "Field required", // 에러 메시지
    type: "missing", // 에러 타입
    url: "https://errors.pydantic.dev/2.6/v/missing" // 에러 설명
  }
  ]
}
 
// 잘못된 타입의 값을 전송했을 경우
{
  detail:[
  {
    input: value, // 전송한 값
    loc: ['body', 'username'], // 에러가 발생한 필드
    msg: "Input should be a valid string", // 에러 메시지
    type: "string_type", // 에러 타입
    url: "https://errors.pydantic.dev/2.4/v/string_type" // 에러 설명
  }
  ]
}
 
// json 형식이 아닌 값으로 전송했을 경우
{
  detail:[
  {
    ctx: {errors: 'Expecting value'},
    input: {},
    loc: ['body', 1],
    msg: "JSON decode error",
    type: "json_invalid",
  }
  ]
}
예제

fetch("https://dev.wenivops.co.kr/services/fastapi-crud/1/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "test1",
    password: "test1234",
  }),
})
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((error) => console.error(error));
3. 토큰 확인
요청(Request)

https://dev.wenivops.co.kr/services/fastapi-crud/login_confirm 으로 헤더에 토큰 정보를 실어 POST 요청을 보내면 토큰이 유효한지 확인할 수 있습니다.

POST / login_confirm
요청 헤더(Header)

{
  'Authorization': `Bearer ${access_token}`,
}
응답(Response)

// 토큰이 유효할 때
{
  message: "Token is valid";
}
 
// 토큰이 유효하지 않을 때(잘못된 토큰으로 요청했을 때)
{
  detail: "Invalid token";
}
예제

fetch("https://dev.wenivops.co.kr/services/fastapi-crud/login_confirm", {
  method: "POST",
  headers: {
    Authorization: "Bearer eyJhbGciOi.weniv.h8t7NJKEiWCh7G3",
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((error) => console.error(error));
4. 사용자 정보 확인
요청(Request)

https://dev.wenivops.co.kr/services/fastapi-crud/1/login_user_info 으로 GET 요청을 보내면 회원가입된 모든 사용자의 정보를 확인할 수 있습니다.

GET / 1 / login_user_info
응답(Response)

사용자 정보가 담긴 리스트가 출력됩니다.
[{username: string, password: string}, {…}]
예제

fetch("https://dev.wenivops.co.kr/services/fastapi-crud/1/login_user_info")
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((error) => console.error(error));