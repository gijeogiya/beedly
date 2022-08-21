import { Box, Carousel, Image, Spinner } from "grommet";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import { StyledHr, StyledText } from "../components/Common";
import { Category, moneyFormat } from "../stores/modules/basicInfo";
import { postPersonalPay, postSpecialPay } from "../utils/apis/PayAPI";
import { getPersonalProduct } from "../utils/apis/PersonalProductAPI";
import { getPurchaseProduct } from "../utils/apis/UserAPI";

// const REDIRECT_URL = "http://localhost:3000/";
const REDIRECT_URL = "https://i7a601.p.ssafy.io/";
export const PurchaseSuccess = () => {
  const location = useLocation();
  // const { soldId } = location.state;
  const { soldId } = useParams();
  const { auctionType } = location.state;
  const { productId } = location.state;

  const [loading, setLoading] = useState(true);

  const [userAddr, setUserAddr] = useState("");
  const [userName, setUserName] = useState("");
  const [userTel, setUserTel] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [paidFlag, setPaidFlag] = useState(true);
  const [productName, setProductName] = useState("");
  const [product, setProduct] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setProduct(
      (prev) =>
        (prev = {
          name: "",
          categoryId: "",
          artist: "",
          desc: "",
          tags: [],
          images: [],
        })
    );
    if (loading) getPurchaseInfo();
    return () => setLoading(false);
  }, []);

  const onClickPayMent = () => {
    const { IMP } = window;
    IMP.init("imp10157701");
    const data = {
      pg: "kakaopay",
      merchant_uid: auctionType + "_order_no_" + soldId, // 상점에서 관리하는 주문 번호
      name: "주문명: " + product.name,
      amount: finalPrice,
      buyer_email: userEmail,
      buyer_name: userName,
      buyer_tel: userTel,
      buyer_addr: userAddr,
      buyer_postcode: "",
      m_redirect_url: REDIRECT_URL + `kakaopay/callback`,
    };
    IMP.request_pay(data, callback);
  };

  const callback = (response) => {
    console.log(response);
    const {
      success,
      error_msg,
      imp_uid,
      merchant_uid,
      pay_method,
      paid_amount,
      status,
    } = response;
    if (success) {
      //결제 성공
      alert("결제 성공");
      //상시 경매일 경우
      if (auctionType === "P")
        postPersonalPay(
          soldId,
          (response) => {
            console.log("결제 완료 API 호출 !!!", response);
            navigate(`/purchaseDetail/${soldId}`, {
              state: {
                error_msg: error_msg,
                merchant_uid: merchant_uid,
                success: success,
                soldId: soldId,
                auctionType: auctionType,
              },
            });
          },
          (fail) => {
            console.log(fail);
          }
        );
      else if (auctionType === "S")
        postSpecialPay(
          soldId,
          (response) => {
            console.log("결제 완료 API 호출 !!!", response);
            navigate(`/purchaseDetail/${soldId}`, {
              state: {
                error_msg: error_msg,
                merchant_uid: merchant_uid,
                success: success,
                soldId: soldId,
                auctionType: auctionType,
              },
            });
          },
          (fail) => {
            console.log(fail);
          }
        );
    } else {
      alert(`결제 실패 : ${error_msg}`);
      navigate(`/purchaseDetail/${soldId}`, {
        state: {
          error_msg: error_msg,
          merchant_uid: merchant_uid,
          success: success,
          soldId: soldId,
          auctionType: auctionType,
        },
      });
    }
  };

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
    ).then(() => {
      if (productId) {
        getPersonalProduct(
          productId,
          (response) => {
            console.log("productinfo : ", response);
            let data = response.data.personalProductDto;
            setProduct(
              (prev) =>
                (prev = {
                  name: data.productName,
                  categoryId: data.categoryId,
                  artist: data.userName,
                  desc: data.productDesc,
                  tags: data.tagNames,
                  images: [...data.productImgs],
                })
            );
            setLoading(false);
          },
          (fail) => {
            console.log(fail);
          }
        );
      }
    });
  };
  if (loading) return <Spinner />;
  else
    return (
      <Box>
        {/* 헤더 */}
        {!paidFlag && (
          <Box
            alignContent="center"
            justify="center"
            align="center"
            margin="medium"
          >
            <StyledText text="낙찰을 축하합니다!" size="20px" weight="bold" />
            <StyledText
              text="제한 시간 내에 결제를 완료해주세요"
              color="#9d9d9d"
            />
          </Box>
        )}
        {/* 상품 화면 */}
        <Box direction="column" align="center">
          {/* <MainImg src={Product1} /> */}
          <Carousel
            fill
            wrap={true}
            play={product.images.length > 1 ? 3000 : 0}
            controls="arrows"
          >
            {product.images.map((image, idx) => {
              return <Image src={image} fit="cover" key={idx} />;
            })}
          </Carousel>
          <Box width="85vw">
            <Box
              margin="small"
              direction="column"
              height="80px"
              justify="between"
              style={{ marginTop: "20px" }}
            >
              <StyledText
                text="낙찰 정보"
                weight="bold"
                size="15px"
                style={{ paddingBottom: "20px" }}
              />

              <StyledText text={product.name} size="20px" weight="bold" />
              <StyledText text={product.artist} size="16px" />
            </Box>

            <Box margin="small" style={{ marginTop: "30px" }}>
              <StyledText
                text="작품 설명"
                size="15px"
                style={{ margin: "5px 0px" }}
              />
              <StyledText text={product.desc} size="14px" color="#7B7B7B" />
            </Box>
            <Box direction="row" justify="between" margin="small">
              <StyledText text="낙찰 금액" size="15px" />
              <StyledText text={`${moneyFormat(finalPrice)}원`} />
            </Box>
            <Box
              margin="small"
              direction="column"
              height="400px"
              justify="between"
              style={{ marginTop: "50px" }}
            >
              <StyledText text="결제 정보" weight="bold" size="15px" />
              <Box
                direction="row"
                justify="between"
                margin={{ bottom: "30px" }}
              >
                <StyledText text="이름" weight="bold" />
                <StyledText text={userName} />
              </Box>
              <Box direction="row" justify="between">
                <StyledText text="전화번호" weight="bold" />
                <StyledText text={userTel} />
              </Box>
              <Box>
                <StyledText
                  text="주소"
                  weight="bold"
                  style={{ marginBottom: "8px" }}
                />
                <StyledText text={userAddr} />
              </Box>
              <Box
                direction="column"
                justify="between"
                height="130px"
                align="end"
              >
                <StyledText
                  text={`수수료(5%) ${moneyFormat(
                    parseInt(finalPrice * 0.05)
                  )}`}
                />

                <StyledText text={`배송비 4,000`} />
                <Box direction="row" justify="between" align="end" width="80vw">
                  <StyledText text="총 결제금액" weight="bold" />
                  <StyledText
                    text={`${moneyFormat(
                      parseInt(finalPrice * 1.05) + 4000
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

                <StyledText text={paidFlag ? "결제 완료" : "결제 대기중"} />
              </Box>
            </Box>
            <Box direction="row" justify="center">
              {!paidFlag && (
                <Button
                  BigYellow
                  children="카카오페이로 결제하기"
                  onClick={onClickPayMent}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    );
};
