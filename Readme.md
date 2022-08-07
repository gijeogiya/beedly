# 8.8 평가 준비

# ****🖥️ 개발 환경****

---

### Backend

- JAVA 8
- IntelliJ
- Spring boot 2.7.1
- Spring Security
- Spring data JPA
- QueryDSL 5.0.0
- MySQL 8.0.30
- Redis 7
- Swagger 3.0.0
- STOMP

### WebRTC

OpenVidu 2.22.0

### Frontend

- Javascript
- VSCode
- React 17.0.1
- React-dom 17.0.1
- Redux 4.2.0
- Mui/material 5.9.3
- Axios 0.27.2
- Grommet 2.25.1
- Styled-components 5.3.5
- 

# 🌏배포 환경

---

- AWS EC2(ubuntu 20.04)
- AWS S3
- nginx
- certbot
- Docker 20.10.17
- MySQL 8.0.30
- Redis 7
- OpenVidu 2.22.0

### 서비스 아키텍쳐

![Untitled](ReadmeImage/architecture.png)

# 🏄‍♂️진행 상황

---

## BackEnd

### Swagger

[https://i7a601.p.ssafy.io/api/swagger-ui/index.html](https://i7a601.p.ssafy.io/api/swagger-ui/index.html)

### 개발 진행 중

- 사용자 취향 태그 관련 기능
- 취향 태그 기반 추천 알고리즘 기능
- 작가 권한 승인 기능
- 작가 정보 조회

### 개발 완료

- 회원 기능
    - 카카오 로그인
    - 내 정보 조회
    - 내 구매내역 조회
    - 내 판매내역 조회
    - 구매상품 결제정보 조회
- 상시 경매 관련 기능
    - 상품 등록, 수정, 삭제
    - 상품 상세 조회
    - 카테고리로 상품 조회
    - 사이즈로 상품 조회
    - 현재 진행중인 경매 조회
    - 작가 닉네임으로 상품 조회
    - 상품 이름으로 상품 조회
    - 태그로 상품 조회
    - 서면 응찰 등록, 수정, 삭제
    - 경매방 생성, 입장, 종료 기능
    - 상품 입찰하기(웹소켓) 기능
    - 경매 상품 낙찰 확정 기능
- 기획전 경매 관련 기능
    - 기획전 게시글 등록, 수정, 삭제
    - 상품 등록, 수정, 삭제
    - 진행 예정인 게시글 조회
    - 게시글 상세 조회
    - 경매방 생성, 입장, 종료 기능
    - 상품 입찰하기(웹소켓) 기능
    - 경매 상품 낙찰 확정 기능

## FrontEnd

### Site

[http://i7a601.p.ssafy.io](https://i7a601.p.ssafy.io/api/swagger-ui/index.html)

### 개발 진행 중

- 사용자 취향 태그 관련 기능
- 취향 태그 기반 추천 알고리즘 기능
- 작가 권한 승인 기능
- 메인페이지 - Main
- 검색 페이지 - Search
- 검색 결과 페이지 - SearchResult
- 카테고리 조회 페이지 - ProductList
- 작품 상세 페이지 - ProductDetail
- 작가 상세 페이지 - ArtistDetail
- 작품 등록 페이지 - ProductRegister
- 작품 수정 페이지 - ProductModify
- 로그인 페이지 - Login
- 회원가입 - 등급 선택 페이지 - SignupChoice
- 회원가입 - 정보 입력 페이지 - Signup
- 회원가입 - 판매자 메일 보내라 페이지 - SignupResult
- 회원가입 - 태그 선택 페이지 - SignupTag
- 마이페이지 - 전체 페이지 - Mypage
- 마이페이지 - 상세 유저 정보 페이지 - MypageDetail
- 판매내역 페이지 - MypageSell
- 구매내역 페이지 - MypageBuy
- 관심 작품 목록 페이지 - LikeProduct
- 관심 작가 목록 페이지 - LikeArtist
- 공지사항, FAQ 페이지 - Board
- 이용가이드 페이지 - UserGuide
- 이용약관 페이지 - UserRule
- 결제 페이지 - Payment
- 결제 완료 페이지 - PaymentResult
- 낙찰 정보 페이지 - BidResult

관리자

- 유저 관리 페이지 - AdminUserManage
- 작품 조회 페이지 - AdminProductManage
- 공지사항 조회 페이지 - AdminBoard
- 공지사항 등록 페이지 - AdminBoardRegister
- 기획전 - 등록 페이지 - AdminSpecialBoardRegister
- 기획전 - 작품 등록 페이지 - AdminSpecialProductRegister

### 개발 완료

-
