import styled from "styled-components";
import LikeIcon from '../assets/images/like.png';
import { useNavigate } from "react-router-dom";
import BackButtonImage from "../assets/images/backButton.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { event } from "jquery";
import { addFavoriteArtistApi } from "../utils/api";


const BarWarp = styled.div`
    padding: 8px 24px 8px 10px;
    border-bottom: 1px solid #ebebeb;
    display: flex;
    justify-content: space-between;
`;



const BackButton = styled.button`
  background: none;
  font-size: 12px;
  font-family: Noto Sans KR, sans-serif;
  border: 0px;
  width: 10vw;
`;




export function ArtistDetailBar({ artist }) {

    const navigate = useNavigate('');

    const goBack = () => {
        navigate(-1);
    };
    const [artistInfo, setArtistInfo] = useState({});
    const [favoriteCount, setFavoriteCount] = useState();
    const [loading, setloading] = useState(true);
    useEffect(() => {
        if (loading) {
            setArtistInfo(artist);
            setFavoriteCount(artist.favoriteCount);
            console.log(artist);
            setloading(false);
        }
    }, [loading, favoriteCount]);
    const User = useSelector((state) => (state.user.user.user));
    const addFavoriteArtist = (e) => {
        console.log("왜 또 ")
        //만약 현재 보고있는 user가 동일한 사람이라면
        if (artistInfo.userId === User.userId) {
            console.log("나야")
        } else {
            addFavoriteArtistApi(artistInfo.artistId, (res) => {
                console.log(res);
                setloading(true);
                setFavoriteCount(favoriteCount + 1);
            }, (err) => {
                console.log(err);
            })
        }

    }
    return (
        <BarWarp>
            <BackButton onClick={goBack}>
                <img src={BackButtonImage} />
            </BackButton>
            <button onClick={(e) => addFavoriteArtist(e)} style={{ "border": "0", "backgroundColor": "white", }} >
                <img src={LikeIcon} style={{ "width": "18px" }} />
                <div>
                    {favoriteCount}
                </div>
            </button>
        </BarWarp>
    );
}