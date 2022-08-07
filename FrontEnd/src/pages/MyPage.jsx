import { Avatar, Box, Grid } from "grommet";
import React, { useEffect, useState } from "react";
import { StyledHr, StyledText } from "../components/Common";
import ArtistPng from "../assets/images/artist.png";
import MoreImage from "../assets/images/more.png";
import Button from "../components/Button";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getUserInfoApi } from "../utils/api";
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

const Sector = ({ gridArea, title1, title2 }) => {
  return (
    <Box gridArea={gridArea}>
      <Box alignContent="center">
        <Box direction="row" justify="between" width="80vw">
          <StyledText weight="bold" text={title1}></StyledText>
          <StyledText text="더보기"></StyledText>
        </Box>
        <ContainerBox />
      </Box>
      <Box>
        <Box direction="row" justify="between">
          <StyledText weight="bold" text={title2}></StyledText>
          <StyledText text="더보기"></StyledText>
        </Box>
        <ContainerBox title2={title2} />
      </Box>
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

export default function MyPage() {
  const Selector = useSelector((state) => state.user.user);
  const [token, setToken] = useState("");
  useEffect(() => {
    if (Selector === null) {
      window.location.href = "/login";
    } else {
      console.log(Selector);
      setToken(localStorage.getItem("token"));
      // getUserInfoApi(
      //   (response) => {
      //     console.log(response);
      //   },
      //   (fail) => {
      //     console.log(fail);
      //   }
      // );
    }
  }, []);
  return (
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
            <Box direction="row" align="end">
              <StyledText text="권기정" weight="bold" size="18px" />
              <StyledText text="관리자" size="12px" />
            </Box>
            <StyledText text="msg012525@gmail.com" size="14px" />
          </Box>
        </Box>

        <BackButton>
          <img src={MoreImage} />
        </BackButton>
      </Box>
      <StyledHr
        gridArea="firstHr"
        width="99vw"
        height="2px"
        color="lightgray"
      />
      <Sector gridArea="buysold" title1="구매내역" title2="판매내역" />
      <StyledHr gridArea="secHr" width="99vw" height="2px" color="lightgray" />
      <Sector gridArea="like" title1="관심작품" title2="관심 작가" />
    </Grid>
  );
}
