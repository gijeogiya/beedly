import React from 'react'
import { Box, Carousel, Image, Grommet } from "grommet";
import styled from 'styled-components';

export default function Main() {
  return (
    <div>Main</div>
  )
}

const StyledCategoryTable = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
`;

const StyledCategory = styled.div`
  display: inline;
  padding: 0 10px;
  justify-content: center;
  font-size: 16px;
`;

const StyledTableTitle = styled.div`
  font-size: 14px;
  color: #1F1D1D;
  padding-left: 14px;
  padding-top: 14px;
  font-weight: 700;
`;

const StyledTableSubtitle = styled.div`
    font-size: 12px;
    padding-left: 14px;
    font-weight: 700;
    color: rgba(31, 29, 29, 0.3);
`;

const StyledHorizonTable = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }

  .card {
    display: inline-block;
  }
`;

const GrommetTheme = {
  carousel: {
    icons: {
      color: {
        dark: "#FFFFFF", light: "#FFFFFF"
      }
    }
  }
}

export function CategoryBar() {
  return (
      <nav>
        <StyledCategoryTable>
          <StyledCategory>회화</StyledCategory>
          <StyledCategory>판화</StyledCategory>
          <StyledCategory>에디션</StyledCategory>
          <StyledCategory>사진</StyledCategory>
          <StyledCategory>입체</StyledCategory>
        </StyledCategoryTable>
      </nav>
  );
}

export function BannerTable() {
  return (
    <Grommet theme={GrommetTheme}>
      <Box height="small" width="medium" overflow="hidden" fill="true" controls="false">
        <Carousel fill wrap="true" play="3000">
          <Image fit="cover" src="/img/Banner1.svg" />
          <Image fit="cover" src="/img/Banner2.svg" />
          <Image fit="cover" src="/img/Banner3.svg" />
        </Carousel>
      </Box>
    </Grommet>
  );
}

export function OnairHorizonTable() {
  return (
    <div>
      <StyledTableTitle>On Air</StyledTableTitle>
      <StyledTableSubtitle>지금 진행중인 개인경매</StyledTableSubtitle>
      <StyledHorizonTable>
        <div class="card"><h2>Card</h2></div>
        <div class="card"><h2>Card</h2></div>
        <div class="card"><h2>Card</h2></div>
        <div class="card"><h2>Card</h2></div>
        <div class="card"><h2>Card</h2></div>
        <div class="card"><h2>Card</h2></div>
        <div class="card"><h2>Card</h2></div>
        <div class="card"><h2>Card</h2></div>
        <div class="card"><h2>Card</h2></div>
        <div class="card"><h2>Card</h2></div>
      </StyledHorizonTable>
    </div>
  )
}