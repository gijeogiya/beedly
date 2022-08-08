import React, { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import styled from "styled-components";
import Button from "./Button";
import CloseButton from "../assets/images/close.png";
import { StyledHr, StyledText } from "./Common";
import { useEffect } from "react";
import { Box, Image, Pagination } from "grommet";
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
      <StyledText size="20px" weight="bold" text="서면 응찰" />
      <BackButton onClick={goBack}>
        <img src={CloseButton} />
      </BackButton>
    </HeaderDiv>
  );
};

export const AbsenteeBid = ({ open, onDismiss, product }) => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {}, []);

  const handleNotice = (e, i) => {
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
      <Box height="40vh" margin="large">
        <Box direction="row" justify="center">
          <Box width="30%">
            <Image src={product.image} fit="contain" />
          </Box>
          <Box>
            <StyledText
              text={product.category}
              weight="bold"
              size="18px"
              style={{ textDecoration: "underline" }}
            />
            <StyledText text={product.name} />
            <StyledText text={product.artist} />
          </Box>
        </Box>
        <Box>
          <StyledText text={`${product.price}원`} />
          <StyledText text="희망 응찰가" />
          <StyledHr width="100%" />
          <StyledText text="예상 결제 금액" />
        </Box>
        <Box direction="row" justify="center">
          <Button SmallRed children="응찰하기" />
        </Box>
      </Box>
    </BottomSheet>
  );
};
