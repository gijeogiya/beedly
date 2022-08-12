import styled from "styled-components";
import SampleProfile from '../assets/img/SampleProfile.png';
import SampleBackground from '../assets/img/SampleBackground.png';

const ArtistDetailBackgroundImg = styled.img`
    object-fit: cover;
    width: 100%;
    height: 200px;
`;

const ArtistDetailMainInf = styled.div`
    display: flex;
    position: absolute;
    padding: 164px 0 0 24px;
`;

const StyledCardArtistImgFrame = styled.div`
    display:flex;
    width: 90px;
    height: 90px;
    flex-direction:column;
    padding-left:3px;
    padding-top:5px;
    padding-bottom:3px;
    padding-right:3px;
`;

const StyledCardArtistImg = styled.img`
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid white;
`;


const ArtistDetailSubInf = styled.div`
    padding: 64px 0 0 26px;
`;

export function ArtistDetailCard() {

    return (
        <div
            style={{
                borderBottom: "1px solid #ebebeb",
                paddingBottom: "20px",
            }}
        >
            <ArtistDetailMainInf>
                <StyledCardArtistImgFrame>
                    <StyledCardArtistImg src={SampleProfile} />
                </StyledCardArtistImgFrame>
                <div style={{"fontSize": "16px", "fontWeight": "700", "padding":"46px 0 0 14px"}}>해리아현</div>
            </ArtistDetailMainInf>
            <ArtistDetailBackgroundImg src={SampleBackground}/>
            <ArtistDetailSubInf>
                <div style={{"width": "300px", "fontSize":"14px"}}>광교에서 빵을 굽는 초보 작가입니다.<br/>매달 어쩌고 저쩌고 이것은 작가 상세 설명입니다.<br/>문의는 인스타 DM으로 부탁드립니다.🙏<br/> @gwangkyobbang</div>
            </ArtistDetailSubInf>

        </div>
    );
}