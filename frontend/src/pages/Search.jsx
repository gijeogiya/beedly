import React, { useState } from 'react';
import styled from "styled-components";
import { SearchBar } from "../components/SearchBar";
import { SizePickCard } from "../components/SizePickCard";
import { RecommendKeywordTable, RecentlyKeywordTable } from "../components/KeywordTable";
import { getProductListBySizeApi } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Spinner } from 'grommet';

const StyledTableTitle = styled.div`
  font-size: 16px;
  color: #1f1d1d;
  padding-top: 20px;
  padding-left: 20px;
  font-weight: 900;
`;


const SizePickCardTable = styled.div`
    display: flex;
    justify-content:center;
`;

export default function SearchPage() {
    const Navigate = useNavigate();
    const [RecentSearchList, setRecentSearchList] = useState([]);
    const [RecommendSearchList, setRecommendSearchList] = useState([]);
    //searchCatefoy는 검색 방법 -> keyword / size
    const SearchBySize = (e) => {
        const data = {
            searchCategory: "size",
            keyword: e.target.value,
        }
        Navigate("/searchResult", { state: data });
    }
    const [loading, setloading] = useState(true);
    useEffect(() => {

        if (loading) {

            //최근 검색어 리스트 가져오기]
            console.log(typeof (JSON.parse(localStorage.getItem("RecentSearchList"))));
            setRecentSearchList([...JSON.parse(localStorage.getItem("RecentSearchList"))]);
            //추천 검색어 리스트 가져오기
            //인기많은 작가, 인기많은 작품, 모르겠다~
            setloading(false);
        }

    }, [loading])

    return (
        <div style={{ "paddingBottom": "20px" }}>
            <SearchBar />
            <StyledTableTitle >최근 검색어</StyledTableTitle>
            <RecentlyKeywordTable list={RecentSearchList} />
            <StyledTableTitle>추천 검색어</StyledTableTitle>
            <RecommendKeywordTable />
            <StyledTableTitle>Size Pick!</StyledTableTitle>
            <SizePickCardTable>
                <SizePickCard title={"Small Size"} size={"~70cm"} background_color={{ "backgroundColor": "#EBF0F5" }} value={"small"} onClick={(e) => SearchBySize(e)} />
                <SizePickCard title={"Medium Size"} size={"70cm~90cm"} background_color={{ "backgroundColor": "#F6EEED" }} value={"medium"} onClick={(e) => SearchBySize(e)} />
            </SizePickCardTable>
            <SizePickCardTable>
                <SizePickCard title={"Large Size"} size={"90cm~120cm"} background_color={{ "backgroundColor": "#F1F1EA" }} value={"large"} onClick={(e) => SearchBySize(e)} />
                <SizePickCard title={"XLarge Size"} size={"120cm~"} background_color={{ "backgroundColor": "#F5F5F5" }} value={"xlarge"} onClick={(e) => SearchBySize(e)} />
            </SizePickCardTable>
            <StyledTableTitle></StyledTableTitle>
        </div>
    )
}
