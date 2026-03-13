<aside>
💡 ChatGPT가 대화의 문맥을 기억하게하려면, 
request시에 이전의 대화내역(질문 및 답변)을 함께 보내줘야합니다.

</aside>

# 0. 접속하기/요청 URL

- https://dev.wenivops.co.kr/services/openai-api

# 1. HTTP 요청 보내기

- URL : https://dev.wenivops.co.kr/services/openai-api
- Method : POST
- **Request Parameter**
    - sample 1
        
        ```
        [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Who won the world series in 2020?"},
            {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
            {"role": "user", "content": "Where was it played?"}
        ]
        ```
        
    - sample 2
        
        ```jsx
        [
            {"role": "system", "content": "assistant는 시인이다."},
            {"role": "user", "content": "지구는 왜 파란가요?"},
            {"role": "assistant", "content": "지구의 대부분은 물로 덮여 있기 때문에 파란색으로 보입니다. 태양에서 나오는 빛은 모든 색상으로 이루어져 있지만, 대기 중에서 파란색 빛의 파장이 다른 색상보다 더 많이 분산되기 때문에 우리는 하늘과 바다가 파란색으로 보입니다. 이렇게 파란색 빛이 분산되는 현상을 '레이리 효과'라고 합니다."},
            {"role": "user", "content": "시로 표현해주세요."}
        ]
        ```
        
    - 설명
        - role
            - **system** : assistant의 역할을 지정해줍니다. (필수로 들어가야하는 항목입니다.)
            - **user** : 사용자의 질문 내용을 적을때 사용합니다.
            - **assistant** : assistant(AI)가 답변한 내용을 적을때 사용합니다.
        - content : 메세지 내용
            - role이 system인 경우는 AI의 역할을 지정하는 문구입니다.
                - 예시)
                    - You are a helpful assistant.
                    - assistant는 친절한 파이썬 알고리즘의 힌트를 주는 선생님이다.
                    - assistant는 시인이다.
            - role이 user인 경우에는 유저가 보내는 질문 입니다.
                - 예시)
                    - "지구는 왜 파란가요?"
                    - "Who won the world series in 2020?"
            - role이 assistant 인경우에는 AI가 응답한 답변입니다.
                
                
                ![스크린샷 2023-03-13 오후 6.32.40.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ddd275e3-9647-43c7-8672-e01c3434a293/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-03-13_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.32.40.png)
                
    
- **Response Example**
    
    ```jsx
    {
        "choices": [
            {
                "finish_reason": "stop",
                "index": 0,
                "message": {
                    "content": "제주도는 대한민국의 제주특별자치도에 위치한 섬입니다. 한라산을 비롯하여 다양한 자연 경관이 유명하며, 남녀노소 누구나 즐길 수 있는 다양한 관광지와 맛집, 숙박시설 등이 많습니다.\n\n제주도에서는 해변에서 수영을 즐기거나 해변을 따라 산책하는 것도 좋습니다. 제주해녀박물관, 성산일출봉, 우도, 휴애리 자연생활공원, 정방폭포, 천지연폭포, 중문색달해변 등 인기있는 관광지가 많이 있습니다.\n\n또한 제주도에서는 협재, 중문, 애월 등 지역마다 다양한 맛집들이 있어 제주의 특산물인 흑돼지, 갈치, 회, 청량고추등 다양한 음식을 즐길 수 있으며, 숙박시설로는 해외에서도 유명한 리조트, 5성급 호텔 등 다양한 선택지가 있습니다.",
                    "role": "assistant"
                }
            }
        ],
        "created": 1678699401,
        "id": "chatcmpl-6tYgj5wHp7VqkCd0sWozaJIlqwzvZ",
        "model": "gpt-3.5-turbo-0301",
        "object": "chat.completion",
        "usage": {
            "completion_tokens": 439,
            "prompt_tokens": 676,
            "total_tokens": 1115
        }
    }
    ```