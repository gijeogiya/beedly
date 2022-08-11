import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CategoryBar } from "../components/MainCategoryBar";
import { BannerTable } from "../components/MainBanner";
import {
  HorizonScrollRowTable,
  HorizonScrollColTable,
} from "../components/HorizonScrollTable";
import { useSelector } from 'react-redux';
import { getArtistApi, getOnairApi } from "../utils/api";

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
  const [OnairList, setOnairList] = useState([]);
  const [ArtistList, setArtistList] = useState([]);
  useEffect(() => {
    // 진행중인 경매
    getOnairApi("0", "20", "", (res) => {
      console.log(res);
      setOnairList(res.data.content);
    }, (err) => {
      console.log(err);
    })

    // 작가 목록 가져오기
    getArtistApi("0", "20", "", (res) => {
      setArtistList(res.data.content);
    }, (err) => {
      console.log(err);
    })
  }, []);
  return (
    <div>
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
        {/* 전달 되어야 할 것은? -> 상품객체 배열 */}
        <HorizonScrollRowTable list={OnairList} />
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
        <HorizonScrollColTable list={ArtistList} />
      </div>
      {/* <div
        style={{
          borderBottom: "1px solid #ebebeb",
          paddingBottom: "20px",
          paddingTop: "20px",
        }}
      >
        <StyledTableTitle>Art For You</StyledTableTitle>
        <StyledTableSubtitle>이런 작품은 어때요?</StyledTableSubtitle>
        <HorizonScrollRowTable />
      </div> */}
      {/* <div
        style={{
          borderBottom: "1px solid #ebebeb",
          paddingBottom: "20px",
          paddingTop: "20px",
        }}
      >
        <StyledTableTitle>New In</StyledTableTitle>
        <StyledTableSubtitle>신규 등록 작품</StyledTableSubtitle>
        <HorizonScrollRowTable />
      </div> */}
      {/* <div style={{ paddingBottom: "20px", paddingTop: "20px" }}>
        <StyledTableTitle>Mug Size</StyledTableTitle>
        <StyledTableSubtitle>책상 위 머그컵 사이즈 작품</StyledTableSubtitle>
        <HorizonScrollRowTable />
      </div> */}
    </div>
  );
}
