import React from "react";
import styled from "styled-components";
import { StyledText } from "../components/Common";
import CloseButton from "../assets/images/close.png";
import { Input2 } from "../components/UserStyled";
import { Box } from "grommet";

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

export const HeaderBox = ({ goBack }) => {
  return (
    <HeaderDiv>
      <div style={{ width: "10vw" }}></div>
      <StyledText size="20px" weight="bold" text="작품 등록" />
      <BackButton onClick={goBack}>
        <img src={CloseButton} />
      </BackButton>
    </HeaderDiv>
  );
};

export const SpecialProduct = ({ product, artist }) => {
  return (
    <div>
      <HeaderBox />
      <Box>
        <Box margin="small" direction="row">
          <Box width="xsmall" justify="center" align="center">
            작품명
          </Box>
          <Box width="medium" direction="row" justify="end">
            <Input2
              Thin
              placeholder="작품명을 입력하세요."
              value={product}
              onChange={(e) => {}}
            />
          </Box>
        </Box>
        <Box margin="small" direction="row">
          <Box width="xsmall" justify="center" align="center">
            작가명
          </Box>
          <Box width="medium" direction="row" justify="end">
            <Input2
              Thin
              placeholder="작가명을 입력하세요."
              value={artist}
              onChange={(e) => {}}
            />
          </Box>
        </Box>
      </Box>
      <div>사진들</div>
      <div>태그</div>
      <div>버튼</div>
    </div>
  );
};
