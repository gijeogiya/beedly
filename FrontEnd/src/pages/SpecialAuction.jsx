import { Box, DateInput, FileInput, FormField, Grid, TextInput } from "grommet";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import TextField from "@mui/material/TextField";
import Button from "../components/Button";
import {} from "grommet-icons";
import { StyledText } from "../components/Common";
import { Link } from "react-router-dom";
import product1 from "../assets/images/product1.png";
const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderBox = () => {
  return (
    <HeaderDiv>
      <button>{"<"}</button>
      <div>기획전 등록</div>
      <div></div>
    </HeaderDiv>
  );
};

const MainDiv = styled.div`
  justify-content: center;
  padding: 20px;
`;

const MainContent = ({ startDate, f, locale, textValue, handleValue }) => {
  return (
    <MainDiv>
      <div>
        <span>경매 시작 일시</span>
        <DatePicker
          selected={startDate}
          onChange={(date) => f(date)}
          showTimeSelect
          dateFormat="yy.MM.dd HH:mm"
          locale={locale}
        />
      </div>
      <TextField id="filled-basic" label="제목" variant="standard" />
      <TextField id="filled-basic" label="부제" variant="standard" />

      <div>
        <textarea
          placeholder="기획전에 대한 설명을 적어주세요"
          value={textValue}
          onChange={(e) => handleValue(e)}
        ></textarea>
      </div>
      <div>배경사진 등록</div>
    </MainDiv>
  );
};

const ProductImg = styled.img`
  border-radius: 10px;
  width: 100px;
  height: 40px;
  src: ${(props) => props.src || ""};
`;

const ProductGrid = ({ products }) => {
  console.log(products);

  return (
    <Grid columns={{ count: 3, size: "auto" }} gap="small">
      {products.map((product) => (
        <Box key={product.name}>
          <ProductImg src={product.src} />
        </Box>
      ))}
      <Link to="/specialProduct">
        <Button SmallGray>+</Button>
      </Link>
    </Grid>
  );
};

const ProductDiv = styled.div``;

export const SpecialAuction = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [products, setProducts] = useState([]);
  const [textValue, setTextValue] = useState("");
  let pr = [];
  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      let product = {
        name: "product" + i + "",
        start: [i, 1],
        end: [i, 1],
        src: product1,
      };
      pr.push(product);
    }
    setProducts(pr);
  }, []);
  const handleDate = (date) => {
    setStartDate(date);
    console.log(startDate);
  };

  const handleValue = (text) => {};
  return (
    <div>
      <HeaderBox></HeaderBox>
      <MainContent
        startDate={startDate}
        f={handleDate}
        locale={ko}
        textValue={textValue}
      />
      <StyledText weight="bold" size="18px" text="작품 목록"></StyledText>
      {products.length > 1 && <ProductGrid products={products}></ProductGrid>}

      <Button BigBlack>기획전 등록</Button>
    </div>
  );
};
