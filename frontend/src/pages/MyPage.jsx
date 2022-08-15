import { Avatar, Box, Grid } from "grommet";
import React, { useEffect, useState } from "react";
import { StyledHr, StyledText } from "../components/Common";
import ArtistPng from "../assets/images/artist.png";
import MoreImage from "../assets/images/more.png";
import styled from "styled-components";
import { getUserInfoApi } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { FlexBox } from "../components/UserStyled";
import { useSelector } from "react-redux";

const BackButton = styled.button`
  background: none;
  font-size: 12px;
  font-family: Noto Sans KR, sans-serif;
  border: 0px;
  width: 10vw;
`;

const ContainerBox = ({ title2 }) => {
  return (
    <Box
      direction="row"
      background="light-3"
      align="center"
      justify={title2 === "관심 작가" ? "center" : "evenly"}
      pad={{
        top: "10px",
        bottom: "10px",
      }}
      round="small"
      width="70vw"
      alignSelf="center"
      margin={{
        top: "10px",
        bottom: "20px",
      }}
    >
      <Box
        align="center"
        border={title2 === "관심 작가" ? false : "right"}
        pad={title2 === "관심 작가" ? {} : { right: "30px" }}
        alignSelf={title2 === "관심 작가" ? "center" : "stretch"}
        style={{ display: "flex" }}
      >
        <StyledText size="12px" text="전체"></StyledText>
        <StyledText
          weight="bold"
          color="#FFD100"
          size="12px"
          text="10"
        ></StyledText>
      </Box>
      {title2 !== "관심 작가" && (
        <Box align="center">
          <StyledText size="12px" text="진행중"></StyledText>
          <StyledText weight="bold" size="12px" text="10"></StyledText>
        </Box>
      )}
      {title2 !== "관심 작가" && (
        <Box align="center" pad={{ left: "30px" }}>
          <StyledText size="12px" text="종료"></StyledText>
          <StyledText weight="bold" size="12px" text="10"></StyledText>
        </Box>
      )}
    </Box>
  );
};

const BackButton = styled.button`
    background: none;
    font-size: 12px;
    font-family: Noto Sans KR, sans-serif;
    border: 0px;
    width: 10vw;
  `;
const Sector = ({ title, link }) => {
  return (
    <Box alignContent="center">
      <Box direction="row" justify="between" width="80vw">
        <StyledText weight="bold" text={title}></StyledText>
        <Link to={`/${link}`} style={{ textDecorationLine: "none" }}>
          <StyledText text="더보기"></StyledText>
        </Link>
      </Box>
      <ContainerBox />
    </Box>
  );
};

export default function MyPage() {
  //user 정보 가져오기
  const Navigate = useNavigate("");
  const [user, setUser] = useState({
    userName: "",
    userRole: "",
    userEmail: "",
  });
  const User = useSelector((state) => (state.user.user.user));
  useEffect(() => {
    // 아직 로그인 된 상태가 아니라면
    console.log(User);
    if (User === undefined) {
      // 로그인하라고 보내주기
      Navigate("/login");
    } else {
      // 내 정보 조회
      getUserInfoApi(
        (res) => {
          setUser(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
      // 구매내역 조회
      // getPurchaseApi((res) => {

      // }, (err) => {

      // })
      // 판매내역 조회
      // if (user.userRole == 'ROLE_ARTIST') {
      //   getSalelApi((res) => {

      //   }, (err) => {

      //   })
      // }
    }
    // eslint-disable-next-line
  }, []);
  const CheckRole = () => {
    if (user.userRole === "ROLE_USER") {
      return "구매자";
    } else if (user.userRole === "ROLE_ARTIST") {
      return "작가님";
    } else if (user.userRole === "ROLE_ADMIN") {
      return "관리자";
    }
    return "정보없음";
  };
  return (
    <div>
      <Grid
        width="100vw"
        justify="center"
        margin="0 auto"
        gap="small"
        rows={["auto", "block"]}
        columns={["auto", "block"]}
        areas={[
          ["profile"],
          ["firstHr"],
          ["buysold"],
          ["secHr"],
          ["like"],
          ["info"],
        ]}
      >
        <Box
          gridArea="profile"
          direction="row"
          pad="5px"
          width="90vw"
          margin={{ top: "20px" }}
          justify="between"
        >
          <Box direction="row">
            <Avatar src={ArtistPng} margin="5px"></Avatar>
            <Box margin="5px">
              <Box direction="row" align="end" style={{ marginBottom: "10px" }}>
                <StyledText text={user.userName} weight="bold" size="18px" />
                <StyledText
                  style={{ marginLeft: "10px" }}
                  text={CheckRole()}
                  size="12px"
                />
              </Box>
              <StyledText text={user.userEmail} size="14px" />
            </Box>
          </Box>
          <Link to="/mypageDetail">
            <BackButton>
              <img src={MoreImage} alt="더보기" />
            </BackButton>
          </Link>
        </Box>
        <StyledHr
          gridArea="firstHr"
          width="99vw"
          height="2px"
          color="lightgray"
        />

        {/* 구매내역 & 판매내역 box */}
        <Box gridArea="buysold">
          <Sector title="구매내역" link="PurchaseList" />
          {user.userRole === "ROLE_ARTIST" ? (
            <Sector title="판매내역" link="SaleList" />
          ) : (
            <div></div>
          )}
        </Box>
        <StyledHr
          gridArea="secHr"
          width="99vw"
          height="2px"
          color="lightgray"
        />

        <Box gridArea="like">
          <Sector title="관심작품" link="LikeProduct" />
          <Sector title="관심작가" link="LikeArtist" />
        </Box>
        {/* <StyledHr gridArea="secHr" width="99vw" height="2px" color="lightgray" /> */}
      </Grid>

      {/* 구매자 & 판매자가 볼수있는 button */}
      {user.userRole === ("ROLE_USER" || "ROLE_ARTIST") ? (
        <FlexBox Row_SA style={{ margin: "0px" }}>
          <div
            style={{
              width: "33vw",
              border: "2px solid #D9D9D9",
              textAlign: "center",
              padding: "8px",
              borderRight: "0px",
            }}
          >
            <Link
              to="/adminUserManage"
              style={{
                textDecorationLine: "none",
                fontSize: "14px",
                color: "#1F1D1D",
              }}
            >
              공지사항
            </Link>
          </div>
          <div
            style={{
              width: "33vw",
              border: "2px solid #D9D9D9",
              textAlign: "center",
              padding: "8px",
              borderRight: "0px",
            }}
          >
            <Link
              to="/adminUserManage"
              style={{
                textDecorationLine: "none",
                fontSize: "14px",
                color: "#1F1D1D",
              }}
            >
              QnA
            </Link>
          </div>
          <div
            style={{
              width: "33vw",
              border: "2px solid #D9D9D9",
              textAlign: "center",
              padding: "8px",
            }}
          >
            <Link
              to="/adminUserManage"
              style={{
                textDecorationLine: "none",
                fontSize: "14px",
                color: "#1F1D1D",
              }}
            >
              이용가이드
            </Link>
          </div>
        </FlexBox>
      ) : (
        <div></div>
      )}

      {user.userRole === "ROLE_ADMIN" ? (
        <FlexBox Row_SA style={{ margin: "0px" }}>
          <div
            style={{
              width: "33vw",
              border: "2px solid #D9D9D9",
              textAlign: "center",
              padding: "8px",
              borderRight: "0px",
            }}
          >
            <Link
              to="/adminUserManage"
              style={{
                textDecorationLine: "none",
                fontSize: "14px",
                color: "#1F1D1D",
              }}
            >
              공지사항 등록
            </Link>
          </div>
          <div
            style={{
              width: "33vw",
              border: "2px solid #D9D9D9",
              textAlign: "center",
              padding: "8px",
              borderRight: "0px",
            }}
          >
            <Link
              to="/adminUserManage"
              style={{
                textDecorationLine: "none",
                fontSize: "14px",
                color: "#1F1D1D",
              }}
            >
              유저관리
            </Link>
          </div>
          <div
            style={{
              width: "33vw",
              border: "2px solid #D9D9D9",
              textAlign: "center",
              padding: "8px",
            }}
          >
            <Link
              to="/adminUserManage"
              style={{
                textDecorationLine: "none",
                fontSize: "14px",
                color: "#1F1D1D",
              }}
            >
              물품조회
            </Link>
          </div>
        </FlexBox>
      ) : (
        <div></div>
      )}
    </div>
  );
}
