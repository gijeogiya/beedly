import { Box, Image, Grommet } from "grommet";
import Banner1 from "../assets/img/Banner1.png";
import Banner2 from "../assets/img/Banner2.png";
import Banner3 from "../assets/img/Banner3.png";
import Carousel from "nuka-carousel";
import Button from "./Button";
import BackBtn from "../assets/images/backButton.png";
import More from "../assets/images/more.png";
import { Link } from "react-router-dom";
const GrommetTheme = {
  carousel: {
    icons: {
      color: {
        dark: "#FFFFFF",
        light: "#FFFFFF",
      },
    },
  },
};

export function BannerTable() {
  return (
    <Grommet theme={GrommetTheme}>
      <Box
        width="medium"
        fit="cover"
        height="medium"
        overflow="hidden"
        fill={true}
        controls={false}
      >
        <Carousel
          autoplay={true}
          autoplayInterval={3000}
          wrapAround={true}
          speed={500}
          renderCenterLeftControls={({ previousSlide }) => (
            <Button
              Blank
              onClick={previousSlide}
              children={<img src={BackBtn} />}
            />
          )}
          renderCenterRightControls={({ nextSlide }) => (
            <Button Blank onClick={nextSlide} children={<img src={More} />} />
          )}
        >
          <div>
            <Link to="/bannerEvent1">
              <Image
                fill={true}
                fit="cover"
                src={Banner1}
                onClick={() => {
                  console.log(1);
                }}
              />
            </Link>
          </div>
          <div>
            <Link to="/bannerEvent2">
              <Image
                fill={true}
                fit="cover"
                src={Banner2}
                onClick={() => {
                  console.log(1);
                }}
              />
            </Link>
          </div>
          <div>
            <Link to="/specialAuctionDetail/18">
              <Image
                fill={true}
                fit="cover"
                src={Banner3}
                onClick={() => {
                  console.log(1);
                }}
              />
            </Link>
          </div>
        </Carousel>
      </Box>
    </Grommet>
  );
}
