import React from "react";
import { FlexBox } from "./UserStyled";
import product from "../assets/img/SampleProduct.png";
import { StyledImg } from "./Common";
import Button from "./Button";

// 판매내역 / 구매내역 등에 사용되는 상품 상태 컴포넌트
export default function ProductState() {
  return (
    <div style={{ padding: "20px" }}>
      <FlexBox Row_SB>
        <StyledImg src={product} alt="상품이미지"></StyledImg>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "65%",
            alignItems: "flex-start",
            height: "25vw",
          }}
        >
          <p style={{ margin: "0px 0px", fontWeight: "bold" }}>Title</p>
          <p style={{ margin: "0px 0px", fontSize: "12px" }}>
            2022.07.19 17:00
          </p>
          <p style={{ margin: "0px 0px", fontSize: "12px" }}>예정</p>
          <Button
            SmallYellow
            style={{ alignSelf: "flex-end", margin: "5px 5px" }}
          >
            출시예정
          </Button>
        </div>
      </FlexBox>
    </div>
  );
}
