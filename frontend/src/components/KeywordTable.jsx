import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import XIcon from '../assets/img/XIcon.svg';

const RecentlyKeywordFrame = styled.div`
display: flex;
flex-wrap: wrap;
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
    display:flex;
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


export function RecentlyKeywordTable({ list }) {

    const Navigate = useNavigate();
    const [RecentKeywordList, setRecentKeywordList] = useState([]);
    useEffect(() => {
        setRecentKeywordList(list)
    }, [list])

    const SearchByKeyword = (keyword) => {
        const data = {
            searchCategory: "keyword",
            keyword: keyword
        }
        Navigate("/searchResult", { state: data });
    }

    const DeleteKeyword = (keyword) => {
        console.log(keyword)
        const nextlist = [];
        for (let index = 0; index < RecentKeywordList.length; index++) {
            if (RecentKeywordList[index] !== keyword) {
                nextlist.push(RecentKeywordList[index]);
            }
        }
        localStorage.setItem("SearchList", JSON.stringify(nextlist));
        setRecentKeywordList(nextlist);
    }

    return (
        <RecentlyKeywordFrame>
            {RecentKeywordList.map((keyword, idx) =>
                <RecentlyKeywordButton key={idx}>
                    <div onClick={(e) => SearchByKeyword(keyword)}>{keyword}</div>

                    <RecentlyKeywordRemoveButton>
                        <RecentlyKeywordRemoveImg src={XIcon} onClick={(e) => DeleteKeyword(keyword)} />
                    </RecentlyKeywordRemoveButton>
                </RecentlyKeywordButton>
            )}


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

