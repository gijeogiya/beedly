import React, { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import styled from "styled-components";
import Button from "./Button";
import CloseButton from "../assets/images/close.png";
import { StyledHr, StyledText } from "./Common";
import { useEffect } from "react";
import { Box, Pagination } from "grommet";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
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
      {/* <Box>
        <Tabs textColor="black" indicatorColor="red" aria-label="">
          <Tab value="one" label="Item One" />
          <Tab value="two" label="Item Two" />
          <Tab value="three" label="Item Three" />
        </Tabs>
      </Box> */}
    </BottomSheet>
  );
};
