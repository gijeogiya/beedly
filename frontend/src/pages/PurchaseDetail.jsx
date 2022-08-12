import { Box, Image } from "grommet";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { StyledHr, StyledText } from "../components/Common";
import { moneyFormat } from "../stores/modules/basicInfo";
import { getPurchaseProduct } from "../utils/apis/UserAPI";
import { BackButton } from "./ProductRegister";

export const PurchaseDetail = () => {
  const params = new URLSearchParams(window.location.search);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [userAddr, setUserAddr] = useState();
  const [userName, setUserName] = useState();
  const [userTel, setUserTel] = useState();
  const [finalPrice, setFinalPrice] = useState();
  const [paidFlag, setPaidFlag] = useState();
  const [productName, setProductName] = useState();
  const [product, setProduct] = useState({});
  const [userEmail, setUserEmail] = useState();
  const navigate = useNavigate();
  let success =
    params !== null ? params.get("imp_success") : location.state.success;
  let errorMsg = params !== null ? params.get("error_msg") : null;
  let merchantUid = params !== null ? params.get("merchant_uid") : null;
  let soldId =
    location.state !== null ? location.state.soldId : merchantUid.split("_")[3];
  let auctionType =
    location.state !== null
      ? location.state.auctionType
      : merchantUid.split("_")[0];
  // auctionType + "_order_no_" + soldId,

  useEffect(() => {
    console.log(success + ", " + errorMsg + ", " + soldId);
    if (success === "true") {
      if (loading) getPurchaseInfo();
    }
    return () => setLoading(false);
  });
  const getPurchaseInfo = () => {
    const params = {
      productSoldId: soldId,
      auctionType: auctionType,
    };
    getPurchaseProduct(
      params,
      (response) => {
        console.log("purchase info : ", response);
        let user = response.data.userDto;
        let purchaseData = response.data.userPurchaseResponse;
        setUserAddr(user.userAddr);
        setUserName(user.userName);
        setUserTel(user.userTel);
        setFinalPrice(purchaseData.finalPrice);
        setPaidFlag(purchaseData.paidFlag);
        setUserEmail(user.userEmail);
      },
      (fail) => {
        console.log(fail);
      }
    );
  };

  const goBack = () => {
    navigate(-1);
  };

  // return <div>{success + ", " + errorMsg + ", " + soldId}</div>;
  if (success === "false")
    return (
      <Box align="center">
        <StyledText text="결제에 실패했습니다." />
        <StyledText text={errorMsg} />
        <Box direction="row" justify="center">
          <Button children="뒤로가기" onClick={goBack} />
        </Box>
      </Box>
    );
  else
    return (
      <Box>
        <Box direction="row" justify="between">
          <BackButton>뒤로가기</BackButton>
          <Box width="10vw"></Box>
        </Box>
        <Box>
          {/* 작품 사진 */}
          <Box>
            <Image src="" />
          </Box>
          <Box>
            <StyledText text="결제 정보" size="20px" weight="bold" />
          </Box>
          {/*배송지 정보 */}
          <StyledText text="배송지정보" weight="bold" size="16px" />
          <Box>
            <StyledText text="주소" />
            <StyledText text={userAddr} />
            <StyledHr width="100%" color="#A1A1A1" />
          </Box>
          <Box>
            <StyledText text="이름" />
            <StyledText text={userName} />
            <StyledHr width="100%" color="#A1A1A1" />
          </Box>
          <Box>
            <StyledText text="전화번호" />
            <StyledText text={userTel} />
            <StyledHr width="100%" color="#A1A1A1" />
          </Box>
          <Box>
            <StyledText
              text={`수수료(5%) ${moneyFormat(parseInt(finalPrice * 0.05))}`}
            />
            <StyledText text={`배송비 4,000`} />
            <StyledText text="총 결제금액" />
            <StyledText
              text={`${moneyFormat(parseInt(finalPrice * 1.05) + 4000)}원`}
              weight="bold"
              size="20px"
            />
            <StyledHr width="100%" color="#A1A1A1" />
            <StyledText text={paidFlag ? "결제 완료" : "결제 대기중"} />
          </Box>
        </Box>
      </Box>
    );
};
