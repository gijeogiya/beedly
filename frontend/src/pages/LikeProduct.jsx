import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import beforeIcon from "../assets/img/arrow-left.svg";
import { StyledHr } from '../components/Common';
import product from "../assets/img/SampleProduct.png";
import { StyledImg } from "../components/Common";
import Button from "../components/Button";
import { FlexBox } from '../components/UserStyled';
import { getLikeProduct } from '../utils/api';

// 판매내역 / 구매내역 등에 사용되는 상품 상태 컴포넌트
export function ProductState({ product }) {
    return (
        <div style={{ padding: "20px" }}>
            <FlexBox Row_SB>
                <StyledImg src={product} alt="상품이미지"></StyledImg>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "65%",
                        alignItems: "flex-start",
                        height: "25vw",
                    }}
                >
                    <p style={{ margin: "0px 0px", fontWeight: "bold" }}>Title</p>
                    <p style={{ margin: "0px 0px", fontSize: "12px" }}>
                        2022.07.19 17:00
                    </p>
                    <p style={{ margin: "0px 0px", fontSize: "12px" }}>예정</p>
                    <Button
                        SmallYellow
                        style={{ alignSelf: "flex-end", margin: "5px 5px" }}
                    >
                        출시예정
                    </Button>
                </div>
            </FlexBox>
        </div>
    );
}
export default function LikeProduct() {

    const [likeProductList, setLikeProductList] = useState([]);
    const Navigate = useNavigate();
    const [favoriteId, setFavoriteId] = useState("");
    const GoProductDetail = (id) => {
        Navigate(`/productDetail/${id}`)
    };

    const getInfo = () => {
        getLikeProduct((res) => {
            console.log(res);
            setLikeProductList(res.data)
        }, (err) => {
            console.log(err);
        })
    };
    useEffect(() => {
        getLikeProduct((res) => {
            console.log(res);
            setLikeProductList(res.data)
        }, (err) => {
            console.log(err);
        })
    }, [])

    const goBack = () => {
        Navigate(-1);
    }
    return (
        <div>
            {/* 관심작품 header */}
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
                    <h4>관심작품</h4>
                    <h4 style={{ visibility: "hidden" }}>dd</h4>
                </div>
                <StyledHr width="99vw" height="0.5px" color="lightgray" />
            </div>
            {likeProductList.map((product, idx) =>
                <div key={idx}>

                    <ProductState product={product}></ProductState>
                    <hr
                        style={{
                            border: "none",
                            height: "1px",
                            backgroundColor: "rgb(217,217,217,0.5)",
                        }}
                    />
                </div>
            )}
        </div>
    )
}
