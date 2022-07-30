import { Box, Grid } from "grommet";
import React from "react";

export default function MyPage() {
  return (
    <Grid
      background-color="gray"
      gap="small"
      rows={["auto", "flex"]}
      columns={["auto", "flex"]}
      areas={[["profile"], ["buysold"], ["like"], ["info"]]}
    >
      <Box gridArea="profile" direction="row" pad="5px">
        <div>프로필사진</div>
        <Box>
          <div>권기정 관리자</div>
          <div>이메일</div>
        </Box>
        <div>더보기버튼</div>
      </Box>
      <Box gridArea="buysold">
        <Box>
          <div>구매내역 더보기</div>
          <Box direction="row">
            <Box>
              <div>전체</div>
              <div>10</div>
            </Box>
            <Box>
              <div>진행중</div>
              <div>10</div>
            </Box>
            <Box>
              <div>종료</div>
              <div>10</div>
            </Box>
          </Box>
        </Box>
        <Box>
          <div>판매내역 더보기</div>
          <Box direction="row">
            <Box>
              <div>전체</div>
              <div>10</div>
            </Box>
            <Box>
              <div>진행중</div>
              <div>10</div>
            </Box>
            <Box>
              <div>종료</div>
              <div>10</div>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box gridArea="like">관심작품, 관심 작가</Box>
      <Box gridArea="info">공지사항 등</Box>
    </Grid>
  );
}
