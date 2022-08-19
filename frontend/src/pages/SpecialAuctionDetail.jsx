import { Box, Carousel, Image, Spinner } from "grommet";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import { StyledText } from "../components/Common";
import { HorizonScrollRowTable } from "../components/HorizonScrollTable";
import { Category, moneyFormat } from "../stores/modules/basicInfo";
import { registerSpecialAuction } from "../utils/apis/AuctionAPI";
import { getSpecialBoard } from "../utils/apis/SpecialBoardAPI";
import { HeaderBox } from "./ProductDetail";
import Clock from "../assets/images/clock.png";
export const SpecialAuctionDetail = () => {
  const { boardId } = useParams();
  const [loading, setLoading] = useState(true);
  const User = useSelector((state) => state.user.user.user);
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [startTime, setStartTime] = useState();
  const [specialBoard, setSpecialBoard] = useState();
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const [nowDate, setNowDate] = useState(new Date());
  // data DTO
  //   "startTime": "2022-09-01T18:00:00",
  //   "boardTitle": "대박 기획전",
  //   "boardSubtitle": "대박대박 기획전이에요",
  //   "boardDesc": "이번 기획전은 대박 상품들만 준비했습니다.",
  //   "mainImgUri": "https://beedly-img.s3.ap-northeast-2.amazonaws.com/8918e628-6a57-44f5-b4cb-7ccc95d2096a",
  //   "userId": 1,
  //  "specialAuctionId": 1

  //     "specialProducts": [
  //     {
  //       "productId": 1,
  //       "productName": "기획전 상품",
  //       "productDesc": "기획전 상품이에요오오오",
  //       "startPrice": 50000,
  //       "height": 5,
  //       "weight": 5,
  //       "depth": 5,
  //       "artistName": "moonsk",
  //       "soldStatus": "STANDBY",
  //       "categoryId": 2,
  //       "categoryName": "판화",
  //       "specialProductImgs": [
  //         "https://beedly-img.s3.ap-northeast-2.amazonaws.com/427a1af1-4b0d-4d4d-ab66-5698cd7473de",
  //         "https://beedly-img.s3.ap-northeast-2.amazonaws.com/95342e6f-7ad8-4f33-973d-18f26e233ac2"
  //       ]
  //       },
  //     ]

  useEffect(() => {
    if (!User) {
      alert("로그인이 필요합니다.");
      window.location.href = "/login";
    }
    setSpecialBoard({
      startTime: "",
      boardTitle: "",
      boardSubtitle: "",
      boardDesc: "",
      mainImgUri: "",
      userId: "",
      specialAuctionId: "",
      specialProducts: [],
    });
    const ee = setInterval(() => {
      if (!isStart()) setNowDate(new Date());
      if (nowDate > startTime) handleBoardData();
    }, 1000);
    if (loading) handleBoardData();

    return () => {
      clearInterval(ee);
      return () => setLoading(false);
    };
  }, []);

  const isStart = () => {
    let dueDate = new Date(startTime);
    let now = new Date();
    // if (specialBoard.specialAuctionId !== null) return true;
    if (dueDate.getTime() <= now.getTime() && specialBoard.specialAuctionId)
      return true;
    if (
      dueDate.getTime() <= now.getTime() &&
      !specialBoard.specialAuctionId &&
      User.userId === specialBoard.userId
    )
      return true;
    else return false;
  };

  const handleBoardData = () => {
    getSpecialBoard(
      boardId,
      (response) => {
        console.log(response);
        let data = response.data;
        setStartTime(data.startTime);
        setSpecialBoard({
          boardTitle: data.boardTitle,
          boardSubtitle: data.boardSubtitle,
          boardDesc: data.boardDesc,
          mainImgUri: data.mainImgUri,
          userId: data.userId,
          specialAuctionId: data.specialAuctionId,
          specialProducts: data.specialProducts,
        });

        setLoading(false);
      },
      (fail) => {
        console.log(fail);
        setLoading(false);
      }
    );
  };

  const handleDate = (date) => {
    let now = nowDate;
    let dueDate = new Date(date);
    let diff = dueDate.getTime() + KR_TIME_DIFF - now.getTime();

    // console.log(diff);
    if (diff <= 0 && isStart())
      return User.userId !== specialBoard.userId
        ? "실시간 경매 입장"
        : "경매 시작";
    else if (diff <= 0 && !isStart())
      return User.userId !== specialBoard.userId
        ? "실시간 경매 준비중"
        : "경매 시작";
    else {
      let sec = 1000;
      let minute = sec * 60;
      let hour = minute * 60;
      let day = 24 * hour;
      let month = day * 30;
      if (diff / month >= 1) {
        return `${diff / month}달 남음`;
      } else if (diff / day >= 1) {
        return `${parseInt(diff / day)}일 남음`;
      } else {
        return `${diff / hour >= 1 ? `${parseInt(diff / hour)}:` : ``}${
          diff / minute >= 1
            ? `${
                parseInt((diff % hour) / minute) < 10
                  ? `0${parseInt((diff % hour) / minute)}`
                  : parseInt((diff % hour) / minute)
              }:`
            : ``
        }${
          parseInt((diff % minute) / sec) < 10
            ? `0${parseInt((diff % minute) / sec)}`
            : parseInt((diff % minute) / sec)
        }`;
      }
    }
  };

  const enterAuction = () => {
    if (isStart()) {
      if (specialBoard.specialAuctionId === null) {
        if (specialBoard.userId === User.userId) {
          registerSpecialAuction(
            boardId,
            (response) => {
              console.log(response);
              navigate("/specialAuction", {
                state: {
                  grade:
                    specialBoard.userId === User.userId ? "seller" : "buyer",
                  auctionId: response.data.auctionId,
                  userName: User.userName,
                  auctionType: "S",
                },
              });
            },
            (fail) => {
              console.log(fail);
            }
          );
        } else {
          alert("경매 시작 전 입니다.");
        }
      } else {
        console.log("상품 화면 유저 정보 ", specialBoard);
        navigate("/specialAuction", {
          state: {
            grade: specialBoard.userId === User.userId ? "seller" : "buyer",
            auctionId: specialBoard.specialAuctionId,
            userName: User.userName,
            auctionType: "S",
          },
        });
      }
    } else {
      alert("경매 시작 전입니다.");
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const sharePage = () => {
    window.navigator.canShare({
      title: `Beedly - 기획전 ${specialBoard.boardTitle}`,
      text: `${specialBoard.boardSubtitle}`,
      url: window.location.href,
    });
  };

  const deleteBoard = () => {
    if (window.confirm("삭제하시겠습니까?")) {
    }
  };
  const modifyBoard = () => {
    navigate("/specialBoardModify", {
      state: {
        boardId: boardId,
      },
    });
  };

  const handleRegisterProduct = () => {
    navigate(`/specialProduct/${boardId}`);
  };

  const stringToDate = (string) => {
    // console.log(string);
    const date = string.split("T");
    const yyyyMMdd = date[0].split("-");
    const HHmm = date[1].split(":");
    return `${yyyyMMdd[0]}년 ${parseInt(yyyyMMdd[1])}월 ${parseInt(
      yyyyMMdd[2]
    )}일  ${parseInt(HHmm[0])}시 ${
      parseInt(HHmm[1]) !== 0 ? `${parseInt(HHmm[1])}분` : ``
    } 예정`;
    // return date.toString("yyyy년 MM월 dd일 HH시 mm분 예정");
  };

  if (loading) return <Spinner />;
  return (
    <Box>
      <HeaderBox
        isSeller={specialBoard.userId === User.userId}
        goBack={goBack}
        sharePage={sharePage}
        deleteProduct={deleteBoard}
        modifyProduct={modifyBoard}
      />
      <Image src={specialBoard.mainImgUri} fit="cover" />
      <Box margin="small">
        <StyledText text={specialBoard.boardSubtitle} />
        <StyledText text={specialBoard.boardTitle} weight="bold" />
        <StyledText text={stringToDate(startTime)} />
        <StyledText text={specialBoard.boardDesc} />
      </Box>
      <Button
        onClick={enterAuction}
        BigBlack={!isStart()}
        BigRed={isStart()}
        disabled={!isStart()}
        children={
          <Box direction="row" margin="xsmall" justify="center">
            <img src={Clock} alt="" />
            <StyledText
              text={handleDate(startTime)}
              color="white"
              size="10px"
              style={{ marginLeft: "10px" }}
            />
          </Box>
        }
      />
      <Box margin="small">
        <StyledText text="작품 목록" />
        <HorizonScrollRowTable
          list={specialBoard.specialProducts}
          startTime={startTime}
        />
      </Box>
      <Box margin="medium">
        {specialBoard.specialProducts.length < 1 && (
          <StyledText text="등록된 작품이 없습니다. 작품을 등록하세요." />
        )}
        {specialBoard.specialProducts.map((specialProduct, idx) => (
          <Box key={idx} id={specialProduct.productId}>
            {/* <MainImg src={Product1} /> */}
            <Carousel
              fill
              wrap={true}
              play={specialProduct.specialProductImgs.length > 1 ? 3000 : 0}
              controls="arrows"
            >
              {specialProduct.specialProductImgs.map((image, idx) => {
                return <Image src={image} fit="cover" key={idx} />;
              })}
            </Carousel>

            <Box margin="medium">
              <StyledText
                text={Category[specialProduct.categoryId].label}
                weight="bold"
                size="18px"
                style={{ textDecoration: "underline" }}
              />
              <StyledText text={specialProduct.artistName} />
              <StyledText text={specialProduct.productName} />
              <StyledText
                text={`${moneyFormat(specialProduct.startPrice)}원 ~`}
              />
              <StyledText text={stringToDate(startTime)} />
            </Box>
            <Box margin="small">
              <StyledText text="작품 설명" />
              <StyledText
                text={specialProduct.productDesc}
                size="10px"
                color="#7B7B7B"
              />
            </Box>
          </Box>
        ))}
        {User.userId === specialBoard.userId && !isStart() && (
          <Box direction="row" justify="center">
            <Button
              BigBlack
              children="작품 등록"
              onClick={handleRegisterProduct}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
