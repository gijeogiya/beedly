import React, { useEffect } from "react";
import styled from "styled-components";
import { CategoryBar } from "../components/MainCategoryBar";
import { BannerTable } from "../components/MainBanner";
import {
  HorizonScrollRowTable,
  HorizonScrollColTable,
} from "../components/HorizonScrollTable";
import { useSelector } from 'react-redux';

const StyledTableTitle = styled.div`
  font-size: 16px;
  color: #1f1d1d;
  padding-left: 20px;
  font-weight: 900;
`;
const StyledTableSubtitle = styled.div`
  font-size: 14px;
  padding-left: 20px;
  font-weight: 500;
  color: rgba(31, 29, 29, 0.4);
  `;

export default function MainPage() {
  const Selector = useSelector(state => state.user.user);
  useEffect(() => {

  }, []);
  return (
    <div>
      {Selector.userEmail}
      {Selector.userId}
      <CategoryBar />
      <BannerTable />
      <div
        style={{
          borderBottom: "1px solid #ebebeb",
          paddingBottom: "20px",
          paddingTop: "20px",
        }}
      >
        <StyledTableTitle>On Air</StyledTableTitle>
        <StyledTableSubtitle>지금 진행중인 개인경매</StyledTableSubtitle>
        <HorizonScrollRowTable />
      </div>
      <div
        style={{
          borderBottom: "1px solid #ebebeb",
          paddingBottom: "20px",
          paddingTop: "20px",
        }}
      >
        <StyledTableTitle>Today’s Artist</StyledTableTitle>
        <StyledTableSubtitle>오늘의 인기작가</StyledTableSubtitle>
        <HorizonScrollColTable />
      </div>
      <div
        style={{
          borderBottom: "1px solid #ebebeb",
          paddingBottom: "20px",
          paddingTop: "20px",
        }}
      >
        <StyledTableTitle>Art For You</StyledTableTitle>
        <StyledTableSubtitle>이런 작품은 어때요?</StyledTableSubtitle>
        <HorizonScrollRowTable />
      </div>
      <div
        style={{
          borderBottom: "1px solid #ebebeb",
          paddingBottom: "20px",
          paddingTop: "20px",
        }}
      >
        <StyledTableTitle>New In</StyledTableTitle>
        <StyledTableSubtitle>신규 등록 작품</StyledTableSubtitle>
        <HorizonScrollRowTable />
      </div>
      <div style={{ paddingBottom: "20px", paddingTop: "20px" }}>
        <StyledTableTitle>Mug Size</StyledTableTitle>
        <StyledTableSubtitle>책상 위 머그컵 사이즈 작품</StyledTableSubtitle>
        <HorizonScrollRowTable />
      </div>
    </div>
  );
}
