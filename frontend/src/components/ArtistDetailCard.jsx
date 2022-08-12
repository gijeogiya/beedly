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

export function ArtistDetailCard({ artist }) {
    console.log(artist);

    return (
        <div
            style={{
                borderBottom: "1px solid #ebebeb",
                paddingBottom: "20px",
            }}
        >
            <ArtistDetailMainInf>
                <StyledCardArtistImgFrame>
                    <StyledCardArtistImg src={artist.artistProfileImg === null ? SampleProfile : artist.artistProfileImg} />
                </StyledCardArtistImgFrame>
                <div style={{ "fontSize": "16px", "fontWeight": "700", "padding": "46px 0 0 14px" }}>{artist.userNickname}</div>
            </ArtistDetailMainInf>
            <ArtistDetailBackgroundImg src={artist.artistBgImg === null ? SampleBackground : artist.artistBgImg} />
            <ArtistDetailSubInf>
                <div style={{ "width": "300px", "fontSize": "14px" }}>{artist.artistDesc}</div>
            </ArtistDetailSubInf>

        </div>
    );
}