import React, { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import styled from "styled-components";
import Button from "./Button";
import CloseButton from "../assets/images/close.png";
import { StyledHr, StyledText } from "./Common";
import { useEffect } from "react";
import { Box, Image, Pagination } from "grommet";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import user1 from "../assets/images/userguide1.png";
import user2 from "../assets/images/userguide2.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#e8f319",
      darker: "#053e85",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

const HeaderDiv = styled.div`
  margin: 5px;
  display: flex;
  justify-content: space-between;
`;

const BackButton = styled.button`
  background: none;
  font-size: 12px;
  font-family: Noto Sans KR, sans-serif;
  border: 0px;
  width: 10vw;
`;

const HeaderBox = ({ goBack }) => {
  return (
    <HeaderDiv>
      <div style={{ width: "10vw" }}></div>
      <StyledText size="20px" weight="bold" text="이용가이드" />
      <BackButton onClick={goBack}>
        <img src={CloseButton} />
      </BackButton>
    </HeaderDiv>
  );
};
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export const UserGuide = ({ open, onDismiss }) => {
  const [value, setValue] = React.useState(0);
  const [clicked, setClicked] = useState(false);
  const [currentNotice, setCurrentNotice] = useState("");
  useEffect(() => {}, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomSheet
      open={open}
      onDismiss={() => {
        onDismiss();
        setClicked(false);
      }}
    >
      <HeaderBox
        goBack={() => {
          onDismiss();
          setClicked(false);
        }}
      />

      <ThemeProvider theme={theme}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label=""
        >
          <Tab label="구매자" {...a11yProps(0)} />
          <Tab label="작가님" {...a11yProps(1)} />
        </Tabs>
      </ThemeProvider>
      <div
        style={{
          margin: "15px",
          pad: "10px",
          height: "70vh",
          whiteSpace: "pre-wrap",
          overflow: "scroll",
        }}
      >
        <TabPanel value={value} index={0}>
          <Box>
            <StyledText text="비들리는 예술가들과 수집가들을 위한 경매 스트리밍 플랫폼입니다." />
            <br />
            <StyledText
              text="경매 스트리밍 플랫폼이란?"
              weight="bold"
              size="20px"
            />
            <br />
            <StyledText text="라이브 방송을 통해 작가에게 직접 작품에 대한 소개를 듣고, 자유롭게 실시간 경매에 참여할 수 있습니다." />

            <StyledText text="라이브 경매 TIP" weight="bold" size="20px" />
            <Box direction="row">
              <Image src={user1} width="200px" />
              <Box>
                <Box> 현재 가장 높은 입찰 금액과 호가를 확인할 수 있어요.</Box>
                <Box>
                  채팅에 참여하여 작가와 실시간으로 소통하거나, 옆으로 이동하여
                  상품 정보 확인 및 입찰을 할 수 있어요.
                </Box>
              </Box>
            </Box>
            <Box direction="row">
              <Image src={user2} width="200px" />
              <Box>
                <Box>
                  현재 입찰에 참여했을 때 예상 결제 금액을 확인하고, 응찰할 수
                  있어요.
                </Box>
              </Box>
            </Box>
            <Box>
              마지막 응찰이 이루어진 후 5분 내에 추가 입찰자가 없다면 경매가
              자동으로 종료됩니다. 고민하는 사이 경매가 종료되지 않도록
              유의해주세요. 라이브 경매에 실시간으로 참여하기 어렵다면,
              서면응찰을 통해 경매에 참여해 보세요.
            </Box>
            <br />
            <StyledText text="서면응찰이란?" weight="bold" size="20px" />
            <Box>
              경매 시작 전에 내 상한가를 입력할 수 있습니다. 실시간 경매
              현장에서의 최고 입찰가가 서면응찰 최고가 이하일 경우, 서면 응찰
              최고가를 부른 고객이 낙찰 받게 됩니다. 이 때, 낙찰 받은 고객의
              최종 구매 금액은 현장에서의 최고 입찰가 만큼만 지불하게 됩니다.
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <StyledText text="판매자 유의 사항" />
          예정된 경매 시작 시간 5분 전에 방 개설을 완료해주세요. 마지막 입찰자
          이후 5분간 새로운 응찰이 없다면 경매가 자동으로 종료됩니다. 경매 종료
          전 임의로 라이브 방송을 닫지 않도록 주의해주세요. 판매 작품은 비들리의
          검수가 완료 된 후 구매자에게 전달됩니다. 구매자가 작품을 빠르게 받아볼
          수 있도록, 판매 종료 24시간 내에 아래 주소로 작품 발송을
          완료해주세요.보내실 주소서울특별시 강남구 테헤란로 212 멀티캠퍼스 역삼
          1401 ㈜ 비들리(우: 06220) 물품 수령 담당자 앞Tel: 02-8336-7400배송 중
          작품이 손상되지 않도록 포장에 유의해 주시길 바랍니다. 배송중 파손에
          대한 책임은 판매자 본인에게 있습니다. 라이브 경매 중 불쾌한 언행을
          하지 않도록 유의해 주세요. 해당 사례 적발 및 신고 접수 시 계정 정지 및
          판매자 권한 박탈 처리 될 수 있습니다.
        </TabPanel>
      </div>
    </BottomSheet>
  );
};
