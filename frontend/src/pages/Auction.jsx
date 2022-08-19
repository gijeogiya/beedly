import { Notification, Grommet, Box, Carousel } from "grommet";
import React, { useState, useEffect } from "react";
import { AuctionArtist, StyledText, StyledHr } from "../components/Common";
import styled from "styled-components";
import image from "../assets/images/openvidu.png";
import artist from "../assets/images/artist.png";
import ExitIcon from "../assets/img/ExitIcon.svg";
import product1 from "../assets/images/product1.png";
import { ReactComponent as Success } from "../assets/icons/success.svg";
import { ReactComponent as Fail } from "../assets/icons/fail.svg";
import ErrorBoundary from "./ErrorBoundary";
import VideoRoomComponent from "../components/openvidu/components/VideoRoomComponent";
import UserModel from "../components/openvidu/models/user-model";
import ChatComponent from "../components/openvidu/components/chat/ChatComponent";
import Button from "../components/Button";
import { useRef } from "react";
import { createRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  getAuctionProduct,
  getSpecialAuctionProduct,
  postAuctionFinished,
} from "../utils/apis/AuctionAPI";
import { moneyFormat } from "../stores/modules/basicInfo";
import SockJS from "sockjs-client";
import * as StompJs from "@stomp/stompjs";
import { AlertDialog } from "../components/AlertDialog";

const MainContent = styled.img`
  src: ${(props) => props.src || ""};
  width: 100%;
  height: 100%;
`;

const PriceContent = styled.div`
  background-color: lightgray;
  background: rgba(220, 220, 220, 0.4);
  width: 40%;
  color: white;
  z-index: 5;
  position: absolute;
  left: 30%;
  right: 30%;
  top: 12%;
  align-content: center;
  text-align: center;
  border-radius: 10px;
  align-items: center;
  padding: 5px;
`;

const BidButton = styled.button`
  height: 42px;
  border-radius: 5px;
  border: 0px;
  font-size: 20px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: bolder;
  margin: 10px 5px;
  color: white;
  width: 40vw;
  background: ${(props) => (props.visible ? "gray" : "#d00000")};
`;

function PriceBox({ price, callPrice }) {
  return (
    <PriceContent style={{ marginTop: "10px" }}>
      <Box
        align="center"
        justify="center"
        alignContent="center"
        alignSelf="center"
      >
        <StyledText
          size="20px"
          color="white"
          weight="bold"
          text={`₩ ${moneyFormat(price)}`}
          style={{ padding: "5px 0" }}
        />
        <StyledHr color="white" style={{width:"30vw"}} />
        <StyledText
          size="14px"
          color="white"
          text={`호가 ₩ ${moneyFormat(callPrice)}`}
          style={{ padding: "5px 0" }}
        />
      </Box>
    </PriceContent>
  );
}

const ProductImg = styled.img`
  src: ${(props) => props.src || ""};
  width: 91px;
  height: 56px;
  border-radius: 10px;
  margin: 5px;
`;

const ProductBox = styled.div`
  background-color: lightgray;
  background: rgba(255, 255, 255, 0.5);
  color: black;
  border-radius: 10px;
  padding: 3px 10px;
  width: 70%;
  margin: 0 auto;
`;

const AuctionInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
`;

const AuctionInfoText = ({
  titleColor,
  titleSize,
  titleWeight,
  infoColor,
  infoSize,
  infoWeight,
  title,
  info,
}) => {
  return (
    <AuctionInfoDiv>
      <StyledText
        color={titleColor}
        size={titleSize}
        weight={titleWeight}
        text={title}
      ></StyledText>
      <StyledText
        color={infoColor}
        size={infoSize}
        weight={infoWeight}
        text={info}
      ></StyledText>
    </AuctionInfoDiv>
  );
};

const ProductContainer = styled.div`
  justify-content: center;
  bottom: 0;
`;

const ButtonContainer = styled.div`
  padding: 10px;
  width: 80%;
  margin: auto;
  text-align: center;
`;

function ProductFrame({
  title,
  category,
  artist,
  productSrc,
  currentBidder,
  currentPrice,
  callPrice,
  visible,
  grade,
  bidProduct,
  open,
  handleClose,
  handleAuctionExit,
  handleClickOpen,
  isSold,
}) {
  return (
    <ProductContainer>
      <ProductBox>
        <Box direction="row" style={{padding:"5px 0 0px 16px"}}>
          <ProductImg src={productSrc} style={{width:"80px", objectFit:"cover"}}/>
          <Box style={{padding:"5px 0 10px 8px"}}>
            <StyledText size="15px" weight="bold" text={title} />
            <StyledText size="14px" text={artist} />
          </Box>
        </Box>
        <Box style={{padding:"5px 0"}}>
          <AuctionInfoText
            title="현재 입찰가"
            info={`${moneyFormat(currentPrice)} 원`}
            titleSize="14px"
            infoSize="14px"
          />
          <AuctionInfoText
            title="현재 입찰자"
            info={currentBidder}
            titleSize="14px"
            infoSize="14px"
          />
          {grade === "buyer" && <hr style={{width:"230px"}} />}
          {grade === "buyer" && (
            <AuctionInfoText
              title="입찰가"
              info={`${moneyFormat(callPrice + currentPrice)} 원`}
              infoWeight="bold"
              titleSize="14px"
              infoSize="15px"
              infoColor="#D00000"
            />
          )}
          {grade === "buyer" && (
            <AuctionInfoText
              title="예상결제금액"
              info={`${moneyFormat(
                Math.floor((0 + callPrice + currentPrice) * 1.1)
              )} 원`}
              titleSize="14px"
              infoSize="14px"
            />
          )}
        </Box>
      </ProductBox>
      <ButtonContainer>
        {grade !== undefined && grade === "buyer" ? (
          isSold ? (
            <BidButton disabled visible={visible}>
              {`낙찰완료`}
            </BidButton>
          ) : (
            <BidButton
              disabled={visible}
              visible={visible}
              onClick={bidProduct}
            >
              {visible ? "입찰완료" : "입찰하기"}
            </BidButton>
          )
        ) : (
          <Box justify="center" alignContent="center" align="center">
            <Button
              MideumRed={isSold ? false : true}
              MediumBlack={isSold ? true : false}
              onClick={handleClickOpen}
            >
              {isSold ? "종료하기" : "낙찰하기"}
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {isSold ? "경매 종료하기" : "경매 낙찰하기"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {isSold
                    ? "정말 경매를 종료하시겠습니까?"
                    : "정말 낙찰하시겠습니까?"}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button SmallRed onClick={handleClose}>
                  취소
                </Button>
                <Button SmallBlack onClick={handleAuctionExit} autoFocus>
                  {isSold ? "경매 종료" : "경매 낙찰"}
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        )}
      </ButtonContainer>
    </ProductContainer>
  );
}

const GrommetTheme = {
  notification: {
    toast: {
      time: 500,
      container: {
        width: "small",
      },
    },
    normal: {
      toast: {
        background: {
          color: "white",
          opacity: "strong",
        },
      },
      icon: () => <Success />,
    },
    critical: {
      toast: {
        background: {
          color: "white",
          opacity: "strong",
        },
      },
      icon: () => <Fail />,
    },
  },
  carousel: {
    animation: {
      duration: 300,
    },
  },
};

const ChatFrame = styled.div`
  color: black;
  align-content: center;
  border-radius: 10px;
  padding: 10px;
  width: 70%;
  height: 100%;
`;

const ChatBox = ({ localUser, grade }) => {
  return (
    <ChatFrame>
      {localUser !== undefined
        ? localUser.getStreamManager() !== undefined && (
            <ChatComponent user={localUser} grade={grade} />
          )
        : null}
    </ChatFrame>
  );
};

const Conatainer = styled(Carousel)`
  z-index: 8;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40%;
  justify-content: center;
`;

function BottomUi({
  bidInfo,
  visible,
  bidProduct,
  localUser,
  grade,
  handleClose,
  handleAuctionExit,
  open,
  handleClickOpen,
  currentPrice,
  callPrice,
  currentBidder,
  isSold,
}) {
  return (
    <Conatainer controls="arrows">
      {localUser !== undefined && (
        <ChatBox localUser={localUser} grade={grade} />
      )}
      <ProductFrame
        title={bidInfo.title}
        category={bidInfo.category}
        artist={bidInfo.artist}
        productSrc={bidInfo.productSrc}
        currentBidder={currentBidder}
        currentPrice={currentPrice}
        callPrice={callPrice}
        visible={visible}
        grade={grade}
        bidProduct={bidProduct}
        open={open}
        handleClose={handleClose}
        handleAuctionExit={handleAuctionExit}
        handleClickOpen={handleClickOpen}
        isSold={isSold}
      ></ProductFrame>
    </Conatainer>
  );
}

const ExitButtonDiv = styled.div`
  z-index: 8;
  position: absolute;
  right: 20px;
  top: 20px;
  justify-content: center;
`;

function ExitButton({
  handleClickOpen,
  handleClose,
  handleAuctionExit,
  open,
  openFail,
}) {
  return (
    <ExitButtonDiv>
      <Button
        onClick={handleClickOpen}
        style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
      >
        <div style={{ objectFit: "cover" }}>
          <img src={ExitIcon} style={{ objectFit: "contain" }} alt="나가기" />
        </div>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"나가기"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            정말 나가시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button SmallBlack onClick={handleClose}>
            취소
          </Button>
          <Button SmallRed onClick={handleAuctionExit} autoFocus>
            나가기
          </Button>
        </DialogActions>
      </Dialog>
      <AlertDialog
        open={openFail}
        handleClose={handleClose}
        title="낙찰 실패"
        desc="낙찰자가 없습니다."
        cancel="닫기"
      />
    </ExitButtonDiv>
  );
}

var client = null;

export const Auction = () => {
  const ref = useRef();

  const location = useLocation();
  const { grade } = location.state;
  const { auctionId } = location.state;
  const { userName } = location.state;
  const { auctionType } = location.state;
  const [loading, setLoading] = useState(true);
  // console.log(location.state);
  const [visible, setVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [isCalled, setIsCalled] = useState(false);
  const [isSold, setIsSold] = useState(false);
  const [initPrice, setInitPrice] = useState(0);
  const [open, setOpen] = useState(false);
  const [openFail, setOpenFail] = useState(false);
  const [currentBidder, setCurrentBidder] = useState("없음");
  const [currentPrice, setCurrentPrice] = useState("");
  const [callPrice, setCallPrice] = useState("");
  const [productId, setProductId] = useState("");
  const [products, setProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState();
  const navigate = useNavigate();
  const [bidInfo, setBidInfo] = useState({
    title: "",
    category: "",
    artist: "",
    productSrc: "",
    artistSrc: "",
  });
  const [localUser, setLocalUser] = useState(undefined);

  const handleBid = () => {};

  const subscribe = () => {
    if (client != null) {
      console.log("subs!!!!!!!!!");
      //상시경매의 경우
      if (auctionType === "P") {
        client.subscribe("/sub/auction/personal/" + auctionId, (response) => {
          console.log("sub log : ", response);
          const data = JSON.parse(response.body);
          if (data.finished === undefined) {
            if (data.isSold === null) {
              console.log("subs log !!! undefined!!!");
              setCurrentPrice((prev) =>
                data.bidPrice !== null ? (prev = data.bidPrice) : prev
              );
              setCurrentBidder((prev) =>
                data.userName !== null ? (prev = data.userName) : prev
              );
              if (data.userName === userName)
                setIsSuccess((prev) => (prev = true));
              else setIsSuccess((prev) => (prev = false));
            } else if (data.isSold === true) {
              //낙찰
              console.log("낙찰 데이터 : ", data);
              setIsSold((prev) => (prev = true));
            } else if (data.isSold === false) {
              //처음 입장
              setCurrentPrice((prev) =>
                data.bidPrice !== null ? (prev = data.bidPrice) : prev
              );
              setCurrentBidder((prev) =>
                data.userName !== null ? (prev = data.userName) : prev
              );
            }
          } else if (data.finished) {
            console.log("경매 종료!!! ", userName, data.userName);
            //경매 종료
            if (userName === data.userName) {
              //낙찰된 사람
              alert("낙찰을 축하합니다!");
              client.deactivate();
              ref.current.handleUnmount(data.soldId);
              // navigate("/purchase", {
              //   state: {
              //     auctionType: "P",
              //     soldId: data.soldId,
              //   },
              // });
            } else {
              alert("경매가 종료되었습니다.");
              client.deactivate();
              ref.current.handleUnmount(null);
            }
          }
        });
      }
      // 기획전 경매의 경우
      else if (auctionType === "S") {
        client.subscribe("/sub/auction/special/" + auctionId, (response) => {
          console.log("sub log : ", response);
          const data = JSON.parse(response.body);
          if (data.isNextBid) {
            console.log("다음 경매 시작!!!");
            setBidInfo({
              title: products[currentProductIndex].productName,
              category: "회화",
              artist: products[currentProductIndex].artistName,
              productSrc: products[currentProductIndex].productImages[0],
            });
            setCurrentPrice(products[currentProductIndex].startPrice);
            setInitPrice(products[currentProductIndex].startPrice);
            setProductId(products[currentProductIndex].productId);
            setCallPrice(
              parseInt(products[currentProductIndex].startPrice / 20)
            );
          }
          if (data.finished === undefined) {
            if (data.isSold === null) {
              console.log("subs log !!! undefined!!!");
              setCurrentPrice((prev) =>
                data.bidPrice !== null ? (prev = data.bidPrice) : prev
              );
              setCurrentBidder((prev) =>
                data.userName !== null ? (prev = data.userName) : prev
              );

              if (data.userName === userName)
                setIsSuccess((prev) => (prev = true));
              else setIsSuccess((prev) => (prev = false));
            } else if (data.isSold === true) {
              //낙찰
              console.log("낙찰 데이터 : ", data);
              setIsSold((prev) => (prev = true));
              setCurrentProductIndex((prev) => (prev = data.curSProdIdx));
            } else if (data.isSold === false) {
              //처음 입장
              setCurrentPrice((prev) =>
                data.bidPrice !== null ? (prev = data.bidPrice) : prev
              );
              setCurrentBidder((prev) =>
                data.userName !== null ? (prev = data.userName) : prev
              );
            }
          } else if (data.finished) {
            console.log("경매 종료!!! ", userName, data.userName);
            //경매 종료
            // if (userName === data.userName) {
            //   //낙찰된 사람
            //   alert("낙찰을 축하합니다!");
            //   client.deactivate();
            //   ref.current.handleUnmount(data.soldId);
            //   // navigate("/purchase", {
            //   //   state: {
            //   //     auctionType: "P",
            //   //     soldId: data.soldId,
            //   //   },
            //   // });
            // } else {
            alert("경매가 종료되었습니다.");
            client.deactivate();
            ref.current.handleUnmount(null);
            // }
          }
        });
      }
    }
  };

  const initSocketClient = () => {
    client = new StompJs.Client({
      brokerURL: "wss://i7a601.p.ssafy.io/api/ws-stomp",
      connectHeaders: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      webSocketFactory: () => {
        return SockJS("https://i7a601.p.ssafy.io/api/ws-stomp");
      },
      debug: (str) => {
        console.log("stomp debug!!!", str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onStompError: (frame) => {
        // Will be invoked in case of error encountered at Broker
        // Bad login/passcode typically will cause an error
        // Complaint brokers will set `message` header with a brief message. Body may contain details.
        // Compliant brokers will terminate the connection after any error
        console.log("Broker reported error: " + frame.headers["message"]);
        console.log("Additional details: " + frame.body);
        // client.deactivate();
      },
    });

    client.onConnect = (frame) => {
      console.log("client init !!! ", frame);
      if (client != null)
        client.publish({
          destination:
            auctionType === "P"
              ? "/pub/auction/personal/product/bidding"
              : "/pub/auction/special/product/bidding",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          body: JSON.stringify({
            type: "E",
            auctionId: auctionId,
            productId: productId,
          }),
        });
      subscribe();
    };

    client.activate();
  };

  const disConnect = () => {
    if (client != null) {
      if (client.connected) client.deactivate();
    }
  };

  useEffect(() => {
    if (loading) {
      if (auctionType === "P") {
        //  상시 경매일 경우
        getAuctionProduct(
          auctionId,
          (response) => {
            console.log(response);
            setBidInfo({
              title: response.data.productName,
              category: "회화",
              artist: response.data.userName,
              productSrc: response.data.productImages[0],
              artistSrc: response.data.artistProfileImg,
            });
            setCurrentPrice(response.data.startPrice);
            setInitPrice(response.data.startPrice);
            setProductId(response.data.productId);
            setCallPrice(parseInt(response.data.startPrice / 20));
            setLoading(false);
          },
          (fail) => {
            console.log(fail);
          }
        ).then(initSocketClient());
      } else if (auctionType === "S") {
        // 기획전 경매의 경우
        getSpecialAuctionProduct(
          auctionId,
          (response) => {
            console.log(response);
            let data = response.data.specialAuctionResponses;
            setProducts([...data]);
            setCurrentProductIndex(response.data.curSProdIdx);
            setBidInfo({
              title: data[response.data.curSProdIdx].productName,
              category: "회화",
              artist: data[response.data.curSProdIdx].artistName,
              productSrc: data[response.data.curSProdIdx].productImages[0],
            });
            setCurrentPrice(data[response.data.curSProdIdx].startPrice);
            setInitPrice(data[response.data.curSProdIdx].startPrice);
            setProductId(data[response.data.curSProdIdx].productId);
            setCallPrice(
              parseInt(data[response.data.curSProdIdx].startPrice / 20)
            );
            setLoading(false);
          },
          (fail) => {
            console.log(fail);
          }
        ).then(initSocketClient());
      }
    }
    return () => disConnect();
  }, [loading, productId]);

  // const bidInfo = {
  //   title: "Ice Age",
  //   category: "회화",
  //   artist: "무느스크 스키오스키",
  //   productSrc: product1,
  //   currentBidder: "이아현",
  //   currentPrice: 310000,
  //   callPrice: 10000,
  // };
  const changeValue = (key, value) => {
    setBidInfo((prevState) => {
      let temp = { ...prevState };
      temp[key] = value;
      return temp;
    });
  };

  //응찰, 응찰 성공, 응찰 실패
  const handleVisible = () => {
    if (client == null) return;
    client.publish({
      destination:
        auctionType === "P"
          ? "/pub/auction/personal/product/bidding"
          : "/pub/auction/special/product/bidding",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      body: JSON.stringify({
        type: "B",
        auctionId: auctionId,
        productId: productId,
        bidPrice: currentPrice + callPrice,
      }),
    });

    console.log(currentPrice, initPrice);
    if (!isCalled && parseInt(initPrice * 1.2) < currentPrice) {
      console.log("call!@@");
      setIsCalled(true);
      setCallPrice((prev) => prev + Math.floor(prev * 0.5));
    }
    setVisible(!visible);
  };

  // 낙찰하기, 종료하기
  const handleAuctionExit = () => {
    if (grade === "seller") {
      // 판매자일 경우에만 실행
      // if (!client.current.connected) return;
      if (!isSold) {
        //낙찰 정보 퍼블리시
        if (currentBidder === "없음") {
          // setOpenFail(true);
          alert("낙찰자가 없습니다!");
          return;
        }
        client.publish({
          destination:
            auctionType === "P"
              ? "/pub/auction/personal/product/bidding"
              : "/pub/auction/special/product/bidding",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          body: JSON.stringify({
            type: "SB",
            auctionId: auctionId,
            productId: productId,
          }),
        });
        // 상시경매의 경우
        if (auctionType === "P") {
        }
        //기획전 경매의 경우
        if (auctionType === "S") {
          setIsSold(true);
        }
        handleClose();
      } else if (isSold) {
        if (auctionType === "P") {
          console.log("경매 종료");
          //경매 종료하기
          client.publish({
            destination: "/pub/auction/personal/product/bidding",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
              type: "F",
              auctionId: auctionId,
              productId: productId,
            }),
          });
          handleClose();
          client.deactivate();
          ref.current.handleUnmount(null);
        } else if (auctionType === "S") {
          console.log("작품 낙찰 후 다음 제품 넘어가기");
          // 마지막 상품
          if (currentProductIndex === products.length - 1) {
            client.publish({
              destination: "/pub/auction/special/product/bidding",
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
              body: JSON.stringify({
                type: "F",
                auctionId: auctionId,
                productId: productId,
              }),
            });
            handleClose();
            client.deactivate();
            ref.current.handleUnmount(null);
          } else {
            client.publish({
              destination: "/pub/auction/special/product/bidding",
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
              body: JSON.stringify({
                type: "NB",
                auctionId: auctionId,
                productId: productId,
              }),
            });
            setIsSold(false);
          }
        }
      }
    } else {
      client.deactivate();
      ref.current.handleUnmount(null);
    }
  };
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoBack2 = (soldId) => {
    //낙찰페이지로 이동
    console.log("sold ID : ", soldId);
    if (soldId !== null)
      navigate(`/purchase/${soldId}`, {
        state: {
          auctionType: auctionType,
          // soldId: success,
          productId: productId,
        },
      });
    //그냥 뒤로가기
    // else navigate("/");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenFail(false);
  };

  return loading ? (
    <div></div>
  ) : (
    <div>
      {/* <MainContent src={image} /> */}
      <ErrorBoundary>
        <VideoRoomComponent
          setLocalUser={setLocalUser}
          handleGoBack={handleGoBack}
          grade={grade}
          ref={ref}
          auctionType={auctionType}
          openviduServerUrl="https://i7a601.p.ssafy.io:8443"
          sessionName={auctionId}
          userName={userName}
          handleGoBack2={handleGoBack2}
          // openviduServerUrl="https://localhost:4443"
        />
      </ErrorBoundary>
      {grade === "buyer" && (
        <ExitButton
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          handleAuctionExit={handleAuctionExit}
          open={open}
          openFail={openFail}
        />
      )}

      <AuctionArtist
        title={bidInfo.title}
        artist={bidInfo.artist}
        artistSrc={bidInfo.artistSrc}
      />

      <PriceBox price={currentPrice} callPrice={callPrice} />
      <Grommet theme={GrommetTheme}>
        {visible && (
          <Notification
            toast={{ position: "center" }}
            title={isSuccess ? "입찰 성공" : "입찰 실패"}
            status={isSuccess ? "normal" : "critical"}
            onClose={() => setVisible(false)}
          />
        )}
        <BottomUi
          bidInfo={bidInfo}
          visible={visible}
          bidProduct={handleVisible}
          localUser={localUser}
          grade={grade}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          handleAuctionExit={handleAuctionExit}
          open={open}
          currentBidder={currentBidder}
          currentPrice={currentPrice}
          callPrice={callPrice}
          isSold={isSold}
        />
      </Grommet>
    </div>
  );
};
