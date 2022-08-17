import React, { useEffect, useState } from "react";
import { StyledHr } from "../components/Common";
import ProductState from "../components/ProductState";
import { FlexBox, Hr } from "../components/UserStyled";
import beforeIcon from "../assets/img/arrow-left.svg";
import { nodeName } from "jquery";
import { getSaleList } from "../utils/apis/UserAPI";
import { useNavigate } from "react-router-dom";
import SaleProduct from "../components/SaleProduct";
// 판매내역 페이지
export default function SaleList() {
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate("");
  const [products, setProducts] = useState([]);
  const GoBack = () => {
    Navigate(-1);
  };

  useEffect(() => {
    if (loading)
      getSaleList(
        (response) => {
          console.log(response);
          setProducts([...response.data]);
          setLoading(false);
        },
        (fail) => {
          console.log(fail);
        }
      );
    return () => {
      setLoading(false);
    };
  });

  return (
    <div>
      {/* 판매내역 header */}
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
          <img alt="이전" src={beforeIcon} onClick={GoBack} />
          <h4>판매내역</h4>
          <h4 style={{ visibility: "hidden" }}>dd</h4>
        </div>
        <StyledHr width="99vw" height="0.5px" color="lightgray" />
      </div>
      {/* <ProductState src={imgurl} title={title} time={time} state={state} price={price} ></ProductState>
       */}
      {products.map((product, idx) => (
        <div key={idx}>
          <SaleProduct product={product} />
          <hr
            style={{
              border: "none",
              height: "1px",
              backgroundColor: "rgb(217,217,217,0.5)",
            }}
          />
        </div>
      ))}
    </div>
  );
}
