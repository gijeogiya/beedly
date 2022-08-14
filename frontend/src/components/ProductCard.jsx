import styled from "styled-components";
import SampleProduct from '../assets/img/SampleProduct.png';
import SampleProfile from '../assets/img/SampleProfile.png';
import OnairStateIcon from '../assets/img/OnairStateIcon.svg';
import BeforeStateIcon from '../assets/img/BeforeStateIcon.svg';

const StyledProductCard = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    width:42vw;
    padding-top:5vw;
`;

const StyledProductCardImgFrame = styled.div`
    position:relative;
    width:42vw;
    display:flex;
    flex-direction:column;
    justify-content: flex-end;
    align-items: flex-end;
`;

const StyledRectangleRowImg = styled.img`
    border-radius:8px;
    width:42vw;
    height:42vw;
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

export function ProductCard() {
    return (
        <StyledProductCard>
            <StyledProductCardImgFrame>
                <StyledRectangleRowImg src={SampleProduct} />
                <AuctionStateBox>
                    <StyledAuctionStateIcon src={true ? OnairStateIcon : BeforeStateIcon} />
                        {true ? " 실시간" : " 25:10:12"}
                </AuctionStateBox>
            </StyledProductCardImgFrame>
            <StyledCardInfBox>
                <StyledCardArtistImgFrame>
                    <StyledCardArtistImg src={SampleProfile} />
                </StyledCardArtistImgFrame>
                <StyledCardInfTextFrame>
                    <div style={{"fontSize": "12px", "fontWeight": "700"}}>해리아현</div>
                    <div style={{"fontSize": "12px"}}>고양이와 함께 춤을</div>
                    <div style={{"fontSize": "10px"}}>{false ? `24명 시청중` : `12월 22일 13시 예정`}</div>
                </StyledCardInfTextFrame>
            </StyledCardInfBox>
        </StyledProductCard>
    )
}