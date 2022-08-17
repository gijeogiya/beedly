import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FlexBox } from '../components/UserStyled';
import { artistDetailApi, deleteFavoriteArtistApi, getLikeArtist } from '../utils/api'
import FavoriteIcon from "@mui/icons-material/Favorite";
import { StyledHr } from '../components/Common';
import beforeIcon from "../assets/img/arrow-left.svg";
import { useInView } from "react-intersection-observer"

const StyledProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50vw;
  padding-right: 10px;
  padding-top: 14px;
`;

const StyledProfileCardImgFrame = styled.div`
  position: relative;
  width: 50vw;
  display: flex;
  flex-direction: column;
`;

const StyledRectangleColImg = styled.img`
  border-radius: 8px;
  width: 50vw;
  height: 30vh;
  object-fit: cover;
`;

const StyledProfileCardInfBox = styled.div`
  position: absolute;
  height: 30vh;
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  background-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0) 30%
  );
`;

const StyledCardArtistImgFrame = styled.div`
  display: flex;
  width: 50px;
  height: 50px;
  flex-direction: column;
  padding-left: 3px;
  padding-top: 5px;
  padding-bottom: 3px;
  padding-right: 3px;
`;

const StyledCardArtistImg = styled.img`
  object-fit: cover;
  border-radius: 50%;
`;
export function ArtistCard({ artist }) {
    return (
        <StyledProfileCard>
            <StyledProfileCardImgFrame>
                <StyledRectangleColImg src={artist.artistBgImg} />
                <StyledProfileCardInfBox>
                    <StyledCardArtistImgFrame style={{ padding: "12px" }}>
                        <StyledCardArtistImg
                            style={{ border: "2px solid white" }}
                            src={artist.artistProfileImg}
                        />
                    </StyledCardArtistImgFrame>
                    <div style={{ padding: "12px", color: "white", fontSize: "14px" }}>
                        {artist.userNickname}
                    </div>
                </StyledProfileCardInfBox>
            </StyledProfileCardImgFrame>
        </StyledProfileCard>
    );
}

export default function LikeArtist() {

    const [likeArtistList, setLikeArtistList] = useState([]);
    const Navigate = useNavigate();
    const [favoriteId, setFavoriteId] = useState("");
    const GoArtistDetail = (id) => {
        Navigate(`/artistDetail/${id}`)
    };

    const getInfo = () => {
        getLikeArtist((res) => {
            console.log(res);
            setLikeArtistList(res.data)
        }, (err) => {
            console.log(err);
        })
    };
    useEffect(() => {
        getLikeArtist((res) => {
            setLikeArtistList(res.data)
        }, (err) => {
            console.log(err);
        })
    }, [])

    const deleteFavoriteArtist = (artistId) => {
        artistDetailApi(
            artistId,
            (res) => {
                deleteFavoriteArtistApi(
                    res.data.favoriteId,
                    (res) => {
                        console.log(res);
                        getInfo();
                    },
                    (err) => {
                        console.log(err);
                    }
                )
            },
            (err) => {
                console.log(err);
            }
        );

    }
    const goBack = () => {
        Navigate(-1);
    }
    return (
        <div>
            {/* 관심작가 header */}
            <div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "5vh",
                        alignItems: "center",
                        padding: "0px 10px",
                    }}
                >
                    <img alt="이전" src={beforeIcon} onClick={(e) => goBack()} />
                    <h4>관심작가</h4>
                    <h4 style={{ visibility: "hidden" }}>dd</h4>
                </div>
                <StyledHr width="99vw" height="0.5px" color="lightgray" />
            </div>
            <FlexBox Column_SA style={{ flexWrap: "wrap", margin: "5vw 10vw", alignItems: "flex-start" }}>
                {likeArtistList.map((artist, idx) =>

                    <div
                        className="card"
                        key={idx}

                    >
                        <FlexBox Row_SB style={{ width: "80vw" }}>

                            <FlexBox Row_SB>
                                <StyledCardArtistImgFrame style={{ padding: "12px" }} onClick={(e) => GoArtistDetail(artist.artistId)}>
                                    <StyledCardArtistImg
                                        style={{ border: "2px solid white" }}
                                        src={artist.artistProfileImg}
                                    />
                                </StyledCardArtistImgFrame>
                                <h5 onClick={(e) => GoArtistDetail(artist.artistId)}>{artist.userNickname}</h5>
                            </FlexBox>
                            <button
                                onClick={(e) => deleteFavoriteArtist(artist.artistId)}
                                style={{ border: "0", backgroundColor: "white", justifySelf: "flex-end" }}
                            >
                                <FavoriteIcon />
                            </button>
                        </FlexBox>
                    </div>
                )}
            </FlexBox>
        </div >
    )
}
