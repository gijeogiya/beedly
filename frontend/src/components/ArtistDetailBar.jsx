import styled from "styled-components";
import LikeIcon from '../assets/images/like.png';
import { useNavigate } from "react-router-dom";
import BackButtonImage from "../assets/images/backButton.png";


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

    return (
        <BarWarp>
            <BackButton onClick={goBack}>
                <img src={BackButtonImage} />
            </BackButton>
            <button style={{ "border": "0", "backgroundColor": "white", }}>
                <img src={LikeIcon} style={{ "width": "18px" }} />
                <div>
                    139
                </div>
            </button>
        </BarWarp>
    );
}