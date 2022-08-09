import styled from "styled-components";
import XIcon from '../assets/img/XIcon.svg';

const RecentlyKeywordFrame = styled.div`
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    padding: 20px;
    &::-webkit-scrollbar {
    display: none;
    }

    .card {
    display: inline-block;
    }
`;

const RecentlyKeywordButton = styled.button`
    background-color:#ffffff;
    padding: 8px 3px 8px 8px;
    font-size: 14px;
    margin: 0px 8px 12px 0px;
    border: 1px solid #ebebeb;
    border-radius:16px;
`;

const RecentlyKeywordRemoveButton = styled.button`
    border: 0;
    background-color: #ffffff;
`;

const RecentlyKeywordRemoveImg = styled.img`
    width: 8px;
    height: 8px;
`;


const RecommendKeywordFrame = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
`;

const RecommendKeywordButton = styled.button`
    background-color:#f4f4f4;
    padding: 8px;
    font-size: 14px;
    margin: 0px 8px 12px 0px;
    border: 1px solid #ebebeb;
    border-radius:16px;
`;


export function RecentlyKeywordTable() {
    return (
        <RecentlyKeywordFrame>
            <RecentlyKeywordButton>
                강아지
                <RecentlyKeywordRemoveButton>
                    <RecentlyKeywordRemoveImg src={XIcon}/>
                </RecentlyKeywordRemoveButton>
            </RecentlyKeywordButton>
            <RecentlyKeywordButton>
                코드
                <RecentlyKeywordRemoveButton>
                    <RecentlyKeywordRemoveImg src={XIcon}/>
                </RecentlyKeywordRemoveButton>    
            </RecentlyKeywordButton>
            <RecentlyKeywordButton>
                재권박
                <RecentlyKeywordRemoveButton>
                    <RecentlyKeywordRemoveImg src={XIcon}/>
                </RecentlyKeywordRemoveButton>
            </RecentlyKeywordButton>
            <RecentlyKeywordButton>
                우영우
                <RecentlyKeywordRemoveButton>
                    <RecentlyKeywordRemoveImg src={XIcon}/>
                </RecentlyKeywordRemoveButton>
            </RecentlyKeywordButton>
            <RecentlyKeywordButton>
                유랑나
                <RecentlyKeywordRemoveButton>
                    <RecentlyKeywordRemoveImg src={XIcon}/>
                </RecentlyKeywordRemoveButton>
            </RecentlyKeywordButton>
            <RecentlyKeywordButton>
                날씨
                <RecentlyKeywordRemoveButton>
                    <RecentlyKeywordRemoveImg src={XIcon}/>
                </RecentlyKeywordRemoveButton>
            </RecentlyKeywordButton>
            <RecentlyKeywordButton>
                태극기휘날리며
                <RecentlyKeywordRemoveButton>
                    <RecentlyKeywordRemoveImg src={XIcon}/>
                </RecentlyKeywordRemoveButton>
            </RecentlyKeywordButton>
            <RecentlyKeywordButton>
                산새들
                <RecentlyKeywordRemoveButton>
                    <RecentlyKeywordRemoveImg src={XIcon}/>
                </RecentlyKeywordRemoveButton>
            </RecentlyKeywordButton>
            <RecentlyKeywordButton>
                화사한
                <RecentlyKeywordRemoveButton>
                    <RecentlyKeywordRemoveImg src={XIcon}/>
                </RecentlyKeywordRemoveButton>
            </RecentlyKeywordButton>
            <RecentlyKeywordButton>
                도시
                <RecentlyKeywordRemoveButton>
                    <RecentlyKeywordRemoveImg src={XIcon}/>
                </RecentlyKeywordRemoveButton>
            </RecentlyKeywordButton>
        </RecentlyKeywordFrame>

    );
}

export function RecommendKeywordTable() {
    return (
        <RecommendKeywordFrame>
            <RecommendKeywordButton>장마</RecommendKeywordButton>
            <RecommendKeywordButton>고양이</RecommendKeywordButton>
            <RecommendKeywordButton>해리아현</RecommendKeywordButton>
            <RecommendKeywordButton>차가운</RecommendKeywordButton>
            <RecommendKeywordButton>판화</RecommendKeywordButton>
            <RecommendKeywordButton>광교빵순이</RecommendKeywordButton>
            <RecommendKeywordButton>무느스크스키오스키</RecommendKeywordButton>
            <RecommendKeywordButton>여름</RecommendKeywordButton>
            <RecommendKeywordButton>꽃</RecommendKeywordButton>
            <RecommendKeywordButton>시골</RecommendKeywordButton>
        </RecommendKeywordFrame>

    );
}

