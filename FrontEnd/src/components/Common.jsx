import React, { useState, useEffect } from 'react'
import { Box } from "grommet";
import styled from "styled-components";
// 고정스타일링

// Header
const Header = styled.img`
    background-color: #1F1D1D;
    max-width: 32vw;
    min-width: 32vw;
    padding: 0vw 34vw;
`;
export function LogoHeader() {
    return <Header alt="logo" src="img/logo.png"></Header>;
}

// 가변스타일링(변수 한개)
const StyledButton = styled.button`
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;

  color: ${(props) => props.color || "gray"};
  background: ${(props) => props.background || "white"};
`;

export function Button({ children, color, background }) {
    return (
        <StyledButton color={color} background={background} Î>
            {children}
        </StyledButton>
    );
}

const FooterContainer = styled.div`
    padding: 15px;
    max-width: 300px;
    align-items: center;
`;


const FooterContent = ({title, desc}) => {
    return <div style={{padding:"10px", fontSize:"10px"}}>
        <h3>{title || ""}</h3>
        {desc.map((d) =>(<p>{d}</p>)
            
        )}
    </div>
}

export function Footer() {
    return (<Box background="light-3" margin={{bottom: "0"}} align="center" padding="25px" >
        <FooterContainer>
        <Box><FooterContent title="고객센터 1500-1111" desc={["운영시간 평일 11:00 - 18:00 (토, 일, 공휴일 휴무)","점심시간 평일 13:00 - 14:00"]} /></Box>
        <Box direction="row" align="center">
        <FooterContent title="이용안내" desc={["이용 정책","페널티 정책", "커뮤니티 가이드라인"]} />
        <FooterContent title="고객지원" desc={["공지사항","서비스 소개", "소장품 정기경매 접수"]} />
        </Box>
        <Box><FooterContent desc={["이용약관","개인정보처리방침", "SSAFY A601", "이아현 권기정 문석희 박재권 이수연 차유진", `Notion https://www.notion.so/chayoo/
2-PJT1-7f40831c919d4846a6214c2d30d7c8f2`]} /></Box>
</FooterContainer>
        
    </Box>);
}

const NavBarDiv = styled.div`
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100vw;
    background-color: white;
    border-top: 2px solid #D6D6D6;
    padding: 5px 0px;
    opacity: ${(props) => props.opacity || "1"};
    transition: all .2s;
    visibility: ${(props) => props.isShow || "visible"}; 
`;
const IconButtonStyle = {
    display: "flex",
    flexDirection : "column",
    justifyContent:"center",
    alignItems:"center",
};
const NavFont = {
    fontSize: "10px",
    fontWeight: "Bold",
    color: "#5f5f5f"
}
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
        <NavBarDiv isShow={show} opacity = {opacity}>
            
                <div style={IconButtonStyle} >
                    <img alt="홈" src="/img/HomeIcon.svg"/>
                </div>
                <div style={IconButtonStyle} >
                    <img alt="검색" src="/img/SearchIcon.svg"/>
                </div>
                <div style={IconButtonStyle} >
                    <img alt="리스트" src="/img/ListIcon.svg"/>
                </div>
                <div style={IconButtonStyle} >
                    <img alt="Onair" src="/img/OnairIcon.svg"/>
                </div>
                <div style={IconButtonStyle} >
                    <img alt="Mypage" src="/img/MypageIcon.svg"/>
                </div>
                
        </NavBarDiv>
    )
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
    background-color: ${(props) => props.isStart? "red": "gray" || "gray"};
    font-size: 10px;
    text-align: center;
    border-radius: 5px;
    z-index: 5;
    margin-bottom: 5px;
    margin-right: 5px;
`;

const ArtistImg = styled.img`
    src: ${(props) => props.artistSrc || ""};
    border-radius: 50%;
`;

//상품 프레임
export function Product({title, productSrc, artistSrc, artist, dueDate, dueTime, isStart, people}) {
    return <Box>
        <ProductFrame>
            <ProductImg productSrc={productSrc}></ProductImg>
            <TimeTable>{isStart ? {dueTime} : "실시간"}</TimeTable>
        </ProductFrame>
        <Box direction="row">
            <ArtistImg artistSrc={artistSrc}></ArtistImg>
            <div>
                <h2>{artist}</h2>
                <p>{title}</p>
                <p>{isStart ? `${people}명 시청중` : `${dueDate.year}년 ${dueDate.month}월 ${dueDate.day}일 ${dueDate.hour}시 예정`}</p>
            </div>
        </Box>
    </Box>
}



//작가 프레임
export function Artist({artist, artistSrc}) {
    
}
// const ArtistImg = styled.

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





