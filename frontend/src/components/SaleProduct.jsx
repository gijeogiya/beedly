import React from "react";
import { FlexBox } from "./UserStyled";
// import product from "../assets/img/SampleProduct.png";
import { StyledImg } from "./Common";
import Button from "./Button";
import { Spinner } from "grommet";
import { useNavigate } from "react-router-dom";
import { moneyFormat, stringToDate } from "../stores/modules/basicInfo";

// 판매내역 / 구매내역 등에 사용되는 상품 상태 컴포넌트
export default function SaleProduct({ product }) {
  const navigate = useNavigate();

  // const handlePurchase = () => {
  //   if (!product.paidFlag)
  //     navigate(`/purchase/${product.soldId}`, {
  //       state: {
  //         auctionType: product.auctionType,
  //         productId: product.productId,
  //       },
  //     });
  //   else
  //     navigate(`/purchaseDetail/${product.soldId}`, {
  //       state: {
  //         success: true,
  //         soldId: product.soldId,
  //         auctionType: product.auctionType,
  //       },
  //     });
  // };

  if (!product) return <Spinner />;
  else
    return (
      <div style={{ padding: "20px" }}>
        <FlexBox Row_SB>
          <StyledImg
            src={product.productImgDtos[0]}
            alt="상품이미지"
            width="40%"
          ></StyledImg>
          <div
            style={{
              marginLeft: "15px",
              display: "flex",
              flexDirection: "column",
              width: "65%",
              alignItems: "flex-start",
              height: "25vw",
            }}
          >
            <p style={{ margin: "0px 0px", fontWeight: "bold" }}>
              {product.productName}
            </p>
            <p style={{ margin: "0px 0px", fontSize: "12px" }}>
              {product.soldStatus === "STANDBY"
                ? `시작 시간 : ${stringToDate(product.startTime)}`
                : product.soldStatus === "FAIL"
                ? `시작 시간 : ${stringToDate(product.startTime)}`
                : `판매완료 : ${stringToDate(product.endTime)}`}
            </p>
            <p style={{ margin: "0px 0px", fontSize: "12px" }}>
              {product.soldStatus === "STANDBY"
                ? "판매중"
                : product.soldStatus === "FAIL"
                ? "판매실패"
                : `판매완료 : ${moneyFormat(product.finalPrice)}원`}
            </p>
            {/* {!product.paidFlag ? (
              <Button
                SmallYellow
                style={{ alignSelf: "flex-end", margin: "5px 5px" }}
                onClick={handlePurchase}
              >
                결제하기
              </Button>
            ) : (
              <Button
                SmallBlack
                style={{ alignSelf: "flex-end", margin: "5px 5px" }}
                onClick={handlePurchase}
              >
                결제완료
              </Button>
            )} */}
          </div>
        </FlexBox>
      </div>
    );
}
