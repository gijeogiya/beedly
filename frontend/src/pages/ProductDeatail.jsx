import { Box, Carousel, Image } from "grommet";
import React, { useState } from "react";
import Button from "../components/Button";
import BackBtn from "../assets/images/backButton.png";
import MoreBtn from "../assets/images/more2.png";
import LikeBtn from "../assets/images/like.png";
import Product1 from "../assets/images/product1.png";
import ShareBtn from "../assets/images/share.svg";
import Clock from "../assets/images/clock.png";
import { BackButton } from "./ProductRegister";
import styled from "styled-components";
import { StyledText } from "../components/Common";
import { HorizonScrollRowTable } from "../components/HorizonScrollTable";
import { useEffect } from "react";
import { getPersonalProduct } from "../utils/api";
import { useParams } from "react-router-dom";
import { Category } from "../stores/modules/basicInfo";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import CloseButton from "../assets/images/close.png";
import { AbsenteeBid } from "../components/AbsenteeBid";

const HeaderBox = () => {
  return (
    <Box direction="row" justify="between" margin="small">
      <Box>
        <BackButton>
          <img src={BackBtn} />
        </BackButton>
      </Box>
      <Box direction="row">
        <Box>
          <BackButton>
            <img src={MoreBtn} />
          </BackButton>
        </Box>
        <Box>
          <BackButton>
            <img src={ShareBtn} />
          </BackButton>
        </Box>
      </Box>
    </Box>
  );
};

const MainImg = styled.img`
  width: 100%;
`;

export const ProductDeatail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [productName, setProductName] = useState("");
  const [productArtist, setProductArtist] = useState("");
  const [category, setCategory] = useState("카테고리");
  const [startTime, setStartTime] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productLike, setProductLike] = useState(0);
  const [product, setProduct] = useState({});
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (loading)
      getPersonalProduct(
        // id,
        31,
        (response) => {
          // console.log(response.data);
          // const product = response.data;
          setProductName(response.data.productName);
          setProductArtist(response.data.userName);
          setCategory(response.data.categoryId);
          setStartTime(response.data.startTime);
          setStartPrice(response.data.startPrice);
          setProductDesc(response.data.productDesc);
          setProductImages([...response.data.productImgs]);
          setProductLike(response.data.favoriteCount);
          setProduct(response.data);
          console.log(response);
          setLoading(false);
        },
        (fail) => {
          console.log(fail);
        }
      );
  });

  const handleClose = () => {
    setOpen(false);
  };

  const stringToDate = (string) => {
    const date = string.split("T");
    const yyyyMMdd = date[0].split("-");
    const HHmm = date[1].split(":");
    return (
      `${yyyyMMdd[0]}년 ${parseInt(yyyyMMdd[1])}월 ${parseInt(
        yyyyMMdd[2]
      )}일  ${parseInt(HHmm[0])}시 ${
        parseInt(HHmm[1]) != 0 ? `${parseInt(HHmm[1])}분` : ``
      }` + ` 예정`
    );
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
  if (loading) return <div>Loading...</div>;
  return (
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
          <StyledText text={`${startPrice}원 ~`} />
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
      <Box margin="small">
        <StyledText text="이 작품과 비슷한 작품" />
        <HorizonScrollRowTable />
      </Box>
      <Box direction="row">
        <Box align="center" margin="small">
          <BackButton>
            <img src={LikeBtn} />
          </BackButton>
          <StyledText text={productLike} />
        </Box>
        <Box
          alignContent="center"
          align="center"
          justify="center"
          direction="row"
        >
          <Button
            MediumGreen
            children="서면응찰"
            onClick={() => setOpen(true)}
          />
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
          {/* <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Box direction="row" width="100%" justify="end">
              <BackButton onClick={handleClose}>
                <img src={CloseButton} />
              </BackButton>
            </Box>

            <DialogContent>
              <Box align="center">
                <StyledText text="작품을 등록하시겠습니까?" weight="bold" />
                <p />
                <StyledText
                  text="경매 시작가는 수정이 불가능합니다."
                  color="red"
                  size="10px"
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Box direction="row" width="100%" justify="center">
                <Button
                  MediumBlack
                  onClick={() => {}}
                  children="작품 등록"
                  autoFocus
                ></Button>
              </Box>
            </DialogActions>
          </Dialog> */}
          <Button
            MediumBlack
            children={
              <Box direction="row" margin="xsmall">
                <img src={Clock} />
                <StyledText text={startTime} color="white" />
              </Box>
            }
          />
        </Box>
      </Box>
    </Box>
  );
};
