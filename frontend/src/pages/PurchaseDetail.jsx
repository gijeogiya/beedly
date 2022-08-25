import { Box, Image, Spinner } from "grommet";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import { StyledHr, StyledText } from "../components/Common";
import { moneyFormat } from "../stores/modules/basicInfo";
import { getPurchaseProduct } from "../utils/apis/UserAPI";
import { BackButton } from "./ProductRegister";
import { postPersonalPay, postSpecialPay } from "../utils/apis/PayAPI";
import beforeIcon from "../assets/img/arrow-left.svg";
export const PurchaseDetail = () => {
  // const params = new URL(window.location.href).searchParams;
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [user, setUser] = useState();
  const [product, setProduct] = useState();
  const navigate = useNavigate();
  let { success } = location.state;
  let { errorMsg } = location.state;
  let { merchantUid } = location.state;
  // let { soldId } = location.state;
  const { soldId } = useParams();
  let { auctionType } = location.state;
  // auctionType + "_order_no_" + soldId,

  useEffect(() => {
    if (success === "true" || success === true) {
      if (loading) getPurchaseInfo();
    } else {
      setLoading(false);
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
        // let user = response.data.userDto;
        // let purchaseData = response.data.userPurchaseResponse;
        setUser(response.data.userDto);
        setProduct(response.data.userPurchaseResponse);
        setLoading(false);
      },
      (fail) => {
        console.log(fail);
      }
    );
  };

  const goMyPage = () => {
    navigate("/mypage");
  };
  const goBack = () => {
    navigate(-1);
  };
  // return <div>{success + ", " + errorMsg + ", " + soldId}</div>;
  if (loading) return <Spinner />;
  else {
    if (success === "false" || success === false)
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              height: "5vh",
              alignItems: "center",
              padding: "0px 10px",
            }}
          >
            <img alt="이전" src={beforeIcon} onClick={goMyPage} />
            <h4>상세구매내역</h4>
            <h4 style={{ visibility: "hidden" }}>dd</h4>
          </div>
          <Box>
            {/* 작품 사진 */}
            <Box>
              <Image src={product.productImgDtos[0]} />
            </Box>
            <Box margin="large">
              {/*배송지 정보 */}
              <StyledText text="배송지정보" weight="bold" size="16px" />
              <Box style={{ marginTop: "20px" }}>
                <StyledText
                  text="주소"
                  weight="bold"
                  style={{ marginBottom: "8px" }}
                />
                <StyledText text={user.userAddr} />
              </Box>
              <Box style={{ marginTop: "20px" }}>
                <StyledText
                  text="이름"
                  weight="bold"
                  style={{ marginBottom: "8px" }}
                />
                <StyledText text={user.userName} />
              </Box>
              <Box style={{ marginTop: "20px" }}>
                <StyledText
                  text="전화번호"
                  weight="bold"
                  style={{ marginBottom: "8px" }}
                />
                <StyledText text={user.userTel} />
              </Box>
              <Box
                margin="small"
                direction="column"
                justify="between"
                style={{ marginTop: "50px" }}
              >
                <StyledText text="결제 정보" weight="bold" size="15px" />
                <Box
                  direction="column"
                  justify="between"
                  height="130px"
                  align="end"
                >
                  <StyledText
                    text={`수수료(5%) ${moneyFormat(
                      parseInt(product.finalPrice * 0.05)
                    )}`}
                  />

                  <StyledText text={`배송비 4,000`} />
                  <Box
                    direction="row"
                    justify="between"
                    align="end"
                    width="80vw"
                  >
                    <StyledText text="총 결제금액" weight="bold" />
                    <StyledText
                      text={`${moneyFormat(
                        parseInt(product.finalPrice * 1.05) + 4000
                      )}원`}
                      weight="bold"
                      size="20px"
                      style={{ color: "red" }}
                    />
                  </Box>
                  <StyledHr
                    width="100%"
                    color="#A1A1A1"
                    style={{ height: "2px" }}
                  />

                  <StyledText
                    text={product.paidFlag ? "결제 완료" : "결제 대기중"}
                  />
                </Box>
              </Box>
              <Box direction="row" justify="center">
                <Button
                  BigYellow
                  children="홈으로 돌아가기"
                  onClick={goMyPage}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      );
  }
};
