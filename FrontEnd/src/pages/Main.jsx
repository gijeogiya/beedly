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