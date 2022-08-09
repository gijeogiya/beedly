import React from 'react'
import styled from "styled-components";
import { SearchBar } from "../components/SearchBar";
import { SizePickCard } from "../components/SizePickCard";
import { RecommendKeywordTable, RecentlyKeywordTable } from "../components/KeywordTable";

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
    return (
        <div style={{"padding-bottom":"20px"}}>
            <SearchBar/>
            <StyledTableTitle>최근 검색어</StyledTableTitle>
            <RecentlyKeywordTable/>
            <StyledTableTitle>추천 검색어</StyledTableTitle>
            <RecommendKeywordTable/>
            <StyledTableTitle>Size Pick!</StyledTableTitle>
            <SizePickCardTable>
                <SizePickCard title={"Small Size"} size={"~70cm"} background_color={{"background-color":"#EBF0F5"}}/>
                <SizePickCard title={"Medium Size"} size={"70cm~90cm"} background_color={{"background-color":"#F6EEED"}}/>
            </SizePickCardTable>
            <SizePickCardTable>
                <SizePickCard title={"Large Size"} size={"90cm~120cm"} background_color={{"background-color":"#F1F1EA"}}/>
                <SizePickCard title={"XLarge Size"} size={"120cm~"} background_color={{"background-color":"#F5F5F5"}}/>
            </SizePickCardTable>
            <StyledTableTitle></StyledTableTitle>
        </div>
    )
}
