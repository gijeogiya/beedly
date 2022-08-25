import { Avatar, Box, Grid, Spinner } from "grommet";
import React, { useEffect, useState } from "react";
import { StyledHr, StyledText } from "../components/Common";
import ArtistPng from "../assets/images/artist.png";
import MoreImage from "../assets/images/more.png";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FlexBox } from "../components/UserStyled";
import { useSelector } from "react-redux";
import {
  getMyArtistList,
  getPurchaseApi,
  getUserInfoApi,
  getLikeProduct,
  getSaleApi,
} from "../utils/apis/UserAPI";
import ArtistMan from "../assets/img/artist_man.png";
import ArtistWoman from "../assets/img/artist_woman.png";
import UserMan from "../assets/img/user_man.png";
import UserWoman from "../assets/img/user_woman.png";

const BackButton = styled.button`
  background: none;
  font-size: 12px;
  font-family: Noto Sans KR, sans-serif;
  border: 0px;
  width: 10vw;
`;
const StyledCardArtistImg = styled.img`
  width: 17vw;
  height: 17vw;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #ebebeb;
`;
const ContainerBox = ({ title2, Total, Ing, End }) => {
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
      width="75vw"
      alignSelf="center"
      margin={{
        top: "10px",
        bottom: "10px",
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
          text={Total}
        ></StyledText>
      </Box>
      {title2 !== "관심 작가" && (
        <Box align="center">
          <StyledText
            size="12px"
            text={title2 === "구매내역" ? "미결제" : "진행중"}
          ></StyledText>
          <StyledText weight="bold" size="12px" text={Ing}></StyledText>
        </Box>
      )}
      {title2 !== "관심 작가" && (
        <Box align="center" pad={{ left: "30px" }}>
          <StyledText
            size="12px"
            text={title2 === "구매내역" ? "결제" : "종료"}
          ></StyledText>
          <StyledText weight="bold" size="12px" text={End}></StyledText>
        </Box>
      )}
    </Box>
  );
};

const Sector = ({ title, link, Total, Ing, End }) => {
  return (
    <Box alignContent="center" width="75vw" style={{ paddingTop: "10px" }}>
      <Box direction="row" justify="between" width="80vw" align="end">
        <StyledText weight="bold" text={title} size="15px"></StyledText>
        <Link to={`/${link}`} style={{ textDecorationLine: "none" }}>
          <StyledText
            text="더보기"
            size="12px"
            color="gray"
            weight="bold"
          ></StyledText>
        </Link>
      </Box>
      <ContainerBox title2={title} Total={Total} Ing={Ing} End={End} />
    </Box>
  );
};

export default function MyPage() {
  //user 정보 가져오기
  const Navigate = useNavigate("");
  const [user, setUser] = useState({});
  const User = useSelector((state) => state.user.user.user);
  const [loading, setLoading] = useState(true);

  const [TotalSale, setTotalSale] = useState(0);
  const [IngSale, setIngSale] = useState(0);
  const [EndSale, setEndSale] = useState(0);

  const [TotalPurchase, setTotalPurchase] = useState(0);
  const [IngPurchase, setIngPurchase] = useState(0);
  const [EndPurchase, setEndPurchase] = useState(0);
  const [TotalFav, setTotalFav] = useState(0);
  const [IngFav, setIngFav] = useState(0);
  const [EndFav, setEndFav] = useState(0);
  const [favArtist, setFavArtist] = useState(0);
  const handleSale = (array) => {
    array.map((item) => {
      setTotalSale((prev) => prev + 1);
      if (item.soldStatus === "SUCCESS") setEndSale((prev) => prev + 1);
      else setIngSale((prev) => prev + 1);
    });
  };

  const handlePurchase = (array) => {
    array.map((item) => {
      setTotalPurchase((prev) => prev + 1);
      if (item.paidFlag) setEndPurchase((prev) => prev + 1);
      else setIngPurchase((prev) => prev + 1);
    });
  };

  const handleFavortie = (array) => {
    array.map((item) => {
      setTotalFav((prev) => prev + 1);
      if (item.soldStatus === "SUCCESS") setEndFav((prev) => prev + 1);
      else setIngFav((prev) => prev + 1);
    });
  };

  useEffect(() => {
    if (loading) {
      // 아직 로그인 된 상태가 아니라면
      // console.log(User);
      if (User === undefined) {
        // 로그인하라고 보내주기
        Navigate("/login");
      } else {
        // 내 정보 조회
        getUserInfoApi(
          (res) => {
            console.log(res);
            setUser((prev) => (prev = res.data));
            if (res.data.userRole === "ROLE_ARTIST")
              getSaleApi(
                (res) => {
                  console.log("판매내역 ", res);
                  handleSale(res.data);
                },
                (err) => {
                  console.log(err);
                }
              );
          },
          (err) => {
            console.log(err);
          }
        );
        // 구매내역 조회
        getPurchaseApi(
          (res) => {
            console.log("구매내역 ", res);
            handlePurchase(res.data);
          },
          (err) => {
            console.log(err);
          }
        );
        // 판매내역 조회
        // if (user.userRole !== "ROLE_USER") {
        //   getSaleApi(
        //     (res) => {
        //       console.log("판매내역 ", res);
        //       handleSale(res.data);
        //     },
        //     (err) => {
        //       console.log(err);
        //     }
        //   );
        // }

        // 찜한 상품 조회
        getLikeProduct(
          (res) => {
            console.log("관심작품 ", res);
            handleFavortie(res.data);
          },
          (err) => {
            console.log(err);
          }
        );
        //관심 작가 조회
        getMyArtistList(
          (response) => {
            console.log("관심작가 : ", response);
            setFavArtist(response.data.length);
          },
          (err) => {
            console.log(err);
          }
        );
      }
      setLoading(false);
    }
  }, [loading]);

  const checkProfile = () => {
    if (user.artistProfileImg) return user.artistProfileImg;
    if (user.userGender === "M") {
      if (user.userRole === "ROLE_USER") {
        return UserMan;
      } else if (user.userRole === "ROLE_ARTIST") {
        return ArtistMan;
      }
    } else if (user.userGender === "F") {
      if (user.userRole === "ROLE_USER") {
        return UserWoman;
      } else if (user.userRole === "ROLE_ARTIST") {
        return ArtistWoman;
      }
    }
    return UserMan;
  };
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
  if (loading) return <Spinner />;
  return (
    <div>
      <Box width="100vw" justify="center" margin="0 auto" gap="small">
        <Box
          direction="column"
          align="center"
          justify="between"
          style={{
            borderBottom: "4px solid #ebebeb",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <Box direction="row" align="center">
            <StyledCardArtistImg
              src={checkProfile()}
              margin="5px"
            ></StyledCardArtistImg>
            <Box margin="5px" width="60vw">
              <Box
                direction="row"
                align="end"
                style={{ marginBottom: "5px" }}
                justify="center"
              >
                <StyledText text={user.userName} weight="bold" size="18px" />
                <StyledText
                  style={{ marginLeft: "5px" }}
                  text={CheckRole()}
                  size="12px"
                />
              </Box>
              <Box direction="row" style={{ width: "60vw" }} justify="center">
                <StyledText text={user.userEmail} size="14px" />
              </Box>
            </Box>
            <Box alignSelf="center">
              <Link to="/mypageDetail">
                <BackButton>
                  <img src={MoreImage} alt="더보기" />
                </BackButton>
              </Link>
            </Box>
          </Box>
        </Box>

        {/* 구매내역 & 판매내역 box */}
        <Box
          direction="column"
          align="center"
          style={{
            borderBottom: "4px solid #ebebeb",
          }}
        >
          <Sector
            title="구매내역"
            link="PurchaseList"
            Total={TotalPurchase}
            Ing={IngPurchase}
            End={EndPurchase}
          />
          {user.userRole === "ROLE_USER" || "ROLE_ARTIST" ? (
            <Sector
              title="판매내역"
              link="SaleList"
              Total={TotalSale}
              Ing={IngSale}
              End={EndSale}
            />
          ) : (
            <div></div>
          )}
        </Box>

        <Box direction="column" align="center">
          <Sector
            title="관심작품"
            link="LikeList"
            Total={TotalFav}
            Ing={IngFav}
            End={EndFav}
          />
          <Sector2 title="관심작가" link="LikeArtist" count={favArtist} />
        </Box>
      </Box>

      {/* 구매자 & 판매자가 볼수있는 button */}
      {user.userRole === ("ROLE_USER" || "ROLE_ARTIST") ? (
        <FlexBox Row_SA style={{ margin: "0px" }}>
          <div
            style={{
              width: "33vw",
              border: "4px solid #D9D9D9",
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
              to="/specialAuctionRegister"
              style={{
                textDecorationLine: "none",
                fontSize: "14px",
                color: "#1F1D1D",
              }}
            >
              기획전 등록
            </Link>
          </div>
        </FlexBox>
      ) : (
        <div></div>
      )}
    </div>
  );
}

const ContainerBox2 = ({ title2, count }) => {
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
      width="75vw"
      alignSelf="center"
      margin={{
        top: "10px",
        bottom: "20px",
      }}
    >
      <Box
        align="center"
        alignSelf={title2 === "관심 작가" ? "center" : "stretch"}
        style={{ display: "flex" }}
      >
        <StyledText size="12px" text="전체"></StyledText>
        <StyledText
          weight="bold"
          color="#FFD100"
          size="12px"
          text={count}
        ></StyledText>
      </Box>
    </Box>
  );
};

const Sector2 = ({ title, link, count }) => {
  return (
    <Box alignContent="center" width="75vw" style={{ paddingTop: "10px" }}>
      <Box direction="row" justify="between" width="80vw" align="end">
        <StyledText weight="bold" text={title} size="15px"></StyledText>
        <Link to={`/${link}`} style={{ textDecorationLine: "none" }}>
          <StyledText
            text="더보기"
            size="12px"
            color="gray"
            weight="bold"
          ></StyledText>
        </Link>
      </Box>
      <ContainerBox2 count={count} />
    </Box>
  );
};
