import React, { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import styled from "styled-components";
import Button from "./Button";
import CloseButton from "../assets/images/close.png";
import { StyledHr, StyledText } from "./Common";
import { useEffect } from "react";
import { Box, Pagination, Tab, Tabs } from "grommet";
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
      <StyledText size="20px" weight="bold" text="이용가이드" />
      <BackButton onClick={goBack}>
        <img src={CloseButton} />
      </BackButton>
    </HeaderDiv>
  );
};

export const UserGuide = ({ open, onDismiss }) => {
  const [notices, setNotices] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [currentNotice, setCurrentNotice] = useState("");
  useEffect(() => {}, []);

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
      <Box>
        <Tabs>
          <Tab title="구매자">
            <Box pad="medium" height="70vh">
              <Box overflow="scroll">
                <StyledText text="1. 마음에 드는 상품을 골라봐요." />
                <Box height="300px" />
                <StyledText text="2. 마음에 들었으면 좋아요 꾸욱~" />
                <Box height="300px" />
                <StyledText text="3. 실시간 경매를 통해 원하는 상품을 보다 저렴하게!" />
                <Box height="300px" />
              </Box>
            </Box>
          </Tab>
          <Tab title="작가님">
            <Box pad="medium">Two</Box>
          </Tab>
        </Tabs>
      </Box>
    </BottomSheet>
  );
};
