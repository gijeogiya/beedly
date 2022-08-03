import { Notification, Grommet, Box, Carousel } from "grommet";
import React, { useState, useEffect } from "react";
import { AuctionArtist, StyledText, StyledHr } from "../components/Common";
import styled from "styled-components";
import image from "../assets/images/openvidu.png";
import artist from "../assets/images/artist.png";
import product1 from "../assets/images/product1.png";
import { ReactComponent as Success } from "../assets/icons/success.svg";
import { ReactComponent as Fail } from "../assets/icons/fail.svg";
const MainContent = styled.img`
  src: ${(props) => props.src || ""};
  width: 100%;
  height: 100%;
`;

const PriceContent = styled.div`
  background-color: lightgray;
  background: rgba(220, 220, 220, 0.6);
  width: 40%;
  height: 6%;
  color: white;
  z-index: 5;
  position: absolute;
  left: 30%;
  right: 30%;
  top: 12%;
  align-content: center;
  text-align: center;
  border-radius: 10px;
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
    <PriceContent>
      <StyledText
        size="20px"
        color="white"
        weight="bold"
        text={`₩ ${moneyFormat(price)}`}
      />
      <StyledHr />
      <StyledText
        size="14px"
        color="white"
        text={`호가 ₩ ${moneyFormat(callPrice)}`}
      />
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
  background: rgba(220, 220, 220, 0.6);
  color: black;
  border-radius: 10px;
  padding: 10px;
  width: 80%;
  margin: 0 auto;
`;

const moneyFormat = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const AuctionInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 60px 0 60px;
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
  f,
}) {
  return (
    <ProductContainer>
      <ProductBox>
        <Box direction="row">
          <ProductImg src={productSrc} />
          <Box>
            <StyledText size="10px" weight="bold" text={category} />
            <StyledText size="12px" weight="bold" text={title} />
            <StyledText size="10px" text={artist} />
          </Box>
        </Box>
        <Box>
          <AuctionInfoText
            title="현재 입찰가"
            info={`${moneyFormat(currentPrice)} 원`}
            titleWeight="bold"
            infoWeight="bold"
            titleSize="10px"
            infoSize="10px"
          />
          <AuctionInfoText
            title="현재 입찰자"
            info={currentBidder}
            titleWeight="bold"
            infoWeight="bold"
            titleSize="10px"
            infoSize="10px"
          />
          <StyledHr color="white" />
          <AuctionInfoText
            title="입찰가"
            info={`${moneyFormat(callPrice + currentPrice)} 원`}
            titleWeight="bold"
            infoWeight="bold"
            titleSize="10px"
            infoSize="14px"
            infoColor="#D00000"
          />
          <AuctionInfoText
            title="예상결제금액"
            info={`${moneyFormat(
              Math.floor((0 + callPrice + currentPrice) * 1.1)
            )} 원`}
            titleWeight="bold"
            infoWeight="bold"
            titleSize="10px"
            infoSize="10px"
          />
        </Box>
      </ProductBox>
      <ButtonContainer>
        <BidButton disabled={visible} visible={visible} onClick={f}>
          {visible ? "입찰완료" : "입찰하기"}
        </BidButton>
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
  padding: 5px;
  width: 70%;
  height: 100%;
`;

const ChattingDiv = styled.div``;

const ChatBox = () => {
  return <ChatFrame></ChatFrame>;
};

const Conatainer = styled(Carousel)`
  z-index: 8;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40%;
  justify-content: center;
`;

function BottomUi({ bidInfo, visible, f }) {
  return (
    <Conatainer controls="arrows">
      <ChatBox />
      <ProductFrame
        title={bidInfo.title}
        category={bidInfo.category}
        artist={bidInfo.artist}
        productSrc={bidInfo.productSrc}
        currentBidder={bidInfo.currentBidder}
        currentPrice={bidInfo.currentPrice}
        callPrice={bidInfo.callPrice}
        visible={visible}
        f={f}
      ></ProductFrame>
    </Conatainer>
  );
}

export const Auction = () => {
  const [visible, setVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [isCalled, setIsCalled] = useState(false);
  const [initPrice, setInitPrice] = useState(0);
  const [bidInfo, setBidInfo] = useState({
    title: "",
    category: "",
    artist: "",
    productSrc: "",
    currentBidder: "",
    currentPrice: 0,
    callPrice: 0,
  });
  useEffect(() => {
    setBidInfo({
      title: "Ice Age",
      category: "회화",
      artist: "무느스크 스키오스키",
      productSrc: product1,
      currentBidder: "이아현",
      currentPrice: 310000,
      callPrice: 10000,
    });
    setInitPrice(310000);
  }, []);
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
  function handleVisible() {
    changeValue("currentPrice", 0 + bidInfo.currentPrice + bidInfo.callPrice);
    console.log(bidInfo.currentPrice, initPrice);
    if (!isCalled && initPrice + 30000 < bidInfo.currentPrice) {
      console.log("call!@@");
      setIsCalled(true);
      changeValue(
        "callPrice",
        0 + bidInfo.callPrice + Math.floor(bidInfo.callPrice * 0.5)
      );
    }
    setVisible(!visible);
  }
  return (
    <div>
      <MainContent src={image} />
      <AuctionArtist
        title={bidInfo.title}
        artist={bidInfo.artist}
        artistSrc={artist}
      />
      <PriceBox price={bidInfo.currentPrice} callPrice={bidInfo.callPrice} />
      <Grommet theme={GrommetTheme}>
        {visible && (
          <Notification
            toast={{ position: "center" }}
            title={isSuccess ? "입찰 성공" : "입찰 실패"}
            status={isSuccess ? "normal" : "critical"}
            onClose={() => setVisible(false)}
          />
        )}
        <BottomUi bidInfo={bidInfo} visible={visible} f={handleVisible} />
      </Grommet>
    </div>
  );
};
