import styled from "styled-components";
import { useEffect, useState } from "react";
import { FlexBox } from "./UserStyled";
import Button from "./Button";

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
    const [artistInfo, setArtistInfo] = useState({});
    useEffect(() => {
        setArtistInfo(artist);
        console.log(artist);
    }, [artist]);

    return (
        <div
            style={{
                borderBottom: "1px solid #ebebeb",
                paddingBottom: "20px",
            }}
        >

            <ArtistDetailMainInf>
                <StyledCardArtistImgFrame>
                    <StyledCardArtistImg src={artist.artistProfileImg} />
                </StyledCardArtistImgFrame>
                <FlexBox Row_SB style={{ minWidth: "65vw" }}>
                    <div style={{ "fontSize": "16px", "fontWeight": "700", "padding": "46px 0 0 14px" }}>{artistInfo.userNickname}</div>
                    <Button XsmallBlack style={{ alignSelf: "flex-end" }}>프로필 편집</Button>
                </FlexBox>
            </ArtistDetailMainInf>
            <ArtistDetailBackgroundImg src={artistInfo.artistBgImg} />
            <ArtistDetailSubInf>
                <div style={{ "width": "300px", "fontSize": "14px" }}>{artistInfo.artistDesc}</div>
            </ArtistDetailSubInf>

        </div>
    );
}