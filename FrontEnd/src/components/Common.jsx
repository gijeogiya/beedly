import React, { useState, useEffect } from "react";
import { Box } from "grommet";
import styled from "styled-components";
import { Link } from "react-router-dom";
// 고정스타일링

// Header
const Header = styled.img`
    background-color: #1F1D1D;
    max-width: 32vw;
    min-width: 32vw;
    padding: 0vw 34vw;
    max-height: 10vh;
`;
export function LogoHeader() {
  return <Header alt="logo" src="/img/logo.png"></Header>;
}

//Footer
const FooterContainer = styled.div`
  padding: 15px;
  max-width: 300px;
  align-items: center;
`;

const FooterContent = ({ title, desc }) => {
  return (
    <div style={{ padding: "10px", fontSize: "10px" }}>
      <h3>{title || ""}</h3>
      {desc.map((d) => (
        <p key={d}>{d}</p>
      ))}
    </div>
  );
};

export function Footer() {
  return (
    <Box
      background="light-3"
      margin={{ bottom: "0" }}
      align="center"
      padding="25px"
    >
      <FooterContainer>
        <Box>
          <FooterContent
            title="고객센터 1500-1111"
            desc={[
              "운영시간 평일 11:00 - 18:00 (토, 일, 공휴일 휴무)",
              "점심시간 평일 13:00 - 14:00",
            ]}
          />
        </Box>
        <Box direction="row" align="center">
          <FooterContent
            title="이용안내"
            desc={["이용 정책", "페널티 정책", "커뮤니티 가이드라인"]}
          />
          <FooterContent
            title="고객지원"
            desc={["공지사항", "서비스 소개", "소장품 정기경매 접수"]}
          />
        </Box>
        <Box>
          <FooterContent
            desc={[
              "이용약관",
              "개인정보처리방침",
              "SSAFY A601",
              "이아현 권기정 문석희 박재권 이수연 차유진",
              `Notion https://www.notion.so/chayoo/
2-PJT1-7f40831c919d4846a6214c2d30d7c8f2`,
            ]}
          />
        </Box>
      </FooterContainer>
    </Box>
  );
}

//NavBar
const NavBarDiv = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100vw;
  background-color: white;
  border-top: 2px solid #d6d6d6;
  padding: 5px 0px;
  opacity: ${(props) => props.opacity || "1"};
  transition: all 0.35s;
  visibility: ${(props) => props.isShow || "visible"};
`;
const IconButtonStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
let lastScrollTop = 0;
let nowScrollTop = 0;
export function NavBar() {
  const [show, handleShow] = useState("visible");
  const [opacity, setOpacity] = useState("1");
  useEffect(() => {
    window.addEventListener("scroll", () => {
      nowScrollTop = window.scrollY;
      let fixBoxHeight = "50";
      if (nowScrollTop > lastScrollTop && nowScrollTop > fixBoxHeight) {
        handleShow("hidden");
        setOpacity("0");
      } else {
        if (nowScrollTop + window.innerHeight < document.body.offsetHeight) {
          //Scroll up (하단 고정메뉴 보임)
          handleShow("visible");
          setOpacity("1");
        }
      }

      lastScrollTop = nowScrollTop;
    });
    return () => {
      window.removeEventListener("scroll", () => { });
    };
  }, []);
  return (
    <NavBarDiv isShow={show} opacity={opacity}>
      <div style={IconButtonStyle}>
        <Link to="/">
          <img alt="홈" src="/img/HomeIcon.svg" />
        </Link>
      </div>
      <div style={IconButtonStyle}>
        <Link to="/search">
          <img alt="검색" src="/img/SearchIcon.svg" />
        </Link>
      </div>
      <div style={IconButtonStyle}>
        <Link to="/productlist">
          <img alt="리스트" src="/img/ListIcon.svg" />
        </Link>
      </div>
      <div style={IconButtonStyle}>
        <Link to="/onair">
          <img alt="Onair" src="/img/OnairIcon.svg" />
        </Link>
      </div>
      <div style={IconButtonStyle}>
        <Link to="/mypage">
          <img alt="Mypage" src="/img/MypageIcon.svg" />
        </Link>
      </div>
    </NavBarDiv>
  );
}






const ProductImg = styled.img`
  src: ${(props) => props.productSrc || ""};
`;

const ProductFrame = styled.div`
  border-radius: 14px;
  width: 175px;
  height: 125px;
`;

const TimeTable = styled.div`
  color: white;
  background-color: ${(props) => (props.isStart ? "red" : "gray" || "gray")};
  font-size: 10px;
  text-align: center;
  border-radius: 5px;
  z-index: 5;
  margin-bottom: 5px;
  margin-right: 5px;
`;

const ArtistImg = styled.img`
  width: ${(props) => props.width || "37px"};
  height: ${(props) => props.height || "37px"};
  src: ${(props) => props.src || ""};
  border-radius: 50%;
  margin: 3px;
`;

//상품 프레임
export function Product({
  title,
  productSrc,
  artistSrc,
  artist,
  dueDate,
  dueTime,
  isStart,
  people,
}) {
  return (
    <Box>
      <ProductFrame>
        <ProductImg productSrc={productSrc}></ProductImg>
        <TimeTable>{isStart ? { dueTime } : "실시간"}</TimeTable>
      </ProductFrame>
      <Box direction="row">
        <ArtistImg artistSrc={artistSrc}></ArtistImg>
        <div>
          <h2>{artist}</h2>
          <p>{title}</p>
          <p>
            {isStart
              ? `${people}명 시청중`
              : `${dueDate.year}년 ${dueDate.month}월 ${dueDate.day}일 ${dueDate.hour}시 예정`}
          </p>
        </div>
      </Box>
    </Box>
  );
}

const AuctionArtistFrame = styled.div`
  height: 12%;
  color: white;
  z-index: 5;
  position: absolute;
  left: 5%;
  top: 5%;
`;

export function AuctionArtist({ title, artist, artistSrc }) {
  return (
    <AuctionArtistFrame>
      <Box direction="row">
        <ArtistImg src={artistSrc} />
        <Box>
          <StyledText size="13px" color="white" weight="bold" text={artist} />
          <StyledText size="10px" color="white" weight="bold" text={title} />
        </Box>
      </Box>
    </AuctionArtistFrame>
  );
}

//작가 프레임
export function Artist({ artist, artistSrc }) { }
// const ArtistImg = styled.

//텍스트 폼
const TextForm = styled.div`
  color: ${(props) => props.color || "black"};
  font-size: ${(props) => props.size || "14px"};
  font-weight: ${(props) => props.weight || "normal"};
  font-family: "Noto Sans KR", sans-serif;
`;

//텍스트 사이즈, 컬러, 웨이트, 글자를 설정할 수 있는 컴포넌트
export function StyledText({ size, color, weight, text }) {
  return (
    <TextForm size={size} color={color} weight={weight}>
      {text}
    </TextForm>
  );
}

//가운데 줄 긋기(hr)

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }

`;

export const LinkSt = (props) => <StyledLink {...props} />;

const StyledHrInit = styled.hr`
  background: ${(props) => props.color || "white"};
  height: ${(props) => props.height || "0.0025rem"};
  width: ${(props) => props.width || "75%"};
  margin: 0 auto;
  border-style: solid;
`;

export const StyledHr = ({ color, height, width }) => {
  return <StyledHrInit color={color} height={height} width={width} />;
};

//가변스타일링(변수 n개)
// const StyledButton = styled.button`
//   padding: 0.375rem 0.75rem;
//   border-radius: 0.25rem;
//   font-size: 1rem;
//   line-height: 1.5;
//   border: 1px solid lightgray;

//   ${(props) =>
//     props.primary &&
//     css`
//       color: white;
//       background: navy;
//       border-color: navy;
//     `}
// `;

// function Button({ children, ...props }) {
//   return <StyledButton {...props}>{children}</StyledButton>;
// }
