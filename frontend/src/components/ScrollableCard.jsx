import styled from "styled-components";
import SampleProduct from '../assets/img/SampleProduct.png';
import SampleProfile from '../assets/img/SampleProfile.png';
import SampleBackground from '../assets/img/SampleBackground.png';
import OnairStateIcon from '../assets/img/OnairStateIcon.svg';
import BeforeStateIcon from '../assets/img/BeforeStateIcon.svg';

const StyledProductCard = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    width:180px;
    padding-right:14px;
    padding-top:14px;
`;

const StyledProductCardImgFrame = styled.div`
    position:relative;
    width:180px;
    display:flex;
    flex-direction:column;
    justify-content: flex-end;
    align-items: flex-end;
`;

const StyledRectangleRowImg = styled.img`
    border-radius:8px;
    width:180px;
    height:180px;
    object-fit: cover;
`;

const AuctionStateBox = styled.div`
    color: white;
    background-color: ${true ? "red" : "gray" || "gray"};
    display: inline-block;
    position: absolute;
    font-size: 12px;
    padding-left: 5px;
    padding-right: 5px;
    border-radius:3px;
    margin:12px;
`;

const StyledAuctionStateIcon = styled.img`
    height: 9px;
`;

const StyledCardInfBox = styled.div`
    display:flex;
    padding-left:5px;
    padding-top:5px;
`;

const StyledCardArtistImgFrame = styled.div`
    display:flex;
    width: 30px;
    height: 30px;
    flex-direction:column;
    padding-left:3px;
    padding-top:5px;
    padding-bottom:3px;
    padding-right:3px;
`;

const StyledCardArtistImg = styled.img`
    object-fit: cover;
    border-radius: 50%;

`;

const StyledCardInfTextFrame = styled.div`
    padding-left: 5px;
`;

export function ProductCard({ product }) {
    const now = new Date();
    const start = new Date(product.startTime);
    const date = product.startTime.split("T");
    const yyyyMMdd = date[0].split("-");
    const HHmm = date[1].split(":");
    const checkTime = () => {
        if (parseInt(now.getFullYear) >= parseInt(yyyyMMdd[0]) &&
            parseInt(now.getMonth + 1) >= parseInt(yyyyMMdd[1]) &&
            parseInt(now.getDate) >= parseInt(yyyyMMdd[2]) &&
            parseInt(now.getHours) >= parseInt(HHmm[0]) &&
            parseInt(now.getMinutes) >= parseInt(HHmm[1])
        ) {
            // 아직 진행 예정
            return false;
        } else {
            return true;
        }
    }

    const getTime = () => {

        let diff = now - start;
        const diffDays = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        diff -= diffDays * (1000 * 60 * 60 * 24);
        const diffHours = Math.floor(diff / (1000 * 60 * 60));
        diff -= diffHours * (1000 * 60 * 60);
        const diffMin = Math.floor(diff / (1000 * 60));
        diff -= diffMin * (1000 * 60);
        const diffSec = Math.floor(diff / 1000);
        return `${diffDays < 10 ? `0${diffDays}` : diffDays}일 ${diffHours < 10 ? `0${diffHours}` : diffHours}: ${diffMin < 10 ? `0${diffMin}` : diffMin}: ${diffSec < 10 ? `0${diffSec}` : diffSec}`

    }

    const isOnair = () => {
        return true;
    }
    return (
        <StyledProductCard>
            <StyledProductCardImgFrame>
                <StyledRectangleRowImg src={product.productImgs[0]} />
                <AuctionStateBox>
                    <StyledAuctionStateIcon src={true ? OnairStateIcon : BeforeStateIcon} />
                    {checkTime ? "실시간" : getTime}
                </AuctionStateBox>
            </StyledProductCardImgFrame>
            <StyledCardInfBox>
                <StyledCardArtistImgFrame>
                    <StyledCardArtistImg src={product.artistImg} />
                </StyledCardArtistImgFrame>
                <StyledCardInfTextFrame >
                    <div style={{ "fontSize": "14px", "fontWeight": "700", whiteSpace: "pre-line" }}>{product.userName}</div>
                    <div style={{
                        "fontSize": "14px", whiteSpace: "pre-line",
                    }}>{product.productName}</div>
                    <div style={{ "fontSize": "12px", whiteSpace: "pre-line", }}>{isOnair ? `시청중` : `${yyyyMMdd[0]}년 ${parseInt(yyyyMMdd[1])}월 ${parseInt(
                        yyyyMMdd[2]
                    )}일  ${parseInt(HHmm[0])}시 ${parseInt(HHmm[1]) !== 0 ? `${parseInt(HHmm[1])}분` : ``
                        } 예정`}</div>
                </StyledCardInfTextFrame>
            </StyledCardInfBox>
        </StyledProductCard>
    )
}


const StyledProfileCard = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    width:144px;
    padding-right:10px;
    padding-top:14px;
`;

const StyledProfileCardImgFrame = styled.div`
    position: relative;
    width:144px;
    display:flex;
    flex-direction:column;
`;

const StyledRectangleColImg = styled.img`
    border-radius:8px;
    width:144px;
    height:208px;
    object-fit: cover;
`;

const StyledProfileCardInfBox = styled.div`
    position: absolute;
    height:208px;
    width:144px;
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    border-radius:8px;
    background-image:linear-gradient(0deg,rgba(0,0,0,.5),rgba(0,0,0,0) 30%);
`;

export function ArtistCard({ artist }) {
    return (
        <StyledProfileCard>
            <StyledProfileCardImgFrame>
                <StyledRectangleColImg src={artist.artistBgImg} />
                <StyledProfileCardInfBox>
                    <StyledCardArtistImgFrame style={{ "padding": "12px" }}>
                        <StyledCardArtistImg style={{ "border": "2px solid white" }} src={artist.artistProfileImg} />
                    </StyledCardArtistImgFrame>
                    <div style={{ "padding": "12px", "color": "white", "fontSize": "14px" }}>
                        {artist.userNickname}
                    </div>
                </StyledProfileCardInfBox>
            </StyledProfileCardImgFrame>
        </StyledProfileCard>
    )
}