import { Box, Carousel, Image } from "grommet";
import React, { useState } from "react";
import Button from "../components/Button";
import BackBtn from "../assets/images/backButton.png";
import MoreBtn from "../assets/images/more2.png";
import LikeBtn from "../assets/images/like.png";
import ShareBtn from "../assets/images/share.svg";
import Clock from "../assets/images/clock.png";
import FileText from "../assets/images/file-text.png";
import { BackButton } from "./ProductRegister";
import { StyledText } from "../components/Common";
import { HorizonScrollRowTable } from "../components/HorizonScrollTable";
import { useEffect } from "react";
import { getPersonalProduct, registerAuction } from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { Category, moneyFormat } from "../stores/modules/basicInfo";
import { AbsenteeBid } from "../components/AbsenteeBid";
import { useSelector } from "react-redux";
const HeaderBox = () => {
  return (
    <Box direction="row" justify="between" margin="small">
      <Box>
        <BackButton>
          <img src={BackBtn} alt="" />
        </BackButton>
      </Box>
      <Box direction="row">
        <Box>
          <BackButton>
            <img src={MoreBtn} alt="" />
          </BackButton>
        </Box>
        <Box>
          <BackButton>
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

export const ProductDeatail = () => {
  const { id } = useParams();

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
  const [auctionId, setAuctionId] = useState("");
  const [isOnAir, setIsOnAir] = useState("");
  const User = useSelector((state) => state.user.user.user);
  const navigate = useNavigate();
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  // console.log("user : ", User);
  useEffect(() => {
    if (loading)
      getPersonalProduct(
        // id,
        id === undefined ? 32 : id,
        (response) => {
          console.log(response.data);
          // const product = response.data;
          handleDataChanges(response.data);
          // console.log(response);

          setLoading(false);
        },
        (fail) => {
          console.log(fail);
        }
      );

    const ee = setInterval(() => {
      if (!isStart()) setNowDate(new Date());
    }, 1000);

    return () => clearInterval(ee);
  }, [loading, id]);

  const handleDataChanges = (data) => {
    setProductName(data.personalProductDto.productName);
    setProductArtist(data.userName);
    setCategory(data.personalProductDto.categoryId);
    setStartTime(data.personalProductDto.startTime);
    setStartPrice(data.personalProductDto.startPrice);
    setProductDesc(data.productDesc);
    setProductImages([...data.personalProductDto.productImgs]);
    setProductLike(data.personalProductDto.favoriteCount);
    setSoldStatus(data.personalProductDto.soldStatus);
    setArtistNickname(data.personalProductDto.userNickname);
    setArtistId(data.personalProductDto.userId);
    setAuctionId(data.auctionId);
    setIsOnAir(data.isOnAir);
    // setProduct(data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDate = (date) => {
    let now = nowDate;
    let dueDate = new Date(date);
    let diff = dueDate.getTime() + KR_TIME_DIFF - now.getTime();
    // console.log(diff);
    if (diff <= 0)
      return User.userId !== artistId ? "실시간 경매 입장" : "경매 시작";
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
        return `${diff / hour >= 1 ? `${parseInt(diff / hour)}:` : ``}${diff / minute >= 1
            ? `${parseInt((diff % hour) / minute) < 10
              ? `0${parseInt((diff % hour) / minute)}`
              : parseInt((diff % hour) / minute)
            }:`
            : ``
          }${parseInt((diff % minute) / sec) < 10
            ? `0${parseInt((diff % minute) / sec)}`
            : parseInt((diff % minute) / sec)
          }`;
      }
    }
  };

  const handleAbsentee = () => {
    if (!isStart()) setOpen(true);
  };

  const isStart = () => {
    let dueDate = new Date(startTime);
    let now = new Date();
    return dueDate.getTime() <= now.getTime() ? true : false;
  };

  const enterAuction = () => {
    if (isStart()) {
      if (auctionId === null) {
        if (artistId === User.userId) {
          registerAuction(
            id === undefined ? 32 : id,
            (response) => {
              console.log(response);
              navigate("/personalAuction", {
                state: {
                  grade: artistId === User.userId ? "seller" : "buyer",
                  auctionId: auctionId,
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
        navigate("/personalAuction", {
          state: {
            grade: artistId === User.userId ? "seller" : "buyer",
            auctionId: auctionId,
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
    const date = string.split("T");
    const yyyyMMdd = date[0].split("-");
    const HHmm = date[1].split(":");
    return `${yyyyMMdd[0]}년 ${parseInt(yyyyMMdd[1])}월 ${parseInt(
      yyyyMMdd[2]
    )}일  ${parseInt(HHmm[0])}시 ${parseInt(HHmm[1]) !== 0 ? `${parseInt(HHmm[1])}분` : ``
      } 예정`;
    // return date.toString("yyyy년 MM월 dd일 HH시 mm분 예정");
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
    <div>Loading...</div>
  ) : (
    <Box>
      <HeaderBox />
      <Box>
        {/* <MainImg src={Product1} /> */}
        <Carousel fill wrap={true} play={3000} controls="arrows">
          {productImages.map((image, idx) => {
            return <Image src={image} fit="cover" key={idx} />;
          })}
        </Carousel>

        <Box margin="medium">
          <StyledText
            text={Category[category].label}
            weight="bold"
            size="18px"
            style={{ textDecoration: "underline" }}
          />
          <StyledText text={productArtist} />
          <StyledText text={productName} />
          <StyledText text={`${moneyFormat(startPrice)}원 ~`} />
          <StyledText text={stringToDate(startTime)} />
        </Box>
        <Box margin="small">
          <StyledText text="작품 설명" />
          <StyledText text={productDesc} size="10px" color="#7B7B7B" />
        </Box>
        <Box margin="small">
          <StyledText text="작품 정보" />
          <div>태그들 태그들</div>
        </Box>
      </Box>
      {/* <Box margin="small">
        <StyledText text="이 작품과 비슷한 작품" />
        <HorizonScrollRowTable />
      </Box> */}
      <Box direction="row" margin="small">
        <Box align="center" margin="small">
          <Button
            children={
              <Box align="center">
                <img src={LikeBtn} alt="" />
                <StyledText text={productLike} />
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
        >
          {User.userId !== artistId ? (
            <Button
              MediumGreen={!isStart()}
              MediumGray={isStart()}
              disabled={isStart()}
              children={
                <Box direction="row" margin="xsmall" justify="center">
                  <img src={FileText} alt="" />
                  <StyledText
                    text="서면응찰"
                    color="white"
                    size="10px"
                    style={{ marginLeft: "10px" }}
                  />
                </Box>
              }
              onClick={handleAbsentee}
            />
          ) : null}
          <AbsenteeBid
            open={open}
            onDismiss={handleClose}
            product={{
              image: productImages[0],
              category: Category[category].label,
              name: productName,
              artist: productArtist,
              price: startPrice,
            }}
          />
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
                  size="10px"
                  style={{ marginLeft: "10px" }}
                />
              </Box>
            }
          />
        </Box>
      </Box>
    </Box>
  );
};
