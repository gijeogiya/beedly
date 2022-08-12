import React from 'react'
import styled from "styled-components";
import { HorizonScrollColTable } from '../components/HorizonScrollTable'
import { ProductCard } from '../components/ScrollableCard'
import { SearchBar } from '../components/SearchBar'
import { FlexBox } from '../components/UserStyled';

const StyledTableTitle = styled.div`
  font-size: 16px;
  color: #1f1d1d;
  padding-top: 20px;
  padding-left: 20px;
  font-weight: 900;
`;


const ProductTable = styled.div`
justify-content: center;
    display: flex;
    flex-wrap: wrap;
    width: 90vw;
`;
export default function SearchResult() {
    return (
        // 검색 후 화면
        <div style={{ "paddingBottom": "40px" }}>
            <SearchBar />
            <StyledTableTitle>검색 결과</StyledTableTitle>
            <StyledTableTitle>Artist</StyledTableTitle>
            <HorizonScrollColTable />
            <StyledTableTitle>Product</StyledTableTitle>
            <div style={{ "display": "flex", "justifyContent": "center" }}>


                <ProductTable>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </ProductTable>

            </div>
        </div>
    )
}
