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
    width:240px;
    padding-left:14px;
    padding-top:14px;
`;

const StyledProductCardImgFrame = styled.div`
    width:240px;
    display:flex;
    flex-direction:column;
    justify-content: flex-end;
    align-items: flex-end;
`;

const StyledRectangleRowImg = styled.img`
    border-radius:8px;
    width:240px;
    height:180px;
    object-fit: cover;
`;

const AuctionStateBox = styled.div`
    color: white;
    background-color: ${true ? "red" : "gray" || "gray"};
    display: inline-block;
    position: absolute;
    z-index: 5;
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
    width: 40px;
    height: 40px;
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
                    <div style={{"font-size": "14px", "font-weight": "700"}}>해리아현</div>
                    <div style={{"font-size": "14px"}}>고양이와 함께 춤을</div>
                    <div style={{"font-size": "14px"}}>{true ? `24명 시청중` : `2022년 12월 22일 13시 예정`}</div>
                </StyledCardInfTextFrame>
            </StyledCardInfBox>
        </StyledProductCard>
    )
}

const StyledProfileCard = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    width:150px;
    padding-left:10px;
    padding-top:14px;
`;

const StyledProfileCardImgFrame = styled.div`
    width:150px;
    display:flex;
    flex-direction:column;
`;

const StyledRectangleColImg = styled.img`
    border-radius:8px;
    width:150px;
    height:200px;
    object-fit: cover;
`;

const StyledProfileCardInfBox = styled.div`
    position: absolute;
    z-index: 5;
    height:200px;
    display:flex;
    flex-direction:column;
    justify-content: space-between;
`;

export function ArtistCard() {
    return (
        <StyledProfileCard>
              <StyledProfileCardImgFrame>
                <StyledRectangleColImg src={SampleBackground} />
                <StyledProfileCardInfBox>
                    <StyledCardArtistImgFrame style={{"padding": "12px"}}>
                        <StyledCardArtistImg style={{"border": "2px solid white"}} src={SampleProfile} />
                    </StyledCardArtistImgFrame>
                    <div style={{"padding":"12px", "color":"white", "font-size":"14px"}}>
                        해리아현
                    </div>
                </StyledProfileCardInfBox>
            </StyledProfileCardImgFrame>
        </StyledProfileCard>
    )
}