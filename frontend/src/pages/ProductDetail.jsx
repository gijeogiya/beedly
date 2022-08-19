import { Box, Image, Menu, Spinner } from "grommet";
import React, { useState } from "react";
import Button from "../components/Button";
import BackBtn from "../assets/images/backButton.png";
import More from "../assets/images/more.png";
import MoreBtn from "../assets/images/more2.png";
import LikeBtn from "../assets/images/like.png";
import ShareBtn from "../assets/images/share.svg";
import Clock from "../assets/images/clock.png";
import FileText from "../assets/images/file-text.png";
import { BackButton } from "./ProductRegister";
import { StyledHr, StyledText } from "../components/Common";
import { HorizonScrollRowTable } from "../components/HorizonScrollTable";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Category, moneyFormat } from "../stores/modules/basicInfo";
import { AbsenteeBid } from "../components/AbsenteeBid";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CloseButton from "../assets/images/close.png";
import { FlexBox, Input2, Input3 } from "../components/UserStyled";
import styled from "styled-components";
import {
  deletePersonalProduct,
  getPersonalProduct,
} from "../utils/apis/PersonalProductAPI";
import {
  deleteAbsenteeBid,
  postAbsenteeBid,
  updateAbsenteeBid,
} from "../utils/apis/absenteeBidAPI";
import { registerAuction } from "../utils/apis/AuctionAPI";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  deletePersonalFavorite,
  postPersonalFavorite,
} from "../utils/apis/PersonalFavoriteAPI";
import Carousel from "nuka-carousel";
import { AlertDialog } from "../components/AlertDialog";
export const HeaderBox = ({
  isSeller,
  goBack,
  sharePage,
  deleteProduct,
  modifyProduct,
}) => {
  return (
    <Box direction="row" justify="between" margin="small">
      <Box>
        <BackButton onClick={goBack}>
          <img src={BackBtn} alt="" />
        </BackButton>
      </Box>
      <Box direction="row">
        <Box alignContent="center">
          {isSeller && (
            <Menu
              icon={false}
              label={<img src={MoreBtn} alt="" />}
              items={[
                { label: "수정", onClick: modifyProduct },
                { label: "삭제", onClick: deleteProduct },
              ]}
              dropAlign={{
                top: "top",
                right: "right",
              }}
            />
          )}
        </Box>
        <Box>
          <BackButton onClick={sharePage}>
            <img src={ShareBtn} alt="" />
          </BackButton>
        </Box>
      </Box>
    </Box>
  );
};

// const MainImg = styled.img`
//   width: 100%;
// `;

export const DialogCloseButton = styled.button`
  background: none;
  font-size: 12px;
  font-family: Noto Sans KR, sans-serif;
  border: 0px;
  width: 10vw;
`;

export const ProductDetail = () => {
  const { productId } = useParams();

  const [loading, setLoading] = useState(true);

  const [productName, setProductName] = useState("");
  const [productArtist, setProductArtist] = useState("");
  const [artistId, setArtistId] = useState("");
  const [category, setCategory] = useState("카테고리");
  const [startTime, setStartTime] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productLike, setProductLike] = useState(0);
  const [soldStatus, setSoldStatus] = useState("");
  const [nowDate, setNowDate] = useState(new Date());
  const [artistNickname, setArtistNickname] = useState("");
  // const [product, setProduct] = useState({});
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [auctionId, setAuctionId] = useState("");
  const [isOnAir, setIsOnAir] = useState("");
  const [absenteeBidPrice, setAbsenteeBidPrice] = useState();
  const [isAbsenteeBid, setIsAbsenteeBid] = useState();
  const [absenteeBidId, setAbsenteeBidId] = useState("");
  const User = useSelector((state) => state.user.user.user);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState();
  const [favoriteId, setFavoriteId] = useState();
  const [tags, setTags] = useState();
  const navigate = useNavigate();
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  // console.log("user : ", User);
  useEffect(() => {
    if (!User) {
      alert("로그인이 필요합니다.");
      window.location.href = "/login";
    }

    if (loading) getProductInfo();

    const ee = setInterval(() => {
      if (!isStart()) setNowDate(new Date());
      if (nowDate > startTime) getProductInfo();
    }, 1000);

    return () => {
      clearInterval(ee);
    };
  }, [loading, absenteeBidPrice]);

  const getProductInfo = () => {
    getPersonalProduct(
      // id,
      productId,
      (response) => {
        // console.log(response.data);
        // const product = response.data;
        handleDataChanges(response.data);
        console.log(response);

        setLoading(false);
      },
      (fail) => {
        console.log(fail);
      }
    );
  };

  const handleDataChanges = (data) => {
    setProductName(data.personalProductDto.productName);
    setProductArtist(data.personalProductDto.userName);
    setCategory(data.personalProductDto.categoryId);
    setStartTime(data.personalProductDto.startTime);
    setStartPrice(data.personalProductDto.startPrice);
    setProductDesc(data.personalProductDto.productDesc);
    setProductImages([...data.personalProductDto.productImgs]);
    setProductLike(data.personalProductDto.favoriteCount);
    setSoldStatus(data.personalProductDto.soldStatus);
    setArtistNickname(data.personalProductDto.userNickname);
    //UserId 설정
    setArtistId(data.personalProductDto.userId);
    setAuctionId(data.auctionId);
    setIsAbsenteeBid(data.isAbsenteeBid);
    setFavoriteCount(data.personalProductDto.favoriteCount);
    setFavoriteId(data.favoriteId);
    setIsFavorite(data.isFavorite);
    setIsOnAir(data.isOnAir);
    setTags(data.personalProductDto.searchTagDtos);
    setAbsenteeBidPrice(
      data.absenteeBidPrice === null ? "" : data.absenteeBidPrice
    );
    setAbsenteeBidId(data.absenteeBidId === null ? "" : data.absenteeBidId);
    // setProduct(data);
  };

  const goBack = () => {
    navigate(-1);
  };

  const sharePage = () => {
    window.navigator.share({
      title: `Beedly - ${productArtist} 작가님의 ${productName}`,
      text: `${productDesc}`,
      url: window.location.href,
    });
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDel(false);
  };

  const handleDate = (date) => {
    let now = nowDate;
    let dueDate = new Date(date);
    let diff = dueDate.getTime() + KR_TIME_DIFF - now.getTime();

    // console.log(diff);
    if (diff <= 0 && isStart())
      return User.userId !== artistId ? "실시간 경매 입장" : "경매 시작";
    else if (diff <= 0 && !isStart())
      return User.userId !== artistId ? "실시간 경매 준비중" : "경매 시작";
    else {
      let sec = 1000;
      let minute = sec * 60;
      let hour = minute * 60;
      let day = 24 * hour;
      let month = day * 30;
      if (diff / month >= 1) {
        return `${parseInt(diff / month)}달 남음`;
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

  const handleAbsentee = () => {
    if (!isStart()) setOpen(true);
  };

  const isValidAbsentee = () => {
    if (
      absenteeBidPrice === 0 ||
      absenteeBidPrice === "" ||
      absenteeBidPrice < startPrice
    )
      return false;
    return true;
  };

  const postAbsentee = () => {
    if (isValidAbsentee()) {
      if (window.confirm("응찰하시겠습니까?")) {
        let params = {
          productId: productId,
          absenteeBidPrice: absenteeBidPrice,
        };
        postAbsenteeBid(
          params,
          (response) => {
            console.log(response);
            alert("응찰되었습니다.");
            handleClose();
            window.location.replace(`/productDetail/${productId}`);
          },
          (fail) => {
            console.log(fail);
          }
        );
      }
    } else {
      alert("희망 응찰가를 입력하세요!(시작가 < 응찰가)");
    }
  };

  const updateAbsentee = () => {
    if (isValidAbsentee()) {
      if (window.confirm("수정하시겠습니까?")) {
        let params = {
          absenteeBidId: absenteeBidId,
          absenteeBidPrice: absenteeBidPrice,
        };
        updateAbsenteeBid(
          params,
          (response) => {
            console.log(response);
            alert("수정되었습니다.");
            handleClose();
            window.location.replace(`/productDetail/${productId}`);
          },
          (fail) => {
            console.log(fail);
          }
        );
      }
    } else {
      alert("희망 응찰가를 입력하세요!(시작가 < 응찰가)");
    }
  };

  const deleteAbsentee = () => {
    if (window.confirm("철회하시겠습니까?")) {
      let params = {
        absenteeBidId: absenteeBidId,
        absenteeBidPrice: absenteeBidPrice,
      };
      deleteAbsenteeBid(
        params,
        (response) => {
          console.log(response);
          alert("철회되었습니다.");
          handleClose();
          window.location.replace(`/productDetail/${productId}`);
        },
        (fail) => {
          console.log(fail);
        }
      );
    }
  };

  const handleFavorite = () => {
    //좋아요를 눌렀다면
    if (isFavorite) {
      deletePersonalFavorite(
        favoriteId,
        (response) => {
          console.log(response);
          getProductInfo();
        },
        (fail) => {
          console.log(fail);
        }
      );
    } else {
      postPersonalFavorite(
        productId,
        (response) => {
          console.log(response);
          getProductInfo();
        },
        (fail) => {
          console.log(fail);
        }
      );
    }
  };

  const isAbsenteePossible = () => {
    let dueDate = new Date(startTime);
    let now = new Date();
    if (isStart()) return false;
    if (dueDate.getTime() <= now.getTime()) return false;
    return true;
  };

  const isStart = () => {
    let dueDate = new Date(startTime);
    let now = new Date();
    if (isOnAir) return true;
    if (dueDate.getTime() + KR_TIME_DIFF <= now.getTime() && isOnAir)
      return true;
    if (
      dueDate.getTime() + KR_TIME_DIFF <= now.getTime() &&
      !isOnAir &&
      User.userId === artistId
    )
      return true;
    else return false;

    return dueDate.getTime() <= now.getTime() ? true : false;
  };

  const enterAuction = () => {
    if (isStart()) {
      if (auctionId === null) {
        if (artistId === User.userId) {
          registerAuction(
            productId,
            (response) => {
              console.log(response);
              navigate("/personalAuction", {
                state: {
                  grade: artistId === User.userId ? "seller" : "buyer",
                  auctionId: response.data.auctionId,
                  auctionType: "P",
                  userName: User.userName,
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
        console.log("상품 화면 유저 정보 ", User);
        navigate("/personalAuction", {
          state: {
            grade: artistId === User.userId ? "seller" : "buyer",
            auctionId: auctionId,
            auctionType: "P",
            userName: User.userName,
          },
        });
      }
    } else {
      alert("경매 시작 전입니다.");
    }
  };

  const stringToDate = (string) => {
    // console.log(string);
    // const due = new Date(string).getTimezoneOffset() * 6000;
    const dueDate = new Date(string);
    // console.log(dueDate);
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

  const deleteProduct = () => {
    deletePersonalProduct(
      productId,
      (response) => {
        console.log(response);
        navigate("/");
        // window.location.href = "/";
      },
      (fail) => {
        console.log(fail);
      }
    );
  };
  const modifyProduct = () => {
    navigate("/productModify", {
      state: {
        productId: productId,
      },
    });
  };

  // const getProductInfo = async () => {
  //   await getPersonalProduct(
  //     // id,
  //     31,
  //     (response) => {
  //       console.log(response.data);
  //       // const product = response.data;
  //       setProductName(response.data.productName);
  //       setProductArtist(response.data.productArtist);
  //       setCategory(response.data.categoryId);
  //       setStartTime(response.data.startTime);
  //       setStartPrice(response.data.startPrice);
  //       setProductDesc(response.data.productDesc);
  //       setProductImages([...response.data.productImgs]);
  //       setProductLike(response.data.favoriteCount);
  //       setProduct(response.data);
  //     },
  //     (fail) => {
  //       console.log(fail);
  //     }
  //   );
  // };
  // if (loading) return ;
  return loading ? (
    <Box width="100%" height="100%" justify="center">
      <Spinner />
    </Box>
  ) : (
    <Box>
      <HeaderBox
        isSeller={artistId === User.userId}
        goBack={goBack}
        sharePage={sharePage}
        deleteProduct={() => setOpenDel(true)}
        modifyProduct={modifyProduct}
      />
      <Box>
        {/* <MainImg src={Product1} /> */}
        <Carousel
          autoplay={productImages.length > 1 ? true : false}
          autoplayInterval={productImages.length > 1 ? 3000 : 0}
          wrapAround={true}
          speed={500}
          renderCenterLeftControls={
            productImages.length > 1
              ? ({ previousSlide }) => (
                  <Button
                    Blank
                    onClick={previousSlide}
                    children={<img src={BackBtn} />}
                  />
                )
              : null
          }
          renderCenterRightControls={
            productImages.length > 1
              ? ({ nextSlide }) => (
                  <Button
                    Blank
                    onClick={nextSlide}
                    children={<img src={More} />}
                  />
                )
              : null
          }
        >
          {productImages.map((image, idx) => {
            return (
              <Box style={{ margin: "0 auto" }} key={idx}>
                <Image
                  src={image}
                  fit="cover"
                  fill="horizontal"
                  style={{ display: "inline-block" }}
                />
              </Box>
            );
          })}
        </Carousel>

        <Box margin="large">
          <StyledText text={productName} weight="bold" size="18px" />
          <StyledText
            text={productArtist}
            size="16px"
            style={{ paddingTop: "15px" }}
          />
          <StyledText
            text={Category[category].label}
            size="16px"
            style={{ paddingTop: "10px" }}
          />
          <StyledText
            text={`${moneyFormat(startPrice)}원 ~`}
            size="16px"
            style={{ paddingTop: "10px" }}
          />
          <StyledText
            text={stringToDate(startTime)}
            size="16px"
            style={{ paddingTop: "10px" }}
          />
        </Box>
        <Box margin="large">
          <StyledText text="작품 설명" size="17px" />
          <StyledText
            text={productDesc}
            color="#7B7B7B"
            size="14px"
            style={{ paddingTop: "10px" }}
          />
        </Box>
        <Box margin="large">
          <StyledText text="작품 정보" size="17px" />
          <FlexBox Row_S style={{ flexWrap: "wrap", padding: "10px 0" }}>
            {tags.map((item, idx) => (
              <StyledText
                key={item.id}
                text={`#${item.searchTagName}`}
                style={{
                  backgroundColor: "#f4f4f4",
                  padding: "8px",
                  fontSize: "14px",
                  margin: "0px 8px 12px 0px",
                  border: "1px solid #ebebeb",
                  borderRadius: "16px",
                }}
              />
            ))}
          </FlexBox>
        </Box>
      </Box>
      {/* <Box margin="small">
        <StyledText text="이 작품과 비슷한 작품" />
        <HorizonScrollRowTable />
      </Box> */}
      <Box direction="row" margin="small">
        <Box align="center" margin="small">
          <Button
            Blank
            onClick={handleFavorite}
            children={
              <Box align="center">
                {isFavorite ? (
                  <FavoriteIcon style={{ color: "red" }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
                <StyledText text={favoriteCount} />
              </Box>
            }
          ></Button>
        </Box>
        <Box
          alignContent="center"
          align="center"
          justify="center"
          direction="row"
          width="100%"
          margin={{ bottom: "60px" }}
        >
          {soldStatus === "STANDBY" && User.userId !== artistId ? (
            <Button
              MediumGreen={isAbsenteePossible()}
              MediumGray={!isAbsenteePossible()}
              disabled={!isAbsenteePossible()}
              children={
                <Box direction="row" margin="xsmall" justify="center">
                  <img src={FileText} alt="" />
                  <StyledText
                    text={isAbsenteeBid ? "서면응찰 수정" : "서면응찰"}
                    color="white"
                    size="14px"
                    style={{ marginLeft: "10px" }}
                  />
                </Box>
              }
              onClick={handleAbsentee}
            />
          ) : null}
          {soldStatus === "STANDBY" && (
            <Button
              onClick={enterAuction}
              MediumBlack={User.userId !== artistId && !isStart()}
              BigBlack={User.userId === artistId && !isStart()}
              MideumRed={User.userId !== artistId && isStart()}
              BigRed={User.userId === artistId && isStart()}
              disabled={!isStart()}
              children={
                <Box direction="row" margin="xsmall" justify="center">
                  <img src={Clock} alt="" />
                  <StyledText
                    text={handleDate(startTime)}
                    color="white"
                    size="14px"
                    style={{ marginLeft: "10px" }}
                  />
                </Box>
              }
            />
          )}
          {soldStatus !== "STANDBY" && (
            <Button
              onClick={() => {}}
              BigGray={
                User.userId !== artistId
                  ? true
                  : soldStatus === "SUCCESS"
                  ? true
                  : false
              }
              BigBlack={
                User.userId !== artistId
                  ? false
                  : soldStatus === "SUCCESS"
                  ? false
                  : true
              }
              disabled={
                User.userId !== artistId
                  ? true
                  : soldStatus === "SUCCESS"
                  ? true
                  : false
              }
              children={
                <Box direction="row" margin="xsmall" justify="center">
                  <img src={FileText} alt="" />
                  <StyledText
                    text={
                      User.userId !== artistId
                        ? "종료된 경매 입니다."
                        : soldStatus === "SUCCESS"
                        ? "경매 종료"
                        : "재등록"
                    }
                    color="white"
                    size="14px"
                    style={{ marginLeft: "10px" }}
                  />
                </Box>
              }
            />
          )}
        </Box>
      </Box>
      <AlertDialog
        open={openDel}
        handleClose={handleClose}
        handleAction={deleteProduct}
        title="작품 삭제"
        desc="삭제하시겠습니까?"
        cancel="취소"
        accept="삭제"
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <Box direction="row" width="100%" justify="between">
            <Box width="10vw" />
            <StyledText weight="bold" size="16px" text="서면 응찰" />
            <DialogCloseButton onClick={handleClose}>
              <Box direction="row" justify="center">
                <img src={CloseButton} />
              </Box>
            </DialogCloseButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box margin="large">
            <Box direction="row" justify="start">
              <Box width="50%">
                <Image
                  src={productImages[0]}
                  fit="contain"
                  style={{
                    borderRadius: "7px",
                  }}
                />
              </Box>
              <Box margin={{ left: "15px" }} justify="center">
                <StyledText
                  text={Category[category].label}
                  weight="bold"
                  size="18px"
                  style={{ textDecoration: "underline" }}
                />
                <StyledText text={productName} />
                <StyledText text={productArtist} />
              </Box>
            </Box>
            <Box>
              <Box direction="row" justify="between">
                <StyledText text="시작가" weight="bold" />
                <StyledText text={`${moneyFormat(startPrice)}원`} />
              </Box>
              <Box direction="row" justify="between">
                <StyledText text="희망 응찰가" weight="bold" />
                <Input3
                  Thin
                  placeholder={`${moneyFormat(startPrice)}`}
                  value={absenteeBidPrice}
                  onChange={(e) => {
                    setAbsenteeBidPrice(e.target.value);
                  }}
                  style={{
                    color: "#D00000",
                    width: "30vw",
                  }}
                />
                <StyledText color="#D00000" text="원" weight="bold" />
              </Box>
              <StyledHr width="100%" />
              <Box direction="row" justify="between">
                <Box>
                  <StyledText text="예상 결제 금액" weight="bold" />
                  <StyledText text="(입찰가+수수료+배송료)" size="8px" />
                </Box>
                <StyledText
                  text={`${moneyFormat(
                    parseInt(absenteeBidPrice * 1.05 + 4000)
                  )}원`}
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          {isAbsenteeBid ? (
            <Box direction="row" width="100%" justify="center">
              <Button SmallBlue children="수정하기" onClick={updateAbsentee} />
              <Button SmallBlack children="철회하기" onClick={deleteAbsentee} />
            </Box>
          ) : (
            <Box direction="row" width="100%" justify="center">
              <Button SmallRed children="응찰하기" onClick={postAbsentee} />
            </Box>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};
