import { Box, Carousel, Image, Grommet } from "grommet";
import Banner1 from '../assets/img/Banner1.png';
import Banner2 from '../assets/img/Banner2.png';
import Banner3 from '../assets/img/Banner3.png';

const GrommetTheme = {
    carousel: {
      icons: {
        color: {
          dark: "#FFFFFF", light: "#FFFFFF"
        }
      }
    }
  }

export function BannerTable() {
    return (
      <Grommet theme={GrommetTheme}>
        <Box width="medium" height="medium" overflow="hidden" fill={true} controls={false}>
          <Carousel fill={true} wrap={true} play={6000}>
            <Image fit="cover" src={Banner1} />
            <Image fit="cover" src={Banner2} />
            <Image fit="cover" src={Banner3} />
          </Carousel>
        </Box>
      </Grommet>
    );
  }