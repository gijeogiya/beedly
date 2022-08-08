import { Box } from "grommet";
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
  const [productName, setProductName] = useState("");
  const [productArtist, setProductArtist] = useState("");
  const [category, setCategory] = useState("카테고리");
  const [startTime, setStartTime] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productLike, setProductLike] = useState(0);
  useEffect(() => {
    getPersonalProduct(
      id,
      //   12,
      (response) => {
        console.log(response);
        const product = response.data;
        setProductName(product.productName);
        setProductArtist(product.productArtist);
        setCategory(product.category);
        setStartTime(product.startTime);
        setStartPrice(product.startPrice);
        setProductDesc(productDesc);
        setProductImages(product.productImages);
        setProductLike(product.productLike);
      },
      (fail) => {
        console.log(fail);
      }
    );
  }, []);
  return (
    <Box>
      <HeaderBox />
      <Box>
        <MainImg src={Product1} />
        <Box margin="small">
          <StyledText text={category} weight="bold" size="18px" />
          <StyledText text={productArtist} />
          <StyledText text={productName} />
          <StyledText text={startPrice} />
          <StyledText text={startTime} />
        </Box>
        <Box margin="small">
          <StyledText text="작품 설명" />
          <StyledText text={productDesc} />
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
        <Box alignContent="center" justify="center">
          <Button
            BigBlack
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
