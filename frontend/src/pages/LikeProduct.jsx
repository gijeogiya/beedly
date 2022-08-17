import React from 'react'
import { useNavigate } from 'react-router-dom';
import beforeIcon from "../assets/img/arrow-left.svg";
import { StyledHr } from '../components/Common';
import ProductState from '../components/ProductState';

export default function LikeProduct() {
    const Navigate = useNavigate();

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
            <ProductState></ProductState>
            <hr
                style={{
                    border: "none",
                    height: "1px",
                    backgroundColor: "rgb(217,217,217,0.5)",
                }}
            />
        </div>
    )
}
