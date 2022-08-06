import React, { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import styled from "styled-components";
import Button from "./Button";
import CloseButton from "../assets/images/close.png";
import { StyledHr, StyledText } from "./Common";
import { useEffect } from "react";
import { Box, Pagination } from "grommet";
import { Outlet, Route, Routes } from "react-router-dom";
import { Search } from "grommet-icons";
import { ProductRegister } from "../pages/ProductRegister";
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
      <StyledText size="20px" weight="bold" text="공지사항" />
      <BackButton onClick={goBack}>
        <img src={CloseButton} />
      </BackButton>
    </HeaderDiv>
  );
};

export const Notice = ({ open, onDismiss }) => {
  const [notices, setNotices] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [currentNotice, setCurrentNotice] = useState("");
  useEffect(() => {
    let temp = [
      {
        title: "[공지] 거래 중지 작가 안내",
        text: "거래 중지 작가들은 거래가 중지된 작가입니다. 거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.",
      },
      {
        title: "[공지] 7월 3째주 정기 경매 상품 등록 안내",
        text: "거래 중지 작가들은 거래가 중지된 작가입니다. 거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.",
      },
      {
        title: "[공지] 거래 중지 작가 안내",
        text: "거래 중지 작가들은 거래가 중지된 작가입니다. 거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.",
      },
      {
        title: "[공지] 7월 2째주 이벤트 경매 결과 안내",
        text: "거래 중지 작가들은 거래가 중지된 작가입니다. 거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.",
      },
      {
        title: "[공지] 거래 중지 작가 안내",
        text: "거래 중지 작가들은 거래가 중지된 작가입니다. 거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.",
      },
      {
        title: "[공지] 거래 중지 작가 안내",
        text: "거래 중지 작가들은 거래가 중지된 작가입니다. 거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.",
      },
      {
        title: "[공지] 거래 중지 작가 안내",
        text: "거래 중지 작가들은 거래가 중지된 작가입니다. 거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.",
      },
      {
        title: "[긴급 공지] 7월 정기 점검 안내",
        text: "거래 중지 작가들은 거래가 중지된 작가입니다. 거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.",
      },
      {
        title: "[공지] 거래 중지 작가 안내",
        text: "거래 중지 작가들은 거래가 중지된 작가입니다. 거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.",
      },
      {
        title: "[공지] 거래 중지 작가 안내",
        text: "거래 중지 작가들은 거래가 중지된 작가입니다. 거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.",
      },
    ];
    setNotices(temp);
  }, []);

  const handleNotice = (e, i) => {
    setCurrentNotice(i);
    setClicked(true);
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
      {clicked ? (
        <Box margin="small">
          <Box alignContent="center" align="center">
            <StyledText
              size="20px"
              weight="bold"
              text={notices[currentNotice].title}
            />
          </Box>
          <StyledHr width="100%" />
          <Box margin="medium" height="70vh">
            {notices[currentNotice].text}
          </Box>
          <Box direction="row" justify="center">
            <Button
              BigBlack
              children="목록으로 돌아가기"
              onClick={() => setClicked(false)}
            />
          </Box>
        </Box>
      ) : (
        <Box margin="15px" pad="10px">
          {notices !== [] &&
            notices.map((notice, i) => (
              <Box
                key={i}
                onClick={() => {
                  setClicked(true);
                  setCurrentNotice(i);
                }}
              >
                <p>{notice.title}</p>
                <StyledHr width="100%" />
              </Box>
            ))}
          <Pagination alignSelf="center" margin="5px" numberItems={237} />
        </Box>
      )}
    </BottomSheet>
  );
};
