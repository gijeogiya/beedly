import styled from "styled-components";
import LikeIcon from '../assets/images/like.png';
import { useNavigate } from "react-router-dom";
import BackButtonImage from "../assets/images/backButton.png";


const BarWarp = styled.div`
    padding: 12px 24px 12px 10px;
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




export function ArtistDetailBar({}) {

    const navigate = useNavigate('');

    const goBack = () => {
        navigate(-1);
    };

    return (
        <BarWarp>
            <BackButton onClick={goBack}>
                <img src={BackButtonImage} />
            </BackButton>
            <button style={{"border":"0", "backgroundColor":"white",}}>
                <img src={LikeIcon} style={{"width":"18px"}}/>
                <div>
                    123
                </div>
            </button>
        </BarWarp>
    );
}