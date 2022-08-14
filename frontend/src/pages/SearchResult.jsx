import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import { HorizonScrollColTable } from '../components/HorizonScrollTable';
import { ProductCard } from '../components/ScrollableCard';
import { SearchBar } from '../components/SearchBar';
import { FlexBox } from '../components/UserStyled';
import { getProductByArtistId, getProductByArtistNickNameApi, getProductByProductNameApi, getProductListBySizeApi } from '../utils/api';

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
    const location = useLocation();
    const { keyword } = location.state;
    const { searchCategory } = location.state;
    const [searchProductList, setSearchProductList] = useState([]);
    const [loading, setloading] = useState(true);
    const [list, setlist] = useState();
    useEffect(() => {
        if (loading) {

            if (searchCategory === "keyword") {

                if (localStorage.getItem("SearchList") === null || JSON.parse(localStorage.getItem("SearchList")) === []) {
                    console.log([keyword]);
                    localStorage.setItem("SearchList", JSON.stringify([keyword]));
                } else {
                    localStorage.setItem("SearchList", JSON.stringify(JSON.parse(localStorage.getItem("SearchList")).concat([keyword])));

                };
                //keyword로 상품작가가 keyword인 상품 검색
                getProductByArtistNickNameApi(keyword, "0", "20", "", (res) => {
                    console.log(res);
                    if (res.data.content.length !== 0) {
                        setSearchProductList([...res.data.content]);
                    }


                }, (err) => {
                    console.log(err);
                    //keyword로 상품이름이 keyword인 상품 검색
                }).then(getProductByProductNameApi("0", keyword, "20", "", (res) => {
                    console.log(res);

                    if (res.data.content.length !== 0) {

                        setSearchProductList((prev) => prev.concat(res.data.content));
                    }
                }, (err) => {
                    console.log(err);
                }))
            } else if (searchCategory === "size") {
                console.log(keyword);
                getProductListBySizeApi(keyword, "0", "100", "", (res) => {
                    console.log(res);
                    setSearchProductList((prev) => prev.concat(res.data.content));
                }, (err) => {
                    console.log(err);
                });
            }
            setloading(false);
        }
    }, [loading])
    return (
        // 검색 후 화면
        <div style={{ "paddingBottom": "40px" }}>
            <SearchBar />
            <StyledTableTitle>검색 결과</StyledTableTitle>
            <StyledTableTitle>Artist</StyledTableTitle>
            {/* <HorizonScrollColTable /> */}
            <StyledTableTitle>Product</StyledTableTitle>
            {!loading && searchProductList.length !== 0 ? <div style={{ "display": "flex", "justifyContent": "center" }}>

                <ProductTable>
                    {searchProductList.map((product, idx) => <ProductCard key={idx} product={product} />)}
                </ProductTable>

            </div>
                : <ProductTable><div>검색결과가 없습니다.</div></ProductTable>
            }
        </div>
    )
}
